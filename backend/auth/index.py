import json
import os
import hashlib
import secrets
import psycopg2

SCHEMA = "t_p78119248_social_network_no_sp"

def get_conn():
    return psycopg2.connect(os.environ.get("DATABASE_URL", ""))

def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()

def resp(status, data, cors):
    return {"statusCode": status, "headers": cors, "body": json.dumps(data, ensure_ascii=False)}

def handler(event: dict, context) -> dict:
    """Регистрация и вход пользователей по email"""
    cors = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors, "body": ""}

    body = json.loads(event.get("body") or "{}")
    action = body.get("action")
    email = (body.get("email") or "").strip().lower()
    password = body.get("password") or ""
    name = (body.get("name") or "").strip()

    if not email or not password:
        return resp(400, {"error": "Email и пароль обязательны"}, cors)

    conn = get_conn()
    cur = conn.cursor()

    if action == "register":
        if not name:
            conn.close()
            return resp(400, {"error": "Имя обязательно"}, cors)

        cur.execute(f"SELECT id FROM {SCHEMA}.users WHERE email = '{email}'")
        if cur.fetchone():
            conn.close()
            return resp(409, {"error": "Email уже зарегистрирован"}, cors)

        pw_hash = hash_password(password)
        cur.execute(
            f"INSERT INTO {SCHEMA}.users (email, password_hash, name) VALUES ('{email}', '{pw_hash}', '{name}') RETURNING id"
        )
        user_id = cur.fetchone()[0]
        token = secrets.token_hex(32)
        cur.execute(f"INSERT INTO {SCHEMA}.sessions (user_id, token) VALUES ({user_id}, '{token}')")
        conn.commit()
        conn.close()
        return resp(200, {"token": token, "user": {"id": user_id, "name": name, "email": email}}, cors)

    elif action == "login":
        pw_hash = hash_password(password)
        cur.execute(
            f"SELECT id, name, email FROM {SCHEMA}.users WHERE email = '{email}' AND password_hash = '{pw_hash}'"
        )
        row = cur.fetchone()
        if not row:
            conn.close()
            return resp(401, {"error": "Неверный email или пароль"}, cors)

        user_id, uname, uemail = row
        token = secrets.token_hex(32)
        cur.execute(f"INSERT INTO {SCHEMA}.sessions (user_id, token) VALUES ({user_id}, '{token}')")
        conn.commit()
        conn.close()
        return resp(200, {"token": token, "user": {"id": user_id, "name": uname, "email": uemail}}, cors)

    conn.close()
    return resp(400, {"error": "Неизвестное действие"}, cors)

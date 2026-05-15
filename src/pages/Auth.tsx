import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

const AUTH_URL = "https://functions.poehali.dev/27ca034e-cff9-4f6e-940e-9c2e6fc0d0f5";

export default function Auth() {
  const navigate = useNavigate();
  const [tab, setTab] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const body: Record<string, string> = { action: tab, email, password };
    if (tab === "register") body.name = name;

    const res = await fetch(AUTH_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error || "Что-то пошло не так");
      return;
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    if (tab === "register") {
      navigate("/welcome");
    } else {
      navigate("/");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <div className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 rounded-xl animated-gradient flex items-center justify-center">
            <Icon name="Shield" size={20} className="text-white" />
          </div>
          <span className="font-black font-display text-2xl grad-text tracking-widest">TEMK</span>
        </div>

        <div className="glass-bright rounded-2xl p-6 shadow-lg">
          <div className="flex rounded-xl bg-muted p-1 mb-6">
            <button
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
                tab === "login" ? "bg-white shadow text-foreground" : "text-muted-foreground"
              }`}
              onClick={() => { setTab("login"); setError(""); }}
            >
              Войти
            </button>
            <button
              className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all ${
                tab === "register" ? "bg-white shadow text-foreground" : "text-muted-foreground"
              }`}
              onClick={() => { setTab("register"); setError(""); }}
            >
              Регистрация
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {tab === "register" && (
              <div>
                <label className="text-sm font-medium text-foreground mb-1 block">Имя</label>
                <input
                  type="text"
                  placeholder="Как вас зовут?"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-violet-400 transition"
                />
              </div>
            )}

            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-violet-400 transition"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Пароль</label>
              <input
                type="password"
                placeholder="Минимум 6 символов"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-violet-400 transition"
              />
            </div>

            {error && (
              <p className="text-sm text-red-500 bg-red-50 border border-red-200 rounded-xl px-4 py-2">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-xl animated-gradient text-white font-semibold text-sm shadow hover:opacity-90 transition disabled:opacity-60"
            >
              {loading ? "Подождите..." : tab === "login" ? "Войти" : "Создать аккаунт"}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Ваши данные защищены · Temk 2026
        </p>
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

export default function Welcome() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("друг");

  useEffect(() => {
    const raw = localStorage.getItem("user");
    if (raw) {
      const user = JSON.parse(raw);
      if (user?.name) setUserName(user.name);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4 text-center">
      <div className="w-20 h-20 rounded-3xl animated-gradient flex items-center justify-center mb-6 float">
        <Icon name="Shield" size={36} className="text-white" />
      </div>

      <h1 className="font-black font-display text-4xl grad-text mb-2 tracking-wider">TEMK</h1>
      <p className="text-muted-foreground text-sm mb-8">Защищённая социальная сеть</p>

      <div className="glass-bright rounded-2xl p-8 max-w-sm w-full shadow-lg mb-6">
        <div className="w-14 h-14 rounded-2xl bg-violet-100 flex items-center justify-center mx-auto mb-4">
          <Icon name="PartyPopper" size={28} className="text-violet-600" />
        </div>
        <h2 className="text-xl font-bold text-foreground mb-2">
          Добро пожаловать, {userName}!
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Ваш аккаунт создан. Здесь ваши данные принадлежат только вам — без слежки, без рекламы, без компромиссов.
        </p>
      </div>

      <div className="flex flex-col gap-3 w-full max-w-sm">
        <button
          onClick={() => navigate("/")}
          className="w-full py-3 rounded-xl animated-gradient text-white font-semibold shadow hover:opacity-90 transition"
        >
          Перейти в ленту
        </button>
        <div className="grid grid-cols-3 gap-3 text-center">
          {[
            { icon: "Lock", label: "Шифрование" },
            { icon: "EyeOff", label: "Без слежки" },
            { icon: "Ban", label: "Без рекламы" },
          ].map(({ icon, label }) => (
            <div key={label} className="glass rounded-xl p-3 flex flex-col items-center gap-1.5">
              <Icon name={icon as "Lock"} size={18} className="text-violet-500" />
              <span className="text-xs text-muted-foreground font-medium">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

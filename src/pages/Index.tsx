import { useState } from "react";
import Icon from "@/components/ui/icon";

type Section = "feed" | "messages" | "search" | "notifications" | "profile" | "settings" | "about";

const NAV_ITEMS = [
  { id: "feed" as Section, icon: "LayoutGrid", label: "Лента" },
  { id: "messages" as Section, icon: "MessageCircle", label: "Чаты" },
  { id: "search" as Section, icon: "Search", label: "Поиск" },
  { id: "notifications" as Section, icon: "Bell", label: "Оповещения" },
  { id: "profile" as Section, icon: "User", label: "Профиль" },
  { id: "settings" as Section, icon: "Settings", label: "Настройки" },
  { id: "about" as Section, icon: "Shield", label: "О нас" },
];

const FEED_POSTS = [
  {
    id: 1,
    name: "Алиса Морозова",
    handle: "@alice_m",
    avatar: "АМ",
    avatarGrad: "from-cyan-400 to-violet-500",
    time: "2 мин назад",
    text: "Только что протестировала функцию сквозного шифрования. Никакой третьей стороны — только ты и собеседник. Вот это настоящая приватность 🔒",
    likes: 47,
    comments: 12,
    reposts: 8,
    encrypted: true,
  },
  {
    id: 2,
    name: "Кирилл Звонарёв",
    handle: "@kirill_z",
    avatar: "КЗ",
    avatarGrad: "from-violet-500 to-fuchsia-400",
    time: "15 мин назад",
    text: "Vault не продаёт данные рекламщикам. Звучит как фантастика в 2026, но вот — существует.",
    likes: 134,
    comments: 31,
    reposts: 56,
    encrypted: false,
  },
  {
    id: 3,
    name: "Мария Степанова",
    handle: "@maria_s",
    avatar: "МС",
    avatarGrad: "from-fuchsia-400 to-pink-500",
    time: "1 час назад",
    text: "Разница между Vault и другими соцсетями: здесь я не товар. Мои данные — только мои.",
    likes: 89,
    comments: 17,
    reposts: 24,
    encrypted: true,
  },
];

const MESSAGES_LIST = [
  { id: 1, name: "Алиса Морозова", avatar: "АМ", grad: "from-cyan-400 to-violet-500", last: "Увидимся в шифрованном чате 😄", time: "10:42", unread: 3, online: true },
  { id: 2, name: "Команда Vault", avatar: "V", grad: "from-violet-500 to-fuchsia-400", last: "Добро пожаловать в безопасное пространство!", time: "Вчера", unread: 0, online: true },
  { id: 3, name: "Дима Ортов", avatar: "ДО", grad: "from-emerald-400 to-cyan-500", last: "Отличная статья о zero-knowledge", time: "Пн", unread: 1, online: false },
  { id: 4, name: "Настя Волкова", avatar: "НВ", grad: "from-fuchsia-400 to-rose-400", last: "Когда следующий митап?", time: "Вс", unread: 0, online: false },
];

const NOTIFICATIONS_LIST = [
  { id: 1, icon: "Heart", color: "text-rose-400", bg: "bg-rose-500/10", border: "border-rose-500/20", text: "Алиса Морозова оценила вашу запись", time: "2 мин", isNew: true },
  { id: 2, icon: "MessageCircle", color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20", text: "Кирилл Звонарёв ответил на ваш комментарий", time: "20 мин", isNew: true },
  { id: 3, icon: "UserPlus", color: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/20", text: "Мария Степанова подписалась на вас", time: "1 ч", isNew: true },
  { id: 4, icon: "ShieldCheck", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20", text: "Система безопасности: все данные зашифрованы", time: "2 ч", isNew: false },
  { id: 5, icon: "Repeat2", color: "text-fuchsia-400", bg: "bg-fuchsia-500/10", border: "border-fuchsia-500/20", text: "Дима Ортов поделился вашей записью", time: "Вчера", isNew: false },
];

const SEARCH_USERS = [
  { name: "Алиса Морозова", handle: "@alice_m", avatar: "АМ", grad: "from-cyan-400 to-violet-500", followers: "1.2K", verified: true },
  { name: "Кирилл Звонарёв", handle: "@kirill_z", avatar: "КЗ", grad: "from-violet-500 to-fuchsia-400", followers: "4.7K", verified: false },
  { name: "Мария Степанова", handle: "@maria_s", avatar: "МС", grad: "from-fuchsia-400 to-pink-500", followers: "890", verified: true },
  { name: "Дима Ортов", handle: "@dima_o", avatar: "ДО", grad: "from-emerald-400 to-cyan-500", followers: "2.1K", verified: false },
];

const PRIVACY_FEATURES = [
  { icon: "Lock", title: "Сквозное шифрование", desc: "Все сообщения зашифрованы E2E. Даже мы не можем их прочитать.", color: "text-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20" },
  { icon: "EyeOff", title: "Ноль трекинга", desc: "Никаких рекламных трекеров, пикселей и скриптов слежки.", color: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/20" },
  { icon: "Database", title: "Данные — ваши", desc: "Вы владеете своими данными и можете удалить их в любой момент.", color: "text-fuchsia-400", bg: "bg-fuchsia-500/10", border: "border-fuchsia-500/20" },
  { icon: "Zap", title: "Без монетизации данных", desc: "Мы не продаём и не передаём данные третьим лицам.", color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
];

function AvatarBadge({ letters, grad, size = "md" }: { letters: string; grad: string; size?: "sm" | "md" | "lg" }) {
  const sizes = { sm: "w-8 h-8 text-xs", md: "w-10 h-10 text-sm", lg: "w-14 h-14 text-lg" };
  return (
    <div className={`${sizes[size]} rounded-full bg-gradient-to-br ${grad} flex items-center justify-center font-bold font-display text-white flex-shrink-0`}>
      {letters}
    </div>
  );
}

function E2EBadge() {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
      <Icon name="Lock" size={10} />
      E2E
    </span>
  );
}

function FeedSection() {
  const [liked, setLiked] = useState<Set<number>>(new Set());

  const toggleLike = (id: number) => {
    setLiked(prev => {
      const next = new Set(prev);
      if (next.has(id)) { next.delete(id); } else { next.add(id); }
      return next;
    });
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex gap-3 overflow-x-auto pb-1">
        {["Вы", "Алиса", "Кирилл", "Мария", "Дима", "Настя"].map((name, i) => (
          <div key={i} className="flex flex-col items-center gap-1.5 flex-shrink-0 cursor-pointer">
            <div className={`w-14 h-14 rounded-full p-[2px] ${i === 0 ? "bg-white/15" : "animated-gradient"}`}>
              <div className="w-full h-full rounded-full bg-[#050810] flex items-center justify-center text-xs font-bold font-display">
                {i === 0 ? <Icon name="Plus" size={18} className="text-muted-foreground" /> : name[0]}
              </div>
            </div>
            <span className="text-[10px] text-muted-foreground truncate w-14 text-center">{name}</span>
          </div>
        ))}
      </div>

      <div className="glass rounded-2xl p-4">
        <div className="flex gap-3 items-center">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center font-bold text-xs font-display text-white flex-shrink-0">Вы</div>
          <div className="flex-1 bg-white/5 rounded-xl px-4 py-2.5 text-sm text-muted-foreground cursor-text hover:bg-white/8 transition-colors">
            Что нового? Всё зашифровано...
          </div>
          <button className="px-3 py-2 rounded-xl text-xs font-bold text-[#050810] animated-gradient hover:scale-105 active:scale-95 transition-transform flex-shrink-0">
            Пост
          </button>
        </div>
      </div>

      {FEED_POSTS.map((post, idx) => (
        <div key={post.id} className="glass rounded-2xl p-4 hover:bg-white/[0.06] transition-all" style={{ animationDelay: `${idx * 0.08}s` }}>
          <div className="flex gap-3">
            <AvatarBadge letters={post.avatar} grad={post.avatarGrad} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-semibold font-display text-sm">{post.name}</span>
                <span className="text-muted-foreground text-xs">{post.handle}</span>
                {post.encrypted && <E2EBadge />}
                <span className="text-muted-foreground text-xs ml-auto">{post.time}</span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-foreground/90">{post.text}</p>
              <div className="flex gap-5 mt-3">
                <button onClick={() => toggleLike(post.id)} className={`flex items-center gap-1.5 text-xs transition-colors ${liked.has(post.id) ? "text-rose-400" : "text-muted-foreground hover:text-rose-400"}`}>
                  <Icon name="Heart" size={14} />
                  {post.likes + (liked.has(post.id) ? 1 : 0)}
                </button>
                <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-cyan-400 transition-colors">
                  <Icon name="MessageCircle" size={14} />
                  {post.comments}
                </button>
                <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-violet-400 transition-colors">
                  <Icon name="Repeat2" size={14} />
                  {post.reposts}
                </button>
                <button className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-fuchsia-400 transition-colors ml-auto">
                  <Icon name="Share2" size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function MessagesSection() {
  return (
    <div className="animate-fade-in space-y-2">
      <div className="relative mb-4">
        <Icon name="Search" size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-cyan-500/50 transition-all placeholder:text-muted-foreground" placeholder="Поиск переписок..." />
      </div>

      {MESSAGES_LIST.map((msg, idx) => (
        <div key={msg.id} className="glass rounded-2xl p-4 cursor-pointer hover:bg-white/[0.07] transition-all active:scale-[0.99]" style={{ animationDelay: `${idx * 0.07}s` }}>
          <div className="flex gap-3 items-center">
            <div className="relative">
              <AvatarBadge letters={msg.avatar} grad={msg.grad} />
              {msg.online && <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#050810]" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-sm font-display">{msg.name}</span>
                <span className="text-xs text-muted-foreground">{msg.time}</span>
              </div>
              <div className="flex items-center justify-between mt-0.5">
                <p className="text-xs text-muted-foreground truncate flex-1 mr-2">{msg.last}</p>
                {msg.unread > 0 && (
                  <span className="w-5 h-5 rounded-full animated-gradient text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0">
                    {msg.unread}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="flex items-center gap-2 mt-3 p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
        <Icon name="Lock" size={13} className="text-emerald-400 flex-shrink-0" />
        <span className="text-xs text-emerald-400">Все переписки защищены сквозным шифрованием</span>
      </div>
    </div>
  );
}

function SearchSection() {
  const [query, setQuery] = useState("");
  const filtered = SEARCH_USERS.filter(u => !query || u.name.toLowerCase().includes(query.toLowerCase()) || u.handle.includes(query));

  return (
    <div className="animate-fade-in space-y-4">
      <div className="relative">
        <Icon name="Search" size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input value={query} onChange={e => setQuery(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 py-3 text-sm focus:outline-none focus:border-cyan-500/50 transition-all placeholder:text-muted-foreground" placeholder="Поиск людей, тем, записей..." />
      </div>

      {!query && (
        <div>
          <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-3">Популярные темы</p>
          <div className="flex flex-wrap gap-2">
            {["#приватность", "#шифрование", "#децентрализация", "#opensource", "#анонимность", "#безопасность"].map(tag => (
              <button key={tag} className="px-3 py-1.5 rounded-xl glass text-sm text-violet-300 hover:bg-violet-500/20 transition-colors border border-violet-500/20">
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider mb-3">
          {query ? `Результаты для "${query}"` : "Рекомендуемые люди"}
        </p>
        <div className="space-y-2">
          {filtered.map((user, idx) => (
            <div key={idx} className="glass rounded-2xl p-4 flex items-center gap-3 hover:bg-white/[0.07] transition-all cursor-pointer">
              <AvatarBadge letters={user.avatar} grad={user.grad} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-sm font-display">{user.name}</span>
                  {user.verified && <Icon name="BadgeCheck" size={13} className="text-cyan-400" />}
                </div>
                <div className="flex items-center gap-3 mt-0.5">
                  <span className="text-xs text-muted-foreground">{user.handle}</span>
                  <span className="text-xs text-muted-foreground">{user.followers} подп.</span>
                </div>
              </div>
              <button className="px-3 py-1.5 rounded-xl text-xs font-semibold border border-violet-500/40 text-violet-300 hover:bg-violet-500/20 transition-colors">
                + Подписаться
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function NotificationsSection() {
  const newCount = NOTIFICATIONS_LIST.filter(n => n.isNew).length;
  return (
    <div className="animate-fade-in space-y-2">
      {newCount > 0 && (
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-muted-foreground">{newCount} новых</span>
          <button className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors">Отметить все</button>
        </div>
      )}
      {NOTIFICATIONS_LIST.map((n, idx) => (
        <div key={n.id} className={`glass rounded-2xl p-4 flex gap-3 items-start cursor-pointer hover:bg-white/[0.07] transition-all ${n.isNew ? "border-l-2 border-cyan-500/60" : ""}`} style={{ animationDelay: `${idx * 0.07}s` }}>
          <div className={`w-9 h-9 rounded-xl ${n.bg} border ${n.border} flex items-center justify-center flex-shrink-0`}>
            <Icon name={n.icon} size={16} className={n.color} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm leading-snug">{n.text}</p>
            <span className="text-xs text-muted-foreground mt-1 block">{n.time} назад</span>
          </div>
          {n.isNew && <div className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0 mt-1.5" />}
        </div>
      ))}
    </div>
  );
}

function ProfileSection() {
  const [activeTab, setActiveTab] = useState<"posts" | "media" | "likes">("posts");
  return (
    <div className="animate-fade-in">
      <div className="relative h-32 rounded-2xl overflow-hidden mb-4">
        <div className="absolute inset-0 animated-gradient opacity-30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(168,85,247,0.4),transparent_70%)]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-5xl font-black font-display opacity-8 tracking-[0.3em] text-white">VAULT</span>
        </div>
      </div>

      <div className="glass rounded-2xl p-5 -mt-6 relative">
        <div className="flex items-end justify-between mb-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400 to-violet-500 flex items-center justify-center font-black text-lg font-display text-white ring-4 ring-[#050810]">
            ВЫ
          </div>
          <button className="px-4 py-2 rounded-xl glass text-sm font-semibold border border-white/15 hover:bg-white/10 transition-colors">
            Редактировать
          </button>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <h2 className="font-bold font-display text-lg">Ваше имя</h2>
          <Icon name="BadgeCheck" size={15} className="text-cyan-400" />
        </div>
        <p className="text-muted-foreground text-sm mb-2">@your_handle</p>
        <p className="text-sm text-foreground/80 mb-3">Ценю приватность и свободу в цифровом мире ✦</p>
        <div className="flex gap-5 mb-4">
          {[["128", "записей"], ["1.4K", "подписчиков"], ["340", "подписок"]].map(([val, label]) => (
            <div key={label}><span className="font-bold font-display text-sm">{val}</span><span className="text-xs text-muted-foreground ml-1">{label}</span></div>
          ))}
        </div>
        <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
          <Icon name="ShieldCheck" size={13} className="text-emerald-400" />
          <span className="text-xs text-emerald-400 font-medium">Профиль защищён · Данные не продаются</span>
        </div>
      </div>

      <div className="flex gap-1 mt-3 glass rounded-xl p-1">
        {(["posts", "media", "likes"] as const).map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === tab ? "bg-white/10 text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
            {tab === "posts" ? "Записи" : tab === "media" ? "Медиа" : "Лайки"}
          </button>
        ))}
      </div>

      <div className="mt-3 text-center text-muted-foreground text-sm py-10">
        <Icon name="FileText" size={36} className="mx-auto mb-2 opacity-20" />
        Здесь будут ваши {activeTab === "posts" ? "записи" : activeTab === "media" ? "медиафайлы" : "понравившиеся посты"}
      </div>
    </div>
  );
}

function SettingsSection() {
  const [s, setS] = useState({ e2e: true, metadata: false, twofa: true, anon: false, notifs: true });
  const toggle = (k: keyof typeof s) => setS(p => ({ ...p, [k]: !p[k] }));

  const items = [
    { key: "e2e" as const, label: "Сквозное шифрование", desc: "Все сообщения E2E-зашифрованы", color: "bg-cyan-400" },
    { key: "metadata" as const, label: "Скрыть метаданные", desc: "Не показывать дату и геолокацию", color: "bg-violet-400" },
    { key: "anon" as const, label: "Анонимный режим", desc: "Скрыть имя в публичных записях", color: "bg-fuchsia-400" },
    { key: "twofa" as const, label: "Двухфакторная аутентификация", desc: "Дополнительная защита аккаунта", color: "bg-emerald-400" },
    { key: "notifs" as const, label: "Уведомления о входе", desc: "Сообщать о новых сессиях", color: "bg-cyan-400" },
  ];

  return (
    <div className="animate-fade-in space-y-4">
      <div className="glass rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-4">
          <Icon name="Shield" size={15} className="text-muted-foreground" />
          <span className="text-xs font-semibold font-display text-muted-foreground uppercase tracking-wider">Приватность и безопасность</span>
        </div>
        <div className="space-y-0">
          {items.map((item, idx) => (
            <div key={item.key} className={`flex items-center justify-between py-3.5 ${idx < items.length - 1 ? "border-b border-white/5" : ""}`}>
              <div className="flex-1 min-w-0 mr-4">
                <p className="text-sm font-medium">{item.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{item.desc}</p>
              </div>
              <button onClick={() => toggle(item.key)} className={`relative w-11 h-6 rounded-full transition-all duration-300 flex-shrink-0 ${s[item.key] ? item.color : "bg-white/15"}`}>
                <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-all duration-300 ${s[item.key] ? "left-[22px]" : "left-0.5"}`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="glass rounded-2xl p-4 space-y-2">
        <div className="flex items-center gap-2 mb-2">
          <Icon name="User" size={15} className="text-muted-foreground" />
          <span className="text-xs font-semibold font-display text-muted-foreground uppercase tracking-wider">Аккаунт</span>
        </div>
        {[{ icon: "Download", label: "Экспортировать мои данные", color: "text-foreground" }, { icon: "Trash2", label: "Удалить аккаунт", color: "text-rose-400" }].map(item => (
          <button key={item.label} className={`w-full flex items-center gap-3 py-3 px-1 text-sm ${item.color} hover:opacity-80 transition-opacity border-b border-white/5 last:border-0`}>
            <Icon name={item.icon} size={16} />
            {item.label}
          </button>
        ))}
      </div>

      <button className="w-full glass rounded-2xl p-4 flex items-center gap-3 text-rose-400 hover:bg-rose-500/10 transition-colors border border-rose-500/20">
        <Icon name="LogOut" size={16} />
        <span className="text-sm font-medium">Выйти из аккаунта</span>
      </button>
    </div>
  );
}

function AboutSection() {
  return (
    <div className="animate-fade-in space-y-4">
      <div className="glass rounded-2xl p-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(0,229,255,0.08),transparent_60%)]" />
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl animated-gradient flex items-center justify-center mx-auto mb-4">
            <Icon name="Shield" size={28} className="text-white" />
          </div>
          <h2 className="font-black font-display text-3xl grad-text mb-2 tracking-wider">VAULT</h2>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
            Социальная сеть нового поколения, где ваши данные принадлежат только вам. Без слежки, без рекламы, без компромиссов.
          </p>
          <span className="inline-block mt-3 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
            v1.0.0 beta
          </span>
        </div>
      </div>

      <div className="grid gap-3">
        {PRIVACY_FEATURES.map((f, idx) => (
          <div key={idx} className={`glass rounded-2xl p-4 border ${f.border}`}>
            <div className="flex gap-3 items-start">
              <div className={`w-9 h-9 rounded-xl ${f.bg} border ${f.border} flex items-center justify-center flex-shrink-0`}>
                <Icon name={f.icon} size={17} className={f.color} />
              </div>
              <div>
                <h3 className="font-semibold font-display text-sm">{f.title}</h3>
                <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{f.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="glass rounded-2xl p-4">
        <h3 className="font-semibold font-display text-xs text-muted-foreground uppercase tracking-wider mb-3">Цифры говорят сами</h3>
        <div className="grid grid-cols-3 gap-3">
          {[
            { val: "0", label: "Продано данных", color: "text-cyan-400" },
            { val: "100%", label: "Зашифровано", color: "text-violet-400" },
            { val: "0₽", label: "Трекинга", color: "text-fuchsia-400" },
          ].map((stat) => (
            <div key={stat.label} className="text-center p-3 rounded-xl bg-white/5">
              <div className={`font-black font-display text-xl ${stat.color}`}>{stat.val}</div>
              <div className="text-[10px] text-muted-foreground mt-0.5 leading-tight">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <p className="text-center text-xs text-muted-foreground pb-1">Сделано с ❤️ для тех, кто ценит свободу · Vault 2026</p>
    </div>
  );
}

const SECTIONS: Record<Section, () => JSX.Element> = {
  feed: FeedSection,
  messages: MessagesSection,
  search: SearchSection,
  notifications: NotificationsSection,
  profile: ProfileSection,
  settings: SettingsSection,
  about: AboutSection,
};

const SECTION_TITLES: Record<Section, string> = {
  feed: "Лента",
  messages: "Сообщения",
  search: "Поиск",
  notifications: "Уведомления",
  profile: "Профиль",
  settings: "Настройки",
  about: "О проекте",
};

export default function Index() {
  const [active, setActive] = useState<Section>("feed");
  const ActiveSection = SECTIONS[active];

  const newNotifs = NOTIFICATIONS_LIST.filter(n => n.isNew).length;
  const newMsgs = MESSAGES_LIST.reduce((a, m) => a + m.unread, 0);

  return (
    <div className="min-h-screen bg-[#050810] flex flex-col">
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-cyan-500/6 blur-[120px]" />
        <div className="absolute top-[30%] right-[-15%] w-[400px] h-[400px] rounded-full bg-violet-500/8 blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[20%] w-[350px] h-[350px] rounded-full bg-fuchsia-500/6 blur-[100px]" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-white/6">
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg animated-gradient flex items-center justify-center">
              <Icon name="Shield" size={16} className="text-white" />
            </div>
            <span className="font-black font-display text-lg grad-text tracking-widest">VAULT</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-emerald-400 font-medium">Защищено</span>
            </div>
            <button className="w-8 h-8 rounded-lg glass flex items-center justify-center hover:bg-white/10 transition-colors">
              <Icon name="BellRing" size={15} className="text-muted-foreground" />
            </button>
          </div>
        </div>
      </header>

      {/* Page title */}
      <div className="max-w-lg mx-auto w-full px-4 pt-4 pb-0">
        <h1 className="font-black font-display text-xl">{SECTION_TITLES[active]}</h1>
      </div>

      {/* Content */}
      <main className="flex-1 max-w-lg mx-auto w-full px-4 py-3 pb-28">
        <ActiveSection key={active} />
      </main>

      {/* Bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 z-50">
        <div className="max-w-lg mx-auto px-3 pb-4 pt-1">
          <div className="glass-bright rounded-2xl px-1 py-2 flex items-center justify-around">
            {NAV_ITEMS.map(item => {
              const isActive = active === item.id;
              const badge = item.id === "notifications" ? newNotifs : item.id === "messages" ? newMsgs : 0;
              return (
                <button
                  key={item.id}
                  onClick={() => setActive(item.id)}
                  className={`relative flex flex-col items-center gap-0.5 px-2 py-2 rounded-xl transition-all duration-200 flex-1 ${isActive ? "nav-item-active" : "hover:bg-white/5"}`}
                >
                  {badge > 0 && (
                    <span className="absolute top-1 right-1 w-4 h-4 rounded-full animated-gradient text-white text-[9px] font-bold flex items-center justify-center z-10">
                      {badge}
                    </span>
                  )}
                  <Icon name={item.icon} size={isActive ? 21 : 19} className={isActive ? "text-cyan-400" : "text-muted-foreground"} />
                  <span className={`text-[9px] font-medium transition-colors ${isActive ? "text-cyan-400" : "text-muted-foreground"}`}>
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
}
import Link from "next/link";
import { DarkThemeSwitch } from "../components/app-shell";
import { Promotion } from "../components/promotion";

export default function Other() {
  return (
    <div className="other-page">
      <Promotion countdown />

      <section className="other-profile" aria-label="Профиль">
        <div>
          <p>Профиль</p>
          <p className="other-email">idima6335@gmail.com</p>
        </div>
        <span className="other-sign-out">Выйти</span>
      </section>

      <div className="other-menu">
        <div className="other-menu-row">Кошелёк</div>
        <DarkThemeSwitch />
        <div className="other-menu-row">Видимость элементов</div>
        <div className="other-menu-row">Уведомления</div>
        <Link href="/create-ticket" className="other-menu-row">Помощь</Link>
        <div className="other-menu-row">Написать нам</div>
      </div>

      <footer className="other-legal">
        <p>Политика в отношении обработки персональных данных</p>
        <p>Правовая информация</p>
        <p className="other-version">© 2026, ООО «Глобус Медиа» · Версия 5.25.0</p>
      </footer>
    </div>
  );
}

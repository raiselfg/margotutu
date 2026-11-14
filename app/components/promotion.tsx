export function Promotion({ countdown = false }: { countdown?: boolean }) {
  return (
    <aside className={`promotion${countdown ? " promotion-countdown" : ""}`} aria-label="Подарок">
      <div className="promotion-copy">
        <p className="promotion-title">
          Вы накопили<br />
          {countdown ? "на (1) подарок" : <>на подарок<br />в сентябре</>}
        </p>
        <span className="promotion-action">Забрать</span>
      </div>
      <img
        src={countdown ? "/images/gift-countdown.png" : "/images/gift-promotion.png"}
        width={474}
        height={countdown ? 395 : 450}
        alt={countdown ? "23:59" : ""}
      />
    </aside>
  );
}

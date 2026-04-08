const tickerItems = [
  "May 1-3, 2026",
  "3-Day Live Bootcamp",
  "₹50,000+ Bonuses",
  "Only ₹999",
  "Limited Seats"
];

export function Ticker() {
  return (
    <section className="ticker-shell overflow-hidden border-y border-orange/15 bg-orange/95 py-4 text-black">
      <div className="c3-container">
        <div className="grid grid-cols-2 gap-2 text-center sm:grid-cols-3 lg:flex lg:flex-wrap lg:items-center lg:justify-center lg:gap-3">
          {tickerItems.map((item) => (
            <span
              key={item}
              className="rounded-full border border-black/10 bg-black/5 px-3 py-2 font-body text-[11px] font-semibold uppercase tracking-[0.14em] text-black md:px-4 md:text-xs"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

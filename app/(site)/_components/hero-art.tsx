// Vector excavator drawn for the banner, so the hero looks finished even before (or without) a photo.

export function HeroArt() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 560 380"
      className="h-auto w-full max-w-[560px]"
      fill="none"
    >
      <defs>
        <linearGradient id="body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FB923C" />
          <stop offset="1" stopColor="#EA580C" />
        </linearGradient>
        <linearGradient id="arm" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#F97316" />
          <stop offset="1" stopColor="#C2410C" />
        </linearGradient>
        <radialGradient id="glow" cx="50%" cy="60%" r="55%">
          <stop offset="0" stopColor="#F97316" stopOpacity="0.35" />
          <stop offset="1" stopColor="#F97316" stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="280" cy="250" rx="270" ry="150" fill="url(#glow)" />

      {/* ground */}
      <path d="M10 338h540" stroke="#ffffff" strokeOpacity="0.18" strokeWidth="2" strokeLinecap="round" />
      <path d="M40 352h120M230 352h200" stroke="#ffffff" strokeOpacity="0.1" strokeWidth="2" strokeLinecap="round" />

      {/* tracks */}
      <rect x="92" y="282" width="268" height="56" rx="28" fill="#26262C" />
      <rect x="102" y="291" width="248" height="38" rx="19" fill="#34343C" />
      {[132, 192, 252, 312].map((x) => (
        <circle key={x} cx={x} cy="310" r="11" fill="#1A1A1F" stroke="#4A4A55" strokeWidth="3" />
      ))}

      {/* house + counterweight */}
      <rect x="112" y="214" width="196" height="72" rx="12" fill="url(#body)" />
      <rect x="92" y="226" width="44" height="58" rx="10" fill="#9A3412" />
      <rect x="150" y="236" width="110" height="10" rx="5" fill="#ffffff" fillOpacity="0.28" />

      {/* cab */}
      <path d="M232 214v-52a10 10 0 0 1 10-10h50a10 10 0 0 1 9 6l22 56z" fill="url(#body)" />
      <path d="M246 168h42a6 6 0 0 1 5 3l14 36h-61z" fill="#0B0D10" fillOpacity="0.85" />
      <path d="M252 176h30l10 26h-40z" fill="#ffffff" fillOpacity="0.14" />

      {/* boom, stick, bucket */}
      <path d="M296 226L396 118" stroke="url(#arm)" strokeWidth="20" strokeLinecap="round" />
      <path d="M396 118L470 222" stroke="url(#arm)" strokeWidth="15" strokeLinecap="round" />
      <path d="M282 196L368 140" stroke="#9A3412" strokeWidth="8" strokeLinecap="round" />
      <path d="M404 128L450 196" stroke="#9A3412" strokeWidth="7" strokeLinecap="round" />
      <path d="M452 218c-30 4-40 38-22 62 36 12 78-8 86-42-14-26-40-28-64-20z" fill="#FDBA74" />
      <path d="M440 262l18 8M458 250l22 6M476 240l20 4" stroke="#9A3412" strokeWidth="5" strokeLinecap="round" />
      <circle cx="396" cy="118" r="9" fill="#26262C" />
      <circle cx="296" cy="226" r="9" fill="#26262C" />
      <circle cx="470" cy="222" r="7" fill="#26262C" />
    </svg>
  )
}

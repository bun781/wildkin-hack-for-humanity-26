import { useId } from "react";

export type BoxSceneId = "ocean" | "forest" | "hidden";

// Pine tree silhouette built from three stacked tiers.
function pine(x: number, base: number, h: number) {
  const w = h * 0.34;
  return `M${x} ${base - h} L${x + w * 0.55} ${base - h * 0.62} L${x + w * 0.25} ${base - h * 0.62} L${x + w * 0.8} ${base - h * 0.28} L${x + w * 0.3} ${base - h * 0.28} L${x + w} ${base} L${x - w} ${base} L${x - w * 0.3} ${base - h * 0.28} L${x - w * 0.8} ${base - h * 0.28} L${x - w * 0.25} ${base - h * 0.62} L${x - w * 0.55} ${base - h * 0.62} Z`;
}

function Ocean({ uid }: { uid: string }) {
  return (
    <>
      <defs>
        <linearGradient id={`${uid}-bg`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#1f86b0" />
          <stop offset="1" stopColor="#052f46" />
        </linearGradient>
      </defs>
      <rect width="185" height="255" fill={`url(#${uid}-bg)`} />
      <path d="M28 0 L66 0 L118 255 L36 255Z" fill="#fff" opacity=".07" />
      <path d="M92 0 L118 0 L168 255 L120 255Z" fill="#fff" opacity=".06" />
      <g fill="none" stroke="#fff" strokeOpacity=".55" strokeWidth="1.4">
        <circle cx="38" cy="150" r="4" />
        <circle cx="46" cy="128" r="2.4" />
        <circle cx="146" cy="162" r="5" />
        <circle cx="138" cy="136" r="3" />
        <circle cx="152" cy="112" r="2" />
        <circle cx="78" cy="176" r="2.6" />
      </g>
      <path d="M0 255 V226 Q28 208 58 224 T118 222 T185 214 V255Z" fill="#06283b" />
      <g fill="none" stroke="#3fa06c" strokeWidth="4.5" strokeLinecap="round">
        <path d="M22 236 C10 214 34 198 20 172 C12 154 26 142 21 124" />
        <path d="M34 238 C26 220 44 210 36 192" strokeWidth="3.5" />
        <path d="M152 232 C164 208 140 194 154 170 C162 154 148 144 156 128" />
      </g>
      <g>
        <ellipse cx="98" cy="205" rx="17" ry="10" fill="#d6483a" />
        <path d="M86 197 Q98 182 112 197Z" fill="#f08a4b" />
        <path d="M112 205 L124 198 L124 212Z" fill="#c23c30" />
        <circle cx="90" cy="203" r="2.4" fill="#fff" />
        <circle cx="90" cy="203" r="1.1" fill="#0c2c25" />
        <path d="M92 214 l-4 6 M102 215 l-1 7" stroke="#f08a4b" strokeWidth="3" strokeLinecap="round" />
      </g>
      <g fill="#e2a72d">
        <circle cx="60" cy="238" r="3.4" />
        <circle cx="68" cy="241" r="2.6" />
        <circle cx="126" cy="240" r="3" />
      </g>
    </>
  );
}

function Forest({ uid }: { uid: string }) {
  return (
    <>
      <defs>
        <linearGradient id={`${uid}-bg`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0a1f24" />
          <stop offset="1" stopColor="#1d5036" />
        </linearGradient>
      </defs>
      <rect width="185" height="255" fill={`url(#${uid}-bg)`} />
      <circle cx="140" cy="44" r="17" fill="#f3efc4" />
      <circle cx="148" cy="38" r="15" fill="#0b2227" />
      <g fill="#f3efc4">
        <circle cx="34" cy="30" r="1.4" />
        <circle cx="70" cy="20" r="1" />
        <circle cx="104" cy="34" r="1.2" />
        <circle cx="168" cy="82" r="1.1" />
        <circle cx="22" cy="86" r="1" />
        <circle cx="120" cy="14" r="1.3" />
      </g>
      <path d={pine(26, 255, 110)} fill="#25674a" />
      <path d={pine(86, 255, 96)} fill="#25674a" />
      <path d={pine(156, 255, 120)} fill="#25674a" />
      <path d={pine(54, 262, 96)} fill="#0b2a1c" />
      <path d={pine(122, 262, 104)} fill="#0b2a1c" />
      <path d={pine(176, 262, 76)} fill="#0b2a1c" />
      <g>
        <circle cx="86" cy="206" r="6" fill="#d8b633" opacity=".95" />
        <circle cx="104" cy="206" r="6" fill="#d8b633" opacity=".95" />
        <circle cx="86" cy="206" r="2.4" fill="#0b2a1c" />
        <circle cx="104" cy="206" r="2.4" fill="#0b2a1c" />
      </g>
      <g fill="#b3cf35">
        <circle cx="40" cy="170" r="2" />
        <circle cx="40" cy="170" r="6" opacity=".25" />
        <circle cx="132" cy="150" r="2" />
        <circle cx="132" cy="150" r="6" opacity=".25" />
        <circle cx="70" cy="224" r="1.8" />
        <circle cx="148" cy="212" r="1.8" />
        <circle cx="148" cy="212" r="5" opacity=".25" />
      </g>
    </>
  );
}

function Hidden({ uid }: { uid: string }) {
  return (
    <>
      <defs>
        <linearGradient id={`${uid}-bg`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3a1d18" />
          <stop offset=".62" stopColor="#a8683a" />
          <stop offset="1" stopColor="#6a3b2b" />
        </linearGradient>
        <linearGradient id={`${uid}-river`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#8ed0d3" />
          <stop offset="1" stopColor="#3f929c" />
        </linearGradient>
      </defs>
      <rect width="185" height="255" fill={`url(#${uid}-bg)`} />
      <circle cx="128" cy="140" r="18" fill="#e2a72d" />
      <path d="M0 160 L38 108 L62 138 L92 92 L128 142 L152 118 L185 156 V255 H0Z" fill="#5a3425" />
      <path d="M0 184 L30 160 L58 182 L90 156 L126 186 L158 164 L185 188 V255 H0Z" fill="#3a2018" />
      <path d="M92 158 C80 182 120 194 102 214 C88 230 70 238 56 255 L128 255 C134 238 116 230 120 214 C134 192 100 182 102 158Z" fill={`url(#${uid}-river)`} />
      <g fill="none" stroke="#fff" strokeOpacity=".55" strokeWidth="1.3" strokeLinecap="round">
        <path d="M96 176 q6 4 0 9" />
        <path d="M104 204 q8 4 2 10" />
        <ellipse cx="94" cy="238" rx="12" ry="3" />
        <ellipse cx="106" cy="226" rx="7" ry="2" />
      </g>
      <g fill="#2a140e">
        <ellipse cx="30" cy="236" rx="22" ry="12" />
        <ellipse cx="160" cy="240" rx="26" ry="13" />
        <ellipse cx="62" cy="248" rx="12" ry="7" />
      </g>
      <g>
        <ellipse cx="100" cy="228" rx="9" ry="4.4" fill="#4a3322" />
        <path d="M108 228 Q122 224 128 232" stroke="#4a3322" strokeWidth="3" fill="none" strokeLinecap="round" />
        <circle cx="94" cy="226.8" r="1" fill="#e2a72d" />
      </g>
    </>
  );
}

export default function BoxScene({ id }: { id: BoxSceneId }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  return (
    <svg className="box-scene" viewBox="0 0 185 255" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      {id === "ocean" && <Ocean uid={uid} />}
      {id === "forest" && <Forest uid={uid} />}
      {id === "hidden" && <Hidden uid={uid} />}
    </svg>
  );
}

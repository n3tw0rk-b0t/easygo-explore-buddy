import { Sparkles } from "lucide-react";

import easyGoLogo from "@/assets/brand/easygo-logo-v2.png";

export function Logo() {
  return (
    <span
      role="img"
      aria-label="EasyGo AI"
      className="relative block h-14 aspect-[3/1] overflow-visible sm:h-16"
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 2172 724"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <mask id="easygo-logo-without-static-arrow" maskUnits="userSpaceOnUse">
            <rect width="2172" height="724" fill="white" />
            <path d="M 500 195 L 665 164 L 607 302 L 548 260 Z" fill="black" />
          </mask>
        </defs>
        <image
          href={easyGoLogo}
          width="2172"
          height="724"
          mask="url(#easygo-logo-without-static-arrow)"
        />
      </svg>

      <svg
        aria-hidden="true"
        viewBox="0 0 2172 724"
        className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
      >
        <g className="fill-[#ff5a5f] drop-shadow-[0_0_5px_rgba(255,90,95,0.95)] motion-reduce:hidden">
          <path d="M 66 0 L -42 -36 L -18 0 L -42 36 Z" />
          <animateMotion
            dur="4.6s"
            repeatCount="indefinite"
            rotate="auto"
            path="M 58 384 C 70 414 94 429 130 424 C 270 414 430 320 520 266 C 562 237 610 205 650 188"
          />
          <animate
            attributeName="opacity"
            dur="4.6s"
            repeatCount="indefinite"
            values="0;1;1;0"
            keyTimes="0;0.08;0.9;1"
          />
        </g>
      </svg>

      <Sparkles
        aria-hidden="true"
        className="absolute right-[0.5%] top-[9%] h-[30%] w-[14%] fill-attention/60 text-attention drop-shadow-[0_0_7px_rgba(255,205,92,0.95)] motion-safe:animate-pulse"
        style={{ animationDuration: "1.5s" }}
      />
      <Sparkles
        aria-hidden="true"
        className="absolute right-[4.5%] top-[34%] h-[20%] w-[10%] fill-attention/50 text-attention drop-shadow-[0_0_5px_rgba(255,205,92,0.9)] motion-safe:animate-pulse"
        style={{ animationDelay: "0.65s", animationDuration: "1.9s" }}
      />
    </span>
  );
}

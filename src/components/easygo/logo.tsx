export function Logo() {
  return (
    <div className="flex items-center gap-2" aria-label="EasyGo AI">
      <span aria-hidden="true" className="relative inline-flex h-6 w-10 items-center">
        <span className="absolute left-0 top-1/2 h-[2px] w-10 -translate-y-1/2 rounded-full bg-border" />
        <span className="absolute left-0 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full border-2 border-primary bg-card" />
        <span className="easygo-dot absolute left-[18px] top-1/2 h-3 w-3 -translate-y-1/2 rounded-full bg-coral" />
      </span>
      <span className="font-display text-xl font-extrabold tracking-tight text-primary">
        EasyGo <span className="text-coral">AI</span>
      </span>
    </div>
  );
}

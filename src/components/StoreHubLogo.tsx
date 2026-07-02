export default function StoreHubLogo({ size = 36, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="36" height="36" rx="9" fill="#10b981" />
      <path
        d="M13 15.5V13a5 5 0 0 1 10 0v2.5"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <rect x="8" y="15.5" width="20" height="13" rx="3" fill="white" fillOpacity="0.9" />
      <circle cx="18" cy="22" r="2.5" fill="#10b981" />
    </svg>
  );
}

export function StoreHubWordmark({
  size = 36,
  className = "",
  dark = false,
}: {
  size?: number;
  className?: string;
  dark?: boolean;
}) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <StoreHubLogo size={size} />
      <span
        style={{ fontSize: size * 0.5, lineHeight: 1 }}
        className={`font-bold tracking-tight ${dark ? "text-gray-900" : "text-white"}`}
      >
        Store
        <span className="text-emerald-500">Hub</span>
      </span>
    </div>
  );
}

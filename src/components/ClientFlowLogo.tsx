export default function ClientFlowLogo({ size = 36, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="40" height="40" rx="9" fill="#059669" />
      {/* C — arc opening right, center ~(13,20) r=7 */}
      <path
        d="M18 15A7 7 0 1 0 18 25"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Arrow shaft */}
      <line x1="22" y1="20" x2="32" y2="20" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
      {/* Arrow head */}
      <path
        d="M27 15.5L32 20L27 24.5"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

export function ClientFlowWordmark({
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
      <ClientFlowLogo size={size} />
      <span
        style={{ fontSize: size * 0.5, lineHeight: 1 }}
        className={`font-bold tracking-tight ${dark ? "text-gray-900" : "text-white"}`}
      >
        Client
        <span className="text-emerald-400">Flow</span>
      </span>
    </div>
  );
}

export const TEMPLATES = [
  {
    id:          "minimal",
    name:        "Minimal",
    description: "Clean, white, lots of breathing room. Let products speak.",
    preview:     "bg-white text-slate-900 border border-slate-200",
    accent:      "#0f172a",
  },
  {
    id:          "bold",
    name:        "Bold",
    description: "Large hero with your brand color. High contrast, loud.",
    preview:     "bg-slate-900 text-white border border-slate-700",
    accent:      "#6366f1",
  },
  {
    id:          "warm",
    name:        "Warm",
    description: "Cream background, earthy tones. Great for artisan & food brands.",
    preview:     "bg-amber-50 text-amber-900 border border-amber-200",
    accent:      "#b45309",
  },
  {
    id:          "market",
    name:        "Market",
    description: "Dense grid, price badges, bustling bazaar energy.",
    preview:     "bg-emerald-900 text-white border border-emerald-700",
    accent:      "#059669",
  },
] as const;

export type TemplateId = (typeof TEMPLATES)[number]["id"];

export function getTemplate(id: string) {
  return TEMPLATES.find((t) => t.id === id) ?? TEMPLATES[0];
}

import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { TEMPLATES } from "@/lib/templates";
import { saveStorefrontSettings } from "@/app/actions/storefront";
import ImageUpload from "@/components/ImageUpload";

export const metadata = { title: "Storefront — Dashboard" };

export default async function StorefrontSettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ saved?: string }>;
}) {
  const { saved } = await searchParams;

  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const vendor = await prisma.vendor.findUnique({
    where:   { userId: session.user.id },
    include: { storefrontSetting: true },
  });
  if (!vendor) redirect("/onboarding");

  const s      = vendor.storefrontSetting;
  const active = s?.templateId ?? "minimal";
  type SL      = { instagram?: string; twitter?: string; whatsapp?: string; website?: string };
  const social = (s?.socialLinks ?? {}) as SL;

  return (
    <div className="max-w-3xl mx-auto px-5 sm:px-8 py-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Storefront settings</h1>
        <p className="text-sm text-slate-500 mt-1">
          Customise how your public store looks at{" "}
          <a href={`/shop/${vendor.username}`} target="_blank" rel="noopener noreferrer"
            className="font-medium text-slate-700 hover:text-slate-900 underline underline-offset-2 transition-colors">
            /shop/{vendor.username}
          </a>
        </p>
      </div>

      {saved && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl px-4 py-3 text-sm font-medium">
          Storefront saved successfully!
        </div>
      )}

      <form action={saveStorefrontSettings} className="space-y-8">

        {/* ── Template picker ── */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <h2 className="text-base font-semibold text-slate-900 mb-1">Choose a template</h2>
          <p className="text-xs text-slate-500 mb-5">The overall look and feel of your store page.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {TEMPLATES.map((t) => (
              <label key={t.id} className="cursor-pointer">
                <input type="radio" name="templateId" value={t.id} defaultChecked={active === t.id} className="sr-only peer" />
                <div className={`
                  relative rounded-2xl border-2 p-4 transition-all
                  peer-checked:border-slate-900 peer-checked:ring-2 peer-checked:ring-slate-900/10
                  border-slate-200 hover:border-slate-400
                `}>
                  {/* Colour swatch */}
                  <div className={`h-16 rounded-xl mb-3 ${t.preview}`} />
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{t.name}</p>
                      <p className="text-xs text-slate-500 mt-0.5 leading-snug">{t.description}</p>
                    </div>
                    {active === t.id && (
                      <span className="shrink-0 text-xs font-semibold text-white bg-slate-900 px-2 py-0.5 rounded-md">Active</span>
                    )}
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* ── Brand ── */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5">
          <div>
            <h2 className="text-base font-semibold text-slate-900 mb-1">Brand</h2>
            <p className="text-xs text-slate-500">Logo, brand colour, and short bio.</p>
          </div>

          <ImageUpload
            name="logoUrl"
            label="Store logo"
            defaultUrl={s?.logoUrl ?? ""}
            hint="Square image works best. Shown in your storefront header."
            aspectRatio="square"
          />

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1.5">Brand colour</label>
            <div className="flex items-center gap-3">
              <input
                name="brandColor"
                type="color"
                defaultValue={s?.brandColor ?? "#0f172a"}
                className="w-12 h-10 rounded-lg border border-slate-200 cursor-pointer p-1 bg-white"
              />
              <input
                type="text"
                id="brandColorText"
                defaultValue={s?.brandColor ?? "#0f172a"}
                placeholder="#0f172a"
                readOnly
                className="flex-1 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-500 bg-slate-50 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1.5">Short bio</label>
            <textarea
              name="bioText"
              rows={3}
              defaultValue={s?.bioText ?? ""}
              placeholder="Tell shoppers a bit about your store…"
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/20 transition-shadow bg-slate-50 resize-none"
            />
          </div>
        </div>

        {/* ── Social links ── */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
          <div>
            <h2 className="text-base font-semibold text-slate-900 mb-1">Social links</h2>
            <p className="text-xs text-slate-500">Optional. Shown on your storefront header.</p>
          </div>

          {[
            { name: "instagram", label: "Instagram", placeholder: "@yourhandle" },
            { name: "twitter",   label: "X / Twitter", placeholder: "@yourhandle" },
            { name: "whatsapp",  label: "WhatsApp",  placeholder: "+2348012345678" },
            { name: "website",   label: "Website",   placeholder: "https://yoursite.com" },
          ].map(({ name, label, placeholder }) => (
            <div key={name}>
              <label className="block text-xs font-medium text-slate-600 mb-1.5">{label}</label>
              <input
                name={name}
                type="text"
                defaultValue={(social as Record<string, string>)[name] ?? ""}
                placeholder={placeholder}
                className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/20 transition-shadow bg-slate-50"
              />
            </div>
          ))}
        </div>

        {/* ── Submit ── */}
        <div className="flex items-center gap-4">
          <button
            type="submit"
            className="bg-slate-900 text-white text-sm font-semibold px-7 py-3 rounded-xl hover:bg-slate-800 transition-colors"
          >
            Save storefront
          </button>
          <a
            href={`/shop/${vendor.username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors flex items-center gap-1.5"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
            Preview store
          </a>
        </div>
      </form>
    </div>
  );
}

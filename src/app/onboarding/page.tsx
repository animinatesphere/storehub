import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { completeOnboarding } from "@/app/actions/vendor";

export const metadata = { title: "Set up your store — ClientFlow" };

const CATEGORIES = [
  { value: "PHYSICAL_GOODS", label: "Physical goods", desc: "Shoes, clothes, books, general retail" },
  { value: "DIGITAL_PRODUCTS", label: "Digital products", desc: "Ebooks, courses, templates" },
  { value: "REAL_ESTATE", label: "Real estate", desc: "Houses, apartments, land" },
  { value: "SERVICES", label: "Services", desc: "Tutors, freelancers, consultants" },
  { value: "AUTHORS_CREATORS", label: "Authors & creators", desc: "Books, portfolios, music" },
  { value: "PORTFOLIO_GENERAL", label: "Portfolio / general", desc: "Personal bio-link page" },
] as const;

const ERRORS: Record<string, string> = {
  missing_fields: "Please fill in all fields.",
  invalid_username: "Username must be 3–30 characters, letters, numbers, hyphens, or underscores only.",
  username_taken: "That username is already taken. Please choose another.",
};

export default async function OnboardingPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  // If already onboarded, skip to dashboard
  const existing = await prisma.vendor.findUnique({
    where: { userId: session.user.id },
  });
  if (existing) redirect("/dashboard");

  const { error: errorParam } = await searchParams;
  const error = errorParam ? ERRORS[errorParam] : null;

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <div className="mb-10">
          <p className="text-sm text-gray-400 mb-2">Step 1 of 2 · Store details</p>
          <h1 className="text-3xl font-bold text-slate-800">Set up your store</h1>
          <p className="mt-2 text-gray-500">
            Tell us a little about what you sell. You can change all of this later.
          </p>
        </div>

        {error && (
          <div className="mb-6 text-sm text-red-600 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
            {error}
          </div>
        )}

        <form action={completeOnboarding} className="space-y-8">
          {/* Business name */}
          <div className="bg-white rounded-xl p-6 border border-gray-100 space-y-4">
            <div>
              <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-1">
                Business name
              </label>
              <input
                id="businessName"
                name="businessName"
                type="text"
                required
                className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-slate-800 focus:border-transparent"
                placeholder="Ada Styles"
              />
            </div>

            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                Your store link
              </label>
              <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-slate-800">
                <span className="bg-gray-50 px-4 py-3 text-sm text-gray-400 border-r border-gray-200 whitespace-nowrap select-none">
                  ClientFlow.ng/shop/
                </span>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  pattern="[a-zA-Z0-9_\-]{3,30}"
                  className="flex-1 px-4 py-3 text-sm focus:outline-none"
                  placeholder="ada-styles"
                />
              </div>
              <p className="mt-1 text-xs text-gray-400">
                Letters, numbers, hyphens, underscores. 3–30 characters.
              </p>
            </div>
          </div>

          {/* Category */}
          <div className="bg-white rounded-xl p-6 border border-gray-100">
            <p className="text-sm font-medium text-gray-700 mb-4">What do you sell?</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {CATEGORIES.map(({ value, label, desc }) => (
                <label
                  key={value}
                  className="flex items-start gap-3 border border-gray-200 rounded-xl p-4 cursor-pointer hover:border-slate-400 has-checked:border-slate-800 has-checked:bg-slate-50 transition-colors"
                >
                  <input
                    type="radio"
                    name="category"
                    value={value}
                    required
                    className="mt-0.5 accent-slate-800"
                  />
                  <div>
                    <p className="text-sm font-medium text-slate-800">{label}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-slate-800 text-white px-6 py-4 rounded-xl text-sm font-medium hover:bg-slate-700 transition-colors"
          >
            Create my store
          </button>
        </form>
      </div>
    </main>
  );
}

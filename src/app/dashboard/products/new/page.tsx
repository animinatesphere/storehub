import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createProduct } from "@/app/actions/product";
import ImageUpload from "@/components/ImageUpload";

export const metadata = { title: "Add product — ClientFlow" };

const ERRORS: Record<string, string> = {
  missing_fields: "Please fill in the product name and price.",
  invalid_price:  "Please enter a valid price (e.g. 5000).",
  plan_limit:     "You've reached your plan's product limit. Upgrade your plan to add more products.",
};

export default async function NewProductPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const vendor = await prisma.vendor.findUnique({ where: { userId: session.user.id } });
  if (!vendor) redirect("/onboarding");

  const { error: errorParam } = await searchParams;
  const error = errorParam ? ERRORS[errorParam] : null;

  return (
    <div className="p-5 sm:p-8 max-w-2xl mx-auto">
      {/* Back link */}
      <Link
        href="/dashboard/products"
        className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-600 transition-colors mb-6"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        Products
      </Link>

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">Add a product</h1>
        <p className="text-sm text-slate-400 mt-1">You can edit everything after saving.</p>
      </div>

      {error && (
        <div className="mb-6 text-sm text-red-600 bg-red-50 rounded-xl px-4 py-3 border border-red-100">
          {error}
        </div>
      )}

      <form action={createProduct} className="space-y-5">

        {/* Core details */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6 space-y-5">
          <h2 className="text-sm font-semibold text-slate-700">Product details</h2>

          <div>
            <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-1.5">
              Name <span className="text-red-400">*</span>
            </label>
            <input
              id="title"
              name="title"
              type="text"
              required
              autoFocus
              placeholder="e.g. Ankara wrap dress"
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-1.5">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={4}
              placeholder="Describe what's included, sizes available, material, condition..."
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-slate-700 mb-1.5">
                Price (₦) <span className="text-red-400">*</span>
              </label>
              <input
                id="price"
                name="price"
                type="number"
                required
                min="0"
                step="0.01"
                placeholder="15000"
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="stockCount" className="block text-sm font-medium text-slate-700 mb-1.5">
                Stock count
              </label>
              <input
                id="stockCount"
                name="stockCount"
                type="number"
                min="0"
                step="1"
                placeholder="Leave blank = unlimited"
                className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder:text-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
              />
            </div>
          </div>

          <ImageUpload
            name="imageUrl"
            label="Product image"
            hint="Upload from your phone or computer — we'll host it for you."
            aspectRatio="square"
          />
        </div>

        {/* Visibility */}
        <div className="bg-white rounded-2xl border border-slate-100 p-6">
          <h2 className="text-sm font-semibold text-slate-700 mb-4">Visibility</h2>
          <div className="grid grid-cols-2 gap-3">
            <label className="flex items-start gap-3 p-4 border border-slate-200 rounded-xl cursor-pointer has-checked:border-slate-900 has-checked:bg-slate-50 transition-colors">
              <input type="radio" name="status" value="DRAFT" defaultChecked className="mt-0.5 accent-slate-900" />
              <div>
                <p className="text-sm font-medium text-slate-800">Save as draft</p>
                <p className="text-xs text-slate-400 mt-0.5">Hidden from customers</p>
              </div>
            </label>
            <label className="flex items-start gap-3 p-4 border border-slate-200 rounded-xl cursor-pointer has-checked:border-slate-900 has-checked:bg-slate-50 transition-colors">
              <input type="radio" name="status" value="ACTIVE" className="mt-0.5 accent-slate-900" />
              <div>
                <p className="text-sm font-medium text-slate-800">Publish now</p>
                <p className="text-xs text-slate-400 mt-0.5">Live on your store</p>
              </div>
            </label>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Link
            href="/dashboard/products"
            className="flex-1 text-center border border-slate-200 text-slate-700 px-4 py-3 rounded-xl text-sm font-medium hover:bg-slate-50 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="flex-1 bg-slate-900 text-white px-4 py-3 rounded-xl text-sm font-semibold hover:bg-slate-700 transition-colors"
          >
            Save product
          </button>
        </div>
      </form>
    </div>
  );
}

import Link from "next/link";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { ProductStatus } from "@/generated/prisma/client";
import { setProductStatus, deleteProduct } from "@/app/actions/product";

export const metadata = { title: "Products — ClientFlow" };

const STATUS_BADGE: Record<ProductStatus, string> = {
  DRAFT:        "bg-slate-100 text-slate-500",
  ACTIVE:       "bg-emerald-50 text-emerald-700",
  OUT_OF_STOCK: "bg-amber-50 text-amber-700",
  ARCHIVED:     "bg-red-50 text-red-600",
};

const STATUS_LABEL: Record<ProductStatus, string> = {
  DRAFT:        "Draft",
  ACTIVE:       "Active",
  OUT_OF_STOCK: "Out of stock",
  ARCHIVED:     "Archived",
};

function naira(n: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  }).format(n);
}

export default async function ProductsPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const vendor = await prisma.vendor.findUnique({ where: { userId: session.user.id } });
  if (!vendor) redirect("/onboarding");

  const products = await prisma.product.findMany({
    where: { vendorId: vendor.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-5 sm:p-8 max-w-5xl mx-auto">

      {/* Header */}
      <div className="flex items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Products</h1>
          <p className="text-sm text-slate-400 mt-1">
            {products.length} product{products.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Link
          href="/dashboard/products/new"
          className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2.5 rounded-xl text-sm font-medium hover:bg-slate-700 transition-colors shrink-0"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add product
        </Link>
      </div>

      {/* Empty state */}
      {products.length === 0 && (
        <div className="bg-white rounded-2xl border border-dashed border-slate-200 px-8 py-20 text-center">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
            <svg className="w-6 h-6 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
            </svg>
          </div>
          <p className="text-sm font-medium text-slate-700 mb-1">No products yet</p>
          <p className="text-xs text-slate-400 mb-6">Add your first product to start selling.</p>
          <Link
            href="/dashboard/products/new"
            className="inline-block bg-slate-900 text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-slate-700 transition-colors"
          >
            Add your first product
          </Link>
        </div>
      )}

      {/* Products list */}
      {products.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden">
          <div className="divide-y divide-slate-50">
            {products.map((product) => {
              const activate   = setProductStatus.bind(null, product.id, ProductStatus.ACTIVE);
              const deactivate = setProductStatus.bind(null, product.id, ProductStatus.DRAFT);
              const remove     = deleteProduct.bind(null, product.id);

              return (
                <div key={product.id} className="px-5 py-4 flex items-center gap-4">
                  {/* Thumbnail */}
                  <div className="w-12 h-12 rounded-xl bg-slate-100 shrink-0 overflow-hidden">
                    {product.images[0] ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate">{product.title}</p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {naira(Number(product.price))}
                      {product.stockCount != null && (
                        <span className="ml-2">{product.stockCount} in stock</span>
                      )}
                    </p>
                  </div>

                  {/* Status badge */}
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-full shrink-0 ${STATUS_BADGE[product.status]}`}>
                    {STATUS_LABEL[product.status]}
                  </span>

                  {/* Action buttons */}
                  <div className="flex items-center gap-1 shrink-0">
                    {product.status !== "ACTIVE" ? (
                      <form action={activate}>
                        <button
                          type="submit"
                          className="text-xs font-medium text-emerald-600 hover:text-emerald-800 px-2.5 py-1.5 rounded-lg hover:bg-emerald-50 transition-colors"
                        >
                          Activate
                        </button>
                      </form>
                    ) : (
                      <form action={deactivate}>
                        <button
                          type="submit"
                          className="text-xs font-medium text-slate-500 hover:text-slate-700 px-2.5 py-1.5 rounded-lg hover:bg-slate-50 transition-colors"
                        >
                          Deactivate
                        </button>
                      </form>
                    )}
                    <form action={remove}>
                      <button
                        type="submit"
                        className="text-xs font-medium text-red-400 hover:text-red-600 px-2.5 py-1.5 rounded-lg hover:bg-red-50 transition-colors"
                      >
                        Delete
                      </button>
                    </form>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

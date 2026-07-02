import { prisma } from "@/lib/prisma";
import { ProductStatus } from "@/generated/prisma/client";
import { adminArchiveProduct, adminRestoreProduct } from "@/app/actions/admin";

export const dynamic = "force-dynamic";
export const metadata = { title: "Products — Admin" };

const STATUS_COLOR: Record<ProductStatus, string> = {
  DRAFT:        "text-slate-400 bg-slate-800",
  ACTIVE:       "text-emerald-300 bg-emerald-900/40",
  OUT_OF_STOCK: "text-amber-300 bg-amber-900/40",
  ARCHIVED:     "text-red-300 bg-red-900/40",
};

function naira(n: number) {
  return new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", minimumFractionDigits: 0 }).format(n);
}

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string }>;
}) {
  const { q, status } = await searchParams;

  const validStatuses: ProductStatus[] = ["DRAFT", "ACTIVE", "OUT_OF_STOCK", "ARCHIVED"];
  const statusFilter = validStatuses.includes(status as ProductStatus) ? (status as ProductStatus) : undefined;

  const products = await prisma.product.findMany({
    where: {
      ...(statusFilter ? { status: statusFilter } : {}),
      ...(q ? { OR: [
        { title:       { contains: q, mode: "insensitive" } },
        { description: { contains: q, mode: "insensitive" } },
      ]} : {}),
    },
    include: {
      vendor: { select: { businessName: true, username: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 100,
  }).catch(() => []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const counts = await prisma.product.groupBy({ by: ["status"], _count: { id: true } }).catch(() => [] as any[]);
  const countMap: Record<string, number> = {};
  for (const c of counts) countMap[c.status] = c._count.id;
  const total = Object.values(countMap).reduce((a, b) => a + b, 0);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Products</h1>
          <p className="text-sm text-slate-400 mt-1">{total.toLocaleString()} total</p>
        </div>
        <form method="GET" action="/admin/products" className="flex gap-2">
          {statusFilter && <input type="hidden" name="status" value={statusFilter} />}
          <input
            name="q"
            type="search"
            defaultValue={q}
            placeholder="Search products…"
            className="bg-slate-800 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-500 w-52"
          />
        </form>
      </div>

      {/* Status tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        {[undefined, ...validStatuses].map((s) => {
          const count   = s ? (countMap[s] ?? 0) : total;
          const isActive = statusFilter === s;
          const href    = s ? `/admin/products?status=${s}${q ? `&q=${encodeURIComponent(q)}` : ""}` : `/admin/products${q ? `?q=${encodeURIComponent(q)}` : ""}`;
          return (
            <a
              key={s ?? "all"}
              href={href}
              className={`shrink-0 text-xs font-medium px-3.5 py-2 rounded-full border transition-colors ${
                isActive
                  ? "bg-white text-slate-900 border-white"
                  : "text-slate-400 border-slate-700 hover:border-slate-500"
              }`}
            >
              {s ?? "All"} ({count})
            </a>
          );
        })}
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="hidden sm:grid grid-cols-12 gap-4 px-5 py-3 border-b border-slate-800 bg-slate-950/40">
          <p className="col-span-5 text-xs text-slate-500 uppercase tracking-wider">Product</p>
          <p className="col-span-2 text-xs text-slate-500 uppercase tracking-wider">Vendor</p>
          <p className="col-span-2 text-xs text-slate-500 uppercase tracking-wider text-right">Price</p>
          <p className="col-span-1 text-xs text-slate-500 uppercase tracking-wider">Status</p>
          <p className="col-span-2 text-xs text-slate-500 uppercase tracking-wider text-right">Actions</p>
        </div>

        <div className="divide-y divide-slate-800/60">
          {products.map((product) => (
            <div key={product.id} className="px-5 py-4 grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4 items-center">
              <div className="sm:col-span-5 flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-lg bg-slate-800 shrink-0 overflow-hidden">
                  {product.images[0] ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={product.images[0]} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-600 text-xs">—</div>
                  )}
                </div>
                <p className="text-sm text-white truncate">{product.title}</p>
              </div>

              <div className="sm:col-span-2 min-w-0">
                <p className="text-xs text-slate-400 truncate">{product.vendor.businessName}</p>
              </div>

              <p className="sm:col-span-2 text-sm font-semibold text-white text-right tabular-nums">
                {naira(Number(product.price))}
              </p>

              <div className="sm:col-span-1">
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-md ${STATUS_COLOR[product.status]}`}>
                  {product.status === "OUT_OF_STOCK" ? "OOS" : product.status}
                </span>
              </div>

              <div className="sm:col-span-2 flex justify-end gap-2">
                {product.status !== "ARCHIVED" ? (
                  <form action={adminArchiveProduct.bind(null, product.id)}>
                    <button type="submit" className="text-xs text-red-400 hover:text-red-300 px-2.5 py-1.5 rounded-lg hover:bg-red-900/30 transition-colors">
                      Remove
                    </button>
                  </form>
                ) : (
                  <form action={adminRestoreProduct.bind(null, product.id)}>
                    <button type="submit" className="text-xs text-emerald-400 hover:text-emerald-300 px-2.5 py-1.5 rounded-lg hover:bg-emerald-900/30 transition-colors">
                      Restore
                    </button>
                  </form>
                )}
              </div>
            </div>
          ))}
          {products.length === 0 && (
            <p className="px-6 py-12 text-center text-sm text-slate-500">No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

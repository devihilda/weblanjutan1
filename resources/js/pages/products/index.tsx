import { Head, Link, router, usePage } from "@inertiajs/react";
import { useMemo, useState } from "react";

interface SuratItem {
    id: number | string;
    kode_surat?: string;
    jenis_surat?: string;
    penandatangan?: string;
    status?: string;
    kategori?: string;
    s_url?: string;
    e_url?: string;
    d_url?: string;
    item_name?: string;
    category?: string;
    condition?: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginationMeta {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number | null;
    to: number | null;
    links: PaginationLink[];
}

export default function ProductIndex({
    products,
    pagination,
    filter,
    c_url,
    totalProducts,
}: any) {
    const [search, setSearch] = useState(filter?.search ?? "");
    const [selectedCategory, setSelectedCategory] = useState("ALL");
    const pageProps: any = usePage().props;
    const flash = pageProps?.flash || {};

    const paginationData: PaginationMeta | null = useMemo(() => {
        if (pagination && typeof pagination === "object") {
            return pagination;
        }
        if (products && Array.isArray(products.links)) {
            return {
                current_page: products.current_page ?? 1,
                last_page: products.last_page ?? 1,
                per_page: products.per_page ?? 10,
                total: products.total ?? 0,
                from: products.from ?? null,
                to: products.to ?? null,
                links: products.links.map((l: any) => ({
                    url: l.url,
                    label: String(l.label ?? "")
                        .replace(/<[^>]*>/g, "")
                        .trim(),
                    active: Boolean(l.active),
                })),
            };
        }
        return null;
    }, [pagination, products]);

    const suratList: SuratItem[] = useMemo(() => {
        const rawList: any[] = Array.isArray(products?.data)
            ? products.data
            : Array.isArray(products)
              ? products
              : [];

        return rawList.map((item, idx) => {
            const itemId = item.id ?? idx + 1;
            return {
                id: itemId,
                kode_surat:
                    item.kode_surat ?? item.category ?? `SRT-0${idx + 1}`,
                jenis_surat:
                    item.jenis_surat ?? item.item_name ?? "Jenis Surat",
                penandatangan: item.penandatangan ?? "Kasubag Kepegawaian",
                status: item.status ?? item.condition ?? "Aktif",
                kategori: item.kategori ?? item.category ?? "Umum",
                s_url: item.s_url ?? `/products/${itemId}`,
                e_url: item.e_url ?? `/products/${itemId}/edit`,
                d_url: item.d_url ?? `/products/${itemId}`,
            };
        });
    }, [products]);

    const categories = useMemo(() => {
        const set = new Set(
            suratList.map((s) => s.kategori || "Umum").filter(Boolean),
        );
        return ["ALL", ...Array.from(set)];
    }, [suratList]);

    const filteredSurat = useMemo(() => {
        return suratList.filter((item) => {
            const matchSearch =
                !search.trim() ||
                (item.kode_surat ?? "")
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                (item.jenis_surat ?? "")
                    .toLowerCase()
                    .includes(search.toLowerCase()) ||
                (item.penandatangan ?? "")
                    .toLowerCase()
                    .includes(search.toLowerCase());

            const matchCat =
                selectedCategory === "ALL" ||
                (item.kategori ?? "Umum") === selectedCategory;

            return matchSearch && matchCat;
        });
    }, [suratList, search, selectedCategory]);

    const displayTotal =
        typeof totalProducts === "number"
            ? totalProducts
            : typeof paginationData?.total === "number"
              ? paginationData.total
              : filteredSurat.length;

    const startNumber =
        typeof paginationData?.from === "number" && paginationData.from > 0
            ? paginationData.from
            : 1;

    const handleSearchChange = (value: string) => {
        setSearch(value);
        if (c_url) {
            router.get(
                c_url,
                { search: value },
                { preserveState: true, replace: true },
            );
        }
    };

    const handleDelete = (item: SuratItem) => {
        const targetUrl = item.d_url || `/products/${item.id}`;
        if (window.confirm(`Hapus data surat "${item.jenis_surat}"?`)) {
            router.delete(targetUrl, {
                preserveScroll: true,
            });
        }
    };

    const formatPageLabel = (label: string) => {
        if (label.includes("Previous") || label.includes("&laquo;")) {
            return "Sebelumnya";
        }
        if (label.includes("Next") || label.includes("&raquo;")) {
            return "Berikutnya";
        }
        return label;
    };

    return (
        <div className="relative z-10 flex h-full flex-1 flex-col gap-4 p-6 bg-slate-50 min-h-screen">
            <Head title="Manajemen Surat" />

            {flash?.message && (
                <div className="p-4 rounded-lg bg-emerald-100 text-emerald-800 text-sm shadow-sm">
                    {flash.message}
                </div>
            )}

            {/* Header Judul */}
            <div className="flex flex-wrap justify-between items-center gap-3 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <div>
                    <h1 className="text-xl font-bold text-slate-800">
                        Manajemen Surat
                    </h1>
                    <p className="text-xs text-slate-500 mt-0.5">
                        SIPENA - Pengadilan Negeri Banjar Kelas II
                    </p>
                </div>
                <Link
                    href="/products/create"
                    className="inline-flex items-center bg-black hover:bg-black text-white text-sm font-medium px-4 py-2 rounded-lg shadow-xs transition"
                >
                    + Tambah Jenis Surat
                </Link>
            </div>

            {/* Container Utama Tabel */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                {/* Baris Search & Filter */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-6">
                    <div className="w-full sm:w-80">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => handleSearchChange(e.target.value)}
                            placeholder="Cari kode atau jenis surat"
                            className="border border-slate-200 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 p-2.5 rounded-lg text-sm w-full outline-none transition"
                        />
                        <p className="text-xs text-slate-500 mt-1.5">
                            Total Jenis Surat: {displayTotal}
                        </p>
                    </div>

                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="border border-slate-200 focus:border-blue-600 p-2.5 rounded-lg text-sm bg-white text-slate-700 w-full sm:w-60 outline-none"
                    >
                        <option value="ALL">
                            Filter : Semua Kategori Surat
                        </option>
                        {categories
                            .filter((c) => c !== "ALL")
                            .map((cat) => (
                                <option key={cat} value={cat}>
                                    {cat}
                                </option>
                            ))}
                    </select>
                </div>

                {/* Tabel Data Surat */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm border-collapse">
                        <thead>
                            <tr className="bg-slate-100 border-b border-slate-200 text-slate-600 font-semibold">
                                <th className="py-3 px-3 w-14">No</th>
                                <th className="py-3 px-3">Kode Surat</th>
                                <th className="py-3 px-3">Jenis Surat</th>
                                <th className="py-3 px-3">Penandatangan</th>
                                <th className="py-3 px-3">Status</th>
                                <th className="py-3 px-3 text-center">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredSurat.length > 0 ? (
                                filteredSurat.map((item, idx) => {
                                    const showUrl =
                                        item.s_url || `/products/${item.id}`;
                                    const editUrl =
                                        item.e_url ||
                                        `/products/${item.id}/edit`;

                                    return (
                                        <tr
                                            key={item.id}
                                            className="hover:bg-slate-50 transition"
                                        >
                                            <td className="py-3 px-3 text-slate-600">
                                                {startNumber + idx}
                                            </td>
                                            <td className="py-3 px-3 font-medium text-slate-800">
                                                {item.kode_surat}
                                            </td>
                                            <td className="py-3 px-3 text-slate-700">
                                                {item.jenis_surat}
                                            </td>
                                            <td className="py-3 px-3 text-slate-600">
                                                {item.penandatangan}
                                            </td>
                                            <td className="py-3 px-3">
                                                <span className="px-3 py-1 rounded-full text-xs font-semibold text-white bg-emerald-600">
                                                    {item.status || "Aktif"}
                                                </span>
                                            </td>
                                            <td className="py-3 px-3 text-center">
                                                <div className="inline-flex items-center justify-center gap-2">
                                                    <Link
                                                        href={showUrl}
                                                        className="inline-flex items-center bg-sky-600 hover:bg-sky-700 text-white font-medium px-3 py-1.5 rounded-md text-xs transition"
                                                    >
                                                        Detail
                                                    </Link>
                                                    <Link
                                                        href={editUrl}
                                                        className="inline-flex items-center bg-amber-400 hover:bg-amber-500 text-slate-900 font-medium px-3 py-1.5 rounded-md text-xs transition"
                                                    >
                                                        Edit
                                                    </Link>
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleDelete(item)
                                                        }
                                                        className="inline-flex items-center bg-rose-600 hover:bg-rose-700 text-white font-medium px-3 py-1.5 rounded-md text-xs transition cursor-pointer"
                                                    >
                                                        Hapus
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="py-8 text-center text-slate-400 italic"
                                    >
                                        Data surat belum tersedia
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {paginationData && paginationData.last_page > 1 && (
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-4 mt-4 border-t border-slate-100 text-xs text-slate-500">
                        <div>
                            Menampilkan{" "}
                            <span className="font-semibold text-slate-700">
                                {paginationData.from ?? 0}
                            </span>
                            –
                            <span className="font-semibold text-slate-700">
                                {paginationData.to ?? 0}
                            </span>{" "}
                            dari{" "}
                            <span className="font-semibold text-slate-700">
                                {paginationData.total}
                            </span>{" "}
                            data
                        </div>

                        <div className="flex flex-wrap items-center gap-1">
                            {paginationData.links.map((link, idx) => (
                                <button
                                    key={idx}
                                    type="button"
                                    disabled={!link.url || link.active}
                                    onClick={() => {
                                        if (link.url) {
                                            router.get(
                                                link.url,
                                                {},
                                                {
                                                    preserveState: true,
                                                    preserveScroll: true,
                                                },
                                            );
                                        }
                                    }}
                                    className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition ${
                                        link.active
                                            ? "bg-blue-700 text-white border-blue-700"
                                            : link.url
                                              ? "bg-white text-slate-700 border-slate-200 hover:bg-slate-50 cursor-pointer"
                                              : "bg-slate-50 text-slate-300 border-slate-100 cursor-not-allowed"
                                    }`}
                                >
                                    {formatPageLabel(link.label)}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

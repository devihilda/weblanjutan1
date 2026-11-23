import { Head, useForm, Link } from "@inertiajs/react";
import { useEffect } from "react";

function buildAutoTemplate(
    kodeSurat: string,
    jenisSurat: string,
    penandatangan: string,
): string {
    const judul = (jenisSurat || "SURAT KETERANGAN").toUpperCase();
    const kode = kodeSurat || "W11.U23/ ... /XI/2026";
    const penanda = penandatangan || "Pejabat Penandatangan";

    return `PENGADILAN NEGERI BANJAR KELAS II
Jl. Kantor Pos No. 48, Banjar, Jawa Barat

${judul}
Nomor: ${kode}

Diberikan kepada pegawai di lingkungan Pengadilan Negeri Banjar Kelas II:
Nama        : {{nama_pegawai}}
NIP         : {{nip_pegawai}}
Pangkat/Gol : {{pangkat_golongan}}
Jabatan     : {{jabatan}}

Keperluan / Uraian:
{{uraian_keperluan}}

Ditetapkan di Banjar pada tanggal {{tanggal_surat}}
${penanda},

{{nama_penandatangan}}
NIP. {{nip_penandatangan}}`;
}

export default function ProductEdit({ product }: any) {
    const initialLampiran =
        product?.lampiran_surat && String(product.lampiran_surat).trim() !== ""
            ? String(product.lampiran_surat)
            : buildAutoTemplate(
                  product?.kode_surat ?? "",
                  product?.jenis_surat ?? "",
                  product?.penandatangan ?? "",
              );

    const { data, setData, put, processing, errors } = useForm({
        kode_surat: product?.kode_surat ?? "",
        jenis_surat: product?.jenis_surat ?? "",
        kategori: product?.kategori ?? "Umum",
        penandatangan: product?.penandatangan ?? "",
        status: product?.status ?? "Aktif",
        lampiran_surat: initialLampiran,
    });

    useEffect(() => {
        if (
            !product?.lampiran_surat ||
            String(product.lampiran_surat).trim() === ""
        ) {
            setData(
                "lampiran_surat",
                buildAutoTemplate(
                    data.kode_surat,
                    data.jenis_surat,
                    data.penandatangan,
                ),
            );
        }
    }, [data.kode_surat, data.jenis_surat, data.penandatangan]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/products/${product.id}`);
    };

    return (
        <div className="p-8 max-w-2xl mx-auto bg-white rounded-xl shadow-sm border border-slate-200 my-6">
            <Head title="Edit Jenis Surat" />
            <div className="mb-6">
                <h1 className="text-xl font-bold text-slate-800">
                    Edit Jenis Surat
                </h1>
                <p className="text-xs text-slate-500 mt-0.5">
                    SIPENA - Pengadilan Negeri Banjar Kelas II
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                        Kode Surat
                    </label>
                    <input
                        type="text"
                        value={data.kode_surat}
                        onChange={(e) => setData("kode_surat", e.target.value)}
                        className="w-full border border-slate-200 p-2.5 rounded-lg text-sm outline-none focus:border-blue-600"
                        placeholder="Contoh: CT-THN, SIK-KTR, SIB-S2, ST-DIN"
                    />
                    {errors.kode_surat && (
                        <span className="text-rose-600 text-xs mt-1 block">
                            {errors.kode_surat}
                        </span>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                        Jenis Surat
                    </label>
                    <input
                        type="text"
                        value={data.jenis_surat}
                        onChange={(e) => setData("jenis_surat", e.target.value)}
                        className="w-full border border-slate-200 p-2.5 rounded-lg text-sm outline-none focus:border-blue-600"
                        placeholder="Contoh: Surat Cuti Tahunan"
                    />
                    {errors.jenis_surat && (
                        <span className="text-rose-600 text-xs mt-1 block">
                            {errors.jenis_surat}
                        </span>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                        Kategori Surat
                    </label>
                    <input
                        type="text"
                        value={data.kategori}
                        onChange={(e) => setData("kategori", e.target.value)}
                        className="w-full border border-slate-200 p-2.5 rounded-lg text-sm outline-none focus:border-blue-600"
                        placeholder="Contoh: Kepegawaian / Umum"
                    />
                    {errors.kategori && (
                        <span className="text-rose-600 text-xs mt-1 block">
                            {errors.kategori}
                        </span>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                        Penandatangan
                    </label>
                    <input
                        type="text"
                        value={data.penandatangan}
                        onChange={(e) =>
                            setData("penandatangan", e.target.value)
                        }
                        className="w-full border border-slate-200 p-2.5 rounded-lg text-sm outline-none focus:border-blue-600"
                        placeholder="Contoh: Kasubag Kepegawaian / Ketua Pengadilan Negeri"
                    />
                    {errors.penandatangan && (
                        <span className="text-rose-600 text-xs mt-1 block">
                            {errors.penandatangan}
                        </span>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                        Status
                    </label>
                    <select
                        value={data.status}
                        onChange={(e) => setData("status", e.target.value)}
                        className="w-full border border-slate-200 p-2.5 rounded-lg text-sm outline-none focus:border-blue-600 bg-white"
                    >
                        <option value="Aktif">Aktif</option>
                        <option value="Tidak Aktif">Tidak Aktif</option>
                    </select>
                    {errors.status && (
                        <span className="text-rose-600 text-xs mt-1 block">
                            {errors.status}
                        </span>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                        Lampiran / Format Isi Template Surat
                    </label>
                    <textarea
                        rows={12}
                        value={data.lampiran_surat}
                        onChange={(e) =>
                            setData("lampiran_surat", e.target.value)
                        }
                        className="w-full border border-slate-200 p-3 rounded-lg text-xs font-mono leading-relaxed outline-none focus:border-blue-600 bg-slate-50/60"
                        placeholder="Format isi template surat..."
                    />
                    <p className="text-[11px] text-slate-400 mt-1">
                        Jika belum ada isi tersimpan di database, format
                        otomatis disusun dari kode, jenis surat, dan
                        penandatangan; kamu tetap bisa mengeditnya manual
                        sebelum simpan.
                    </p>
                    {errors.lampiran_surat && (
                        <span className="text-rose-600 text-xs mt-1 block">
                            {errors.lampiran_surat}
                        </span>
                    )}
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                    <Link
                        href="/products"
                        className="text-sm text-slate-600 hover:text-slate-900 font-medium"
                    >
                        Kembali
                    </Link>
                    <button
                        type="submit"
                        disabled={processing}
                        className="bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium px-5 py-2.5 rounded-lg shadow transition disabled:opacity-60"
                    >
                        {processing ? "Menyimpan..." : "Simpan"}
                    </button>
                </div>
            </form>
        </div>
    );
}

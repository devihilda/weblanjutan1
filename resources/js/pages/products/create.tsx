import { Head, useForm, Link } from "@inertiajs/react";

export default function ProductCreate() {
    const { data, setData, post, processing, errors } = useForm({
        kode_surat: "",
        jenis_surat: "",
        penandatangan: "",
        status: "Aktif",
        lampiran_surat: "",
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post("/products");
    };

    return (
        <div className="p-8 max-w-2xl mx-auto bg-white rounded-xl shadow-sm border border-slate-200 my-6">
            <Head title="Tambah Jenis Surat" />
            <div className="mb-6">
                <h1 className="text-xl font-bold text-slate-800">
                    Tambah Jenis Surat
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
                        rows={10}
                        value={data.lampiran_surat}
                        onChange={(e) =>
                            setData("lampiran_surat", e.target.value)
                        }
                        className="w-full border border-slate-200 p-3 rounded-lg text-xs font-mono leading-relaxed outline-none focus:border-blue-600 bg-slate-50/60"
                        placeholder="Masukkan format isi template surat yang akan ditampilkan pada detail..."
                    />
                    <p className="text-[11px] text-slate-400 mt-1">
                        Gunakan placeholder seperti {"{{nama_pegawai}}"},{" "}
                        {"{{nip_pegawai}}"}, {"{{jabatan}}"},{" "}
                        {"{{tanggal_surat}}"} bila diperlukan.
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
                        className="bg-blue-700 hover:bg-blue-800 text-white text-sm font-medium px-5 py-2.5 rounded-lg shadow-xs transition disabled:opacity-60"
                    >
                        {processing ? "Menyimpan..." : "Simpan"}
                    </button>
                </div>
            </form>
        </div>
    );
}

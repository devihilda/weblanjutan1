import { Head, Link } from "@inertiajs/react";
import { useState } from "react";

interface SuratTemplateData {
    nomorSurat: string;
    tanggalSurat: string;
    perihal: string;
    tujuan: string;
    pembuka: string;
    paragrafIsi: string;
    penutup: string;
}

function buildSuratContent(
    kodeSurat: string,
    jenisSurat: string,
    penandatangan: string,
    isSample: boolean,
): SuratTemplateData {
    const kode = kodeSurat.toUpperCase();
    const nama = jenisSurat.toLowerCase();

    if (kode.includes("CT") || nama.includes("cuti")) {
        return {
            nomorSurat: isSample
                ? "0295/W11.U23/KP.05.2/XI/2026"
                : "{{nomor_surat}}",
            tanggalSurat: isSample
                ? "Banjar, 21 November 2026"
                : "Banjar, {{tanggal_surat}}",
            perihal: jenisSurat,
            tujuan: isSample
                ? "Yth. Ketua Pengadilan Negeri Banjar Kelas II\ndi\nBanjar"
                : "{{tujuan_surat}}",
            pembuka:
                "Diberikan izin cuti tahunan untuk tahun 2026 kepada pegawai di lingkungan Pengadilan Negeri Banjar Kelas II:",
            paragrafIsi: isSample
                ? "Selama 5 (lima) hari kerja, terhitung mulai tanggal 23 November 2026 s.d. 27 November 2026, dengan ketentuan selama menjalankan cuti wajib menyerahkan pekerjaan kepada atasan langsung."
                : "Selama {{lama_cuti}} hari kerja, terhitung mulai tanggal {{tanggal_mulai}} s.d. {{tanggal_selesai}}, dengan ketentuan selama menjalankan cuti wajib menyerahkan pekerjaan kepada atasan langsung.",
            penutup:
                "Demikian surat izin cuti ini dibuat untuk dipergunakan sebagaimana mestinya.",
        };
    }

    if (kode.includes("SIK") || nama.includes("keluar")) {
        return {
            nomorSurat: isSample
                ? "0118/W11.U23/KP.05.1/XI/2026"
                : "{{nomor_surat}}",
            tanggalSurat: isSample
                ? "Banjar, 21 November 2026"
                : "Banjar, {{tanggal_surat}}",
            perihal: jenisSurat,
            tujuan: isSample
                ? "Yth. Atasan Langsung / Bagian Kepegawaian\ndi\nBanjar"
                : "{{tujuan_surat}}",
            pembuka:
                "Yang bertanda tangan di bawah ini memberikan izin keluar kantor pada jam kerja kepada pegawai:",
            paragrafIsi: isSample
                ? "Untuk keperluan dinas/administrasi pada hari Sabtu, tanggal 21 November 2026, pukul 09.00 WIB s.d. 11.00 WIB."
                : "Untuk keperluan {{keperluan}} pada hari {{hari}}, tanggal {{tanggal}}, pukul {{jam_mulai}} WIB s.d. {{jam_selesai}} WIB.",
            penutup:
                "Demikian izin keluar kantor ini diberikan untuk dilaksanakan dengan penuh tanggung jawab.",
        };
    }

    if (kode.includes("SIB") || nama.includes("belajar")) {
        return {
            nomorSurat: isSample
                ? "0042/W11.U23/KP.04.2/XI/2026"
                : "{{nomor_surat}}",
            tanggalSurat: isSample
                ? "Banjar, 21 November 2026"
                : "Banjar, {{tanggal_surat}}",
            perihal: jenisSurat,
            tujuan: isSample
                ? "Yth. Pegawai Bersangkutan\ndi\nBanjar"
                : "{{tujuan_surat}}",
            pembuka:
                "Berdasarkan permohonan dan pertimbangan kebutuhan organisasi, diberikan izin belajar kepada:",
            paragrafIsi: isSample
                ? "Untuk mengikuti pendidikan program Strata Satu (S1) pada Universitas Galuh di luar jam kerja dinas tanpa mengganggu pelaksanaan tugas kedinasan."
                : "Untuk mengikuti pendidikan program {{jenjang_program}} pada {{nama_institusi}} di luar jam kerja dinas tanpa mengganggu pelaksanaan tugas kedinasan.",
            penutup:
                "Demikian surat izin belajar ini ditetapkan untuk dipatuhi sebagaimana mestinya.",
        };
    }

    if (kode.includes("ST") || nama.includes("tugas")) {
        return {
            nomorSurat: isSample
                ? "0310/W11.U23/ST/XI/2026"
                : "{{nomor_surat}}",
            tanggalSurat: isSample
                ? "Banjar, 21 November 2026"
                : "Banjar, {{tanggal_surat}}",
            perihal: jenisSurat,
            tujuan: isSample
                ? "Yth. Pegawai yang Ditugaskan\ndi\nBanjar"
                : "{{tujuan_surat}}",
            pembuka:
                "Dalam rangka melaksanakan tugas kedinasan, dengan ini menugaskan kepada pegawai:",
            paragrafIsi: isSample
                ? "Untuk melaksanakan tugas koordinasi dan administrasi kepegawaian bertempat di Pengadilan Tinggi Bandung pada tanggal 24 November 2026 s.d. 25 November 2026."
                : "Untuk melaksanakan tugas {{uraian_tugas}} bertempat di {{lokasi_tujuan}} pada tanggal {{tanggal_mulai}} s.d. {{tanggal_selesai}}.",
            penutup:
                "Demikian surat tugas ini dibuat untuk dilaksanakan dengan sebaik-baiknya dan melaporkan hasilnya.",
        };
    }

    return {
        nomorSurat: isSample
            ? `0100/W11.U23/${kode || "SRT"}/XI/2026`
            : "{{nomor_surat}}",
        tanggalSurat: isSample
            ? "Banjar, 21 November 2026"
            : "Banjar, {{tanggal_surat}}",
        perihal: jenisSurat,
        tujuan: isSample
            ? "Yth. Pegawai Bersangkutan\ndi\nBanjar"
            : "{{tujuan_surat}}",
        pembuka: `Dengan ini menerangkan bahwa ${jenisSurat} diterbitkan untuk pegawai:`,
        paragrafIsi: isSample
            ? "Untuk keperluan administrasi kepegawaian pada tanggal 21 November 2026 sesuai ketentuan yang berlaku."
            : "Untuk keperluan {{keterangan_pengajuan}} pada tanggal {{tanggal_pengajuan}} sesuai ketentuan yang berlaku.",
        penutup:
            "Demikian surat ini dibuat untuk dipergunakan sebagaimana mestinya.",
    };
}

export default function ProductShow({ product }: any) {
    const [mode, setMode] = useState<"mentahan" | "contoh">("mentahan");

    const kodeSurat = product?.kode_surat ?? product?.category ?? "-";
    const jenisSurat =
        product?.jenis_surat ?? product?.item_name ?? "Jenis Surat";
    const penandatangan =
        product?.penandatangan ?? product?.description ?? "Kasubag Kepegawaian";
    const status = product?.status ?? product?.condition ?? "Aktif";

    const isSample = mode === "contoh";
    const doc = buildSuratContent(
        kodeSurat,
        jenisSurat,
        penandatangan,
        isSample,
    );

    const biodataRows = [
        {
            label: "Nama",
            value: isSample ? "Rania Pratiwi, S.H." : "{{nama_pegawai}}",
        },
        {
            label: "NIP",
            value: isSample ? "199605122022032004" : "{{nip_pegawai}}",
        },
        {
            label: "Pangkat / Gol.",
            value: isSample ? "Penata Muda / III.a" : "{{pangkat_golongan}}",
        },
        {
            label: "Jabatan",
            value: isSample ? "Analis Perkara Peradilan" : "{{jabatan}}",
        },
        {
            label: "Unit Kerja",
            value: "Pengadilan Negeri Banjar Kelas II",
        },
    ];

    return (
        <div className="p-6 max-w-5xl mx-auto space-y-4">
            <Head title={`Detail Surat - ${jenisSurat}`} />

            {/* Header Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <div>
                    <h1 className="text-xl font-bold text-slate-800">
                        Detail & Format Template Surat
                    </h1>
                    <p className="text-xs text-slate-500 mt-0.5">
                        SIPENA - Pengadilan Negeri Banjar Kelas II
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                    <button
                        type="button"
                        onClick={() => setMode("mentahan")}
                        className={`px-3.5 py-2 rounded-lg text-xs font-medium transition cursor-pointer ${
                            mode === "mentahan"
                                ? "bg-blue-700 text-white"
                                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                    >
                        Mentahan Admin
                    </button>
                    <button
                        type="button"
                        onClick={() => setMode("contoh")}
                        className={`px-3.5 py-2 rounded-lg text-xs font-medium transition cursor-pointer ${
                            mode === "contoh"
                                ? "bg-blue-700 text-white"
                                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                    >
                        Preview Terisi
                    </button>
                    <Link
                        href={product?.e_url ?? `/products/${product?.id}/edit`}
                        className="inline-flex items-center bg-amber-400 hover:bg-amber-500 text-slate-900 font-medium px-4 py-2 rounded-lg text-xs transition"
                    >
                        Edit Surat
                    </Link>
                    <Link
                        href="/products"
                        className="inline-flex items-center bg-slate-800 hover:bg-slate-900 text-white font-medium px-4 py-2 rounded-lg text-xs transition"
                    >
                        Kembali
                    </Link>
                </div>
            </div>

            {/* Ringkasan Master Jenis Surat */}
            <div className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                <div>
                    <span className="text-xs text-slate-400 block">
                        Kode Surat
                    </span>
                    <span className="font-semibold text-slate-800">
                        {kodeSurat}
                    </span>
                </div>
                <div>
                    <span className="text-xs text-slate-400 block">
                        Jenis Surat
                    </span>
                    <span className="font-semibold text-slate-800">
                        {jenisSurat}
                    </span>
                </div>
                <div>
                    <span className="text-xs text-slate-400 block">
                        Penandatangan & Status
                    </span>
                    <span className="font-semibold text-slate-800">
                        {penandatangan} •{" "}
                        <span className="text-emerald-600">{status}</span>
                    </span>
                </div>
            </div>

            {/* Lembaran Format Surat Resmi */}
            <div className="bg-slate-100 p-4 sm:p-8 rounded-xl border border-slate-200">
                <div className="bg-white max-w-3xl mx-auto p-6 sm:p-10 shadow-sm border border-slate-300 font-serif text-slate-900 text-sm leading-relaxed">
                    {/* Kop Surat Resmi */}
                    <div className="flex items-center gap-4 border-b-4 border-double border-slate-900 pb-4 mb-6">
                        <div className="h-16 w-16 shrink-0 rounded-full border-2 border-slate-800 flex items-center justify-center text-[10px] font-sans font-bold text-center leading-tight px-1">
                            MA / PN BANJAR
                        </div>
                        <div className="flex-1 text-center">
                            <p className="text-xs font-bold uppercase tracking-wide">
                                MAHKAMAH AGUNG REPUBLIK INDONESIA
                            </p>
                            <p className="text-xs font-bold uppercase">
                                DIREKTORAT JENDERAL BADAN PERADILAN UMUM
                            </p>
                            <p className="text-base font-bold uppercase mt-0.5">
                                PENGADILAN NEGERI BANJAR KELAS II
                            </p>
                            <p className="text-[11px] font-sans text-slate-600 mt-0.5">
                                Jl. Kantor Pos No. 48, Kota Banjar, Jawa Barat
                                46311
                            </p>
                        </div>
                    </div>

                    {/* Nomor & Tanggal Sejajar Kiri-Kanan */}
                    <div className="flex flex-col sm:flex-row sm:justify-between gap-2 mb-5 text-xs sm:text-sm">
                        <div className="space-y-1">
                            <div className="flex gap-2">
                                <span className="w-16">Nomor</span>
                                <span>:</span>
                                <span
                                    className={
                                        mode === "mentahan"
                                            ? "font-sans text-xs font-semibold text-blue-700"
                                            : "font-medium"
                                    }
                                >
                                    {doc.nomorSurat}
                                </span>
                            </div>
                            <div className="flex gap-2">
                                <span className="w-16">Hal</span>
                                <span>:</span>
                                <span className="font-semibold">
                                    {doc.perihal}
                                </span>
                            </div>
                        </div>
                        <div className="sm:text-right">
                            <span
                                className={
                                    mode === "mentahan"
                                        ? "font-sans text-xs font-semibold text-blue-700"
                                        : ""
                                }
                            >
                                {doc.tanggalSurat}
                            </span>
                        </div>
                    </div>

                    {/* Tujuan Surat */}
                    <div className="mb-5 whitespace-pre-line">
                        <span
                            className={
                                mode === "mentahan"
                                    ? "font-sans text-xs font-semibold text-blue-700"
                                    : ""
                            }
                        >
                            {doc.tujuan}
                        </span>
                    </div>

                    {/* Pembuka & Data Pegawai */}
                    <p className="mb-3">{doc.pembuka}</p>

                    <table className="w-full text-sm mb-4">
                        <tbody>
                            {biodataRows.map((row) => {
                                const isPlaceholder =
                                    row.value.startsWith("{{");
                                return (
                                    <tr key={row.label}>
                                        <td className="w-36 py-1 align-top">
                                            {row.label}
                                        </td>
                                        <td className="w-4 py-1 align-top">
                                            :
                                        </td>
                                        <td
                                            className={`py-1 align-top ${
                                                isPlaceholder
                                                    ? "font-sans text-xs font-semibold text-blue-700"
                                                    : "font-medium"
                                            }`}
                                        >
                                            {row.value}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                    {/* Isi & Penutup */}
                    <p className="mb-3 text-justify">
                        <span
                            className={
                                mode === "mentahan"
                                    ? "font-sans text-xs font-semibold text-blue-700"
                                    : ""
                            }
                        >
                            {doc.paragrafIsi}
                        </span>
                    </p>
                    <p className="mb-8 text-justify">{doc.penutup}</p>

                    {/* Blok Tanda Tangan */}
                    <div className="flex justify-end">
                        <div className="w-64">
                            <p className="font-semibold">{penandatangan},</p>
                            <div className="h-16" />
                            <p
                                className={`font-bold underline ${
                                    mode === "mentahan"
                                        ? "font-sans text-xs text-blue-700 no-underline"
                                        : ""
                                }`}
                            >
                                {isSample
                                    ? "H. Ahmad Fauzi, S.H., M.H."
                                    : "{{nama_penandatangan}}"}
                            </p>
                            <p
                                className={`text-xs mt-0.5 ${
                                    mode === "mentahan"
                                        ? "font-sans font-semibold text-blue-700"
                                        : ""
                                }`}
                            >
                                NIP.{" "}
                                {isSample
                                    ? "197804102005011002"
                                    : "{{nip_penandatangan}}"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

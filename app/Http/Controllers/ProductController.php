<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $search = trim((string) $request->search);

        $products = Product::query()
            ->when($search !== '', function ($q) use ($search) {
                $q->where(function ($sub) use ($search) {
                    $sub->where('item_name', 'like', "%{$search}%")
                        ->orWhere('category', 'like', "%{$search}%")
                        ->orWhere('description', 'like', "%{$search}%")
                        ->orWhere('condition', 'like', "%{$search}%");
                });
            })
            ->orderBy('id', 'asc')
            ->paginate(5)
            ->withQueryString();

        $totalProducts = Product::query()
            ->when($search !== '', function ($q) use ($search) {
                $q->where(function ($sub) use ($search) {
                    $sub->where('item_name', 'like', "%{$search}%")
                        ->orWhere('category', 'like', "%{$search}%")
                        ->orWhere('description', 'like', "%{$search}%")
                        ->orWhere('condition', 'like', "%{$search}%");
                });
            })
            ->count();

        $mappedItems = $products->getCollection()->map(fn($p) => [
            'id' => $p->id,
            'kode_surat' => $p->kode_surat ?? $p->category ?? '',
            'jenis_surat' => $p->jenis_surat ?? $p->item_name ?? '',
            'penandatangan' => $p->penandatangan ?? $p->description ?? '',
            'status' => $p->status ?? $p->condition ?? 'Aktif',
            'lampiran_surat' => $p->lampiran_surat ?? null,
            's_url' => route('products.show', $p->id),
            'e_url' => route('products.edit', $p->id),
            'd_url' => route('products.destroy', $p->id),
        ])->values();

        return Inertia::render('products/index', [
            'products' => $mappedItems,
            'pagination' => [
                'current_page' => $products->currentPage(),
                'last_page' => $products->lastPage(),
                'per_page' => $products->perPage(),
                'total' => $products->total(),
                'from' => $products->firstItem(),
                'to' => $products->lastItem(),
                'links' => $products->linkCollection()->map(fn($link) => [
                    'url' => $link['url'],
                    'label' => strip_tags((string) $link['label']),
                    'active' => (bool) $link['active'],
                ])->values(),
            ],
            'filter' => ['search' => $search],
            'c_url' => route('products.index'),
            'totalProducts' => $totalProducts,
        ]);
    }

    public function create()
    {
        return Inertia::render('products/create');
    }

    public function store(Request $request)
    {
        $kodeSurat = trim((string) ($request->input('kode_surat') ?? $request->input('category') ?? ''));
        $jenisSurat = trim((string) ($request->input('jenis_surat') ?? $request->input('item_name') ?? ''));
        $penandatangan = trim((string) ($request->input('penandatangan') ?? $request->input('description') ?? ''));
        $status = trim((string) ($request->input('status') ?? $request->input('condition') ?? 'Aktif'));
        $lampiranSurat = $request->input('lampiran_surat');

        $request->merge([
            'kode_surat' => $kodeSurat,
            'jenis_surat' => $jenisSurat,
            'penandatangan' => $penandatangan,
            'status' => $status,
        ]);

        $request->validate([
            'kode_surat' => 'nullable|string|max:255',
            'jenis_surat' => 'required|string|max:255',
            'penandatangan' => 'nullable|string|max:255',
            'status' => 'nullable|string|max:255',
            'lampiran_surat' => 'nullable|string',
        ]);

        $data = [
            'item_name' => $jenisSurat,
            'category' => $kodeSurat,
            'description' => $penandatangan,
            'condition' => $status,
        ];

        if (Schema::hasColumn('products', 'price')) {
            $data['price'] = 0;
        }
        if (Schema::hasColumn('products', 'stock')) {
            $data['stock'] = 1;
        }
        if (Schema::hasColumn('products', 'kode_surat')) {
            $data['kode_surat'] = $kodeSurat;
        }
        if (Schema::hasColumn('products', 'jenis_surat')) {
            $data['jenis_surat'] = $jenisSurat;
        }
        if (Schema::hasColumn('products', 'penandatangan')) {
            $data['penandatangan'] = $penandatangan;
        }
        if (Schema::hasColumn('products', 'status')) {
            $data['status'] = $status;
        }
        if (Schema::hasColumn('products', 'lampiran_surat')) {
            $data['lampiran_surat'] = $lampiranSurat;
        }

        Product::create($data);

        return redirect()->route('products.index')->with('message', 'Jenis surat berhasil ditambahkan.');
    }

    public function show(string $id)
    {
        $p = Product::findOrFail($id);

        return Inertia::render('products/show', [
            'product' => [
                'id' => $p->id,
                'kode_surat' => $p->kode_surat ?? $p->category ?? '',
                'jenis_surat' => $p->jenis_surat ?? $p->item_name ?? '',
                'penandatangan' => $p->penandatangan ?? $p->description ?? '',
                'status' => $p->status ?? $p->condition ?? 'Aktif',
                'lampiran_surat' => $p->lampiran_surat ?? null,
                'e_url' => route('products.edit', $p->id),
            ],
        ]);
    }

    public function edit(string $id)
    {
        $p = Product::findOrFail($id);

        return Inertia::render('products/edit', [
            'product' => [
                'id' => $p->id,
                'kode_surat' => $p->kode_surat ?? $p->category ?? '',
                'jenis_surat' => $p->jenis_surat ?? $p->item_name ?? '',
                'penandatangan' => $p->penandatangan ?? $p->description ?? '',
                'status' => $p->status ?? $p->condition ?? 'Aktif',
                'lampiran_surat' => $p->lampiran_surat ?? '',
            ],
        ]);
    }

    public function update(Request $request, string $id)
    {
        $product = Product::findOrFail($id);

        $kodeSurat = trim((string) ($request->input('kode_surat') ?? $request->input('category') ?? $product->kode_surat ?? $product->category ?? ''));
        $jenisSurat = trim((string) ($request->input('jenis_surat') ?? $request->input('item_name') ?? $product->jenis_surat ?? $product->item_name ?? ''));
        $penandatangan = trim((string) ($request->input('penandatangan') ?? $request->input('description') ?? $product->penandatangan ?? $product->description ?? ''));
        $status = trim((string) ($request->input('status') ?? $request->input('condition') ?? $product->status ?? $product->condition ?? 'Aktif'));
        $lampiranSurat = $request->input('lampiran_surat');

        $request->merge([
            'kode_surat' => $kodeSurat,
            'jenis_surat' => $jenisSurat,
            'penandatangan' => $penandatangan,
            'status' => $status,
        ]);

        $request->validate([
            'kode_surat' => 'nullable|string|max:255',
            'jenis_surat' => 'required|string|max:255',
            'penandatangan' => 'nullable|string|max:255',
            'status' => 'nullable|string|max:255',
            'lampiran_surat' => 'nullable|string',
        ]);

        $data = [
            'item_name' => $jenisSurat,
            'category' => $kodeSurat,
            'description' => $penandatangan,
            'condition' => $status,
        ];

        if (Schema::hasColumn('products', 'kode_surat')) {
            $data['kode_surat'] = $kodeSurat;
        }
        if (Schema::hasColumn('products', 'jenis_surat')) {
            $data['jenis_surat'] = $jenisSurat;
        }
        if (Schema::hasColumn('products', 'penandatangan')) {
            $data['penandatangan'] = $penandatangan;
        }
        if (Schema::hasColumn('products', 'status')) {
            $data['status'] = $status;
        }
        if (Schema::hasColumn('products', 'lampiran_surat')) {
            $data['lampiran_surat'] = $lampiranSurat;
        }

        $product->update($data);

        return redirect()->route('products.index')->with('message', 'Data surat berhasil diperbarui.');
    }

    public function destroy(string $id)
    {
        $product = Product::findOrFail($id);
        $product->delete();

        return redirect()->route('products.index')->with('message', 'Data surat berhasil dihapus.');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'item_name',
        'category',
        'description',
        'condition',
        'kode_surat',
        'jenis_surat',
        'kategori',
        'penandatangan',
        'status',
        'lampiran_surat',
    ];
}

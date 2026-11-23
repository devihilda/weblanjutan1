<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('kode_surat')->nullable();
            $table->string('jenis_surat');
            $table->string('kategori')->nullable()->default('Umum');
            $table->string('penandatangan')->nullable();
            $table->string('status')->nullable()->default('Aktif');
            $table->longText('lampiran_surat')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};

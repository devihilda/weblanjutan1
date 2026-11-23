<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\TestController;
use App\Http\Controllers\UsersController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::get('/sic', function () {
    return '7020230072';
});

Route::get('/ctest', [TestController::class, 'index'])->name('test');

Route::resource('homes', HomeController::class);

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');
    Route::resource('users', UsersController::class);
    Route::resource('products', ProductController::class);
});

require __DIR__ . '/settings.php';

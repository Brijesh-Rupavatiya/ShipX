<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ContactController;

// Contact API Routes
Route::apiResource('contacts', ContactController::class);

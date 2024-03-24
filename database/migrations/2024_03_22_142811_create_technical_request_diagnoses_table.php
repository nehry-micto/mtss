<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // conjunction table
        Schema::create('technical_request_diagnoses', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(
                \App\Models\TechnicalRequest::class,
                'technical_request_id'
            );
            $table->foreignIdFor(
                \App\Models\Diagnosis::class,
                'diagnosis_id'
            )->constrained('diagnoses');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('technical_request_diagnoses');
    }
};

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
        Schema::create('technical_request_recommendations', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(
                \App\Models\TechnicalRequest::class,
                'technical_request_id'
            );
            $table->foreignIdFor(
                \App\Models\TechnicalRequestRecommendation::class,
                'recommendation_id'
            )->constrained('recommendations');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('maintenance_recommendations');
    }
};

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
        Schema::create('technical_request_action_takens', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(
                \App\Models\TechnicalRequest::class,
                'maintenance_id'
            );
            $table->foreignIdFor(
                \App\Models\ActionTaken::class,
                'action_taken_id'
            )->constrained('actions_taken');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('maintenance_action_takens');
    }
};

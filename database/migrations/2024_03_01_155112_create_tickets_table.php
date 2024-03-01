<?php

use App\Models\Client;
use App\Models\Difficulty;
use App\Models\Finding;
use App\Models\User;
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
        Schema::create('tickets', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(User::class, 'user_id');
            $table->foreignIdFor(Client::class, 'client_id');
            $table->foreignIdFor(Difficulty::class, 'difficulty_id');
            $table->string('findings');
            $table->string('action_taken');
            $table->string('recommendations');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tickets');
    }
};

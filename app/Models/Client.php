<?php

namespace App\Models;

use App\Models\Traits\UniqueCode;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Client extends Model
{
    use HasFactory, UniqueCode, SoftDeletes;

    protected $fillable = [
        'first_name',
        'last_name',
        'middle_name',
        'code',
        'email',
        'birth_date',
        'department_id',
    ];

    protected function casts(): array
    {
        return [];
    }

    public function department(): BelongsTo
    {
        return $this->belongsTo(Department::class);
    }

    public function assets(): HasMany
    {
        return $this->hasMany(Asset::class);
    }
}

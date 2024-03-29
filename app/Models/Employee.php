<?php

namespace App\Models;

use App\Models\Traits\UniqueCode;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Employee extends Model
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

    // scope search
    public function scopeSearch(Builder $query, ?string $search)
    {
        return $query->whereAny([
            'first_name',
            'middle_name',
            'last_name',
        ], 'LIKE', '%' . $search . '%');
    }

    public function scopeSort(Builder $query, ?string $column, ?string $direction)
    {
        return $query->when($column, function ($query) use ($column, $direction) {
            return $query->orderBy($column, $direction ?? 'asc');
        });
    }
}

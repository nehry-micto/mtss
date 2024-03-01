<?php

namespace App\Models;

use App\Models\Traits\UniqueCode;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Client extends Model
{
    use HasFactory, UniqueCode, SoftDeletes;

    protected $fillable = [
        'first_name',
        'last_name',
        'code'
    ];

    protected static function booted()
    {
        static::bootGenerateUniqueCode();
    }
}

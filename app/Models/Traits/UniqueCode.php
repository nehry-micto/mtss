<?php

namespace App\Models\Traits;

trait UniqueCode
{
    public static function bootGenerateUniqueCode()
    {
        static::creating(function ($model) {
            $model->code = $this->uniqueCode();
        });
    }

    private function uniqueCode()
    {
        return  strtoupper(base_convert(time(), 10, 36));
    }
}

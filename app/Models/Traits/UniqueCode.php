<?php

namespace App\Models\Traits;

trait UniqueCode
{

    public static function bootGenerateUniqueCode(): void
    {
        static::creating(function ($model) {
            $model->code = (new self)->uniqueCode();
        });
    }

    /*
    * Code Will be based on the department ABBR + First Name and Last Name first letter - 0000 based on increment in the table
    */
    public function uniqueCode(): string
    {
        // get department abbreviation using ID
        $abbr = \App\Models\Department::find($this->department_id)->abbr;
        return $abbr . $this->first_name[0] . $this->last_name[0] . '-' . str_pad($this->id, 4, '0', STR_PAD_LEFT);
    }
}

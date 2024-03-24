<?php

namespace App\Enums;

enum Role: int
{
    case Admin = 1;
    case User = 2;

    public function label(): ?string
    {
        return $this->name;
    }
}

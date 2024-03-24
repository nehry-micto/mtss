<?php

namespace App\Enums;

enum TechnicalRequestLevel: int
{
    case Simple = 1;
    case NotSoComplex = 2;
    case Complex = 3;
    case HighlyComplex = 4;

    public function label(): ?string
    {
        return match ($this) {
            self::Simple => 'Simple',
            self::NotSoComplex => 'Not so complex',
            self::Complex => 'Complex',
            self::HighlyComplex => 'Highly complex',
        };
    }
}

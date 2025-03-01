<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Expense extends Model
{
    use HasFactory;

    protected $fillable = [
        'description',
        'date',
        'amount',
        'user_id',
        'category_id'
    ];
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}

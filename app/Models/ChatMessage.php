<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ChatMessage extends Model
{
    use HasFactory, HasUuids;

    protected $guarded = ['id'];
    protected $hidden = ['deleted_in_id', 'seen_in_id'];

    public const CHAT_TYPE = 'chats';
    public const CHAT_GROUP_TYPE = 'groups_chats';

    public function  from()
    {
        return $this->belongsTo(User::class, 'from_id');
    }

    public function  to()
    {
        return $this->morphTo();
    }

    /**
     * Bootstrap the model and its traits.
     *
     * @return void
     */
    protected static function boot()
    {
        parent::boot();

        static::addGlobalScope('default_sort', function (Builder $builder) {
            $builder->orderBy('sort_id');
        });

        static::creating(function ($model) {
            $model->sort_id = static::max('sort_id') + 1;
            $model->seen_in_id = json_encode([['id' => Auth::id(), 'seen_at' => now()]]);
        });
    }
}

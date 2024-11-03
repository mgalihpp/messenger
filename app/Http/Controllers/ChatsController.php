<?php

namespace App\Http\Controllers;

use App\Traits\Chat;
use Illuminate\Http\Request;
use Inertia\Inertia;

use function Termwind\render;

class ChatsController extends Controller
{

    use Chat;

    public function index()
    {
        try {
            $chats = $this->chats();

            return Inertia::render('chats/Index', compact('chats'));
        } catch (\Exception $e) {
            return $this->fail($e->getMessage());
        }
    }

    public function show(string $userId)
    {
        try {
            $chats = $this->chats();

            return Inertia::render('chats/Index', compact('chats'));
        } catch (\Exception $e) {
            return $this->fail($e->getMessage());
        }
    }

    public function loadChats()
    {
        try {
            $chats = $this->chats();

            return $this->ok($chats);
        } catch (\Exception $e) {
            return $this->fail($e->getMessage());
        }
    }
}

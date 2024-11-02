<?php

namespace App\Http\Controllers;

abstract class Controller
{
    public function ok($data = null, $message = 'success', $code = 200)
    {
        return response()->json([
            'message' => $message,
            'data' => $data,
            'code' => $code
        ], $code);
    }

    public function fail($data = null, $message = 'fail', $code = 400)
    {
        if ($code === 0) $code = 400;

        return response()->json([
            'message' => $message,
            'data' => $data,
            'code' => $code
        ], $code);
    }
}

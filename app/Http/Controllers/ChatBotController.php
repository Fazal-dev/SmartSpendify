<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class ChatBotController extends Controller
{
    public function getBotResponse(Request $request)
    {
        $response = Http::withHeaders([
            'Content-Type' => 'application/json'
        ])->post('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' . config('gemini.api_key'), [
            'contents' => [
                [
                    'parts' => [
                        ['text' => $request->message]
                    ]
                ]
            ]
        ]);
        if ($response->successful()) {
            return response()->json([
                'reply' => $response->json()['candidates'][0]['content']['parts'][0]['text']
            ]);
        } else {
            return response()->json([
                'reply' => "Sorry try after some time i am busy"
            ]);
        }
    }
}

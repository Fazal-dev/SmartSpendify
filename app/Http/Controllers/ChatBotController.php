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
        ])->post(config('gemini.base_url') . '?key=' . config('gemini.api_key'), [
            'contents' => [
                [
                    'parts' => [
                        ['text' => "Your name is Aiva. You are a helpful, friendly assistant. Keep answers short. User says:" . $request->message]
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

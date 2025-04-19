<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ChatBotController extends Controller
{
    public function getBotResponse()
    {
        // call the api
        //return respose

        return response()->json([
            'message' => "sucess"
        ]);
    }
}

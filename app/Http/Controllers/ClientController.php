<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Client;
use Carbon\Carbon;

class ClientController extends Controller
{
    public function add(Request $request)
    {
         $rules = [
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'phone' => 'nullable|min:9|max:9'
        ];


    
        $this->validate($request, $rules);

        $client = Client::create(
            $request->only('name', 'email', 'surname', 'phone')
        );

        $clients = Client::all();

        return $clients->toJson();
    }

    public function list()
    {
        $clients = Client::all();
        return $clients->toJson();
    }

    public function date()
    {
        $date = Carbon::now()->format('d-m-Y');
        $hour = Carbon::now()->addHour()->format('H:i');

        return compact('date', 'hour');
    }

    public function stat()
    {
       $date = Carbon::now();

        $clientsCount = Client::whereDate('created_at', '=', $date)->get()->count();
        return compact('clientsCount');
    }

    public function delete(Request $request)
    {
        $clients = Client::whereIn('id', $request->arrayDelete)->delete();
        $clients = Client::all();
        return $clients->toJson();
    }

}

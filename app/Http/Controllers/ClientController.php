<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Department;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ClientController extends Controller
{

    public function index(): \Inertia\Response
    {
        return Inertia::render('Client/Index', [
            'departments' => fn () => Department::all(),
            'clients' => Client::with('department')->paginate(),
        ]);
    }


    public function create(): \Inertia\Response
    {
        return Inertia::render('Client/Create', [
            'departments' => fn () => Department::all(['id', 'name']),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'first_name' => 'required|min:2|max:100',
            'last_name' => 'required|min:2|max:100',
            'middle_name' => 'max:100',
            'email' => 'required|email|max:100',
            'birth_date' => 'required|date',
            'department' => 'required|exists:departments,id',
        ]);

        Client::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'middle_name' => $request->middle_name,
            'email' => $request->email,
            'birth_date' => Carbon::parse($request->birth_date),
            'department_id' => $request->department

        ]);

        return redirect()->route('client.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}

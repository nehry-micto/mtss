<?php

namespace App\Http\Controllers;

use App\Http\Requests\EmployeeRequest;
use App\Models\Department;
use App\Models\Employee;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EmployeeController extends Controller
{

    public function index(): \Inertia\Response
    {
        return Inertia::render('Employee/Index', [
            'departments' => fn () => Department::all(),
            'employees' => Employee::with('department')
                ->search(
                    request()->query('search')
                )
                ->sort(
                    request()->query('column'),
                    request()->query('direction')
                )
                ->paginate(),
        ]);
    }


    public function create(): \Inertia\Response
    {
        return Inertia::render('Employee/Create', [
            'departments' => fn () => Department::all(['id', 'name']),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(EmployeeRequest $request)
    {
        $request->validated();

        Employee::create([
            'first_name' => $request->first_name,
            'last_name' => $request->last_name,
            'middle_name' => $request->middle_name,
            'email' => $request->email,
            'birth_date' => Carbon::parse($request->birth_date),
            'department_id' => $request->department
        ]);

        return redirect()->route('employee.index');
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
        return Inertia::render('Employee/Edit', [
            'employee' => Employee::with('department')->find($id),
            'departments' => fn () => Department::all(['id', 'name']),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(EmployeeRequest $request, string $id)
    {
        $data = $request->validated();

        $employee = Employee::findOrFail($id);
        $employee->update($data);

        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $employee = Employee::findOrFail($id);
        $employee->delete();

        return redirect()->back();
    }
}

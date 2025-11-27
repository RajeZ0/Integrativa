<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Project;
use Illuminate\Support\Facades\Storage;

class ProjectController extends Controller
{
    public function index()
    {
        return Project::where('is_active', true)->latest()->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'image' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('projects', 'public');
            $validated['image_path'] = '/storage/' . $path;
        }

        $project = Project::create($validated);

        return response()->json($project, 201);
    }

    public function show(Project $project)
    {
        return $project;
    }

    public function update(Request $request, Project $project)
    {
        $validated = $request->validate([
            'title' => 'string|max:255',
            'description' => 'string',
            'price' => 'numeric',
            'image' => 'nullable|image|max:2048',
            'is_active' => 'boolean',
        ]);

        if ($request->hasFile('image')) {
            // Delete old image if exists
            if ($project->image_path) {
                $oldPath = str_replace('/storage/', '', $project->image_path);
                Storage::disk('public')->delete($oldPath);
            }
            
            $path = $request->file('image')->store('projects', 'public');
            $validated['image_path'] = '/storage/' . $path;
        }

        $project->update($validated);

        return response()->json($project);
    }

    public function destroy(Project $project)
    {
        if ($project->image_path) {
            $oldPath = str_replace('/storage/', '', $project->image_path);
            Storage::disk('public')->delete($oldPath);
        }
        
        $project->delete();

        return response()->noContent();
    }
}

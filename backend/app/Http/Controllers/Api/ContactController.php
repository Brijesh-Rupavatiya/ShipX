<?php

namespace App\Http\Controllers\Api;

use Exception;
use App\Models\Contact;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use App\Http\Resources\ContactResource;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\StoreContactRequest;
use App\Http\Requests\UpdateContactRequest;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class ContactController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): AnonymousResourceCollection
    {
        $contacts = Contact::latest()->paginate(10);
        return ContactResource::collection($contacts);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreContactRequest $request): JsonResponse
    {
        try {
            $data = $request->validated();

            // Handle file upload
            if ($request->hasFile('file')) {
                $data['file_path'] = $request->file('file')->store('contacts', 'public');
            }

            $contact = Contact::create($data);

            return response()->json([
                'success' => true,
                'message' => 'Thank you for contacting us! We will get back to you soon.',
                'data' => new ContactResource($contact)
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to submit form. Please try again.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show($id): JsonResponse
    {
        try {
            $contact = Contact::findOrFail($id);

            return response()->json([
                'success' => true,
                'data' => new ContactResource($contact)
            ]);
        } catch (ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Contact not found'
            ], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateContactRequest $request, Contact $contact): JsonResponse
    {
        try {
            $data = $request->validated();

            // Handle file upload
            if ($request->hasFile('file')) {
                // Delete old file
                if ($contact->file_path) {
                    Storage::disk('public')->delete($contact->file_path);
                }
                $data['file_path'] = $request->file('file')->store('contacts', 'public');
            }

            $contact->update($data);

            return response()->json([
                'success' => true,
                'message' => 'Contact updated successfully',
                'data' => new ContactResource($contact)
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update contact',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Contact $contact): JsonResponse
    {
        try {
            // Delete file if exists
            if ($contact->file_path) {
                Storage::disk('public')->delete($contact->file_path);
            }

            $contact->delete();

            return response()->json([
                'success' => true,
                'message' => 'Contact deleted successfully'
            ]);
        } catch (Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete contact',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}

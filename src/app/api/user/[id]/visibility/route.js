import { connectDB } from '@/lib/mongoose';
import User from '@/models/User';

export async function PUT(request, { params }) {
  const { id } = params;

  if (!id) {
    return new Response(
      JSON.stringify({ error: 'User ID is required' }),
      { status: 400 }
    );
  }

  await connectDB();

  try {
    // Update the user's visibility to false (Boolean)
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { visibility: false },
      { new: true }
    );

    if (!updatedUser) {
      return new Response(
        JSON.stringify({ message: 'User not found' }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({
        message: 'User visibility updated successfully',
        user: updatedUser,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error('Error updating user visibility:', error);
    return new Response(
      JSON.stringify({ error: 'Something went wrong while updating visibility' }),
      { status: 500 }
    );
  }
}


import { NextResponse } from 'next/server';
import dbUtils from '../../../../lib/db-utils';

// GET /api/users/[id] - Get a specific user
export async function GET(request, { params }) {
  try {
    const { id } = params;
    const user = await dbUtils.getUserById(id);

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: 'User not found'
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Error fetching user',
        error: error.message
      },
      { status: 500 }
    );
  }
}

// PUT /api/users/[id] - Update a specific user
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { name, email, role, isActive } = body;

    // Validate that at least one field is provided
    if (!name && !email && role === undefined && isActive === undefined) {
      return NextResponse.json(
        {
          success: false,
          message: 'At least one field must be provided for update'
        },
        { status: 400 }
      );
    }

    // Check if user exists
    const existingUser = await dbUtils.getUserById(id);
    if (!existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: 'User not found'
        },
        { status: 404 }
      );
    }

    // If email is being updated, check for duplicates
    if (email && email !== existingUser.email) {
      const emailExists = await dbUtils.getUserByEmail(email);
      if (emailExists) {
        return NextResponse.json(
          {
            success: false,
            message: 'Email already exists'
          },
          { status: 400 }
        );
      }
    }

    // Update user
    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (role !== undefined) updateData.role = role;
    if (isActive !== undefined) updateData.isActive = isActive;

    const updatedUser = await dbUtils.updateUser(id, updateData);

    return NextResponse.json({
      success: true,
      message: 'User updated successfully',
      data: updatedUser
    });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Error updating user',
        error: error.message
      },
      { status: 500 }
    );
  }
}

// DELETE /api/users/[id] - Soft delete a specific user
export async function DELETE(request, { params }) {
  try {
    const { id } = params;

    // Check if user exists
    const existingUser = await dbUtils.getUserById(id);
    if (!existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: 'User not found'
        },
        { status: 404 }
      );
    }

    // Soft delete user
    const deletedUser = await dbUtils.deleteUser(id);

    return NextResponse.json({
      success: true,
      message: 'User deleted successfully',
      data: deletedUser
    });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Error deleting user',
        error: error.message
      },
      { status: 500 }
    );
  }
} 
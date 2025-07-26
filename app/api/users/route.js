import { NextResponse } from 'next/server';
import dbUtils from '../../../lib/db-utils';

// GET /api/users - Get all users
export async function GET() {
  try {
    const users = await dbUtils.getAllUsers();
    return NextResponse.json({
      success: true,
      data: users,
      count: users.length
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Error fetching users',
        error: error.message
      },
      { status: 500 }
    );
  }
}

// POST /api/users - Create a new user
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, role = 'student' } = body;

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        {
          success: false,
          message: 'Name and email are required'
        },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await dbUtils.getUserByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: 'User with this email already exists'
        },
        { status: 400 }
      );
    }

    // Create new user
    const user = await dbUtils.createUser({ name, email, role });

    return NextResponse.json({
      success: true,
      message: 'User created successfully',
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Error creating user',
        error: error.message
      },
      { status: 500 }
    );
  }
} 
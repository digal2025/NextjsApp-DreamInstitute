import { NextResponse } from 'next/server';
import connectDB from '../../../lib/mongodb';
import User from '../../../models/User';

export async function GET() {
  try {
    // Connect to MongoDB
    await connectDB();
    
    // Test database connection by counting users
    const userCount = await User.countDocuments();
    
    return NextResponse.json({
      success: true,
      message: 'Database connection successful',
      userCount,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Database connection error:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Database connection failed',
        error: error.message
      },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    // Connect to MongoDB
    await connectDB();
    
    // Parse request body
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
    
    // Create new user
    const user = new User({
      name,
      email,
      role
    });
    
    await user.save();
    
    return NextResponse.json({
      success: true,
      message: 'User created successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    console.error('Error creating user:', error);
    
    // Handle duplicate email error
    if (error.code === 11000) {
      return NextResponse.json(
        {
          success: false,
          message: 'Email already exists'
        },
        { status: 400 }
      );
    }
    
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
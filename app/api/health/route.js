import { NextResponse } from 'next/server';
import dbUtils from '../../../lib/db-utils';

export async function GET() {
  try {
    // Check database health
    const dbHealth = await dbUtils.healthCheck();
    
    // Get system information
    const systemInfo = {
      nodeVersion: process.version,
      platform: process.platform,
      memoryUsage: process.memoryUsage(),
      uptime: process.uptime(),
      timestamp: new Date().toISOString()
    };

    // Get database statistics
    const dbStats = await dbUtils.getStats();

    const healthStatus = {
      status: dbHealth.status === 'healthy' ? 'healthy' : 'unhealthy',
      database: dbHealth,
      system: systemInfo,
      statistics: dbStats,
      timestamp: new Date().toISOString()
    };

    const statusCode = healthStatus.status === 'healthy' ? 200 : 503;

    return NextResponse.json(healthStatus, { status: statusCode });
  } catch (error) {
    console.error('Health check error:', error);
    
    return NextResponse.json(
      {
        status: 'unhealthy',
        error: error.message,
        timestamp: new Date().toISOString()
      },
      { status: 503 }
    );
  }
} 
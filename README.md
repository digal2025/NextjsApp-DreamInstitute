# NextjsApp-DreamInstitute

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Features

- **Next.js 15.4.4** with App Router
- **MongoDB Integration** with Mongoose ODM
- **User Management System** with CRUD operations
- **RESTful API** endpoints
- **Database Health Monitoring**
- **Responsive UI** with Tailwind CSS
- **TypeScript Ready** (jsconfig.json configured)

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

## MongoDB Setup

### 1. Environment Configuration

Create a `.env.local` file in the root directory and add your MongoDB connection string:

```bash
# Copy the example file
cp env.example .env.local

# Edit .env.local with your actual MongoDB connection details
MONGODB_URI=mongodb://username:password@your-vps-ip:27017/database-name
```

### 2. Connection String Formats

**For MongoDB with authentication:**
```
MONGODB_URI=mongodb://username:password@192.168.1.100:27017/dream-institute
```

**For MongoDB without authentication:**
```
MONGODB_URI=mongodb://192.168.1.100:27017/dream-institute
```

**For MongoDB with SSL/TLS:**
```
MONGODB_URI=mongodb://username:password@your-vps-ip:27017/database-name?ssl=true
```

**For MongoDB Atlas (cloud):**
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database-name
```

### 3. Database Features

- **Connection Pooling**: Optimized for production with connection caching
- **Error Handling**: Comprehensive error handling and logging
- **Health Monitoring**: Built-in health check endpoints
- **User Management**: Complete CRUD operations for users
- **Data Validation**: Mongoose schema validation
- **Indexing**: Performance-optimized database indexes

## API Endpoints

### Database Health
- `GET /api/health` - System and database health check
- `GET /api/test-db` - Test database connection

### User Management
- `GET /api/users` - Get all users
- `POST /api/users` - Create a new user
- `GET /api/users/[id]` - Get a specific user
- `PUT /api/users/[id]` - Update a specific user
- `DELETE /api/users/[id]` - Soft delete a user

### Example API Usage

**Create a user:**
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "role": "student"
  }'
```

**Get all users:**
```bash
curl http://localhost:3000/api/users
```

**Test database connection:**
```bash
curl http://localhost:3000/api/test-db
```

## Project Structure

```
dream-institute-custom-app/
├── app/
│   ├── api/                    # API routes
│   │   ├── health/            # Health check endpoints
│   │   ├── test-db/           # Database test endpoint
│   │   └── users/             # User management endpoints
│   ├── globals.css            # Global styles
│   ├── layout.js              # Root layout
│   └── page.js                # Home page with UI
├── lib/
│   ├── mongodb.js             # Database connection
│   └── db-utils.js            # Database utility functions
├── models/
│   └── User.js                # User model schema
├── public/                    # Static assets
├── env.example                # Environment variables template
└── package.json               # Dependencies and scripts
```

## Database Models

### User Model
- **name**: String (required, max 50 chars)
- **email**: String (required, unique, validated)
- **role**: Enum ['student', 'teacher', 'admin']
- **isActive**: Boolean (default: true)
- **createdAt**: Date (auto-generated)
- **updatedAt**: Date (auto-updated)

## Development

### Prerequisites
- Node.js 18+ 
- MongoDB instance (local or remote)
- npm, yarn, pnpm, or bun

### Installation
```bash
# Clone the repository
git clone https://github.com/digal2025/NextjsApp-DreamInstitute.git

# Install dependencies
npm install

# Set up environment variables
cp env.example .env.local
# Edit .env.local with your MongoDB connection details

# Run development server
npm run dev
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

### Vercel Deployment
The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your `MONGODB_URI` environment variable in Vercel dashboard
4. Deploy!

### Environment Variables for Production
Make sure to set the following environment variables in your production environment:
- `MONGODB_URI` - Your MongoDB connection string

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
- [MongoDB Documentation](https://docs.mongodb.com/) - learn about MongoDB.
- [Mongoose Documentation](https://mongoosejs.com/docs/) - learn about Mongoose ODM.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Local MongoDB Setup

## Prerequisites
1. Install MongoDB Community Server from https://www.mongodb.com/try/download/community
2. Install Node.js 16+

## Setup Steps

1. **Start MongoDB service:**
   ```bash
   # Option 1: Run PowerShell as Administrator, then:
   net start MongoDB
   
   # Option 2: Start manually (create data folder first)
   mkdir C:\data\db
   mongod --dbpath "C:\data\db"
   
   # Option 3: Use MongoDB Compass (GUI) - it will start the service
   ```

2. **Install server dependencies:**
   ```bash
   cd server
   npm install
   ```

3. **Initialize database:**
   ```bash
   npm run init-db
   ```

4. **Start the server:**
   ```bash
   npm run dev
   ```

## Database Info
- **Database Name:** nikul_pharma
- **Connection:** mongodb://localhost:27017
- **Collections:** inquiries

## API Endpoints
- `GET /health` - Health check
- `POST /inquiries` - Create inquiry

## Verify Setup
Visit http://localhost:5174/health to verify the server is running.
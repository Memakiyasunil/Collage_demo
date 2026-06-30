# Collage_demo
Create a complete responsive Education Institute Website Clone using the MERN Stack (MongoDB, Express.js, React.js, Node.js). 

🎯 Project Goal: Build a modern, professional educational website similar to Swarnim Edutech with a responsive UI, course management, inquiry system, admin panel, and dynamic content management.

## 🚀 How to Run the Project

### 1. Backend Setup
1. Open a terminal and navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install the backend dependencies:
   ```bash
   npm install
   ```
3. Ensure your MongoDB Atlas IP Whitelist is configured correctly and your `.env` file has the correct `MONGO_URI`.
4. Start the backend server:
   ```bash
   npm start
   ```
   *The server should start on port 5000.*

### 2. Frontend Setup
1. Open a **new** terminal and navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install the frontend dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm run dev
   ```
   *The React app should now be running in your browser.*

### 3. Login & Authentication Access

To easily test the application, you can seed the database with default users and categories by running the following commands in the `backend` folder (after MongoDB connects):
```bash
node seedCategories.js
node seedUsers.js
```

The application includes two separate authentication portals:

**1. Skill Swap Portal (User)**
- **Registration URL:** `http://localhost:5173/register`
- **Login URL:** `http://localhost:5173/login`
- **Details:** Users can create an account using their Full Name, Email, and Password. Once logged in, they can access the Skill Swap Dashboard.
- **Default Seed Accounts:**
  - **Email:** `john@example.com` | **Password:** `password123`
  - **Email:** `jane@example.com` | **Password:** `password123`

**2. Admin Dashboard**
- **Admin Login URL:** `http://localhost:5173/admin/login`
- **Details:** This route is protected. Only administrators can access this area to manage courses, categories, system settings, and view reports.
- **Default Seed Account:**
  - **Username:** `admin` | **Password:** `adminpassword`

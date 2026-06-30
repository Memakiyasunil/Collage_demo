const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Admin = require('./models/Admin');

dotenv.config();

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to DB for seeding users');

    // Seed Normal Users (Skill Swap)
    const users = [
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        role: 'user',
        bio: 'I am a web developer looking to learn UI/UX design.'
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'password123',
        role: 'user',
        bio: 'Expert in Python, wanting to learn React.'
      }
    ];

    // Clear existing users to avoid duplicate key errors on email
    await User.deleteMany({});
    
    // Create users one by one to ensure the `pre('save')` hook runs and hashes the password
    for (const u of users) {
      await User.create(u);
    }
    console.log('✅ Users seeded successfully!');

    // Seed Admin (Admin Dashboard)
    const adminData = {
      username: 'admin',
      password: 'adminpassword'
    };

    // Clear existing admins
    await Admin.deleteMany({});
    
    // Create admin
    await Admin.create(adminData);
    console.log('✅ Admin seeded successfully!');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding users:', error);
    process.exit(1);
  }
};

seedUsers();

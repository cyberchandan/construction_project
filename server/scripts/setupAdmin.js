const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const User = require('../models/User');

dotenv.config();

const setupAdmin = async () => {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/buildconnect_ncr';
  
  const adminEmail = (process.env.INITIAL_ADMIN_EMAIL || 'admin@buildconnectncr.com').toLowerCase();
  const adminPassword = process.env.INITIAL_ADMIN_PASSWORD || 'Admin@BuildConnect2026';
  const adminName = process.env.INITIAL_ADMIN_NAME || 'Senior Business Owner';

  console.log(`[Admin Setup Script] Connecting to database...`);
  
  try {
    await mongoose.connect(uri);
    
    const existingAdmin = await User.findOne({ email: adminEmail });
    if (existingAdmin) {
      console.log(`[Admin Setup Script] Admin account with email '${adminEmail}' already exists. Setup skipped.`);
      process.exit(0);
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(adminPassword, salt);

    const newAdmin = await User.create({
      name: adminName,
      email: adminEmail,
      passwordHash,
      role: 'admin',
      isActive: true,
    });

    console.log(`=======================================================`);
    console.log(`✅ INITIAL ADMIN CREATED SUCCESSFULLY!`);
    console.log(`   Name:     ${newAdmin.name}`);
    console.log(`   Email:    ${newAdmin.email}`);
    console.log(`   Role:     ${newAdmin.role}`);
    console.log(`=======================================================`);
    process.exit(0);
  } catch (error) {
    console.error(`❌ Admin Setup Failed: ${error.message}`);
    process.exit(1);
  }
};

setupAdmin();

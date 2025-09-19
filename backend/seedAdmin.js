require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

async function seedAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    const email = process.env.ADMIN_EMAIL || 'admin@example.com';
    const password = process.env.ADMIN_PASSWORD || 'admin123';
    const name = process.env.ADMIN_NAME || 'Super Admin';

    let admin = await User.findOne({ email });
    if (admin) {
      console.log('Admin already exists:', email);
    } else {
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);

      admin = new User({
        email,
        passwordHash,
        name,
        isAdmin: true
      });
      await admin.save();
      console.log('✅ Admin user created:', email);
    }

    mongoose.disconnect();
  } catch (err) {
    console.error('Error seeding admin:', err);
    mongoose.disconnect();
  }
}

seedAdmin();
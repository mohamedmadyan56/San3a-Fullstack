const mongoose = require('mongoose');
require('dotenv').config();
const Service = require('./src/models/serviceModel');

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to DB');
    
    const services = [
      { nameAr: 'نظافة', nameEn: 'Cleaning', slug: 'cleaning', icon: 'cleaning-icon' },
      { nameAr: 'تكييف', nameEn: 'Air Conditioning', slug: 'ac', icon: 'ac-icon' },
      { nameAr: 'سباكة', nameEn: 'Plumbing', slug: 'plumbing', icon: 'plumbing-icon' },
      { nameAr: 'كهرباء', nameEn: 'Electricity', slug: 'electricity', icon: 'electricity-icon' }
    ];
    
    for (const s of services) {
      await Service.updateOne({ slug: s.slug }, { $set: s }, { upsert: true });
    }
    console.log('Seeded services successfully');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();

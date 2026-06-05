const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load env variables at the very beginning
dotenv.config({ path: './.env' });

const app = require('./app');

const DB = process.env.MONGO_URI || 'mongodb://localhost:27017/san3a';

mongoose.connect(DB)
  .then(() => {
    console.log('✅ Database connected successfully!');
  })
  .catch(err => {
    console.log('❌ Database connection error:', err.message);
  });

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`🚀 Server is running and listening on port ${port}...`);
});
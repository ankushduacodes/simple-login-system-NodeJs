import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
  id: {
    type: Number,
    default: Math.floor(Math.random() * 10000000000000 + 1000),
    index: true,
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
    min: 3,
    max: 30,
  },
  email: {
    type: String,
    validate: {
      validator: (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v),
      message: 'Please enter a valid email',
    },
    required: true,
    unique: true,
    trim: true,
    min: 5,
    max: 50,
  },
  password: {
    type: String,
    required: true,
  },
});
export default mongoose.model('User', UserSchema);

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  visibility: {
    type: Boolean,
    default: true
  },
  status: {
    type: String,
    default: 'pending'
  }
});

const User = mongoose.models.User || mongoose.model('User', userSchema);
export default User;



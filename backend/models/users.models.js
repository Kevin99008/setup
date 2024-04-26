import { Schema } from 'mongoose';
import mongoose from 'mongoose'


const usersSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
        unique: true,
        validate: {
            validator: function(v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: "Please enter a valid email"
        },
  },
  avatarUrl: {
    type: String,
    default: 'https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg' // Replace with your default image URL
  }
  
});
const User = mongoose.model("User",usersSchema);

export default User;
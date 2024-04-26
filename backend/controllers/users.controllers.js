import User from "../models/users.models.js";
import mongoose from 'mongoose';
// const validator = require('validator');

export async function getUsers(ctx) {
    const q = ctx.query.q || '';
    const start = parseInt(ctx.query.start || '0');
    const limit = parseInt(ctx.query.limit || '0');
    // ค้นหาผู้ใช้ทั้งหมดจากคอลเล็กชัน User
    let users = await User.find();
    users = await users.filter(user => {
      const nameMatch = user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
      const emailMatch = user.email.toLowerCase().indexOf(q.toLowerCase()) !== -1;
      return nameMatch || emailMatch;
    });

    // // ตรวจสอบว่ามีผู้ใช้หรือไม่
    if (users.length <= 0) {
      ctx.body = { status: 404, message: "No users found" };
      ctx.status = 404;
      return;
    }


    // กำหนดขอบเขตของผลลัพธ์โดยใช้ start และ limit
    const startIndex = start >= 0 ? start : 0;
    const endIndex = start + limit;
    let limitedUsers = users;
    if (limit == 0) {
        limitedUsers = users.slice(startIndex);
    } 
    else {
        const endIndex = start + limit;
        limitedUsers = users.slice(startIndex, endIndex);
    }
  
    ctx.body = {status: 200, users: limitedUsers};
    ctx.status = 200;
  }

export async function getUserById(ctx){
  const userId = ctx.params.userId;
  try {
    const user = await User.findById(userId);
    if (!user) {
      ctx.status = 404;
      ctx.body = { status: 404, message: `User with ID ${userId} not found` };
      return;
    }
    ctx.status = 200;
    ctx.body = {status: 200, user: user};
  } catch (error) {
    console.error(error);
    ctx.status = 500;
    ctx.body = { status: 500, message: 'Error finding user', error: error.message };
  }

}

export async function createUser(ctx) {
    // Validate input data
    const { name, age, email, avatarUrl } = ctx.request.body;
  
    const validationErrors = [];
  
    if (!name || typeof name !== 'string') {
      validationErrors.push('Name must be a non-empty string');
    }
  
    if (!age || isNaN(age) || parseInt(age, 10) < 0) {
      validationErrors.push('Age must be a non-negative number');
    }
  
    if (!email) {
      validationErrors.push('Invalid email format');
    }
  
    if (email) {
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!isValidEmail) {
        validationErrors.push('Invalid email format');
      } else {
        // Check for existing user with the validated email
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          validationErrors.push('Email already exists');
        }
      }
    }
  
    if (validationErrors.length) {
      ctx.status = 400;
      ctx.body = { status: 400,errors: validationErrors };
      return;
    }
  
    // Create and save the user
    const user = new User({
      name,
      age: parseInt(age, 10),
      email,
      avatarUrl,
    });
  
    await user.save();

    ctx.body = {status: 201, user: user , message: `user created successfully`};
    ctx.status = 201;
  }






export async function updateUser(ctx){
    const userId = ctx.params.userId;

    const { name, age, email, avatarUrl } = ctx.request.body;
    const validationErrors = [];

    const user = await User.findById(userId);

    if (!user) {
      ctx.status = 404;
      ctx.body = {status: 404, message: `User with ID ${userId} not found` };
      return;
    }

    if (typeof name !== 'string') {
      validationErrors.push('Name must be a non-empty string');
    }

    if (isNaN(age) || parseInt(age, 10) < 0) {
      validationErrors.push('Age must be a non-negative number');
    }

    if (email) {
      const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!isValidEmail) {
        validationErrors.push('Invalid email format');
      } else {
        // Check for existing user with the validated email
        const existingUser = await User.findOne({ email });
        if (existingUser && existingUser.email != user.email) {
          validationErrors.push('Email already exists');
        }
      }
    }

    if (validationErrors.length) {
      ctx.status = 400;
      ctx.body = {status: 400, errors: validationErrors };
      return;
    }

    user.name = name ? name : user.name; 
    user.age = age ? parseInt(age, 10) : user.age; 
    user.email = email ? email : user.email; 
    user.avatarUrl = avatarUrl ? avatarUrl : user.avatarUrl;

    await user.save();

    ctx.body = {status: 200,user: user, message: `user updated successfully`};
    ctx.status = 200;


}



export async function deleteUser(ctx){
    const userId = ctx.params.userId;
    try {
      const deletedUser = await User.findByIdAndDelete(userId);
      if (!deletedUser) {
        ctx.status = 404;
        ctx.body = { message: `User with ID ${userId} not found` };
        return;
      }
      
      ctx.status = 200;
      ctx.body = {status: 200, message: `User with ID ${userId} deleted successfully` };
    } catch (error) {
      ctx.status = 500;
      ctx.body = {status: 500, message: 'Error deleting user', error: error.message };

    }

}
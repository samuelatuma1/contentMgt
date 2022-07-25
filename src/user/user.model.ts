import {Schema, model, Types } from 'mongoose';

interface IUser {
    email: string;
    password: string;
}

// User Model
const UserSchema = new Schema<IUser> ({
    email : {
        unique: true,
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
    
})

const User = model<IUser>('User', UserSchema)
export  {User}
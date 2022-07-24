import {Schema, model, Types } from 'mongoose';

interface IUser {
    email: string;
    password: string;
    posts: Types.ObjectId[];
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
    },
    posts: {
        type: [Types.ObjectId],
        ref: "Post"
    }
})

const User = model<IUser>('User', UserSchema)
export  {User}
import {Schema, model, Types, ObjectId } from 'mongoose';

interface IPost {
    post: string;
    user: Types.ObjectId;
}


const PostSchema = new Schema <IPost> ({
    post: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true
    }
}, {
    strict: true,
    timestamps: true
})

const Post = model<IPost>('Post', PostSchema)

export {Post}
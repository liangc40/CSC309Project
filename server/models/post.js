const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const commentSchema = new Schema(
    {
        name:{
            type: String,
            required: true
        },
        text:{
            type: String,
            required: true,
        },
        createdAt: {
            type:Date
        },
        avatar: {
            type: String
        }
    },
    {
        timestamps: true,
    }
);

const postSchema = new Schema(
    {
        name:{
            type: String,
            required: true,
        },
        text:{
            type: String,
            required: true,
        },
        comments:{
            type: [commentSchema]
        },
        createdAt: {
            type:Date
        },
        like:{
            type: Array,
            required: true
        },
        avatar: {
            type: String
        }
    }, 
    {
        timestamps: true,
    }
);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
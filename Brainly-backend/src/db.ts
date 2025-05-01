import mongoose from "mongoose";

    mongoose.connect("mongodb+srv://ankitya1608:y7rt99uEWR13NW99@cluster0.rupg951.mongodb.net/brainly")
    .then(()=>{
        console.log("db connected")
    })
    .catch(e=>{console.log(e)})

const UserSchema = new mongoose.Schema({
    email:{type:String, required:true, unique:true},
    password:String
})

export const User = mongoose.model("User",UserSchema)


const ContentSchema = new mongoose.Schema({
    title: String,
    link: String,
    type: String,
    tag: [{type: mongoose.Types.ObjectId, ref: 'Tag'}],
    userId: {type: mongoose.Types.ObjectId, ref: 'User', required: true }
})

export const Content = mongoose.model("Content",ContentSchema);


const LinkSchema = new mongoose.Schema({
    hash: String,
    userId: {type: mongoose.Types.ObjectId, ref: 'User', required: true, unique:true} 
})

export const LinkModel = mongoose.model("Links",LinkSchema)
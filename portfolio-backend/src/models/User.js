import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {type: String, require: true, unique: true},
    password: {type: String, require: true},
    email: {type: String, require: true},
    phone: {type: String, require: true},
    firstName: {type: String},
    lastName: {type: String},
    bio: String,
    location: String,
    socialLinks: {
        github: String,
        facebook: String,
        linkedIn: String
    }
})

const User = mongoose.model('User', userSchema);

export default User;
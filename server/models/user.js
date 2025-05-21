import mongoose from "mongoose";
import bcrypt from "bcrypt"
import CONFIG from "../utils/config";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address'] // We could modify this to only accept certain domains
    },
    password: {
        type: String,
        required: true
    }
})

/**
 * Hashes the password before saving into the database
 * Credits: https://stackoverflow.com/questions/14588032/mongoose-password-hashing
 */
userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    try {
        this.password = await bcrypt.hash(this.password, CONFIG.SALT_WORK_FACTOR);
        return next();
    } catch (err) {
        return next(err);
    }
})

userSchema.methods.validatePassword = async function validatePassword(data) {
    return bcrypt.compare(data, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
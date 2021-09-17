import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const UserSchema= new Schema({
    email: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    passwordHash: {
        type: String
    },
    info: {
        hairColor: {
            type: String
        },
        favouriteFood: {
            type: String
        },
        bio: {
            type: String
        }
    },
    isVerified: {
        type: Boolean
    }
});

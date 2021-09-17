import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { UserSchema } from '../models/userSchema';

const User = mongoose.model('User', UserSchema);

export const UserController = async (req, res) => {
    const { email, username, password } = req.body;

    const user = await User.findOne ({ email });

    if (user) {
        return res.status (409).json ({error: 'User already exists with this email'});
    }

    const passwordHash = await bcrypt.hash (password, 10);

    const startingInfo = {
        hairColor: '',
        favouriteFood: '',
        bio: ''
    };

    const newUser = new User ({
        email,
        username,
        passwordHash,
        info: startingInfo,
        isVerified: false
    });

    newUser.save ((err, user) => {
        if (err) {
            res.send (err);
        } else {
            res.json ({ data: user })
        }
    })

}
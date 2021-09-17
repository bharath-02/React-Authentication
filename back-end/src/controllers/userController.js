import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { UserSchema } from '../models/userSchema';

const User = mongoose.model('User', UserSchema);

export const UserController = async (req, res) => {
    const { email, username, password } = req.body;

    const user = await User.findOne ({ email });

    if (user) {
        return res.status (409).json ({error: 'User with this email already exists'});
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

    const {id} = newUser;

    newUser.save ((err) => {
        if (err) {
            res.send (err);
        } else {
            jwt.sign ({
                id,
                email,
                username,
                info: startingInfo,
                isVerified: false
            },
            process.env.JWT_SECRET_KEY,
            {
                expiresIn: '2d'
            },
            (err, token) => {
                if (err) {
                    return res.status (500).send (err);
                }
                return res.status (200).json({ token })
            });
        }
    });

}
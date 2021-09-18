import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { ObjectID } from 'mongodb';

import { UserSchema } from '../models/userSchema';

const User = mongoose.model ('User', UserSchema);

// Signup Controller
export const SignupController = async (req, res) => {
    const { email, username, password } = req.body;

    const user = await User.findOne ({ email });

    if (user) {
        return res.status (409).json ({ message: 'User with this email already exists' });
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

    const { id } = newUser;

    newUser.save ((err) => {
        if (err) {
            res.send (err);
        } else {
            jwt.sign ({ id, email, username, info: startingInfo, isVerified: false }, process.env.JWT_SECRET_KEY, { expiresIn: '2d' }, (err, token) => {
                if (err) {
                    return res.status (500).json (err);
                }
                return res.status (200).json ({ token });
            });
        }
    });
};

// Login Controller
export const LoginController = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne ({ email });

    if (!user) {
        return res.status (401).json ({ message: 'User not found' });
    }

    const { _id: id, username, passwordHash, isVerified, info } = user;

    const isCorrect = await bcrypt.compare (password, passwordHash);

    if (!isCorrect) {
        return res.status (401).json ({ message: 'Password is not correct' });
    } else {
        jwt.sign ({ id, username, email, isVerified, info }, process.env.JWT_SECRET_KEY, { expiresIn: '2d' }, (err, token) => {
            if (err) {
                return res.status (500).send (err);
            }
            return res.status (200).json ({ token });
        });
    }
}

// Update users info Controller
export const UpdateUsersController = async (req, res) => {
    const { authorization } = req.headers;
    const { userId } = req.params;

    const updates = (({
        favouriteFood,
        hairColor,
        bio
    }) => ({
        favouriteFood,
        hairColor,
        bio
    })) (req.body);

    if (!authorization) {
        return res.status (401).json({ message: 'No authorization headers sent' });
    }

    const token = authorization.split (' ')[1];

    jwt.verify (token, process.env.JWT_SECRET_KEY, async (err, decoded) => {
        if (err) {
            return res.status (401).json ({ message: 'Unable to verify token' });
        }

        const { id } = decoded;
        
        if (id !== userId) {
            return res.status (403).json ({ message: "Not allowed to update other user's data" });
        }

        User.findOneAndUpdate ({ _id: id }, { info: updates }, { new: true, useFindAndModify: false }, (err, user) => {
            if (err) {
                return res.status (500).json ({message: `Failed to update user info ${err}`});
            } else {
                const { id, email, username, isVerified, info } = user;

                jwt.sign ({ id, email, username, isVerified, info }, process.env.JWT_SECRET_KEY, { expiresIn: '2d' }, (err, token) => {
                    if (err) {
                        return res.status (500).json (err);
                    }
                    return res.status (200).json ({ token });
                });
            }
        })
    })
}
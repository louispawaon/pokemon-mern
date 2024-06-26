import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import Users from "../models/Users";
import {v4 as uuidv4} from 'uuid';
import TokenBlacklist from "../models/TokenBlacklist";

// Register User
export const registerUser = async (req: Request, res: Response): Promise<Response> => {
    const { username, password } = req.body;

    try {
        const verifyUsername = await Users.findOne({ username });
        if (verifyUsername) {
            return res.status(403).json({
                message: "Username already used"
            });
        }
        const userId = uuidv4();
        const hash = await bcrypt.hash(password, 10);
        const user = new Users({
            userId,
            username,
            password: hash,
        });

        const response = await user.save();
        return res.status(201).json({
            message: 'User successfully created!',
            result: response,
            success: true
        });
    } catch (error) {
        if (error instanceof Error){
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
        return res.status(500).json({
            success: false,
            message: "An unexpected error occurred."
        });
    }
};

// Login User
export const loginUser = async (req: Request, res: Response): Promise<Response> => {
    const { username, password } = req.body;

    try {
        const user = await Users.findOne({ username });
        if (!user) {
            return res.status(401).json({
                message: "Authentication Failed",
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Authentication Failed"
            });
        }

        const jwtToken = jwt.sign(
            {
                email: user.username,
                userId: user._id
            },
            process.env.JWT_SECRET as string,
            {
                expiresIn: "1h"
            }
        );

        return res.status(200).json({
            accessToken: jwtToken,
            userId: user._id,
        });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(401).json({
                message: error.message,
                success: false
            });
        }
        return res.status(500).json({
            message: "An unexpected error occurred.",
            success: false
        });
    }
};

// Logout User
export const logoutUser = async (req: Request, res: Response): Promise<Response> => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({
                message: "No token provided",
            });
        }

        const token = authHeader.replace("Bearer ", "");
        const decodedToken: any = jwt.decode(token);
        if (!decodedToken) {
            return res.status(400).json({
                message: "Invalid token",
            });
        }

        const expiryDate = new Date(decodedToken.exp * 1000);

        const blacklistEntry = new TokenBlacklist({ token, expiry: expiryDate });
        await blacklistEntry.save();

        return res.status(200).json({
            message: "Logout successful",
        });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({
                success: false,
                message: error.message
            });
        }
        return res.status(500).json({
            success: false,
            message: "An unexpected error occurred."
        });
    }
};
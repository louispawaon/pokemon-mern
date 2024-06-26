import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import TokenBlacklist from '../models/TokenBlacklist'

// Define interface with userData
interface AuthenticatedRequest extends Request {
    userData?: any;
}

// Middleware function for authenticating JWT tokens
const authenticateJWT = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        // Authorization Header
        const authHeader = req.headers.authorization;
    
        if (!authHeader) {
          return res.status(401).json({
            message: "Authentication Failed",
          });
        }
        
        // Extract the JWT Token from the Authorization Header
        const token = authHeader.replace("Bearer ", "");

        // Check if token is blacklisted in the database
        const isBlacklisted = await TokenBlacklist.findOne({ token });
        if (isBlacklisted) {
            return res.status(401).json({
                message: "Authentication Failed",
            });
        }

        // Verify JWT token using the JWT Secret
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        req.userData = decoded;
        next();
      } catch (err) {
        return res.status(401).json({
          message: "Authentication Failed",
        });
      }
}

export default authenticateJWT;
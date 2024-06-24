import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import TokenBlacklist from '../models/TokenBlacklist'

interface AuthenticatedRequest extends Request {
    userData?: any;
}

const authenticateJWT = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
    
        if (!authHeader) {
          return res.status(401).json({
            message: "Authentication Failed",
          });
        }
    
        const token = authHeader.replace("Bearer ", "");

        const isBlacklisted = await TokenBlacklist.findOne({ token });
        if (isBlacklisted) {
            return res.status(401).json({
                message: "Authentication Failed",
            });
        }

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
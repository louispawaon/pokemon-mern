import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

interface AuthenticatedRequest extends Request {
    userData?: any;
}

const authenticateJWT = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
    
        if (!authHeader) {
          return res.status(401).json({
            message: "Authentication Failed",
          });
        }
    
        const token = authHeader.replace("Bearer ", "");
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
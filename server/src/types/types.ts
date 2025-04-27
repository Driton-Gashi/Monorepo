import type { JwtPayload } from 'jsonwebtoken';

export interface User {
    id?: number;
    name?: string;
    lastname?: string;
    email?: string;
    role?: string;
    password?: string;
    address?: string;
    city?: string;
    phone?: string;
  }

declare global {
    namespace Express {
      interface Request {
        user?: JwtPayload | User;
      }
    }
  }
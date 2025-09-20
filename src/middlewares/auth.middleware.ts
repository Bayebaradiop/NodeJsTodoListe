import type { Request, Response, NextFunction } from "express";
import Jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: { id: number; email: string };
}

export function authenticate(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  let token: string | undefined;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    token = authHeader.split(" ")[1];
  } else if ((req as any).cookies && ((req as any).cookies.token || (req as any).cookies.acces_token)) {
    token = (req as any).cookies.token || (req as any).cookies.acces_token;
  } else {
    return res.status(401).json({ message: "Token missing" });
  }

  try {
    const secretEnv = process.env.JWT_SECRET;
    if (!secretEnv) {
      return res.status(500).json({ message: "JWT secret not configured" });
    }

    const secret = secretEnv as string;
    const payload = Jwt.verify(token as string, secret) as any;
    const parsedId = typeof payload.id === "string" ? parseInt(payload.id, 10) : payload.id;
    req.user = { id: parsedId as number, email: payload.email };
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}
export default authenticate;

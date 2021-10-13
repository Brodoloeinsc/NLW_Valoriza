import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken"

interface IPayload{
  sub: string;
}

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction) {
  // Receive the token

  const authToken = req.headers.authorization;

  // Validate if token is write
  if (!authToken) {
    return res.status(401).end();
  }

  const [, token] = authToken.split(" ");

  //Validate if token is valid
  try {
    const { sub } = verify(token, "c1a65e4cefaffc46e881e736fbdf7579") as IPayload;
    
    //Recuperate user information
    req.user_id = sub;

    return next();
  } catch (err) {
    return res.status(401).end();
  }
}

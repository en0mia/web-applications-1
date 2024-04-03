import { validationResult } from "express-validator";

export function validationMiddleware(req, res, next) {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    res.status(400);
    return res.send({ errors: result.array() });
  }
  next();
}

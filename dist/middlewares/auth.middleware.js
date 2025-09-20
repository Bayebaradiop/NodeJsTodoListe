import Jwt from "jsonwebtoken";
export function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;
    let token;
    if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];
    }
    else if (req.cookies && (req.cookies.token || req.cookies.acces_token)) {
        token = req.cookies.token || req.cookies.acces_token;
    }
    else {
        return res.status(401).json({ message: "Token missing" });
    }
    try {
        const secretEnv = process.env.JWT_SECRET;
        if (!secretEnv) {
            return res.status(500).json({ message: "JWT secret not configured" });
        }
        const secret = secretEnv;
        const payload = Jwt.verify(token, secret);
        const parsedId = typeof payload.id === "string" ? parseInt(payload.id, 10) : payload.id;
        req.user = { id: parsedId, email: payload.email };
        next();
    }
    catch (err) {
        return res.status(401).json({ message: "Invalid token" });
    }
}
export default authenticate;
//# sourceMappingURL=auth.middleware.js.map
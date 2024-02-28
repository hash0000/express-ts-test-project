"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const httpStatusCode_enum_1 = require("../enum/httpStatusCode.enum");
async function AuthMiddleware(req, res, next) {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            throw new Error();
        }
        const secret = process.env.JWT_SECRET;
        if (secret === undefined) {
            throw new Error();
        }
        const decoded = jsonwebtoken_1.default.verify(token, secret);
        req.token = decoded;
        next();
    }
    catch (err) {
        res.status(httpStatusCode_enum_1.HttpStatusCode.UNAUTHORIZED).send();
    }
}
exports.AuthMiddleware = AuthMiddleware;
//# sourceMappingURL=jwt.middleware.js.map
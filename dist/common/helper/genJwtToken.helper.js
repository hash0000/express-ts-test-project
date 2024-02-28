"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function generateToken(payload) {
    try {
        const expiresIn = process.env.TOKEN_EXPIRE || '7d';
        const secret = process.env.JWT_SECRET;
        if (secret === undefined) {
            throw new Error();
        }
        return jsonwebtoken_1.default.sign(payload, secret, { expiresIn });
    }
    catch (e) {
        throw new Error();
    }
}
exports.generateToken = generateToken;
//# sourceMappingURL=genJwtToken.helper.js.map
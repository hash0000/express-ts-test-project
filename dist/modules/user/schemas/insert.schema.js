"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsertUserSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.InsertUserSchema = joi_1.default.object()
    .keys({
    username: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required(),
})
    .required();
//# sourceMappingURL=insert.schema.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IdSchema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.IdSchema = joi_1.default.object()
    .keys({
    id: joi_1.default.number().required(),
})
    .options({ convert: true })
    .required();
//# sourceMappingURL=idSchema.validator.js.map
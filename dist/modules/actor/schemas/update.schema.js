"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateActorSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const propertyLength_1 = require("../../../common/constant/propertyLength");
exports.UpdateActorSchema = joi_1.default.object()
    .keys({
    name: joi_1.default.string().min(propertyLength_1.propertyLength.ACTOR.NAME.MIN).max(propertyLength_1.propertyLength.ACTOR.NAME.MAX).required(),
})
    .required();
//# sourceMappingURL=update.schema.js.map
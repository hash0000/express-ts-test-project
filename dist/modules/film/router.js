"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilmRouter = void 0;
const express_1 = require("express");
const httpStatusCode_enum_1 = require("../../common/enum/httpStatusCode.enum");
const jwt_middleware_1 = require("../../common/middleware/jwt.middleware");
const validationHandler_middleware_1 = require("../../common/middleware/validationHandler.middleware");
const idSchema_validator_1 = require("../../common/validation/idSchema.validator");
const insert_schema_1 = require("./schemas/insert.schema");
const update_schema_1 = require("./schemas/update.schema");
const service = __importStar(require("./service"));
const router = (0, express_1.Router)();
router.post('/film', jwt_middleware_1.AuthMiddleware, (0, validationHandler_middleware_1.ValidationMiddleware)(insert_schema_1.InsertFilmSchema, 'body'), async function (req, res) {
    try {
        const serviceResponse = await service.insert(req.body);
        return res.status(serviceResponse.statusCode).json(serviceResponse.data);
    }
    catch (e) {
        console.error(e);
        return res.status(httpStatusCode_enum_1.HttpStatusCode.INTERNAL_SERVER_ERROR).send();
    }
});
router.get('/films', jwt_middleware_1.AuthMiddleware, async function (_req, res) {
    try {
        const serviceResponse = await service.select();
        return res.status(serviceResponse.statusCode).json(serviceResponse.data);
    }
    catch (e) {
        console.error(e);
        return res.status(httpStatusCode_enum_1.HttpStatusCode.INTERNAL_SERVER_ERROR).send();
    }
});
router.get('/film/:id', jwt_middleware_1.AuthMiddleware, (0, validationHandler_middleware_1.ValidationMiddleware)(idSchema_validator_1.IdSchema, 'params'), async function (req, res) {
    try {
        const serviceResponse = await service.selectOne(req.params);
        return res.status(serviceResponse.statusCode).json(serviceResponse.data);
    }
    catch (e) {
        console.error(e);
        return res.status(httpStatusCode_enum_1.HttpStatusCode.INTERNAL_SERVER_ERROR).send();
    }
});
router.patch('/film/:id', jwt_middleware_1.AuthMiddleware, (0, validationHandler_middleware_1.ValidationMiddleware)(idSchema_validator_1.IdSchema, 'params'), (0, validationHandler_middleware_1.ValidationMiddleware)(update_schema_1.UpdateFilmSchema, 'body'), async function (req, res) {
    try {
        const serviceResponse = await service.update({ ...req.params, ...req.body });
        return res.status(serviceResponse.statusCode).json(serviceResponse.data);
    }
    catch (e) {
        console.error(e);
        return res.status(httpStatusCode_enum_1.HttpStatusCode.INTERNAL_SERVER_ERROR).send();
    }
});
router.delete('/film/:id', jwt_middleware_1.AuthMiddleware, (0, validationHandler_middleware_1.ValidationMiddleware)(idSchema_validator_1.IdSchema, 'params'), async function (req, res) {
    try {
        const serviceResponse = await service.destroy(req.params);
        return res.status(serviceResponse.statusCode).json(serviceResponse.data);
    }
    catch (e) {
        console.error(e);
        return res.status(httpStatusCode_enum_1.HttpStatusCode.INTERNAL_SERVER_ERROR).send();
    }
});
exports.FilmRouter = router;
//# sourceMappingURL=router.js.map
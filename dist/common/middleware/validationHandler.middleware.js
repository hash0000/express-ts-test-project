"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationMiddleware = void 0;
const joi_1 = require("joi");
const httpStatusCode_enum_1 = require("../enum/httpStatusCode.enum");
function ValidationMiddleware(schema, payloadKey) {
    return async function (request, response, next) {
        try {
            const validated = await schema.validateAsync(request[payloadKey], { allowUnknown: false, abortEarly: false, convert: false });
            request[payloadKey] = validated;
            return next();
        }
        catch (error) {
            const validationErrorArray = [];
            if (error instanceof joi_1.ValidationError) {
                for (const el of error.details) {
                    validationErrorArray.push({ property: el.context?.key, type: el.type, message: el.context?.message });
                }
                return response.status(httpStatusCode_enum_1.HttpStatusCode.UNPROCESSABLE_ENTITY).json({
                    statusCode: httpStatusCode_enum_1.HttpStatusCode.UNPROCESSABLE_ENTITY,
                    validationError: validationErrorArray,
                });
            }
            return response.status(httpStatusCode_enum_1.HttpStatusCode.INTERNAL_SERVER_ERROR).send();
        }
    };
}
exports.ValidationMiddleware = ValidationMiddleware;
//# sourceMappingURL=validationHandler.middleware.js.map
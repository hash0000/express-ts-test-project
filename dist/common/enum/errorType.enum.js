"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomErrorTypeEnum = exports.ValidationErrorType = void 0;
var ValidationErrorType;
(function (ValidationErrorType) {
    ValidationErrorType["NOT_UNIQUE"] = "not_unique";
    ValidationErrorType["NOT_FOUND"] = "not_found";
    ValidationErrorType["NOT_ALLOWED"] = "not_allowed";
})(ValidationErrorType || (exports.ValidationErrorType = ValidationErrorType = {}));
var CustomErrorTypeEnum;
(function (CustomErrorTypeEnum) {
    CustomErrorTypeEnum[CustomErrorTypeEnum["ERROR"] = 1000] = "ERROR";
})(CustomErrorTypeEnum || (exports.CustomErrorTypeEnum = CustomErrorTypeEnum = {}));
//# sourceMappingURL=errorType.enum.js.map
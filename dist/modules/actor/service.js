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
exports.selectOne = exports.select = exports.destroy = exports.update = exports.insert = void 0;
const errorType_enum_1 = require("../../common/enum/errorType.enum");
const httpStatusCode_enum_1 = require("../../common/enum/httpStatusCode.enum");
const repository = __importStar(require("./repository"));
async function insert(request) {
    const countActor = await repository.countUniversal('name', request.name);
    if (countActor !== 0) {
        return {
            statusCode: httpStatusCode_enum_1.HttpStatusCode.CONFLICT,
            validationError: [{ property: 'name', type: errorType_enum_1.ValidationErrorType.NOT_UNIQUE }],
        };
    }
    const data = await repository.insert(request);
    return {
        statusCode: httpStatusCode_enum_1.HttpStatusCode.CREATED,
        data,
    };
}
exports.insert = insert;
async function update(request) {
    const countActor = await repository.countUniversal('name', request.name, request.id);
    if (countActor !== 0) {
        return {
            statusCode: httpStatusCode_enum_1.HttpStatusCode.CONFLICT,
            validationError: [{ property: 'name', type: errorType_enum_1.ValidationErrorType.NOT_UNIQUE }],
        };
    }
    const data = await repository.update(request.id, request.name);
    return {
        statusCode: httpStatusCode_enum_1.HttpStatusCode.OK,
        data,
    };
}
exports.update = update;
async function destroy(request) {
    const countActor = await repository.countUniversal('id', request.id);
    if (countActor === 0) {
        return {
            statusCode: httpStatusCode_enum_1.HttpStatusCode.NOT_FOUND,
            validationError: [{ property: 'id', type: errorType_enum_1.ValidationErrorType.NOT_FOUND }],
        };
    }
    await repository.destroy(request.id);
    return {
        statusCode: httpStatusCode_enum_1.HttpStatusCode.OK,
    };
}
exports.destroy = destroy;
async function select() {
    const data = await repository.select();
    return {
        statusCode: httpStatusCode_enum_1.HttpStatusCode.OK,
        data,
    };
}
exports.select = select;
async function selectOne(request) {
    const data = await repository.selectOne(request.id);
    if (data === undefined) {
        return {
            statusCode: httpStatusCode_enum_1.HttpStatusCode.NOT_FOUND,
        };
    }
    return {
        statusCode: httpStatusCode_enum_1.HttpStatusCode.OK,
        data,
    };
}
exports.selectOne = selectOne;
//# sourceMappingURL=service.js.map
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
exports.login = exports.insert = void 0;
const argon = __importStar(require("argon2"));
const lodash_1 = require("lodash");
const errorType_enum_1 = require("../../common/enum/errorType.enum");
const httpStatusCode_enum_1 = require("../../common/enum/httpStatusCode.enum");
const genJwtToken_helper_1 = require("../../common/helper/genJwtToken.helper");
const repository = __importStar(require("./repository"));
async function insert(request) {
    const countActorByUsername = await repository.countUniversal('username', request.username);
    if (countActorByUsername !== 0) {
        return {
            statusCode: httpStatusCode_enum_1.HttpStatusCode.CONFLICT,
            validationError: [{ property: 'username', type: errorType_enum_1.ValidationErrorType.NOT_UNIQUE }],
        };
    }
    const countActorByEmail = await repository.countUniversal('email', request.email);
    if (countActorByEmail !== 0) {
        return {
            statusCode: httpStatusCode_enum_1.HttpStatusCode.CONFLICT,
            validationError: [{ property: 'email', type: errorType_enum_1.ValidationErrorType.NOT_UNIQUE }],
        };
    }
    const salt = process.env.JWT_SALT;
    if (salt === undefined) {
        return {
            statusCode: httpStatusCode_enum_1.HttpStatusCode.INTERNAL_SERVER_ERROR,
        };
    }
    const encrPass = await argon.hash(request.password, {
        type: 2,
        salt: Buffer.from(salt, 'utf-8'),
    });
    await repository.insert({ ...(0, lodash_1.omit)(request, ['password']), password: encrPass });
    return {
        statusCode: httpStatusCode_enum_1.HttpStatusCode.CREATED,
        data: {
            success: true,
        },
    };
}
exports.insert = insert;
async function login(request) {
    const data = await repository.selectOne(request.username);
    if (data === undefined) {
        return {
            statusCode: httpStatusCode_enum_1.HttpStatusCode.NOT_FOUND,
        };
    }
    const passwordMatches = await argon.verify(data.password, request.password);
    if (passwordMatches === false) {
        return {
            statusCode: httpStatusCode_enum_1.HttpStatusCode.BAD_GATEWAY,
        };
    }
    const token = (0, genJwtToken_helper_1.generateToken)({ id: data.id, username: data.username });
    const userData = (0, lodash_1.omit)(data, ['password']);
    return {
        statusCode: httpStatusCode_enum_1.HttpStatusCode.OK,
        data: {
            ...userData,
            token,
        },
    };
}
exports.login = login;
//# sourceMappingURL=service.js.map
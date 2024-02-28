"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpStatusCode = void 0;
var HttpStatusCode;
(function (HttpStatusCode) {
    HttpStatusCode[HttpStatusCode["CONTINUE"] = 100] = "CONTINUE";
    HttpStatusCode[HttpStatusCode["SWITCHING_PROTOCOLS"] = 101] = "SWITCHING_PROTOCOLS";
    HttpStatusCode[HttpStatusCode["PROCESSING"] = 102] = "PROCESSING";
    HttpStatusCode[HttpStatusCode["OK"] = 200] = "OK";
    HttpStatusCode[HttpStatusCode["CREATED"] = 201] = "CREATED";
    HttpStatusCode[HttpStatusCode["ACCEPTED"] = 202] = "ACCEPTED";
    HttpStatusCode[HttpStatusCode["NON_AUTHORITATIVE_INFORMATION"] = 203] = "NON_AUTHORITATIVE_INFORMATION";
    HttpStatusCode[HttpStatusCode["NO_CONTENT"] = 204] = "NO_CONTENT";
    HttpStatusCode[HttpStatusCode["RESET_CONTENT"] = 205] = "RESET_CONTENT";
    HttpStatusCode[HttpStatusCode["PARTIAL_CONTENT"] = 206] = "PARTIAL_CONTENT";
    HttpStatusCode[HttpStatusCode["MULTI_STATUS"] = 207] = "MULTI_STATUS";
    HttpStatusCode[HttpStatusCode["ALREADY_REPORTED"] = 208] = "ALREADY_REPORTED";
    HttpStatusCode[HttpStatusCode["IM_USED"] = 226] = "IM_USED";
    HttpStatusCode[HttpStatusCode["MULTIPLE_CHOICES"] = 300] = "MULTIPLE_CHOICES";
    HttpStatusCode[HttpStatusCode["MOVED_PERMANENTLY"] = 301] = "MOVED_PERMANENTLY";
    HttpStatusCode[HttpStatusCode["FOUND"] = 302] = "FOUND";
    HttpStatusCode[HttpStatusCode["SEE_OTHER"] = 303] = "SEE_OTHER";
    HttpStatusCode[HttpStatusCode["NOT_MODIFIED"] = 304] = "NOT_MODIFIED";
    HttpStatusCode[HttpStatusCode["USE_PROXY"] = 305] = "USE_PROXY";
    HttpStatusCode[HttpStatusCode["SWITCH_PROXY"] = 306] = "SWITCH_PROXY";
    HttpStatusCode[HttpStatusCode["TEMPORARY_REDIRECT"] = 307] = "TEMPORARY_REDIRECT";
    HttpStatusCode[HttpStatusCode["PERMANENT_REDIRECT"] = 308] = "PERMANENT_REDIRECT";
    HttpStatusCode[HttpStatusCode["BAD_REQUEST"] = 400] = "BAD_REQUEST";
    HttpStatusCode[HttpStatusCode["UNAUTHORIZED"] = 401] = "UNAUTHORIZED";
    HttpStatusCode[HttpStatusCode["PAYMENT_REQUIRED"] = 402] = "PAYMENT_REQUIRED";
    HttpStatusCode[HttpStatusCode["FORBIDDEN"] = 403] = "FORBIDDEN";
    HttpStatusCode[HttpStatusCode["NOT_FOUND"] = 404] = "NOT_FOUND";
    HttpStatusCode[HttpStatusCode["METHOD_NOT_ALLOWED"] = 405] = "METHOD_NOT_ALLOWED";
    HttpStatusCode[HttpStatusCode["NOT_ACCEPTABLE"] = 406] = "NOT_ACCEPTABLE";
    HttpStatusCode[HttpStatusCode["PROXY_AUTHENTICATION_REQUIRED"] = 407] = "PROXY_AUTHENTICATION_REQUIRED";
    HttpStatusCode[HttpStatusCode["REQUEST_TIMEOUT"] = 408] = "REQUEST_TIMEOUT";
    HttpStatusCode[HttpStatusCode["CONFLICT"] = 409] = "CONFLICT";
    HttpStatusCode[HttpStatusCode["GONE"] = 410] = "GONE";
    HttpStatusCode[HttpStatusCode["LENGTH_REQUIRED"] = 411] = "LENGTH_REQUIRED";
    HttpStatusCode[HttpStatusCode["PRECONDITION_FAILED"] = 412] = "PRECONDITION_FAILED";
    HttpStatusCode[HttpStatusCode["PAYLOAD_TOO_LARGE"] = 413] = "PAYLOAD_TOO_LARGE";
    HttpStatusCode[HttpStatusCode["URI_TOO_LONG"] = 414] = "URI_TOO_LONG";
    HttpStatusCode[HttpStatusCode["UNSUPPORTED_MEDIA_TYPE"] = 415] = "UNSUPPORTED_MEDIA_TYPE";
    HttpStatusCode[HttpStatusCode["RANGE_NOT_SATISFIABLE"] = 416] = "RANGE_NOT_SATISFIABLE";
    HttpStatusCode[HttpStatusCode["EXPECTATION_FAILED"] = 417] = "EXPECTATION_FAILED";
    HttpStatusCode[HttpStatusCode["I_AM_A_TEAPOT"] = 418] = "I_AM_A_TEAPOT";
    HttpStatusCode[HttpStatusCode["MISDIRECTED_REQUEST"] = 421] = "MISDIRECTED_REQUEST";
    HttpStatusCode[HttpStatusCode["UNPROCESSABLE_ENTITY"] = 422] = "UNPROCESSABLE_ENTITY";
    HttpStatusCode[HttpStatusCode["LOCKED"] = 423] = "LOCKED";
    HttpStatusCode[HttpStatusCode["FAILED_DEPENDENCY"] = 424] = "FAILED_DEPENDENCY";
    HttpStatusCode[HttpStatusCode["UPGRADE_REQUIRED"] = 426] = "UPGRADE_REQUIRED";
    HttpStatusCode[HttpStatusCode["PRECONDITION_REQUIRED"] = 428] = "PRECONDITION_REQUIRED";
    HttpStatusCode[HttpStatusCode["TOO_MANY_REQUESTS"] = 429] = "TOO_MANY_REQUESTS";
    HttpStatusCode[HttpStatusCode["REQUEST_HEADER_FIELDS_TOO_LARGE"] = 431] = "REQUEST_HEADER_FIELDS_TOO_LARGE";
    HttpStatusCode[HttpStatusCode["UNAVAILABLE_FOR_LEGAL_REASONS"] = 451] = "UNAVAILABLE_FOR_LEGAL_REASONS";
    HttpStatusCode[HttpStatusCode["INTERNAL_SERVER_ERROR"] = 500] = "INTERNAL_SERVER_ERROR";
    HttpStatusCode[HttpStatusCode["NOT_IMPLEMENTED"] = 501] = "NOT_IMPLEMENTED";
    HttpStatusCode[HttpStatusCode["BAD_GATEWAY"] = 502] = "BAD_GATEWAY";
    HttpStatusCode[HttpStatusCode["SERVICE_UNAVAILABLE"] = 503] = "SERVICE_UNAVAILABLE";
    HttpStatusCode[HttpStatusCode["GATEWAY_TIMEOUT"] = 504] = "GATEWAY_TIMEOUT";
    HttpStatusCode[HttpStatusCode["HTTP_VERSION_NOT_SUPPORTED"] = 505] = "HTTP_VERSION_NOT_SUPPORTED";
    HttpStatusCode[HttpStatusCode["VARIANT_ALSO_NEGOTIATES"] = 506] = "VARIANT_ALSO_NEGOTIATES";
    HttpStatusCode[HttpStatusCode["INSUFFICIENT_STORAGE"] = 507] = "INSUFFICIENT_STORAGE";
    HttpStatusCode[HttpStatusCode["LOOP_DETECTED"] = 508] = "LOOP_DETECTED";
    HttpStatusCode[HttpStatusCode["NOT_EXTENDED"] = 510] = "NOT_EXTENDED";
    HttpStatusCode[HttpStatusCode["NETWORK_AUTHENTICATION_REQUIRED"] = 511] = "NETWORK_AUTHENTICATION_REQUIRED";
})(HttpStatusCode || (exports.HttpStatusCode = HttpStatusCode = {}));
//# sourceMappingURL=httpStatusCode.enum.js.map
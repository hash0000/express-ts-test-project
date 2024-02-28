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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importStar(require("express"));
const consoleColor_constant_1 = require("./common/constant/consoleColor.constant");
const kysely_plugin_1 = require("./common/plugin/kysely.plugin");
const router_1 = require("./modules/actor/router");
const router_2 = require("./modules/film/router");
const router_3 = require("./modules/user/router");
async function app() {
    const app = (0, express_1.default)();
    const port = Number(process.env.APP_PORT);
    const host = String(process.env.APP_HOST);
    await (0, kysely_plugin_1.kyselyPlugin)(app);
    app.use(express_1.default.json());
    app.use((0, cors_1.default)());
    app.use(express_1.default.json({ limit: '50mb' }));
    const router = (0, express_1.Router)();
    router.use('', router_1.ActorRouter);
    router.use('', router_3.UserRouter);
    router.use('', router_2.FilmRouter);
    app.use('/api', router);
    app.listen(port, host);
}
void app()
    .then(function () {
    console.info(consoleColor_constant_1.consoleColor.FG.BLUE, `[APP] Server listening on ${process.env.APP_HOST}:${process.env.APP_PORT}`);
})
    .catch(function (e) {
    console.info(consoleColor_constant_1.consoleColor.FG.RED, '[APP] App crushed while starting. See details:');
    console.error(e);
    process.exit(1);
});
//# sourceMappingURL=main.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.kyselyPlugin = exports.kysely = void 0;
const better_sqlite3_1 = __importDefault(require("better-sqlite3"));
const kysely_1 = require("kysely");
const consoleColor_constant_1 = require("../constant/consoleColor.constant");
async function kyselyPlugin(app) {
    try {
        const sqliteDialect = new kysely_1.SqliteDialect({
            database: new better_sqlite3_1.default('./database/sqlite.db'),
        });
        const db = new kysely_1.Kysely({
            dialect: sqliteDialect,
            plugins: [new kysely_1.ParseJSONResultsPlugin()],
        });
        console.info(consoleColor_constant_1.consoleColor.FG.GREEN, '[APP] Kysely: connection established');
        exports.kysely = db;
        app.on('onClose', async () => {
            await db.destroy();
            await exports.kysely.destroy();
        });
    }
    catch (e) {
        console.info(consoleColor_constant_1.consoleColor.FG.RED, '[APP] Kysely: failed to establish database connection. See details:');
        console.error(e);
        process.exit(1);
    }
}
exports.kyselyPlugin = kyselyPlugin;
//# sourceMappingURL=kysely.plugin.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const config_1 = require("./utils/config");
const db_1 = require("./utils/db");
const startServer = async () => {
    await (0, db_1.connectToDatabase)();
    app_1.default.listen(config_1.PORT, () => {
        console.log(`Server running on port ${config_1.PORT}`);
    });
};
startServer().catch((err) => {
    console.error('Failed to start server:', err);
    process.exit(1);
});

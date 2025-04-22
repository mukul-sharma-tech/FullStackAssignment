"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = require("body-parser");
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const createApp = () => {
    const app = (0, express_1.default)();
    app.use((0, cors_1.default)());
    app.use((0, body_parser_1.json)());
    // Routes
    app.use('/api/users', user_routes_1.default);
    // Health check
    app.get('/api/health', (req, res) => {
        res.json({ status: 'ok' });
    });
    return app;
};
exports.default = createApp;

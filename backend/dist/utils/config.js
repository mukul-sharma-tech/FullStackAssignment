"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_SECRET = exports.PORT = void 0;
require("dotenv/config");
exports.PORT = process.env.PORT || 3001;
exports.JWT_SECRET = process.env.JWT_SECRET || 'secret';

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const zod_1 = require("zod");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = __importDefault(require("../utils/db"));
const config_1 = require("../utils/config");
// Zod schemas
const registerSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
});
const loginSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
});
const register = async (req, res) => {
    try {
        const { email, password } = registerSchema.parse(req.body);
        // Check if user already exists
        const existingUser = await db_1.default.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }
        // Hash password
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        // Create user
        const user = await db_1.default.user.create({
            data: {
                email,
                password: hashedPassword,
            },
        });
        // Create JWT token
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, config_1.JWT_SECRET, {
            expiresIn: '1h',
        });
        res.status(201).json({ token, email: user.email });
    }
    catch (err) {
        if (err instanceof zod_1.z.ZodError) {
            return res.status(400).json({ message: err.errors });
        }
        res.status(500).json({ message: 'Something went wrong' });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = loginSchema.parse(req.body);
        // Find user
        const user = await db_1.default.user.findUnique({
            where: { email },
        });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        // Check password
        const isPasswordValid = await bcryptjs_1.default.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        // Create JWT token
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, config_1.JWT_SECRET, {
            expiresIn: '1h',
        });
        res.json({ token, email: user.email });
    }
    catch (err) {
        if (err instanceof zod_1.z.ZodError) {
            return res.status(400).json({ message: err.errors });
        }
        res.status(500).json({ message: 'Something went wrong' });
    }
};
exports.login = login;

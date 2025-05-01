"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = require("./db");
const config_1 = require("./config");
const middleware_1 = require("./middleware");
const utils_1 = require("./utils");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// Signup route
app.post("/api/v1/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        yield db_1.User.create({ email, password });
        res.json({ message: "Signed up successfully" });
    }
    catch (e) {
        res.status(411).json({ error: e });
    }
}));
// Signin route
app.post("/api/v1/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            res
                .status(403)
                .json({ message: "Email and password both are required" });
            return;
        }
        if (password.length < 8) {
            res
                .status(400)
                .json({ message: "Password should be at least 8 characters long" });
            return;
        }
        const findUser = yield db_1.User.findOne({ email });
        if (findUser) {
            const token = jsonwebtoken_1.default.sign({ id: findUser._id }, config_1.JWT_SECRET);
            res.json({
                token,
                message: "Signed in successfully",
            });
        }
        else {
            res.status(403).json({ message: "Incorrect credentials" });
        }
    }
    catch (e) {
        res.status(403).json({ message: "Error in signin handler" });
    }
}));
// Add content route
app.post("/api/v1/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, link, type } = req.body;
    try {
        yield db_1.Content.create({
            title,
            link,
            type,
            tags: [],
            userId: req.userId,
        });
        res.json({ message: "Content added" });
    }
    catch (e) {
        res.status(500).json({ message: "Failed to add content" });
    }
}));
// Get content route
app.get("/api/v1/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.userId;
        const content = yield db_1.Content.find({ userId }).populate("userId", "email");
        res.json({ content });
    }
    catch (e) {
        res.status(500).json({ message: "Failed to fetch content" });
    }
}));
// Delete content route
app.delete("/api/v1/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { contentId } = req.body;
    try {
        yield db_1.Content.deleteMany({ contentId, userId: req.userId });
        res.json({ message: "Deleted" });
    }
    catch (e) {
        res.status(500).json({ message: "Failed to delete content" });
    }
}));
app.post("/api/v1/brain/share", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const share = req.body.share;
    if (share) {
        const existinguser = yield db_1.LinkModel.findOne({
            userId: req.userId
        });
        if (existinguser) {
            res.json({
                hash: existinguser.hash
            });
            return;
        }
        const hash = (0, utils_1.random)(10);
        yield db_1.LinkModel.create({
            userId: req.userId,
            hash: hash
        });
        res.json({
            hash
        });
    }
    else {
        yield db_1.LinkModel.deleteOne({
            userId: req.userId
        });
    }
    res.json({ message: "updated sharable link" });
}));
app.post("/api/v1/brain/:shareLink", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = req.params.shareLink;
    const link = yield db_1.LinkModel.findOne({
        hash
    });
    if (!link) {
        res.json({
            message: "invalid link"
        });
        return;
    }
    const allContent = yield db_1.Content.find({
        userId: link.userId
    });
    const user = yield db_1.User.findOne({
        _id: link.userId
    });
    if (!user) {
        res.json({
            message: "user does not exist"
        });
        return;
    }
    res.json({
        email: user.email,
        allContent
    });
}));
// Start server
app.listen(3000, () => {
    console.log("Listening on port 3000");
});

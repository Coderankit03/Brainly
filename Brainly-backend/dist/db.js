"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkModel = exports.Content = exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.connect("mongodb+srv://ankitya1608:y7rt99uEWR13NW99@cluster0.rupg951.mongodb.net/brainly")
    .then(() => {
    console.log("db connected");
})
    .catch(e => { console.log(e); });
const UserSchema = new mongoose_1.default.Schema({
    email: { type: String, required: true, unique: true },
    password: String
});
exports.User = mongoose_1.default.model("User", UserSchema);
const ContentSchema = new mongoose_1.default.Schema({
    title: String,
    link: String,
    type: String,
    tag: [{ type: mongoose_1.default.Types.ObjectId, ref: 'Tag' }],
    userId: { type: mongoose_1.default.Types.ObjectId, ref: 'User', required: true }
});
exports.Content = mongoose_1.default.model("Content", ContentSchema);
const LinkSchema = new mongoose_1.default.Schema({
    hash: String,
    userId: { type: mongoose_1.default.Types.ObjectId, ref: 'User', required: true, unique: true }
});
exports.LinkModel = mongoose_1.default.model("Links", LinkSchema);

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.random = void 0;
const random = (len) => {
    let options = "qwertyuiopasdfghjklzxcvbnm1234567890";
    let length = options.length;
    let ans = "";
    for (let i = 0; i <= len; i++) {
        ans += options[Math.floor(Math.random() * length)];
    }
    return ans;
};
exports.random = random;
(0, exports.random)(10);

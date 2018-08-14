"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Timestamp = /** @class */ (function () {
    function Timestamp(date) {
        this.unix = date.getTime();
        this.utc = date.toUTCString();
    }
    return Timestamp;
}());
exports.Timestamp = Timestamp;

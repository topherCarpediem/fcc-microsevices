"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = express_1.Router();
router.get('/', function (request, response) {
    var contextObject = {
        ipaddress: request.ip,
        language: request.headers['user-agent'],
        software: request.headers['accept-language']
    };
    response.json(contextObject);
});
exports.WhoAmIController = router;

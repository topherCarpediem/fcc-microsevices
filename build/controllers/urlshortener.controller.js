"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var dns_1 = require("dns");
var url_1 = __importDefault(require("url"));
var express_1 = require("express");
// Instantiate a router object
var router = express_1.Router();
var filePath = 'urls.json';
// #############################################
// Middleware
// #############################################
function bodyParser(request, response, next) {
    var buffer = '';
    request.on('data', function (chunk) {
        buffer += chunk;
    });
    request.on('end', function () {
        var requestBody = JSON.parse(buffer);
        if (!requestBody.url_input) {
            response.status(400).send({
                'error': 'The request does not contain a body that needs to proccess your request. Double check if it has a url_input body'
            });
            return;
        }
        request.body = requestBody;
        next();
    });
}
// #############################################
// Routes
// #############################################
router.post('/new', bodyParser, function (request, response) {
    var requestBody = request.body;
    fs_1.default.readFile(filePath, 'utf8', function (err, data) {
        var options = {
            family: 6,
            hints: dns_1.ADDRCONFIG | dns_1.V4MAPPED,
        };
        var readUrls = JSON.parse(data);
        var urls = readUrls['urls'];
        //const isUrlExist: boolean = checkIfExist(urls, requestBody.url_input);
        var isUrlValid = checkIfValidUrl(requestBody.url_input);
        if (!isUrlValid) {
            response.status(400).send({
                'error': 'invalid URL'
            });
            return;
        }
        var hostName = url_1.default.parse(requestBody.url_input).hostname;
        dns_1.lookup(hostName, options, function (err, address, family) {
            if (err !== null) {
                response.status(400).send({
                    'error': 'invalid URL'
                });
                return;
            }
            urls.push({
                "id": urls.length + 1,
                "url": hostName
            });
            var newFile = {
                "urls": urls
            };
            var jsonString = JSON.stringify(newFile, null, 4);
            fs_1.default.writeFile(filePath, jsonString, 'utf8', function (err) {
                console.log('The file has been saved!');
                response.json({ "original_url": hostName, "short_url": urls.length });
            });
        });
    });
});
router.get('/:id', function (request, response) {
    var id = request.params.id;
    fs_1.default.readFile(filePath, 'utf8', function (err, data) {
        var readFile = JSON.parse(data);
        var urls = readFile['urls'];
        var foundUrl = false;
        urls.forEach(function (item) {
            if (item.id == id) {
                foundUrl = true;
                response.redirect("http://" + item.url);
            }
        });
        if (!foundUrl) {
            response.status(404).send({
                'error': 'Url not found'
            });
        }
    });
});
// #############################################
// Utils
// #############################################
/**
 * @param  {any} urls
 * @param  {string} key
 * @returns {boolean}
 */
function checkIfExist(urls, key) {
    var exist = false;
    for (var _i = 0, _a = urls['urls']; _i < _a.length; _i++) {
        var item = _a[_i];
        if (item.hasOwnProperty(key)) {
            exist = true;
            break;
        }
        console.log(item);
    }
    return exist;
}
/**
 * @param  {string} inputUrl
 * @returns {boolean}
 */
function checkIfValidUrl(inputUrl) {
    var outputUrl = url_1.default.parse(inputUrl);
    if (outputUrl.protocol) {
        if (outputUrl.hostname) {
            return true;
        }
    }
    return false;
}
exports.UrlShortenerController = router;

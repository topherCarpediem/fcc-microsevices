"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var core_1 = require("../core");
// Instantiate a router object
var router = express_1.Router();
router.get('/:dateString?', function (request, response) {
    // Extract the dateString from the request parameters
    var dateString = request.params.dateString;
    // Check if the dateString is not null or undefined
    if (dateString) {
        // do nothing
    }
    else {
        // Set the dateString into the current date
        dateString = new Date().toISOString();
    }
    // Convert the dateString into a Date object
    var date = new Date(dateString);
    // Check if the date is not valid date
    // Return an error after detecting that the dateString indeed an invalid date
    if (isNaN(Date.parse(dateString))) {
        response.status(400).send({ "error": "Invalid Date" });
        return;
    }
    // Create a new Timestamp object
    var responseTimestamp = new core_1.Timestamp(date);
    // Return a json response
    response.json(responseTimestamp);
});
// Export our controller
exports.TimeStampController = router;

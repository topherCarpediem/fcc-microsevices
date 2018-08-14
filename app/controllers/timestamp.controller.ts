import { Router, Request, Response } from "express";
import { Timestamp } from "../core";

// Instantiate a router object
const router: Router = Router();

router.get('/:dateString?', (request: Request, response: Response) => {

    // Extract the dateString from the request parameters
    let { dateString } = request.params

    // Check if the dateString is not null or undefined
    if (dateString) {
        // do nothing
    } else {
        // Set the dateString into the current date
        dateString = new Date().toISOString();
    }
    
    // Convert the dateString into a Date object
    let date: Date = new Date(dateString);
    
    // Check if the date is not valid date
    // Return an error after detecting that the dateString indeed an invalid date
    if (isNaN(Date.parse(dateString))){
        response.status(400).send({ "error": "Invalid Date"});
        return;
    }

    // Create a new Timestamp object
    const responseTimestamp: Timestamp = new Timestamp(date);

    // Return a json response
    response.json(responseTimestamp)

});

// Export our controller
export const TimeStampController: Router = router;
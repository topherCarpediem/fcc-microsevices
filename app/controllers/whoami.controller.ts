import { Router, Request, Response } from "express";

const router: Router = Router();

router.get('/', (request: Request, response: Response) => {

    const contextObject = {
        ipaddress: request.headers['x-forwarded-for'] || 
        request.connection.remoteAddress || 
        request.socket.remoteAddress || request.connection.remoteAddress,
        
        language: request.headers['user-agent'],
        software: request.headers['accept-language']
    };

    response.json(contextObject);
});

export const WhoAmIController: Router = router;
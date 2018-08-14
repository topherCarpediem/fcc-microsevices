import { Router, Request, Response } from "express";

const router: Router = Router();

router.get('/', (request: Request, response: Response) => {

    const contextObject = {
        ipaddress: request.ip,
        language: request.headers['user-agent'],
        software: request.headers['accept-language']
    };

    response.json(contextObject);
});

export const WhoAmIController: Router = router;
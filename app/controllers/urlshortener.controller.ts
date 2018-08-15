import fs from "fs";
import { lookup, ADDRCONFIG, V4MAPPED } from "dns";
import url, { Url } from "url";

import { Router, Request, Response, NextFunction } from "express";
import { request } from "http";

// Instantiate a router object
const router: Router = Router();
const filePath = 'urls.json'

interface PostBody {
    url_input: string
}

interface JsonSchema {
    url: string,
    id: string
}

// #############################################
// Middleware
// #############################################
function bodyParser(request: Request, response: Response, next: NextFunction) {
    let buffer: string = '';

    request.on('data', (chunk: any) => {
        buffer += chunk;
    })

    request.on('end', () => {

        const requestBody: PostBody = JSON.parse(buffer) as PostBody

        if (!requestBody.url_input) {
            response.status(400).send({
                'error': 'The request does not contain a body that needs to proccess your request. Double check if it has a url_input body'
            });
            return
        }
        request.body = requestBody
        next();
    })
}

// #############################################
// Routes
// #############################################
router.post('/new', bodyParser, (request: Request, response: Response) => {

    const requestBody: PostBody = request.body as PostBody;

    fs.readFile(filePath, 'utf8', (err, data) => {

        const options = {
            family: 6,
            hints: ADDRCONFIG | V4MAPPED,
        };

        const readUrls: any = JSON.parse(data);
        const urls: Array<object> = readUrls['urls']

        //const isUrlExist: boolean = checkIfExist(urls, requestBody.url_input);
        const isUrlValid: boolean = checkIfValidUrl(requestBody.url_input);

        if (!isUrlValid) {
            response.status(400).send({
                'error': 'invalid URL'
            })
            return;
        }
        const hostName: any = url.parse(requestBody.url_input).hostname;

        lookup(hostName, options, (err, address, family) => {

            if (err !== null) {
                response.status(400).send({
                    'error': 'invalid URL'
                })
                return;
            }

            urls.push({
                "id": urls.length + 1,
                "url": hostName
            })

            const newFile: object = {
                "urls": urls
            }

            const jsonString = JSON.stringify(newFile, null, 4)

            fs.writeFile(filePath, jsonString, 'utf8', (err: any) => {
                console.log('The file has been saved!');

                response.json({ "original_url": hostName, "short_url": urls.length })
            })

        });
    });

});


router.get('/:id', (request: Request, response: Response) => {

    const { id } = request.params;

    fs.readFile(filePath, 'utf8', (err, data) => {

        const readFile = JSON.parse(data);
        const urls: Array<JsonSchema> = readFile['urls']
        let foundUrl: boolean = false;

        urls.forEach(item => {
            if (item.id == id) {
                foundUrl = true;
                response.redirect(`http://${item.url}`)
            }
        });

        if (!foundUrl) {
            response.status(404).send({
                'error': 'Url not found'
            })
        }
    });
})

// #############################################
// Utils
// #############################################
/**
 * @param  {any} urls
 * @param  {string} key
 * @returns {boolean}
 */
function checkIfExist(urls: any, key: string): boolean {

    let exist: boolean = false;

    for (const item of urls['urls']) {
        if (item.hasOwnProperty(key)) {
            exist = true
            break;
        }
        console.log(item)
    }
    return exist;
}

/**
 * @param  {string} inputUrl
 * @returns {boolean}
 */
function checkIfValidUrl(inputUrl: string): boolean {
    const outputUrl: Url = url.parse(inputUrl)

    if (outputUrl.protocol) {
        if (outputUrl.hostname) {
            return true;
        }
    }

    return false;
}

export const UrlShortenerController: Router = router;
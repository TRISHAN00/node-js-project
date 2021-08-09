/*
 *
 * Title: Handler Request Response
 * Description: Handler Request Response
 * Author: Trishan Saha
 * Date: 03-Aug-2021
 *
 */

// dependencies
const url = require('url');
const { StringDecoder } = require('string_decoder');
const routes = require('../routes');
const { notFoundHandler } = require('../handlers/notFoundHandler');
const { parseJSON } = require('./utilities');

// module scaffolding
const handler = {};

handler.handleReqRes = (req, res) => {
    // get request method handle
    const parseUrl = url.parse(req.url, true);
    const path = parseUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');
    const method = req.method.toLowerCase();
    const queryObject = parseUrl.query;
    const headerObject = req.headers;

    // requestProperties
    const requiestProperties = {
        parseUrl,
        path,
        trimmedPath,
        method,
        queryObject,
        headerObject,
    };

    // string decoder
    const decoder = new StringDecoder('utf-8');
    let realData = '';

    // choose handler which is currently in path
    const choseHandler = routes[trimmedPath] ? routes[trimmedPath] : notFoundHandler;

    // post request handler
    req.on('data', (buffer) => {
        realData += decoder.write(buffer);
    });

    req.on('end', () => {
        realData += decoder.end();

        requiestProperties.body = parseJSON(realData);

        // call chosen handler
        choseHandler(requiestProperties, (statusCode, payload) => {
            statusCode = typeof statusCode === 'number' ? statusCode : 500;
            payload = typeof payload === 'object' ? payload : {};
            const payloadString = JSON.stringify(payload);

            // final response
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(statusCode);
            res.end(payloadString);
        });
        console.log(realData);
        // handle response
        res.end('hello ....');
    });
};

module.exports = handler;

/*
 *
 * Title: Not Found Route Handler
 * Description: 404 Not Found Route Handler
 * Author: Trishan Saha
 * Date: 03-Aug-2021
 *
 */
// module scaffolding
const handler = {};

handler.notFoundHandler = (requiestProperties, callback) => {
    callback(404, {
        message: 'this is Not Found url',
    });
};

module.exports = handler;

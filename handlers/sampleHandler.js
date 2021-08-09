/*
 *
 * Title: Sample Route Handler
 * Description: Sample Route Handler
 * Author: Trishan Saha
 * Date: 03-Aug-2021
 *
 */

// dependencies

// module scaffolding
const handler = {};

handler.sampleHandler = (requiestProperties, callback) => {
    console.log(requiestProperties);
    callback(200, {
        message: 'this is sample url',
    });
};

module.exports = handler;

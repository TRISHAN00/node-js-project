/*
 *
 * Title: Route Handling
 * Description: Route Handling
 * Author: Trishan Saha
 * Date: 03-Aug-2021
 *
 */

const { sampleHandler } = require('./handlers/sampleHandler');
const { userHandler } = require('./handlers/userHandler');

// dependencies

// module scaffolding
const routes = {
    sample: sampleHandler,
    users: userHandler,
};

module.exports = routes;

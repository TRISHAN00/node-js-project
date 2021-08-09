/*
 *
 * Title: Utilities
 * Description: Utilities
 * Author: Trishan Saha
 * Date: 03-Aug-2021
 *
 */

// dependencies
const crypto = require('crypto');
const environment = require('./environments');
// module scaffolding
const utilities = {};

// jsong file to string
utilities.parseJSON = (jsongString) => {
    let output;
    try {
        output = JSON.parse(jsongString);
    } catch {
        output = {};
    }
    return output;
};

// hash any string data
utilities.hash = (str) => {
    if (typeof str === 'string' && str > 0) {
        const hash = crypto.createHmac('sha256', environment.secretKey).update(str).digest('hex');
        return hash;
    }

    return false;
};

module.exports = utilities;

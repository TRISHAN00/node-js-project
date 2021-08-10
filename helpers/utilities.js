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

// module scaffolding
const utilities = {};

// make string to object
utilities.passeJSON = (jsonString) => {
    let output;

    try {
        output = JSON.parse(jsonString);
    } catch {
        output = {};
    }
    return output;
};

// hash
utilities.hash = (str) => {
    if (typeof str === 'string' && str.length > 0) {
        const hash = crypto
            .createHmac('sha256', 'asdfljaslkdjflkjsldkfj')
            .update(str)
            .digest('hex');
        return hash;
    }

    return false;
};

module.exports = utilities;

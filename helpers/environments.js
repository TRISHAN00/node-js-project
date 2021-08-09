/* eslint-disable operator-linebreak */
/*
 *
 * Title: Environment Handle
 * Description: Environment Handle
 * Author: Trishan Saha
 * Date: 03-Aug-2021
 *
 */

// dependencies
// module scaffolding
const environment = {};

environment.staging = {
    port: 3000,
    envName: 'staging',
    secretKey: 'kjsadlfjklasdjfklsjafk',
};

environment.production = {
    port: 5000,
    envName: 'production',
    secretKey: 'lkjaslkdfjsadfkasjdlf',
};

// find out current environment
// eslint-disable-next-line operator-linebreak
const currentEnvironment =
    typeof process.env.NODE_ENV === 'string' ? process.env.NODE_ENV : 'staging';

// Export to Environment
const exportToEnvironment =
    typeof environment[currentEnvironment] === 'object'
        ? environment[currentEnvironment]
        : environment.staging;

module.exports = exportToEnvironment;

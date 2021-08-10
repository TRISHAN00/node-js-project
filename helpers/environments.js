/*
 *
 * Title: Environment Declare
 * Description: Environment Declare
 * Author: Trishan Saha
 * Date: 03-Aug-2021
 *
 */

// dependencies

// module scaffolding
const environments = {};

environments.staging = {
    port: 3000,
    envName: 'staging',
};
environments.production = {
    port: 5000,
    envName: 'production',
};

const currentEnvironment =    typeof process.env.NODE_ENV === 'string' ? process.env.NODE_ENV : 'staging';

const exportToEnvironment = environments[currentEnvironment]
    ? environments[currentEnvironment]
    : environments.staging;
// export environment
module.exports = exportToEnvironment;

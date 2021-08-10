/*
 *
 * Title: User Route Handler
 * Description: User Route Handler
 * Author: Trishan Saha
 * Date: 03-Aug-2021
 *
 */

// dependencies
const { hash } = require('../helpers/utilities');
const data = require('../lib/data');
// module scaffolding
const handler = {};

handler.userHandler = (requiestProperties, callback) => {
    const acceptedMethod = ['get', 'post', 'put', 'delete'];
    if (acceptedMethod.indexOf(requiestProperties.method) > -1) {
        handler._users[requiestProperties.method](requiestProperties, callback);
    } else {
        callback(405);
    }
};

// user module scaffolding
handler._users = {};

handler._users.post = (requiestProperties, callback) => {
    // firstname validation
    const firstName = typeof requiestProperties.body.firstName === 'string';
    requiestProperties.body.firstName.trim().length > 0 ? requiestProperties.body.firstName : false;

    // lastName
    const lastName = typeof requiestProperties.body.lastName === 'string';
    requiestProperties.body.lastName.trim().length > 0 ? requiestProperties.body.lastName : false;

    // password
    const password = typeof requiestProperties.body.password === 'string';
    requiestProperties.body.password.trim().length > 0 ? requiestProperties.body.password : false;

    // phone number
    const phone = typeof requiestProperties.body.phone === 'string';
    requiestProperties.body.phone.trim().length === 11 ? requiestProperties.body.phone : false;

    // tosAgreement
    const tosAgreement = typeof requiestProperties.body.tosAgreement === 'boolean';
    requiestProperties.body.tosAgreement.trim().length > 0
        ? requiestProperties.body.tosAgreement
        : false;

    // check all the field
    if (firstName && lastName && password && phone && tosAgreement) {
        // make sure that the user already exist or not
        data.read('users', phone, (err1) => {
            if (err1) {
                const userObject = {
                    firstName,
                    lastName,
                    phone,
                    password: hash(password),
                    tosAgreement,
                };
                // store the user to db
                data.create('users', phone, userObject, (err2) => {
                    if (!err2) {
                        callback(200, {
                            message: 'user created seccessfully',
                        });
                    } else {
                        callback(500, { error: 'could not created user' });
                    }
                });
            } else {
                callback(500, {
                    error: 'there was a problem in your server side',
                });
            }
        });
    } else {
        callback(400, {
            error: 'you have a problemn in your request',
        });
    }
};

handler._users.get = (requiestProperties, callback) => {
    callback(200);
};

handler._users.put = (requiestProperties, callback) => {};

handler._users.delete = (requiestProperties, callback) => {};

module.exports = handler;

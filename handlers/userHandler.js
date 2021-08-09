/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-expressions */
/*
 *
 * Title: User Route Handler
 * Description: User Route Handler
 * Author: Trishan Saha
 * Date: 03-Aug-2021
 *
 */

// dependencies
const data = require('../lib/data');
const { hash } = require('../helpers/utilities');

// module scaffolding
const handler = {};

handler.userHandler = (requiestProperties, callback) => {
    // accepted method
    const acceptedMethods = ['get', 'post', 'put', 'delete'];
    if (acceptedMethods.indexOf(requiestProperties.method) > -1) {
        handler._user[requiestProperties.method](requiestProperties, callback);
    } else {
        callback(405);
    }
};

// user module scaffolding
handler._user = {};

handler._user.post = (requiestProperties, callback) => {
    const firstName = typeof requiestProperties.body.firstName === 'string';
    // eslint-disable-next-line no-unused-expressions
    requiestProperties.body.firstName.trim().length > 0 ? requiestProperties.body.firstName : false;

    const lastName = typeof requiestProperties.body.lastName === 'string';
    requiestProperties.body.lastName.trim().length > 0 ? requiestProperties.body.lastName : false;

    const phone = typeof requiestProperties.body.phone === 'string';
    requiestProperties.body.phone.trim().length === 10 ? requiestProperties.body.lastName : false;

    const password = typeof requiestProperties.body.password === 'string';
    requiestProperties.body.password.trim().length > 0 ? requiestProperties.body.lastName : false;

    const tosAgreement = typeof requiestProperties.body.tosAgreement === 'boolean';
    requiestProperties.body.tosAgreement.trim().length > 0
        ? requiestProperties.body.tosAgreement
        : false;

    if (firstName && lastName && phone && password && tosAgreement) {
        // make sure already have data in req
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
                            message: 'user created succesfully',
                        });
                    } else {
                        callback(500, {
                            error: 'could not create user',
                        });
                    }
                });
            } else {
                callback(500, {
                    error: 'there was a problem in server side',
                });
            }
        });
    } else {
        callback(400, {
            error: 'You have a problem',
        });
    }
};
module.exports = handler;

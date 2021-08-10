/*
 *
 * Title: UP TIME MONITORING APPLICATION
 * Description: A RESTFUL API to monitor up or down time defined link
 * Author: Trishan Saha
 * Date: 03-Aug-2021
 *
 */

// dependencies

const http = require('http');
const { handleReqRes } = require('./helpers/handleReqRes');


// module scaffolding
const app = {};

// configaration
app.config = {
    port: 3000,
};

// create server
app.createServer = () => {
    const server = http.createServer(app.handleReqRes);
    server.listen(app.config.port, () => {
        console.log(`listening to port ${app.config.port}`);
    });
};

// handle req res
app.handleReqRes = handleReqRes;

// start the server
app.createServer();

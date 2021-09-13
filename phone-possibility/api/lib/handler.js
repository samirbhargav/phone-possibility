/*
 * Request Handlers
 *
*/


// Dependencies
const service = require('./service').predict;

// Define all the handlers
var handlers = {};


handlers.process = async (req, res) => {
    let phone = req.query.phone;
    const result = service(phone);
    res.status(200).send({
        data: result
    })
}

module.exports = handlers
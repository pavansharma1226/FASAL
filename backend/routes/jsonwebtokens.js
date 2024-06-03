const jwt = require('jsonwebtoken');

let generateToken = function(data){
    let finalData = JSON.stringify(data);
    let token = jwt.sign(finalData, "AMITKUMAR");
    return token;
}

module.exports = generateToken;
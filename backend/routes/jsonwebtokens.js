const jwt = require('jsonwebtoken');

let generateToken = function(data){
    let finalData = JSON.stringify(data);
    let token = jwt.sign(finalData, "PavanSharma");
    return token;
}

module.exports = generateToken;
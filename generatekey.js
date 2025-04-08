const crypto = require('crypto');
const secretKey = crypto.randomBytes(32).toString('hex'); // 32 bytes
console.log("Generated Secret Key:", secretKey);

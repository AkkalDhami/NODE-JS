// const crypto = require("crypto");

// const randomValue = crypto.randomBytes(8).toString("hex");
// console.log(randomValue);

// const hashValue = crypto
//     .createHash("sha256")
//     .update("thapa technical")
//     .digest("hex");
// console.log(hashValue);

// //! d2328fb75fbfca19f37dd7f5e76aa6c459b97971ddb90a44f174232abd88048d

const crypto = require('crypto');

//! Key Features of the crypto Module:
//? 1. Hashing (e.g., SHA, MD5)
const hash = crypto.createHash('sha256');
hash.update('Hello, world!');
console.log(hash.digest('hex'));  // Outputs the hash as a hexadecimal string


//? 2. HMAC (Hash-based Message Authentication Code)
const hmac = crypto.createHmac('sha256', 'secret-key');
hmac.update('some data');
console.log(hmac.digest('hex'));  // Outputs the HMAC hash


//? 3. Encryption and Decryption
const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(32);  // Secret key for AES
const iv = crypto.randomBytes(16);   // Initialization vector for AES

//* Encrypting data
const cipher = crypto.createCipheriv(algorithm, key, iv);
let encrypted = cipher.update('Hello, world!', 'utf8', 'hex');
encrypted += cipher.final('hex');
console.log(encrypted);  // Outputs encrypted data

//* Decrypting data
const decipher = crypto.createDecipheriv(algorithm, key, iv);
let decrypted = decipher.update(encrypted, 'hex', 'utf8');
decrypted += decipher.final('utf8');
console.log(decrypted);  // Outputs 'Hello, world!'


//? 4. Generating Random Values
const randomValue = crypto.randomBytes(16).toString('hex');
console.log(randomValue);


//? 5. Public and Private Key Encryption (Asymmetric)
const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,  // Key size
});

//* Encrypt data using the public key
const encryptedData = crypto.publicEncrypt(publicKey, Buffer.from('Hello, world!'));
console.log(encryptedData.toString('hex'));  // Encrypted data

//* Decrypt data using the private key
const decryptedData = crypto.privateDecrypt(privateKey, encryptedData);
console.log(decryptedData.toString());  // Outputs 'Hello, world!'
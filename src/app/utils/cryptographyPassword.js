const bcrypt = require('bcryptjs');

async function cryptography(value) {
    const sizeHash = 8;

    try {
        return await bcrypt.hash(value, sizeHash)
    } catch (error) {
        console.log(Error)
    }
}

async function decipher(originValue, cryptographyValue) {
    const returno = await bcrypt.compare(originValue, cryptographyValue);
    return returno
}

module.exports = {
    cryptography,
    decipher
};
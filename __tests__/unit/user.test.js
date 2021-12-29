const truncate = require('../utils/truncate.js');
const User = require('../../src/app/models/User.js');
const db = require('../../src/db.js');
const objetoUser = require('../utils/objetoUser.js')
const cryptographyPassword = require('../../src/app/utils/cryptographyPassword.js');

describe.skip('Test used for unit in Users', () => {
    beforeAll(async () => {
        await db.sync();
    })

    afterEach(async () => {
        try {
            await truncate();
        } catch (error) {
            console.log(error)
        }
    })

    it('Check the password with cryptography', async () => {
        const passwordCryptography = await cryptographyPassword.cryptography(objetoUser.password);

        expect(passwordCryptography).not.toBe(objetoUser.password)
    })

    it('Check the decipher password', async () => {
        const cryptography = await cryptographyPassword.cryptography(objetoUser.password);

        const decipherPassword = await cryptographyPassword.decipher(objetoUser.password, cryptography);

        expect(decipherPassword).toBeTruthy();
    })
})

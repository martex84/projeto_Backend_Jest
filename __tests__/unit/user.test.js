const { promisify } = require('util');

const truncate = require('../utils/truncate.js');
const User = require('../../src/app/models/User.js');
const db = require('../../src/db.js');
const objetoUser = require('../utils/objetoUser.js')
const cryptographyPassword = require('../../src/app/utils/cryptographyPassword.js');
const manageToken = require('../../src/app/utils/manageToken.js');

describe('Test used for unit in Users', () => {
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

    it('Create Token', () => {
        expect(process.env.APP_SECRET).not.toBeUndefined();

        const token = manageToken.sign({ id: 1 });

        expect(token).toHaveProperty('token');
    })

    it.only('Verify Token', async () => {
        const token = manageToken.sign({ id: 1 });

        let decode = await manageToken.verify(token.token);

        expect(decode.id).toHaveProperty('id', 1);

    })
})

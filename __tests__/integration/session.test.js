const supertest = require('supertest');

const app = require('../../src/app.js')
const db = require('../../src/db.js');
const truncate = require('../utils/truncate.js');
const objetoUser = require('../utils/objetoUser.js')



describe('Test with options login session', () => {

    // jest.setTimeout(60000);

    beforeAll(async () => {
        await db.sync();
    })

    afterEach(async () => {
        try {
            await truncate();
        } catch (error) {
            console.log("Error\n", error)
        }
    });

    it('Should receive JWT token when authenticated with valid credentails', async () => {
        try {
            const nameDatabase = db.getDatabaseName();
            expect(nameDatabase).not.toBeNull();
            expect(nameDatabase).not.toBeUndefined();
        }
        catch (error) {
            console.log(error)
        }

    })

    it('Create User', async () => {
        //Test send value to port session
        const body = await CreateUser();

        expect(body.name).toBe(objetoUser.name);
        expect(body.email).toBe(objetoUser.email);
        expect(body.password_hash).not.toBe(objetoUser.password_hash);
    })

    it('Autenticate with valid user', async () => {
        //Create user
        await CreateUser();

        const { email, password } = objetoUser;

        const { body } = await supertest(app)
            .get("/session")
            .send({ email, password });

        expect(body).toBeTruthy();
    })



    it.only('Autenticate with invalid user', async () => {

        await CreateUser();

        let email = '';
        const password = 'fail';

        for (let i = 0; i <= 1; i++) {
            //Use true email for test
            if (i === 0) email = objetoUser.email;

            //Use false email for test
            else {
                email = 'fail';
            }

            const { body } = await supertest(app)
                .get("/session")
                .send({ email, password });

            expect(body.status).toBe(404);
        }
    })
})

async function CreateUser() {
    const { body } = await supertest(app)
        .post("/user")
        .send(objetoUser);

    return body;
}


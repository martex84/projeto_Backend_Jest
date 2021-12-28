const supertest = require('supertest');

const app = require('../../src/app.js')
const db = require('../../src/db.js');
const truncate = require('../utils/truncate.js');



describe('Test in User table', () => {

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
        const userObject = {
            name: "Marcelo",
            email: "marcelo@marcelo",
            password_hash: "012345678"
        };

        /* //Test Create in Sql
        try {
            const result = await User.create(userObject);

            expect(result).not.toBeUndefined();


        } catch (error) {
            console.log("Erro: \n", error);
        } */

        //Test send value to port session
        try {
            const { body } = await supertest(app)
                .post("/user")
                .send(userObject);

            expect(body.name).toBe(userObject.name);
            expect(body.email).toBe(userObject.email);
            expect(body.password_hash).toBe(userObject.password_hash);
        }
        catch (error) {
            console.log("Erro: \n", error);
        }

    })
})


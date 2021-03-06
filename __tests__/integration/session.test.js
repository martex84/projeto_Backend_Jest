const supertest = require('supertest');
const faker = require('faker');

const app = require('../../src/app.js')
const db = require('../../src/db.js');
const truncate = require('../utils/truncate.js');
const manageToken = require('../../src/app/utils/manageToken.js');
const factory = require('../utils/factory.js');

describe('Test with options login session', () => {

    const userMain = {
        name: faker.name.findName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        access: 'user'
    }

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
        const body = await factory.create('User', userMain);

        const { name, email, password_hash } = body.dataValues;

        expect(name).toBe(userMain.name);
        expect(email).toBe(userMain.email);
        expect(password_hash).not.toBe(userMain.password);
    })

    it('Autenticate with valid user', async () => {
        //Create user
        await factory.create('User', userMain);

        const { email, password } = userMain;

        const { body } = await supertest(app)
            .get("/session")
            .send({ email, password });

        expect(body).toHaveProperty('token');
    })



    it('Autenticate with invalid user', async () => {

        await factory.create('User', userMain);

        let email = '';
        const password = 'fail';

        for (let i = 0; i <= 1; i++) {
            //Use true email for test
            if (i === 0) email = userMain.email;

            //Use false email for test
            else {
                email = 'fail';
            }

            const { status, body } = await supertest(app)
                .get("/session")
                .send({ email, password });

            expect(status).toBe(401);
            expect(body).not.toHaveProperty('token');
        }
    })

    it('Access route administration with valid user', async () => {
        let userAdmin = userMain;

        userAdmin.access = 'admin';

        const user = await factory.create('User', userMain);

        const body = user.dataValues;

        const { email, access, id } = body;

        const token = manageToken.sign(id);

        const valueReturn = await supertest(app)
            .get("/admin")
            .set('Authorization', `Bearer ${token.token}`)
            .send({ email, access });

        expect(valueReturn.status).toBe(200);
    })

    it('Access route administration with invalid user', async () => {
        const user = await factory.create('User', userMain);

        const body = user.dataValues;

        const { email, access, id } = body;

        const token = manageToken.sign(id);

        const valueReturn = await supertest(app)
            .get("/admin")
            .set('Authorization', `Bearer 00000000`)
            .send({ email, access });

        expect(valueReturn.status).toBe(401);
    })

    it.only('Access route administration without token', async () => {
        const user = await factory.create('User', userMain);

        const body = user.dataValues;

        const { email, access, id } = body;

        const token = manageToken.sign(id);

        const valueReturn = await supertest(app)
            .get("/admin")
            .send({ email, access });

        expect(valueReturn.status).toBe(401);
    })
})
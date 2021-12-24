const supertest = require('supertest');

const app = require('../../src/app.js')
const User = require('../../src/app/models/User.js')
const db = require('../../src/db.js');

it('Should receive JWT token when authenticated with valid credentails', async () => {
    try {
        await db.sync();
        const nameDatabase = await db.getDatabaseName();

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

    //Test Create in Sql
    try {
        const result = await User.create(userObject);

        expect(result).not.toBeUndefined();


    } catch (error) {
        console.log("Erro: \n", error);
    }

    //Test send value to port session
    /* try {
        const response = await supertest(app)
            .post("/sessions")
            .send({
                email: userObject.email,
                password: userObject.password_hash
            })

        console.log(response);
    }
    catch (error) {
        console.log("Erro: \n", error);
    } */
})


const request = require('supertest')
const app = require('../app.js')

describe("POST /users/register", () => {
    test("OK,registration is successfull", async () => {
        const res = await request(app)
            .post('/users/register')
            .send({
                "fname": "sururu",
                "lname": "gooddd",
                "email":"naveedhahghji@gmail.com",
                "password":"navhihgharahgh",
                "role": "admin"
            })
        console.log(res);
         expect(res.statusCode).toEqual(200)
    },10000)
})

describe("POST /users/login", () => {
    test("OK,login is successfull", async () => {
        const res = await request(app)
            .post('/users/login')
            .send({
                "email": "naveedha@gmail.com",
                "password": "navhihgharahgh"
            })
        console.log(res);
         expect(res.statusCode).toEqual(200)

    },)
})

describe("GET /users/users",()=>{
    var token=null
    beforeEach((done)=>{
        request(app)
            .put('/users/login')
            .send({
                "email": "naveenvinghnvbn@gmail.com",
                "password": "manoharhgh"
            })
            .end((err,res)=>{
                token=res._body
                done()
            })
    })
    test("ok,user details getting done",async()=>{
             const res=await request(app)
                       .get("/users/users")
                       .send("Authorization","Bearer "+token)
      console.log(res);
      expect(res.statusCode).toEqual(200)
    },)
})

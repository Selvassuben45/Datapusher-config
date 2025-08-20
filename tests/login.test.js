const server= require('../app'); // Import the app instance
const request = require('supertest');


describe('Login API',()=>{
    test('Login Successfully',async()=>{
        const response = await request(server)
            .post('/api/user/login')
            .send({
                user: 'Selvassubens78601x10000',
                password: '123Selva'
            });
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe('Login successful');
    })
     test("should return error staus 403 and error message" , async ()=>{
    const response = await request(server)
    .post("/api/user/login")
    .send({ email: "user@example.com", password: "wrongpassword" });
    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Invalid email or password")
  });


  test('should fail login with incorrect password', async () => {
    const response = await request(server)
      .post('/api/user/login')
      .send({
        user: 'Selvassubens78601x10000',
        password: 'wrongpassword'
      });

    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('Invalid password');
  });

  test('should fail login if username does not exist', async () => {
    const response = await request(server)
      .post('/api/user/login')
      .send({
        user: 'nonexistentUser',
        password: '123Selva'
      });

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe('User not found');
  });

});
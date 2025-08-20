const server = require('../app')
const request = require('supertest');

describe('Register API', () => {
    test('Register Successfully', async () => {
        const response = await request(server)
            .post('/api/auth/register')
            .send({
                name: 's',
                password: 'testpassword',
                CreatedAt: new Date().toUTCString,
                CreatedBy: 1,
            });
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
        })
        test('should return error status 401 and error message for missing fields', async () => {
            const response = await request(server)
                .post('/api/auth/register')
                .send({
                    name: '',
                    password: ''
                });
            expect(response.status).toBe(401);
            expect(response.body.success).toBe(false);
            expect(response.body.errors).toBe('All the fields are required');
        });
})
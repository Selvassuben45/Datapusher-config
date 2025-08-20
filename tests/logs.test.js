const server =('../app');
const request = require('supertest');

describe('Logs API', () => {
    test('should return logs successfully', async () => {
        const response = await request(server)
            .get('/api/datahandler/data')
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
    });
});
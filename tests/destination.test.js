const server = require('../app');
const request = require('supertest');

describe('get all destinations', () => {
    test('Get Destinations Successfully', async () => {
        const response = await request(server).get('/api/destination/getDestination');
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe("Destination fetched")
    })
    test('Get Destination by id', async () => {
        const destinationid = 3;
        const response = await request(server).get(`/api/destination/getDestinations/${destinationid}`);
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe("Destination fetched successfully");
    })

    test('Get Destination by id not found', async () => {
        const destsid = 999;
        const response = await request(server).get(`/api/destination/getDestinations/${destsid}`);
        expect(response.status).toBe(404);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe("Destination not found");
    })

    test('Delete Destination by id', async () => {
        const destid = 3;
        const response = await request(server).post(`/api/destination/deletedestinations/${destid}`);
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe("Destination deleted successfully");

    })

    test('delete destination id not found', async () => {
        const destsids = 5;
        const response = await request(server).post(`/api/destination/deletedestinations/${destsids}`);
        expect(response.status).toBe(404);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe("Destination not found");
    })
})

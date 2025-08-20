const server = require('../app');
const request = require('supertest');


describe('Get Accounts API',()=>{
    test('Get Accounts Successfully',async()=>{
        const response = await request(server).get('/api/account/getaccounts');
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Accounts retrieved successfully');
        expect(response.body.accounts).toBeInstanceOf(Array);
        expect(response.body.accounts.length).toBeGreaterThan(0);

    })



        test('Get Account By ID Successfully',async()=>{
            const accountId = 1;
            const response = await request(server).get(`/api/account/accounts/${accountId}`);
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe('Account retrieved successfully');
            expect(response.body.account).toBeInstanceOf(Object);
            expect(response.body.account.id).toBe(accountId);
        })
        test('Get Account By ID Not Found',async()=>{
            const accountId = 9999;
            const response = await request(server).get(`/api/account/accounts/${accountId}`);
            expect(response.status).toBe(404);
            expect(response.body.success).toBe(false);
            expect(response.body.message).toBe('Account not found');
        })
    })
        test('Delete Account succesfully',async()=>{
            const accountid=3;
            const response = await request(server).post(`/api/account/deleteaccount/${accountid}`);
            expect(response.status).toBe(200);
            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe('Account Deleted Successfully');
        })
        test('Delete Account Not Found',async()=>{
            const accountid=7;
            const response =await request(server).post(`/api/account/deleteaccount/${accountid}`);
            expect (response.status).toBe(404);
            expect(response.body.success).toBe(false);
            expect(response.body.message).toBe('Account not found')
        })

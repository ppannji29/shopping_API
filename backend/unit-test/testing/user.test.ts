import { describe, expect, it } from "vitest";
import axios from "axios";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import { Console } from "console";
const supertest = require("supertest");
const express = require("express");
dotenv.config();

describe('User API Controller', async () => {
    const app = express();
    app.use(cookieParser());
    let tokenCookies = "";
    const defaultToken = 'YjRjNTBkNzEtYzUwMy00MzcyLWE1YzEtZmE2YjI0YzNmNTE3OmRlY2QwMGM1LWY0YmQtNDNiYy1hOThkLTQzMjY5ZTg1NGYyOA==';
    const requestBody = {
        email: "081295593352",
        password: "2929Panji"
    };
    const config = {
        headers: {
            Authorization: `Bearer ${defaultToken}`,
            'Content-Type': 'application/json',
        },
    };
    app.post('/login', async (req, res) => {
        const loginURL = 'http://localhost:5000/api/login';
        const response = await axios.post(loginURL, requestBody, config);
        tokenCookies = response.data.accessToken;
        res.cookie('refreshToken', tokenCookies, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });
        res.status(200).send(tokenCookies);
    });

    // Action for user login
    it('User Login', async () => {
        try {
            const agent = supertest(app);
            const loginResponse = await agent.post('/login');
            expect(loginResponse.status).toBe(200);
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    });

    // Action for get user orders
    const apiOrders = "http://localhost:5000/api/order";
    it('Get User Orders', async () => {
        try {
            const authentication = {
                headers: {
                    Authorization: `Bearer ${tokenCookies}`,
                    'Content-Type': 'application/json',
                },
            };
            const orders = await axios.get(apiOrders, authentication);
            expect(orders.status).toBe(200);
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    });

    // Action for user to add Chart //
    it('Add Chart', async () => {
        try {
            const authentication = {
                headers: {
                    Authorization: `Bearer ${tokenCookies}`,
                    'Content-Type': 'application/json',
                },
            };
            const rawBody = {
                "productId": 1,
                "quantity": 2,
                "warehouseId": 1
            }
            const orders = await axios.post(apiOrders, rawBody, authentication);
            expect(orders.status).toBe(200);
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    })

    // action for update user cart
    it('Update User Chart', async () => {
        try {
            const headers = {
                'Authorization': `Bearer ${tokenCookies}`,
                'Content-Type': 'application/json',
            };
            const rawBody = {};
            await axios.put("http://localhost:5000/api/checkout/4/1", rawBody, { headers }).then(response => {
                console.log(response);
                expect(response.status).toBe(200);
            }).catch(error => {
                console.error('PUT request failed:', error);
            });

        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    })

    // action for delete user cart
    it('Delete User Order', async () => {
        try {
            const headers = {
                'Authorization': `Bearer ${tokenCookies}`,
                'Content-Type': 'application/json',
            };
            axios.delete("http://localhost:5000/api/checkout/4", { headers }).then(response => {
                console.log(response);
                expect(response.status).toBe(200);
            }).catch(error => {
                console.error('DELETE request failed:', error);
            });
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    });
});
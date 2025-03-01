// setting up express server

import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import dbconfig from './config/dbconfig.js'; // necessary to import

// importing swagger dependencies

import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger.js";

// importing routes

import authroute from './routes/authroute.js';

// loading data from .env

dotenv.config();

// creating an express app

const app = express();

// parsing incoming request data - Middleware Plugin

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// setting up routes

app.use("/server/auth", authroute);

// starting the server

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`server runing on port ${PORT}`);
})

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Authenticate user
 *     tags:
 *       - Authentication
 *     requestBody:
 *       description: User login credentials
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: User authenticated successfully
 *       401:
 *         description: Unauthorized
 */




/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - User Registration
 *     requestBody:
 *       description: User registration details
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: User registered successfully
 *       400:
 *         description: User registration failed due to validation errors
 */

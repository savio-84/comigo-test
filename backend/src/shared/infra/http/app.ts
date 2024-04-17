import 'reflect-metadata';
import express from 'express';
const app = express();
import '../typeorm';

app.use(express.json());

export { app };
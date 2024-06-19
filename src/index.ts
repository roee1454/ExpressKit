import express from 'express';
import dotenv from 'dotenv'
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes';
import fileRoutes from './routes/fileRoutes'
import handleSocketConnection from './modules/socket';

dotenv.config();

const app: express.Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());
app.use(authRoutes);
app.use(fileRoutes);
//Any route you want to append...

const server = app.listen(process.env.PORT, (): void => {
    console.log("Server Works")
});

handleSocketConnection(server);
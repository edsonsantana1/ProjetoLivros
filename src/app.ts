import express from 'express';
import cors from 'cors';
import bookRoutes from './routes/bookRoutes';

const app = express();

app.use(cors());
app.use(express.json());

// Rotas da API
app.use('/api', bookRoutes);

export default app;

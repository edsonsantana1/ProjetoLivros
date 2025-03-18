import express from 'express';
import path from 'path';
import cors from 'cors';
import { connectDB } from './config/db';
import bookRoutes from './routes/bookRoutes'; // Importando as rotas de livros

async function startServer() {
  const app = express();
  const PORT = process.env.PORT || 3000;

  await connectDB();

  // Middlewares
  app.use(cors()); // Habilita CORS
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Definindo a base URL para a API de livros
  app.use('/api', bookRoutes);  // Prefixo /api para todas as rotas de livros

  // Caminho correto para arquivos estáticos
  app.use(express.static(path.join(__dirname, '../../frontend/')));

  // Rota principal
  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/index.html'));
  });

  // Tratamento de erro para rotas não encontradas
  //app.use((req, res) => {
  //  res.status(404).sendFile(path.join(__dirname, '../../offline.html'));
  //});

  app.listen(PORT, () => {
    console.log(`🟢 Servidor rodando em http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('🔴 Falha crítica:', err);
  process.exit(1);
});

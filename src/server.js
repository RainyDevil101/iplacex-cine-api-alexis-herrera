import express from 'express';
import cors from 'cors';
import { connectDB } from './common/db.js';
import peliculaRoutes from './domain/pelicula/routes.js';
import actorRoutes from './domain/actor/routes.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Bienvenido al cine Iplacex' });
});

app.use('/api', peliculaRoutes);
console.log('Pelicula routes loaded');
app.use('/api', actorRoutes);
console.log('Actor routes loaded');

const startServer = async () => {
  try {
    await connectDB();
    
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error starting server:', error.message);
    process.exit(1);
  }
};

startServer();

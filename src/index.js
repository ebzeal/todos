import express from 'express';
import routes from './routes';

const app = express();
app.use(express.json());

app.use('/auth', routes.auth);

app.get('/', (req, res) => {
  res.status(200).json('Welcome to Todos');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server started on ${port}`);
});

export default app;

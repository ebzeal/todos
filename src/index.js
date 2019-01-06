import express from 'express';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).json('Welcome to Todos');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server started on ${port}`);
});

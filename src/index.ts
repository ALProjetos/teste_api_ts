import express, { Request, Response } from 'express';

const app = express();
const port = process.env.PORT || 3005;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, world! V4');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});



// "prestart": "chmod +x node_modules/.bin/ts-node",
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import route from './Routes/UsersRoute.js';

dotenv.config(); // Load environment variables from .env file

const PORT = process.env.PORT || 5000; // Define the port for your server

const app = express();

app.use(cors("*"));
app.use(express.json());




app.use("/",route)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Define your DefaultData function to initialize default data if needed

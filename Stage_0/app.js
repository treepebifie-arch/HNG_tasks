require ('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const apiRoutes = require('./src/routes/route.js');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors({origin: '*'}));
app.use(express.json());

app.use(morgan('combined'));

// Routes
app.use('/api', apiRoutes);

// home route
app.get('/', (req, res) => {
  res.json( 'Welcome' );
});

// Global 404
app.use((req, res) => {
  res.status(404).json({ status: 'error', message: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
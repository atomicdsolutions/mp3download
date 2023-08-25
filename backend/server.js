const express = require('express');
const cors = require('cors');
const downloadRouter = require('./routers/download.router');
const db = require('./models/index');
const bodyParser = require('body-parser');

const app = express();

// Connect to MongoDB
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use the router
app.use('/api/', downloadRouter);

// This middleware catches all errors
app.use((err, req, res, next) => {
  console.error(err.stack);  // Log the error stack for debugging
  res.status(500).send('Something went wrong!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

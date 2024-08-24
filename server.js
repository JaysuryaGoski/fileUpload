const express = require('express');
const path = require('path');
const app = express();

// Serve static files from public directory
app.use(express.static(path.join(__dirname, './public')));
app.use('/uploads', express.static(path.join(__dirname, './uploads')));

// Routes
const uploadRoutes = require('./src/routes/uploadRoute.js');
app.use('/', uploadRoutes);
const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
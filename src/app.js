// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();



// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

//const bookRoutes = require('./routes/book.routes');
//app.use('/api', bookRoutes);

const plantRoutes = require('./routes/plant.routes');
app.use('/api/plants', plantRoutes);

const wateringLogRoutes = require('./routes/wateringLog.routes');
app.use('/api/watering-logs', wateringLogRoutes);

const growthLogRoutes = require('./routes/growthLog.routes');
app.use('/api/growth-logs', growthLogRoutes);

const weatherRoutes = require('./routes/weather.routes');
app.use('/api/weather', weatherRoutes);

const encyclopediaRoutes = require('./routes/encyclopedia.routes');
app.use('/api/encyclopedia', encyclopediaRoutes);



// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app; 



const fs = require("fs");
const config = require("config");
const express = require("express");
const mongoose = require("mongoose");
const TestApplication = require("./middleware/logger.js");
const tasksInMemory = require("./routes/tasksInMemory.js");
const tasksDB = require("./routes/tasksDB.js");
const users = require("./routes/users.js");
const app = express();
const PORT = config.get("port") || 3000;

// Check if the jwtPrivateKey is defined
if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
}

// Connect to MongoDB
mongoose
  .connect(config.get("db"))
  .then(() => console.log("Connected to MongoDB...\n"))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

app.use(express.json());
app.use("/api/tasks/inmemory", tasksInMemory);
app.use("/api/tasks", tasksDB);
app.use("/api/users", users);

// When the application is loaded, append a message to the logger.txt file
let testApplication = new TestApplication();

testApplication.on("loadApplication", () => {
  fs.appendFile("logger.txt", "Application loaded!\n", (err) => {
    if (err) {
      throw err;
    } else {
      console.log("Finished!");
    }
  });
});

// Load the application
testApplication.loadApplication("Application is loading...");

app.listen(PORT, () => {
  fs.appendFile("logger.txt", `Server listening on port: ${PORT}\n`, (err) => {
    if (err) {
      fs.appendFile("logger.txt", `Error: ${err}\n`, (err) => {
        if (err) {
          throw err;
        }
      });
    }
  });
});

const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const tasksRouter = require("./tasks");
app.use("/api", tasksRouter);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

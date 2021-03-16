const express = require("express");

const app = express();
const path = require("path");
const PORT = process.env.PORT || 5000;
require("./models/mongoConnection");
const socketIo = require("socket.io");
const cors = require("cors");
const morgan = require('morgan');
app.use(morgan());

// testing Socket.io
const http = require("http").Server(app);
const io = require("socket.io")(http);

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

io.on("connection", (socket) => {
  console.log("a user connected");
});

// setup express
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// setup routes
app.use("/register", require("./routes/confirmRoutes"));
app.use("/users", require("./routes/userRoutes"));
app.use("/api", require("./routes/petRoutes"));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

app.listen(PORT, () => console.log(`Listening at: http://localhost:${PORT}`));

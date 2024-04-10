
const express = require("express");
const app = express();
const PORT = 3000;
const cors = require("cors");
const cookieParser = require('cookie-parser');
const routes = require('./routes');
require('./cronjobs/countAdd.js')
require('./cronjobs/fetchMenu.js')
require("dotenv").config();

var whitelist = [process.env.FE_URL, process.env.FE_LOCAL_URL, process.env.FE_NGINX_URL]
var corsOptions = {
  origin: function (origin, callback) {
    if (!origin) {
      callback(null, true)
    }
    else if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true
}
app.use(cookieParser());
app.set("trust proxy", true);
app.get("/", (req, res) => {
  res.send("Server running")
})
app.use('/', cors(corsOptions), routes)
app.timeout = 60000;
app.listen(PORT, () => {
  console.log(
    `Server is running on http://localhost:${PORT}`
  );
});

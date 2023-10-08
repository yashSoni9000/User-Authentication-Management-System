const express = require("express");
require("dotenv").config();
const app = express();
const expressLayouts = require("express-ejs-layouts");
const PORT = 9003 || process.env.PORT;
const authRoutes = require("./routes/auth.routes");
const user = require("./routes/user.routes");
const team = require("./routes/team.routes");
const task = require("./routes/task.routes");
const project = require("./routes/project.routes");
const dashboard = require("./routes/dashboard.routes");
const employee=require('./routes/employee.routes')
const customer=require('./routes/customer.routes')
const invoice=require('./routes/invoice.routes')
const admin = require('./routes/admin.routes');
const cookieParser = require("cookie-parser");
const cookie=require('cookie-parser');
const passport = require('passport');
const db = require("./config/db");
var cors = require('cors');

// Passport middleware
app.use(passport.initialize());

// Passport config
require('./config/passport')(passport);

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200,
};

app.use(express.json());
app.use(cors(corsOptions))
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static("public"));
// app.use(expressLayouts);
// app.set("layout", "./layouts/main");
// app.set("view engine", "ejs");
app.use("/auth", authRoutes);
app.use('/',user)
app.use('/',team)
app.use('/',task)
app.use('/',project)
app.use('/',dashboard)
app.use('/',employee)
app.use('/',customer)
app.use('/',invoice)
app.use('/',admin)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

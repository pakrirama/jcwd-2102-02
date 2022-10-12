var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var tokenRouter = require("./routes/token");
var addressRouter = require("./routes/address");
var cartRouter = require("./routes/cart");
var productRouter = require("./routes/product");
var productCategoryRouter = require("./routes/productCategory");
var productDescriptionRouter = require("./routes/productDescription");
var categoryRouter = require("./routes/category");
var orderRouter = require("./routes/order");
var productHistoryRouter = require("./routes/productHistory");
var productStockRouter = require("././routes/productStock");
var unitConverterRouter = require("./routes/unitConveter");

var app = express();

app.use(cors());

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/v1", indexRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/token", tokenRouter);
app.use("/api/v1/address", addressRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/product", productRouter);
app.use("/api/v1/product_category", productCategoryRouter);
app.use("/api/v1/product_description", productDescriptionRouter);
app.use("/api/v1/product_stock", productStockRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/order", orderRouter);
app.use("/api/v1/product_history", productHistoryRouter);
app.use("/api/v1/unitConverter", unitConverterRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

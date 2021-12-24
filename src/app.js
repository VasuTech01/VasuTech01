const path = require("path");
const express = require("express");
const hbs = require("hbs");
const forcast = require("./utils/forcast");
const geoCode = require("./utils/geoCode");
const app = express();
const port = process.env.PORT || 3000;
//Define PAths
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../templates/views"));
hbs.registerPartials(path.join(__dirname, "../templates/partials"));
//setup static directory to serve
app.use(express.static(path.join(__dirname, "../public")));
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather APP",
    name: "VASU SAINI",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "VASU  SAINI",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "HELP",
    message: "How can we help you",
    name: "VASU SAINI",
  });
});
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    message: "help page not found",
    name: "VASU SAINI",
  });
});
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "you must provide an address",
    });
  } else {
    geoCode(req.query.address, (err, {longitude,latitude}={}) => {
      if (err) {
        console.log(err);
       return res.send({
           err
        })
      } else {
        forcast(longitude, latitude, (err, {current,location}) => {
          if (err) {
            console.log(err);
            return res.send({ err });
          } else {
            // console.log(current);
            // console.log(location);
            res.send({
              forcast: current.weather_descriptions[0],
              location: location.name,
              address: req.query.address
            });
          }
        });
      }
    });
  }
  // console.log(req.query);
 
});
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    message: "PAGE NOT FOUND",
    name: "VASU SAINI",
  });
});

///---------------------------------------------------

////-------------------------------------------------
app.listen(port, () => {
  console.log("Server is up on port "+port);
});

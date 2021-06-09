const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const fetch = require("node-fetch");
const axios = require("axios");

const app = express();
// const environmentVariables = require("./.env");
const { request } = require("http");
// const { response } = require("express");
// import API_KEY from "./env";

// Bodyparser Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Signup Route
app.post("/signup", (req, res) => {
  const { firstName, lastName, email } = req.body;

  // Construct req data
  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        },
      },
    ],
  };

  const postData = JSON.stringify(data);

  try {
    axios
      .post(
        "https://us6.api.mailchimp.com/3.0/lists/3e96be85fb",
        {
          postData,
        },
        {
          headers: {
            Authorization: `auth ${process.env.API_KEY}`,
          },
        }
      )
      .then((data) => res.status(200).send(data))
      .catch((err) => res.send(err));
  } catch (err) {
    console.error("GG", err);
  }
});

/*   fetch("https://us6.api.mailchimp.com/3.0/lists/3e96be85fb", {
    method: "POST",
    headers: {
      Authorization: `auth ${environmentVariables.API_KEY}`,
    },
    body: postData,
  })
    .then(
      res.sendStatus(200),
      console.log("Success API key: ", environmentVariables.API_KEY)
    )
    .catch((err) => console.log(err));
}); */

/*   const options = {
    url: "https://us6.api.mailchimp.com/3.0/lists/3e96be85fb",
    method: "POST",
    headers: {
      Authorization: "auth 342e071feee30afd363fb8c757c6c1aa-us6",
    },
    body: postData,
  };

  request(options, (err, response, body) => {
    if (err) {
      res.send("Error with something:", err);
    } else {
      if (response.status === 200) {
        res.send("It works with status 200");
      }
      res.send("Its works: ", body);
    }
  });
}); */

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on ${PORT}`));

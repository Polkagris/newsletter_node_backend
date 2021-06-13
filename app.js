const mailchimp = require("@mailchimp/mailchimp_marketing");

const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.post("/newsletter", (req, res) => {
  // res.header("Access-Control-Allow-Origin", "*");
  const { nameFirst, nameLast, emailValue } = req.body;

  mailchimp.setConfig({
    apiKey: `${process.env.API_KEY}`,
    server: "us6",
  });

  const listId = "3e96be85fb";
  const subscribingUser = {
    firstName: nameFirst,
    lastName: nameLast,
    email: emailValue,
  };

  async function run() {
    try {
      const response = await mailchimp.lists.addListMember(listId, {
        email_address: subscribingUser.email,
        status: "subscribed",
        merge_fields: {
          FNAME: subscribingUser.firstName,
          LNAME: subscribingUser.lastName,
        },
      });

      console.log(
        `Successfully added contact as an audience member. The contact's id is ${response.id}.`
      );
    } catch (err) {
      console.log("error:", err);
    }
  }

  // npm run dev to run
  run();
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});

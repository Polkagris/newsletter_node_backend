const mailchimp = require("@mailchimp/mailchimp_marketing");

mailchimp.setConfig({
  apiKey: "07baea80ed7e6a3ffd70e2b8e75b273f-us6",
  server: "us6",
});

const listId = "3e96be85fb";
const subscribingUser = {
  firstName: "Rick",
  lastName: "Sanches",
  email: "ricksanches@local.com",
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

run();

const functions = require('firebase-functions')
const {
  WebhookClient
} = require('dialogflow-fulfillment')
const {
  Card,
  Suggestion,
  BasicCard,
  Button,
  Image
} = require('dialogflow-fulfillment')
const {
  dialogflow
} = require('actions-on-google')




// Instantiate the Dialogflow client.
const app = dialogflow({
  debug: true
});

const firebaseConfig = {
  apiKey: "AIzaSyBbcT4BZ8tiDWsrbV16eFgo_z17bqBsOBs",
  authDomain: "chanjia-e9ddb.firebaseapp.com",
  databaseURL: "https://chanjia-e9ddb.firebaseio.com",
  projectId: "chanjia-e9ddb",
  storageBucket: "chanjia-e9ddb.appspot.com",
  messagingSenderId: "885878744432"

}


// Handlers go here..
app.intent("Transplant Fallback", conv => {
  // handler for this intent



  // return admin.database().ref('users').once("value").then((snapshot) => {
  //   var lastName = snapshot.child(uid).child("firstName").val();
  //   // agent.add(`Thats great to hear. Anyways, how can i help you today ` + lastName);
  //   agent.add(lastName, +`with all the information we have shared together, I would recommend you to carry out a cervical cancer test with the help of our self testing kit if you own one.

  //   You can follow the guidelines of using this tool by following this link `);
  // });

  agent.add(new Card({

    title: `With all the information we have shared together, I would recommend you to carry out a cervical cancer test with the help of our self testing kit if you own one.

 You can follow the guidelines of using this tool by following this link `,
    imageUrl: 'https://s3-external-1.amazonaws.com/com-amazon-mas-catalog/amzn1.devportal.fileupload.e9ee260c6e5040a5aa59a2ef5c18e41f_b9d3f723-da8d-47bf-9074-8539f0552994_7b47ec9987aec186f29aca62cda86b43',
    //text: `This is the body text of a card.  You can even use line\n  breaks and emoji! 💁`,
    buttonText: 'Read Guidelines',
    buttonUrl: 'https://cdarh.org/product.html'
  }));
});

app.intent("Say_Something_Silly", conv => {
  // handler for this intent
});








module.exports = app;

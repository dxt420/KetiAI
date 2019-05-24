const express = require('express')
const bodyParser = require('body-parser')
const Pusher = require('pusher')
const cors = require('cors')
const firebase = require('firebase')
const admin = require('firebase-admin')

require('dotenv').config()

const shortId = require('shortid')
const dialogFlow = require('./diagflow')
const app = express()


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

const conv = dialogflow({
  debug: true
});


const pusher = new Pusher({
  appId: '763384',
  key: '7e68e39c122f6cbf6b79',
  secret: '9be54d8e58c065d44a06',
  cluster: 'mt1',
  encrypted: true
})


const firebaseConfig = {
  apiKey: "AIzaSyBbcT4BZ8tiDWsrbV16eFgo_z17bqBsOBs",
  authDomain: "chanjia-e9ddb.firebaseapp.com",
  databaseURL: "https://chanjia-e9ddb.firebaseio.com",
  projectId: "chanjia-e9ddb",
  storageBucket: "chanjia-e9ddb.appspot.com",
  messagingSenderId: "885878744432"

}




app.use(cors())

app.use(bodyParser.urlencoded({
  extended: false
}))

app.use(bodyParser.json())


admin.initializeApp(firebaseConfig)

// Required by Firebase
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(app);


var uid



























process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({
    request,
    response
  });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));


  // function welcome(agent) {
  //   agent.add(`Hi! My name is Keti and i'll be your electronic oncology consultant.`);
  // }

   function refer(agent) {


    return admin.database().ref('users').once("value").then((snapshot) => {
      var lastName = snapshot.child(uid).child("firstName").val();
      // agent.add(`Thats great to hear. Anyways, how can i help you today ` + lastName);
      agent.add(lastName, +`with all the information we have shared together, I would recommend you to carry out a cervical cancer test with the help of our self testing kit if you own one.

      You can follow the guidelines of using this tool by following this link `);
    });

     //  agent.add(new Card({
    //
    //     title: `With all the information we have shared together, I would recommend you to carry out a cervical cancer test with the help of our self testing kit if you own one.

	//	You can follow the guidelines of using this tool by following this link `,
    //     imageUrl: 'https://s3-external-1.amazonaws.com/com-amazon-mas-catalog/amzn1.devportal.fileupload.e9ee260c6e5040a5aa59a2ef5c18e41f_b9d3f723-da8d-47bf-9074-8539f0552994_7b47ec9987aec186f29aca62cda86b43',
    //     //text: `This is the body text of a card.  You can even use line\n  breaks and emoji! 💁`,
    //     buttonText: 'Read Guidelines',
    //     buttonUrl: 'https://cdarh.org/product.html'
    //   })
    // );
  }


  let intentMap = new Map();
  intentMap.set('Transplant Fallback', refer);

  agent.handleRequest(intentMap);
});



app.post('/getUser', (req, res) => {

  //console.log(req.headers)

  const token = req.headers.authorization.split('Bearer ')[1]

  return admin.auth().verifyIdToken(token)
    .then(decodedToken => {
      uid = decodedToken.uid;
      console.log(uid);
      console.log('Dext was here');

      res.status(200).send('Looks good!')

    })
    .catch(err => res.status(403).send('Unauthorized'))


})


app.post('/message', async (req, res) => {
  // simulate actual db save with id and createdAt added
  console.log(req);
  const chat = {
    ...req.body,
    id: shortId.generate(),
    createdAt: new Date().toISOString()
  }
  //update pusher listeners
  pusher.trigger('chat-bot', 'chat', chat)

  const message = chat.message;

  const response = await dialogFlow.send(message);
  //console.log(response.data);
  //console.log(response.data.result);
  //console.log(response.data.result.fulfillment);

  console.log(response.data.result.fulfillment.messages[0]);
  console.log(response.data.result.fulfillment.messages);
  console.log(response.data.result.fulfillment.messages[0].type);


  if (response.data.result.fulfillment.messages[0].type == 1) {
    // trigger this update to our pushers listeners
    pusher.trigger('chat-bot', 'chat', {

      message: `${response.data.result.fulfillment.speech}`,
      extra: response.data.result.fulfillment.messages[0],
      type: 'bot',
      kind: 'ONE',
      createdAt: new Date().toISOString(),
      id: shortId.generate()
    })


  }else{
    // trigger this update to our pushers listeners
    pusher.trigger('chat-bot', 'chat', {

      message: `${response.data.result.fulfillment.speech}`,
      type: 'bot',
      kind: 'ZERO',
      createdAt: new Date().toISOString(),
      id: shortId.generate()
    })

  }



    res.send(chat)


})

app.listen(process.env.PORT , () => console.log('Listening at port' + process.env.PORT))

const express = require('express')
const bodyParser = require('body-parser')
const Pusher = require('pusher')
const cors = require('cors')
const firebase = require('firebase')
const admin = require('firebase-admin')
const functions = require('firebase-functions')

require('dotenv').config()

const shortId = require('shortid')
const dialogFlow = require('./diagflow')
const app = express()
const dialogFlowApp = require("./dialogflowApp");





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


  } else {
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

app.listen(process.env.PORT, () => console.log('Listening at port' + process.env.PORT))
exports.dialogflowFirebaseFulfillment = functions.https.onRequest(dialogFlowApp);

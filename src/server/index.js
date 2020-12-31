var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const Base_URL = "https://api.meaningcloud.com/sentiment-2.1";
const dotenv = require('dotenv');

dotenv.config();

const apiKey = process.env.API_KEY;

const app = express()

// app.use(express.static('dist'))
app.use(express.static('src/client'))

console.log(__dirname)

app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8088, function () {
    console.log('Example app listening on port 8088!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

// app.post('/inferTextSentiment', inferTextSentiment);
// const inferTextSentiment = async(req, res) => {
//     let inputText = req.body;
//     console.log('Input Text: ', inputText)
//     // apiCallURL = `${Base_URL}&`
//     // response.send(textapi.application_key);
// };
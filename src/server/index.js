var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const dotenv = require('dotenv');

const Base_URL = "https://api.meaningcloud.com/sentiment-2.1";

dotenv.config();

const apiKey = process.env.API_KEY;
const app = express()
const port = 8088;

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

const fetch=require('node-fetch');

// app.use(express.static('dist'))
app.use(express.static('src/client'))

console.log(__dirname)

app.get('/', function (req, res) {
    // res.sendFile('dist/index.html')
    res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(port, function () {
    console.log(`App listening on port ${port}!`)
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

app.post('/inferTextSentiment', inferTextSentiment);
function inferTextSentiment(request, response) {
    let inputText = request.body;
    console.log('Input Text: ', inputText)

    try {
        const sentimentData = fetchTextSentiment(inputText);
        // sentimentAnalysis = JSON.stringify(sentimentData);
        response.send(sentimentData);
    } catch(error) {
        console.log("error", error);
    }
};

const fetchTextSentiment = async(textJson) => {
    // URL encode text, e.g. replace spaces with %20
    encodedText = encodeURIComponent(textJson.inputText.trim());
    console.log(encodedText);
    apiCallURL = `${Base_URL}?key=${apiKey}&of=json&txt=${encodedText}&model=general&lang=en`;
    console.log(apiCallURL);

    try {
        const response = await fetch(apiCallURL);
        const data = await response.json();
        console.log(data);
        return data;
    } catch(error) {
        console.log("error", error);
    }
};
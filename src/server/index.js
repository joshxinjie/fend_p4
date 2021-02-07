sentimentData = {};

var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
const dotenv = require('dotenv');

const Base_URL = "https://api.meaningcloud.com/sentiment-2.1";

dotenv.config();

const apiKey = process.env.API_KEY;
const app = express()
const port = process.env.PORT || 8088;

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

const fetch=require('node-fetch');

app.use(express.static('dist'))
// app.use(express.static('src/client'))

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile(path.resolve('dist/index.html'))
    // res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(port, function () {
    console.log(`App listening on port ${port}!`)
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

app.post('/inferNewsSentimentURL', inferNewsSentimentURL);
function inferNewsSentimentURL(request, response) {
    let url = request.body;
    // console.log('URL: ', url)

    try {
        const newsSentiment = fetchNewsSentiment(url, response, 1);
    } catch(error) {
        console.log("error", error);
    }
};

app.post('/inferNewsSentimentText', inferNewsSentimentText);
function inferNewsSentimentText(request, response) {
    let inputText = request.body;
    // console.log('Input Text: ', inputText)

    try {
        const newsSentiment = fetchNewsSentiment(inputText, response, 2);
    } catch(error) {
        console.log("error", error);
    }
};

const fetchNewsSentiment = async(text, response, format) => {
    if (format == 1) {
        let url = text.inputText;
        apiCallURL = `https://api.meaningcloud.com/sentiment-2.1?key=${apiKey}&lang=en&url=${url}`
    } else if (format == 2) {
        // URL encode text, e.g. replace spaces with %20
        encodedText = encodeURIComponent(text.inputText.trim());
        apiCallURL = `${Base_URL}?key=${apiKey}&of=json&txt=${encodedText}&model=general&lang=en`;
    } else {
        throw {name : "NotImplementedError", message : "News format is not implemented"}; 
    };

    const res = await fetch(apiCallURL);

    try {
        const data = await res.json();
        // console.log("Fetched", data);
        sentimentData = data;
        response.send(sentimentData);
        console.log("Sending Data", sentimentData);
        return data;
    } catch(error) {
        console.log("error", error);
    }
};

app.get('/getNewsSentiment', getNewsSentiment);
function getNewsSentiment(request, response) {
    // console.log('Sending Data: ', sentimentData);
    response.send(sentimentData);
    sentimentData = {};
};
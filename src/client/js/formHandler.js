const port = process.env.PORT || 8088;

function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('input').value
    console.log("formText: ", formText )

    let newsFormat = document.getElementById("selected-format").value;
    console.log("News Format: ", newsFormat);

    if (newsFormat == 0) {
        alert("Please select the news format!")
    } else if (newsFormat == 1) {
        // url
        getURLNewsSentiment(formText);
    } else if (newsFormat == 2) {
        getTextNewsSentiment(formText)
    } else {
        throw {name : "NotImplementedError", message : "News format is not implemented"};
    };
}

function getURLNewsSentiment(url) {
    let urlCheck = /^((http|https):\/\/)/;
    // url
    if(!urlCheck.test(url)) {
        alert("Please enter a valid url that starts with http or https!")
    } else {
        let postURL = window.location.origin + '/inferNewsSentimentURL';
        postNews(postURL, {inputText: url})
        .then(response => Client.updateUI(response));
        // postNews(`http://localhost:${port}/inferNewsSentimentURL`, {inputText: url})
        // .then(response => Client.updateUI(response));
    }
}

function getTextNewsSentiment(text) {
    let postURL = window.location.origin + '/inferNewsSentimentText';
    postNews(postURL, {inputText: text})
    .then(response => Client.updateUI(response));
    // postNews(`http://localhost:${port}/inferNewsSentimentText`, {inputText: text})
    // .then(response => Client.updateUI(response));
}

const postNews = async(url='', data={}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        console.log("New Data", newData);
        return newData;
    } catch(error) {
        console.log("error", error);
    }
};

export { handleSubmit, postNews };
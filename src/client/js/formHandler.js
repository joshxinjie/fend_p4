const port = 8088;

const sentimentValues = {
    "P+": "strongly positive",
    "P": "positive",
    "NEU": "neutral",
    "N": "negative",
    "N+": "strongly negative",
    "NONE": "none"
}

function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('input').value
    
    // Client.checkForName(formText)

    // console.log("::: Form Submitted :::")
    // console.log("Test Message")
    // fetch('http://localhost:8088/test')
    // .then(res => res.json())
    // .then(function(res) {
    //     document.getElementById('results').innerHTML = res.message
    // })

    let newsFormat = document.getElementById("selected-format").value;
    console.log("News Format: ", newsFormat);

    if (newsFormat == 0) {
        alert("Please select the news format!")
    } else if (newsFormat == 1) {
        // url
        postNews(`http://localhost:${port}/inferNewsSentimentURL`, {inputText: formText})
        .then(response => updateUI(response));
    } else if (newsFormat == 2) {
        postNews(`http://localhost:${port}/inferNewsSentimentText`, {inputText: formText})
        .then(response => updateUI(response));
    } else {
        throw {name : "NotImplementedError", message : "News format is not implemented"};
    };
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

function updateUI(data) {
    try {
        document.getElementById('results-header').innerHTML = `<p>Analysis Results</p>`;
        document.getElementById('sentiment').innerHTML = `<i class="fa fa-search"></i> The sentiment of the news is <span>${sentimentValues[data.score_tag]}</span>`;
        document.getElementById('agreement').innerHTML = `<i class="fa fa-search"></i> The sentiments of the news' elements are in <span>${data.agreement.toLowerCase()}</span>`;
        document.getElementById('subjectivity').innerHTML = `<i class="fa fa-search"></i> The news is <span>${data.subjectivity.toLowerCase()}</span>`;
        document.getElementById('irony').innerHTML = `<i class="fa fa-search"></i> The news is <span>${data.irony.toLowerCase()}</span>`;
        document.getElementById('confidence').innerHTML = `<i class="fa fa-search"></i> The model is <span>${data.confidence}%</span> confident about the results`;
    } catch(error) {
        console.log("error", error);
    }
};

export { handleSubmit };
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

    // Check which box is selected, then run appropriate postNews function, each one using a seperate domain for different api calls
    // There will be 2 postNews function, one for URL, one for text

    // get the text from the form field
    postNews('http://localhost:8089/inferNewsSentiment', {inputText: formText})
    .then(response => updateUI(response));
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
        document.getElementById('sentiment').innerHTML = `Sentiment: ${data.score_tag}`;
        document.getElementById('agreement').innerHTML = `Agreement: ${data.agreement}`;
        document.getElementById('subjectivity').innerHTML = `Subjectivity: ${data.subjectivity}`;
        document.getElementById('irony').innerHTML = `Irony: ${data.irony}`;
        document.getElementById('confidence').innerHTML = `Confidence: ${data.confidence}`;
    } catch(error) {
        console.log("error", error);
    }
}

// const updateUI = async() => {
//     const request = await fetch('http://localhost:8088/getNewsSentiment');

//     try {
//         const allData = await request.json();
//         document.getElementById('sentiment').innerHTML = `Sentiment: ${allData.score_tag}`;
//         document.getElementById('agreement').innerHTML = `Agreement: ${allData.agreement}`;
//         document.getElementById('subjectivity').innerHTML = `Subjectivity: ${allData.subjectivity}`;
//         document.getElementById('irony').innerHTML = `Irony: ${allData.irony}`;
//         document.getElementById('confidence').innerHTML = `Confidence: ${allData.confidence}`;
//     } catch(error) {
//         console.log("error", error);
//     }
// };

export { handleSubmit };
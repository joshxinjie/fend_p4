const port = 8088;

function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('input').value

    let newsFormat = document.getElementById("selected-format").value;
    console.log("News Format: ", newsFormat);

    let urlCheck = /^((http|https):\/\/)/;

    if (newsFormat == 0) {
        alert("Please select the news format!")
    } else if (newsFormat == 1) {
        // url
        if(!urlCheck.test(formText)) {
            alert("Please enter a valid url that starts with http or https!")
        } else {
            postNews(`http://localhost:${port}/inferNewsSentimentURL`, {inputText: formText})
            .then(response => Client.updateUI(response));
        }
    } else if (newsFormat == 2) {
        postNews(`http://localhost:${port}/inferNewsSentimentText`, {inputText: formText})
        .then(response => Client.updateUI(response));
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

export { handleSubmit };
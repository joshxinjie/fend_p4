const sentimentValues = {
    "P+": "strongly positive",
    "P": "positive",
    "NEU": "neutral",
    "N": "negative",
    "N+": "strongly negative",
    "NONE": "none"
}

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

export { updateUI };
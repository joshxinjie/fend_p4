import { updateUI, sentimentValues } from "../src/client/js/updateUI";

describe("Testing the updateUI() function", () => { 
    // Set up DOCUMENT
    document.body.innerHTML = `
    <section>
         <div class="results-card">
             <div id="results-header"></div>
             <div id="sentiment"></div>
             <div id="agreement"></div>
             <div id="subjectivity"></div>
             <div id="irony"></div>
             <div id="confidence"></div>
         </div>
     </section>
    `;
    test("Testing the updateUI() function", () => {
           const data = {
               score_tag: 'N+',
               agreement: 'AGREEMENT',
               subjectivity: 'OBJECTIVE',
               confidence: '100',
               irony: 'NONIRONIC'
            };
            updateUI(data);
            const resultsHeaderEl = document.getElementById("results-header");
            const sentimentEl = document.getElementById("sentiment");
            const agreementEl = document.getElementById("agreement");
            const subjectivityEl = document.getElementById("subjectivity");
            const ironyEl = document.getElementById("irony");
            const confidenceEl = document.getElementById("confidence");

            expect(resultsHeaderEl.innerHTML).toEqual(`<p>Analysis Results</p>`);
            expect(sentimentEl.innerHTML).toEqual(`<i class="fa fa-search"></i> The sentiment of the news is <span>${sentimentValues[data.score_tag]}</span>`);
            expect(agreementEl.innerHTML).toEqual(`<i class="fa fa-search"></i> The sentiments of the news' elements are in <span>${data.agreement.toLowerCase()}</span>`);
            expect(subjectivityEl.innerHTML).toEqual(`<i class="fa fa-search"></i> The news is <span>${data.subjectivity.toLowerCase()}</span>`);
            expect(ironyEl.innerHTML).toEqual(`<i class="fa fa-search"></i> The news is <span>${data.irony.toLowerCase()}</span>`);
            expect(confidenceEl.innerHTML).toEqual(`<i class="fa fa-search"></i> The model is <span>${data.confidence}%</span> confident about the results`);
})});
import { postNews } from "../src/client/js/formHandler";

const port = process.env.PORT || 8088;

describe("Testing the inferNewsSentimentURL endpoint for postNewsFunction() function", () => { 
    test("Testing the postNewsFunction() function", () => {
           let endpoint = "inferNewsSentimentURL";
           let text = "'Vehicle was swaying left and right’: Malaysian trapped in bus during Pahang flood recounts experience";
           let successCode = 0;
           postNews(`http://localhost:${port}/${endpoint}`, {inputText: text})
           .then(response=>{
               expect(response.status.code.toEqual(0))
           });
})});

describe("Testing the inferNewsSentimentText endpoint for postNewsFunction() function", () => {
    test("Testing the postNewsFunction() function", () => {
           let endpoint = "inferNewsSentimentText";
           let url = "https://www.channelnewsasia.com/news/asia/malaysia-pahang-flood-bus-trapped-jeram-besu-13959590";
           let successCode = 0;
           postNews(`http://localhost:${port}/${endpoint}`, {inputText: url})
           .then(response=>{
               expect(response.status.code.toEqual(0))
           });
})});
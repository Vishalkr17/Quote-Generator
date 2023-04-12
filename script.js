const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById('loader');

// Get Quotes from API

//  To do this we're going to use an asynchronous fetch request within a try catch statement
// An asynchronous function can run at anytime independently and it won't stop  the browser from completing the loading of a page
let apiQuotes = [];

//Show Loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
    //So this means when our loader is going, we're only going to see the loader and nothing else.
}

//Hide Loading
function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
    //We want to show our quoteContainer and we will hide our loader
}

function newQuote() {

loading();
// Pick a random quote from apiQuotes array
const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
// Check if Author field is blank and replace it with 'Unknown'

if(!quote.author){
    authorText.textContent = 'Unknown';
}else{
    authorText.textContent = quote.author;
}

// Check Quote length to determine styling
if(quote.text.length > 100){
    quoteText.classList.add('long-quote');
}else{
    quoteText.classList.remove('long-quote');
}
// Set Quote, Hide Loader
quoteText.textContent = quote.text;
complete();
}

async function getQuotes() {
    loading();
    const apiUrl = 'https://type.fit/api/quotes' 

    // A try-catch allows us to attempt to complete a fetch request but if it doesn't work, we can catch the error information and do something with it.

    try{
        const response = await fetch(apiUrl); // This means that this constant will not be populated until it has some data fetched from our API.
       
        // So that means by default, if we did not do asynchronous and we did not do await, it would try to set this response value before it had a chance to fetch and that would cause an error.

        // So in this case, we're only setting the response constant when we actually have data and it can actually be set, Or else it would just be undefined.
        
        apiQuotes = await response.json();
        // So what this means is we are getting the JSON from our API as a response  and then we're turning that response into a JSON object because from a web server, it's actually just a series of strings.And then we're gonna pass that into a global variable apiQuotes.

        // console.log(apiQuotes[12]); We want one quote at a time but we want to to be random. We can't just assign the index manually each time. So what we're gonna do is we're going to break this out into another function so that we're only running the fetch request once.And then we're going to run another function that is going to pull a single quote from our local API quotes array. And that's the function that's going to get triggered every time we press the new, quote, button in the UI. So we will replace it with the function below 
        newQuote();

    }catch(error){
        // Catch Error Here

    }
}


//Tweet a Quote
function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}` ; // A template string uses backticks, This is different than single quotes. The reason we are using a template string is because a template string allows us to pass in a variable and it will be converted into a string.
    window.open(twitterUrl, '_blank');
}

//Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);

//On Load
getQuotes();

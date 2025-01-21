function getAIResponse(message) {
    const apiKey = 'AIzaSyBKWwfuD7psTVBYMncwjjWhDrcybwJkTx4'; // Replace with your actual key

    // API URL example. This may change, and should match
    // the documentation for Google AI Studio
    const apiURL = 'https://generativeail.googleapis.com/v1beta/models/gemini-pro:generateContent';

    return fetch(apiURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': apiKey, // Add the api key to the header
        },
        body: JSON.stringify({
            contents: [{
              parts: [{ text: message }],
            }],
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data && data.candidates && data.candidates.length > 0 && data.candidates[0].content.parts[0].text) {
            return data.candidates[0].content.parts[0].text; // extract the text
        } else {
             return 'Error: Could not get a response from Gemini API.';
        }
    })
    .catch(error => {
       console.error('Error calling Gemini API:', error);
       return 'Error: Could not call the Gemini API.';
    });
            }

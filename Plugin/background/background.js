import { fetchData, translateText } from '../utils/utils.js';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  try {
    if (request.method === "summarize") {
      fetchData(request)
        .then(data => sendResponse({ data }))
        .catch(error => sendResponse({ error: error.message }));
      return true; // Keep the message channel open for sendResponse
    }

    if(request.method === "translate" && request.type === "translate") {
      const text = request.content;
      translateText(text)
        .then(data => sendResponse({ data }))
        .catch(error => sendResponse({ error: error.message }));
      return true; // Keep the message channel open for sendResponse
    }popup.html
  } catch (error) {
    // Error response
    console.error("An error occurred:", error.message);
  }
});

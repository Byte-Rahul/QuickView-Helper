import { actionHandler } from '../utils/utils.js';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  try {
      actionHandler(request)
        .then(data => sendResponse({ data }))
        .catch(error => sendResponse({ error: error.message }));
    return true; // Keep the message channel open for sendResponse
  } catch (error) {
    // Error response
    console.error("An error occurred:", error.message);
  }
});

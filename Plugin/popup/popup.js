// Functions and event listeners for popup interface
const resultContainer = document.getElementById('result-container');
const textToSpeechButton = document.getElementById('textToSpeech');
const copyButton = document.getElementById('copyButton');
const translateButton = document.getElementById('translateButton');

function handleSummaryClick() {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    const currentTab = tabs[0];

    // Extract the URL from the active tab
    const currentTabUrl = currentTab.url;

    // Now you can send the URL to the background script
    sendMessageToBackground({ method: "summarize", type: "summary", content: currentTabUrl });
  });
  
}

function handlePointsClick() {
  chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    const currentTab = tabs[0];

    // Extract the URL from the active tab
    const currentTabUrl = currentTab.url;

    // Now you can send the URL to the background script
    sendMessageToBackground({ method: "summarize", type: "points", content: currentTabUrl });
  });
  
}

function handleCopyClick() {
  const resultText = document.getElementById('result').innerText;
  navigator.clipboard.writeText(resultText)
  copyButton.disabled = true;

  setTimeout(() => {
    copyButton.disabled = false;
  }, 3000); // Reset the button after 3 seconds
}

// Function to handle the action button visiblity
function handleResultVisibility(resultContent) {

  if (resultContent) {
    textToSpeechButton.style.display = 'block';
    textToSpeechButton.disabled = false;

    copyButton.style.display = 'block';
    copyButton.disabled = false;

    translateButton.style.display = 'block';
    translateButton.disabled = false;

    resultContainer.style.display = 'block';
  } else {
    textToSpeechButton.style.display = 'none';
    textToSpeechButton.disabled = true;

    copyButton.style.display = 'none';
    copyButton.disabled = true;

    translateButton.style.display = 'none';
    translateButton.disabled = true;

    resultContainer.style.display = 'none';
  }
}


// Function to handle text-to-speech button click
let currentSpeechInstance = null;

function handleTextToSpeechClick() {
  const resultText = document.getElementById('result').innerText;

  if (currentSpeechInstance && speechSynthesis.speaking) {

    // If speech is in progress, cancel it and reset the button
    speechSynthesis.cancel();
    document.getElementById('textToSpeech').classList.remove('button-active');
    currentSpeechInstance = null;
  } else {
    const msg = new SpeechSynthesisUtterance(resultText);
    msg.rate = 0.9;
    msg.lang = 'hi-IN';

    msg.onstart = function(event) {
      // Add the active class when speech starts
      document.getElementById('textToSpeech').classList.add('button-active');
    };

    msg.onend = function(event) {
      // Remove the active class when speech ends
      document.getElementById('textToSpeech').classList.remove('button-active');
      currentSpeechInstance = null;
    };

    speechSynthesis.speak(msg);

    // Keep track of the current instance
    currentSpeechInstance = msg;
  }
}

// Function to handle translation button click
async function handleTranslateClick() {
  const text = document.getElementById('result').innerText;
  sendMessageToBackground({ method: "translate", type: "translate", content: text});
}


// Function to send message to background
function sendMessageToBackground(message) {
  resultContainer.style.display='block';
  document.getElementById("loader").style.display = "block";
  translateButton.style.display = "none";
  copyButton.style.display = "none";
  textToSpeechButton.style.display = "none"
  document.getElementById("result").innerText = "";

  chrome.runtime.sendMessage(message, function(response) {
    if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError.message);
    } else if (response && response.data) {
      document.getElementById("loader").style.display = "none";
      document.getElementById("result").innerText = response.data;
      handleResultVisibility(response.data);
    } else if (response && response.error) {
      document.getElementById("loader").style.display = "none";
      document.getElementById("result").innerText = response.error;
      handleResultVisibility(response.data);
    } else {
      document.getElementById("result").innerText = "No data received";
    }
  });
}

// Add event listeners
document.getElementById("summary").addEventListener("click", handleSummaryClick);
document.getElementById("points").addEventListener("click", handlePointsClick);
document.getElementById('copyButton').addEventListener('click', handleCopyClick);
document.getElementById('textToSpeech').addEventListener('click', handleTextToSpeechClick);
document.getElementById('translateButton').addEventListener('click', handleTranslateClick);



# QuickView Helper: Instant Web Insights

QuickView Helper is a Chrome extension that provides instant summarized insights from web articles using ChatGPT. This extension offers users the ability to quickly obtain a summary or major points from web content, enhancing browsing efficiency.

## Features

- Overlay button for easy access in the browser.
- Choose between two options: "Summary" or "Points."
- Dialog displays chosen content (summary or points) from the web article.
- Copy the content to the clipboard for further use.
- Listen to the result by clicking read button.
- Translate the result in any language by clicking any translate button.

## Usage

1. Navigate to a web page with the content you want to summarize or extract major points from.
2. Click on the QuickView Helper overlay button in the browser.
3. Choose "Summary" or "Points."
4. Wait for the dialog to display the chosen content.
5. Copy the content to the clipboard by clicking the "Copy" button.
6. Listen the result by clicking the "Read" button.
7. Translate the result into any language.(Right now Hindi is available only)

## Error Handling

The extension includes error handling for network connectivity issues and failed transactions. If an error occurs during content retrieval or processing, an appropriate error message will be displayed to the user.

## Known Limitations

- The summarization accuracy may vary based on the complexity of the content.
- The extension requires an internet connection to function.
- Long articles might result in longer loading times.
- Translation is available for english to hindi only for now.

### Setting Up and Running the "QuickView Helper" Chrome Extension

**Prerequisites:**
- Node.js and npm (Node Package Manager) installed on your machine.

**Steps:**

1. Clone the Repository:
   ```
   git clone <repository-url>
   cd <repository-directory/app>
   ```
2. Give the directory owner permissions:
   ```
   sudo chown -R username:username ta113/
   ```
3. Install Dependencies:
   ```
   npm install
   ```

4. Set Up Environment Variables:
   Create a `.env` file in the app directory of your project and add the necessary environment variables from .env.example:
   ```
   URL=<GPT-3-API-URL>
   API_KEY=<GPT-3-API-KEY>
   TRANSLATION_URL=<Translation-API-URL>
   TRANSLATION_API_KEy = <Translation-API-key>
   ```

5. Start the Backend Server:
   ```
   npm start
   ```

6. Load the Extension in Chrome:
   - Open Chrome and go to `chrome://extensions/`.
   - Enable "Developer mode" (usually a toggle switch at the top-right corner).
   - Click "Load unpacked" and select the root directory of your project.

7. Using the Extension:
   - Open a webpage in Chrome.
   - Click on the extension icon in the toolbar.
   - Select "Summary" or "Major Points" to see the dialog with the summary or points.
   - Click the copy button to copy the content to the clipboard.
   - Click the read button to listen to the results.
   - Click the translate button to translate the results from english to hindi.

### Documentation

**Code Structure:**

- **background.js:** Handles background tasks and message passing between the extension components and backend server.

- **popup.js:** Manages the user interface and interaction with the extension's popup. It communicates with the background script.

- **popup.html:** Defines the UI of the popup.

- **popup.css:** Provides styling for the popup.

- **routes.js:** Defines the routes and route handlers for the Node.js backend.

- **utils.js:** Contains utility functions for making API requests and handling data.

- **app.js:** Main entry point of the Node.js application. Sets up the server, handles middleware, and routes.

**Usage:**

1. **Provide Summary:**
   - Click "Summary" in the extension popup.
   - The extension sends the current webpage URL to the backend for summarization using GPT-3.
   - The summary is displayed in the dialog box.

2. **Provide Major Points:**
   - Click "Points" in the extension popup.
   - The extension sends the current webpage URL to the backend for generating major points using GPT-3.
   - The major points are displayed in the dialog box.

3. **Copy to Clipboard:**
   - Click the copy button in the dialog box to copy the summary or points to the clipboard.

4. **Read:**
   - Make the extentsion read results for you by clicking read button.

5. **Translate**
   - Translate results from english to hindi by clicking translate button.***

### Demo

<iframe width="560" height="315" src="https://drive.google.com/file/d/1UUq3L-VT9KsKyfW6d2dLqS2RXrzQyphW/view?usp=drive_link" frameborder="0" allowfullscreen></iframe>

**Note:** Please ensure that the APIs you are using are properly configured and accessible if API keys are expired get your own new API keys.

By following these steps and referring to the provided documentation, you should be able to set up and run your "QuickView Helper" Chrome extension successfully.

---

Designed and developed by [Rahul jha].

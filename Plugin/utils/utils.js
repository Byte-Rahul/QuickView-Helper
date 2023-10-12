//Function to handle summary 
export async function fetchData(payload) {
    try {
      const response = await fetch('http://localhost:3000/summarize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          type: payload.type,
          method: payload.method,
          content: payload.content
        })
      });
      const data = await response.json();
      if (data.data) {
        return data.data; // Return the actual data
      } else if (data.error) {
        return data.error; // Return the error message
      } else {
        return "Some error occurred. Please try again."; // Default error message
      }
    } catch (error) {
      console.error("An error occurred while fetching data:", error);
      // error response
      return error.message;
    }
  }

// Function to handle translation
  export async function translateText(text) {
    try {
      console.log(text,'text')
      const response = await fetch('http://localhost:3000/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text: text
        })
      });
      const data = await response.json();
      if (data.data) {
        return data.data; // Return the actual data
      } else if (data.error) {
        return data.error; // Return the error message
      } else {
        return "Some error occurred. Please try again."; // Default error message
      }
    } catch (error) {
      console.error("An error occurred while translating text:", error);
      // Throw a custom error or return an error response
      return error.message
    }
}

// Function to handle actions according to metthod
export async function actionHandler (payload) {
    let data;
    if(payload.method === 'summarize'){
      data = await fetchData(payload)
    } else if(payload.method === 'translate'){
      data = await translateText(payload.content);
    }
    return data
}
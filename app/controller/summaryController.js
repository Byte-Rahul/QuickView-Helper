
const axios = require('axios');
const {promptHelper} = require('../prompts/prompt')

// Summarize route
exports.summaryHelper = async(req, res) => {
    try {
        const {method, type, content} = req.body;

        // Check for missing parameters
        if (!method || !type || !content) {
            return res.status(400).json({
              error: 'Bad request. Missing required parameters.',
            });
        }
        
        const url = process.env.URL;
        const apiKey = process.env.API_KEY;
        const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
        };

        if(method && method === 'summarize'){
       
        const prompt = await promptHelper(type, content);

        if(!prompt)
        {
            throw new Error('Please provide the prompt')  ;
        }
                
        const data = {
            model: 'gpt-3.5-turbo',
            messages: [
              { role: 'system', content: 'You are a helpful assistant.' },
              {
                role: 'user',
                content: prompt,
              },
            ],
        };
        const result = await axios.post(url, data, { headers });
        const response = await result.data.choices[0].message.content; 
        return res.json({
                    data : response
                })
        }else {
            return res.status(400).json({
              error: 'Bad request. Invalid method specified.',
            });
          }
    } catch (error) {
        return res.status(500).json({
            error: 'An error occurred while processing your request.',
        });
    }
}

// Translate route
exports.translateHelper = async(req,res) => {
    try {
        const text = req.body.text;
        
    // Check for missing text parameter
    if (!text) {
        return res.status(400).json({
          error: 'Bad request. Missing required text parameter.',
        });
      }
      
    const encodedParams = new URLSearchParams();
    encodedParams.set('source_language', 'en');
    encodedParams.set('target_language', 'hi');
    encodedParams.set('text', text);

    const options = {
        method: 'POST',
        url: process.env.TRANSLATION_URL,
        headers: {
        'content-type': 'application/x-www-form-urlencoded',
        'X-RapidAPI-Key': process.env.TRANSLATION_API_KEy,
        'X-RapidAPI-Host': 'text-translator2.p.rapidapi.com'
        },
        data: encodedParams,
    };
    const response = await axios.request(options);
        return res.json({
            success : 200,
            data : response.data.data.translatedText
        })
        
    } catch (error) {
        return res.status(500).json({
            error: 'An error occurred while processing your translation request.',
        });
    }

}

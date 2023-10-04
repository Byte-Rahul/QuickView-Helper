exports.promptHelper = async(type, url) => {
    try {
        if(type && url){
            return (type === 'summary') 
            ? prompt = `Summarize the content of the webpage ${url} content comprehensively. 
                        Ensure that the summary captures all important details and key points of the content, 
                        leaving no significant information behind. Provide a detailed and concise summary that accurately conveys the main ideas, concepts, 
                        and insights presented on the webpage`
            : prompt = `Generate a detailed summary of the webpage ${url} content. 
                        Extract and present the main points, key insights, and crucial information from the page, 
                        ensuring that no significant details are omitted. Your summary should encompass the most important ideas and concepts covered in the content, 
                        providing a comprehensive understanding of the subject matter.`;  
        }
        return false
    } catch (error) {
        return false;
    }
}
/*
    * response returned from ai is in form of expected output provided that is wrapped up in <TAG>...</TAG> format. 
    * this function is used to filter out the text from mid of those TAG.
*/

const filterText = (text, FILTER) => {
    const regex = new RegExp(`<${FILTER}>([\\s\\S]*?)<\\/${FILTER}>`, 'g');
    const matches = text.match(regex) || [];
    const filteredText = matches.map(match => match.replace(new RegExp(`<${FILTER}>|<\\/${FILTER}>`, 'g'), '').trim());
    return filteredText.join(', ');
}

module.exports = { filterText };

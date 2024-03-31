/**
 * A utility function used to filter out text from a given input based on a specified filter.
 * The response returned from AI is expected to be in the form of <TAG>...</TAG> format, and this function extracts the text from within those tags.
 *
 * @param {string} text - The input text to filter.
 * @param {string} FILTER - The filter tag to use for extracting the text.
 * @returns {string} - The filtered text, joined with commas.
 */

const filterText = (text, FILTER) => {
    const regex = new RegExp(`<${FILTER}>([\\s\\S]*?)<\\/${FILTER}>`, 'g');
    const matches = text.match(regex) || [];
    const filteredText = matches.map(match => match.replace(new RegExp(`<${FILTER}>|<\\/${FILTER}>`, 'g'), '').trim());
    return filteredText.join(', ');
}

module.exports = { filterText };

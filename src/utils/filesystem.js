const fs = require('fs');

const makeFile = (path_with_name, content) => {
    fs.writeFile(`${path_with_name}`, content, { flag: 'w' }, (err) => {
        if (err) throw err;
        console.log(`${path_with_name} has been saved!`);
    });
}

module.exports = { makeFile }
const express = require('express');
const fs = require('fs');

const app = express();
const databaseFileName = process.argv[2];

function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', (err, fileContent) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const lines = fileContent.split('\n').filter((line) => line.trim() !== '');

      const headers = lines[0].split(',');
      const firstnameIndex = headers.indexOf('firstname');
      const fieldIndex = headers.indexOf('field');

      const studentLines = lines.slice(1);

      const fields = {};

      studentLines.forEach((line) => {
        const row = line.split(',');
        const firstname = row[firstnameIndex];
        const field = row[fieldIndex];

        if (!fields[field]) {
          fields[field] = [];
        }
        fields[field].push(firstname);
      });

      let output = `Number of students: ${studentLines.length}`;

      for (const field in fields) {
        const list = fields[field];
        output += `\nNumber of students in ${field}: ${list.length}. List: ${list.join(', ')}`;
      }

      resolve(output);
    });
  });
}

app.get('/', (req, res) => {
  res.send('Hello Holberton School!');
});

app.get('/students', (req, res) => {
  let responseText = 'This is the list of our students\n';

  countStudents(databaseFileName)
    .then((output) => {
      responseText += output;
      res.send(responseText);
    })
    .catch((error) => {
      responseText += error.message;
      res.send(responseText);
    });
});

app.listen(1245);

module.exports = app;

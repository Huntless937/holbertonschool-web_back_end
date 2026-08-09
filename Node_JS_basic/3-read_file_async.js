const fs = require('fs');

function countStudents(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', (err, fileContent) => {
      if (err) {
        reject(new Error('Cannot load the database'));
        return;
      }

      const lines = fileContent.split('\n').filter((line) => line.trim() !== '');

      // First line is the header
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

      console.log(`Number of students: ${studentLines.length}`);

      for (const field in fields) {
        const list = fields[field];
        console.log(`Number of students in ${field}: ${list.length}. List: ${list.join(', ')}`);
      }

      resolve();
    });
  });
}

module.exports = countStudents;

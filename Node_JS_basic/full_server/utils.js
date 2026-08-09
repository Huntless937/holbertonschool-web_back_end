import fs from 'fs';

const readDatabase = (path) => {
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

      resolve(fields);
    });
  });
};

export default readDatabase;
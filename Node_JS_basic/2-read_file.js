const fs = require('fs');

function countStudents(path) {
  let fileContent;

  try {
    fileContent = fs.readFileSync(path, 'utf-8');
  } catch (err) {
    throw new Error('Cannot load the database');
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

  console.log(`Number of students: ${studentLines.length}`);

  for (const field in fields) {
    if (Object.prototype.hasOwnProperty.call(fields, field)) {
      const list = fields[field];
      console.log(`Number of students in ${field}: ${list.length}. List: ${list.join(', ')}`);
    }
  }
}

module.exports = countStudents;

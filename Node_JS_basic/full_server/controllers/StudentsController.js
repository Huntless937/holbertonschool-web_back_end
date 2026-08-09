import readDatabase from '../utils';

class StudentsController {
  static getAllStudents(request, response) {
    const databaseFileName = process.argv[2];

    readDatabase(databaseFileName)
      .then((fields) => {
        let responseText = 'This is the list of our students';

        const sortedFields = Object.keys(fields).sort((a, b) =>
          a.localeCompare(b, 'en', { sensitivity: 'base' })
        );

        sortedFields.forEach((field) => {
          const list = fields[field];
          responseText += `\nNumber of students in ${field}: ${list.length}. List: ${list.join(', ')}`;
        });

        response.status(200).send(responseText);
      })
      .catch(() => {
        response.status(500).send('Cannot load the database');
      });
  }

  static getAllStudentsByMajor(request, response) {
    const databaseFileName = process.argv[2];
    const { major } = request.params;

    if (major !== 'CS' && major !== 'SWE') {
      response.status(500).send('Major parameter must be CS or SWE');
      return;
    }

    readDatabase(databaseFileName)
      .then((fields) => {
        const list = fields[major] || [];
        response.status(200).send(`List: ${list.join(', ')}`);
      })
      .catch(() => {
        response.status(500).send('Cannot load the database');
      });
  }
}

export default StudentsController;
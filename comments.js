// Create web server
// Create a web server that listens to requests on port 3000. When it receives a GET request on '/comments', it should return the content of the comments.json file.

const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.get('/comments', (req, res) => {
  fs.readFile('./comments.json', (err, data) => {
    if (err) {
      res.status(500).send('Internal Server Error');
    } else {
      res.send(JSON.parse(data));
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Path: comments.js
// Create a web server that listens to requests on port 3000. When it receives a POST request on '/comments', it should add the data from the request body to the comments.json file. The data in the request body will be in JSON format.

const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/comments', (req, res) => {
  fs.readFile('./comments.json', (err, data) => {
    if (err) {
      res.status(500).send('Internal Server Error');
    } else {
      const comments = JSON.parse(data);
      comments.push(req.body);
      fs.writeFile('./comments.json', JSON.stringify(comments, null, 2), (err) => {
        if (err) {
          res.status(500).send('Internal Server Error');
        } else {
          res.send('Comment added successfully');
        }
      });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Path: comments.js
// Create a web server that listens to requests on port 3000. When it receives a PUT request on '/comments/:id', it should update the comment with the specified ID in the comments.json file. The data in the request body will be in JSON format.

const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

app.use(express.json());

app.put('/comments/:id', (req, res) => {
  const id = req.params.id;
  fs.readFile('./comments.json', (err, data)
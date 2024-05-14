const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const mysql = require('mysql');
const fs=require("fs");
// Enable CORS for all routes
app.use(cors());
app.use('/uploads', express.static('uploads'));
 const bodyParser = require('body-parser');
 app.use(bodyParser.urlencoded({ extended: false }));
 app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('CORS-enabled web server listening on port 3000');
});
const multer = require('multer');
const { log } = require('console');

// Set up storage configuration for multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/events')  // Ensure this directory exists
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
});
 
// Set up MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  database: 'kaliyamurthy', // Replace with your database name
  user: 'root',         // Replace with your MySQL username
  password: 'root',     // Replace with your MySQL password
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log('Connected to database');
});

// Function to store filename in the database
const storeFilenameInDB = (filename) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO events (filename) VALUES (?)';
    db.query(query, [filename], (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};
const upload = multer({ storage: storage });

app.post('/upload', upload.array('images'), async (req, res) => {
    console.log(req.files);
  try {
    for (const file of req.files) {
      await storeFilenameInDB(file.filename);
    }
    res.send(`Successfully uploaded ${req.files.length} files and stored filenames in database!`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error uploading files and storing filenames');
  }
});

 
const onDutyStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/onduty')   
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
});

const uploadOnDuty = multer({ storage: onDutyStorage });

// Function to store filename in the onduty table
const storeFilenameInOndutyDB = (filename) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO onduty (filename) VALUES (?)';
    db.query(query, [filename], (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};

app.post('/upload-onduty', uploadOnDuty.array('images'), async (req, res) => {
    console.log(req.files);
    try {
        for (const file of req.files) {
            await storeFilenameInOndutyDB(file.filename);
        }
        res.send(`Successfully uploaded ${req.files.length} files to onduty and stored filenames in onduty database!`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Error uploading files to onduty and storing filenames');
    }
});

app.get('/events', async (req, res) => {
  try {
    const query = 'SELECT * FROM events ORDER BY id DESC LIMIT 10';
    db.query(query, (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send('Failed to retrieve events');
      } else {
        res.json(results);
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error processing your request');
  }
});

app.get('/onduty', async (req, res) => {
  try {
    const query = 'SELECT * FROM onduty ORDER BY id DESC LIMIT 10';
    db.query(query, (err, results) => {
      if (err) {
        console.error(err);
        res.status(500).send('Failed to retrieve onduty');
      } else {
        res.json(results);
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error processing your request');
  }
});

app.delete('/events/:id', async (req, res) => {
  try {
    const eventId = req.params.id;
    const fetchEventQuery = 'SELECT filename FROM events WHERE id = ?';
    db.query(fetchEventQuery, [eventId], (fetchErr, fetchResults) => {
      if (fetchErr) {
        console.error(fetchErr);
        res.status(500).send('Failed to fetch event for deletion');
      } else if (fetchResults.length > 0) {
        const filename = fetchResults[0].filename;
        const filePath = `./uploads/events/${filename}`;
        fs.unlink(filePath, (unlinkErr) => {
          if (unlinkErr) {
            console.error(unlinkErr);
            res.status(500).send('Failed to delete event file');
          } else {
            const deleteQuery = 'DELETE FROM events WHERE id = ?';
            db.query(deleteQuery, [eventId], (deleteErr, deleteResult) => {
              if (deleteErr) {
                console.error(deleteErr);
                res.status(500).send('Failed to delete event');
              } else {
                res.send('Event and associated file deleted successfully');
              }
            });
          }
        });
      } else {
        res.status(404).send('Event not found');
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error processing your request');
  }
});
app.delete('/onduty/:id', async (req, res) => {
  try {
    const ondutyId = req.params.id;
    const fetchOndutyQuery = 'SELECT filename FROM onduty WHERE id = ?';
    db.query(fetchOndutyQuery, [ondutyId], (fetchErr, fetchResults) => {
      if (fetchErr) {
        console.error(fetchErr);
        res.status(500).send('Failed to fetch onduty for deletion');
      } else if (fetchResults.length > 0) {
        const filename = fetchResults[0].filename;
        const filePath = `./uploads/onduty/${filename}`;
        fs.unlink(filePath, (unlinkErr) => {
          if (unlinkErr) {
            console.error(unlinkErr);
            res.status(500).send('Failed to delete onduty file');
          } else {
            const deleteQuery = 'DELETE FROM onduty WHERE id = ?';
            db.query(deleteQuery, [ondutyId], (deleteErr, deleteResult) => {
              if (deleteErr) {
                console.error(deleteErr);
                res.status(500).send('Failed to delete onduty');
              } else {
                res.send('Onduty and associated file deleted successfully');
              }
            });
          }
        });
      } else {
        res.status(404).send('Onduty not found');
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error processing your request');
  }
});

app.post('/login', async (req, res) => {
  console.log(req.body);
  try {
    const { username, password } = req.body;
     
    if (!username || !password) {
      return res.status(400).send('Username and password are required');
    }
    const loginQuery = 'SELECT * FROM user WHERE userName = ? AND pass = ?';
    db.query(loginQuery, [username, password], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error during login attempt');
      }
      if (results.length > 0) {
        res.json({token:"2nk2e72yi2adminSPdbkad7821gokul872euRv3223ddsasas0we223*/---"});
      } else {
        res.status(401).send('Invalid username or password');
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

app.post('/validate', (req, res) => {
  const { spTok } = req.body;
  if (!spTok) {
    return res.status(400).send('Token is required');
  }
   const expectedToken = "2nk2e72yi2adminSPdbkad7821gokul872euRv3223ddsasas0we223*/---";
  if (spTok === expectedToken) {
    res.json({ valid: true, message: 'Token is valid' });
  } else {
    res.status(401).json({ valid: false, message: 'Invalid token' });
  }
});


app.get('/eventsForClient', async (req, res) => {
  try {
    const eventsQuery = 'SELECT * FROM events ORDER BY id DESC';
    db.query(eventsQuery, (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error retrieving events');
      }
      res.json(results);
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});


app.get('/ondutyForClient', async (req, res) => {
  try {
    const eventsQuery = 'SELECT * FROM onduty ORDER BY id DESC';
    db.query(eventsQuery, (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error retrieving events');
      }
      res.json(results);
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});
const nodemailer = require('nodemailer');

app.post('/sendMessage', async (req, res) => {
   const { name, email, phone, message } = req.body;

  if (!name || !email || !phone || !message) {
    return res.status(400).send('All fields are required');
  }

   const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "gokultemp1122@gmail.com",
      pass:'mtoa huuw djur xuxr',
    },
  });

  const mailOptions = {
    from: "gokultemp1122@gmail.com",
    to: email,
    subject: "Message from A Cop's Guidance To Succcess Website",
    html: `<p>Name:<b>${name}</b></p> 
    <p>Phone No:<b>${phone}</b></p>
    <p>Email:<b>${email}</b></p>
    <h3>Message: ${message}</h3>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: "Message Send" });
  } catch (error) {
    console.log(error);
    res.json({ message: "failed to send message" });
  }

});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});

//Importing the required packages
import express from "express";
import bodyParser from "body-parser";
import mysql from "mysql";
import cors from "cors";


const app = express();
const port = 3000; // Choosing a port for our server

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root123",
  database: "organdonation"
})

// Connecting to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database');
});

// Parsing JSON bodies
app.use(bodyParser.json());


//Enabling resource sharing from different origins
const corsOptions = {
  origin:  ['http://127.0.0.1:5500', 'http://localhost:3000'], // Allow requests from this origin
  methods: 'GET,POST', // Allow only GET and POST requests
  allowedHeaders: 'Content-Type,Authorization', // Allow these headers
};
app.use(cors(corsOptions));


// Endpoint to handle form submissions
app.post('/submit-form', (req, res) => {

  // Handling form data here
  const formData = req.body;
  console.log('Form data:', formData);

  //Function for mapping the form fields with the column names in sql tables
  function mapFormToColumns(formData) {
    const formFieldMap = {    
      'bloodGroup' : 'Blood Type',
      'location' : 'Location',
      'organToReceive': 'Organ available for donation',
      'previousCardiacConditions' : 'Previous Cardiac Conditions',
      'ejectionFraction' : 'Ejection Fraction in %',
      'meldScore' : 'MELD Score',
      'hlaTyping' : 'HLA Typing',
      'totalLungCapacity' : 'Total Lung Capacity (in Litres)',
      'fev1' : 'FEV1 (in Litres)',
      'dlco' : 'DLCO (in mL/min/mmHg)',
      'length' : 'Length',
      'width' : 'Width',
      'thickness' : 'Thickness',
      'insulinSecretionLevels' : 'Insulin Secretion Levels (in Î¼IU/mL)',
    };
    const mappedColumns = {};
    console.log('Form Field Map:', formFieldMap);
    for (const field in formData) {
      if (formFieldMap.hasOwnProperty(field)) {
        mappedColumns[formFieldMap[field]] = formData[field];
        console.log('Mapped Column:', formFieldMap[field], '=>', formData[field]);
      }
    }
  console.log('Mapped Columns:', mappedColumns);
  return mappedColumns;
  }
  
  const mappedColumns = mapFormToColumns(formData);
  

  // Constructing the SQL query dynamically based on the selected table and field to check
  let query;
  let values = [];

  //Selecting a specific table from database based on the user input about organ to be recieved
  if (formData.organToReceive === 'Heart') {
    query = `SELECT * FROM heart_donors WHERE `;
    const conditions = [];

    //Defining fields to be matched in the table to find compatible donor
    if (formData.ejectionFraction !== undefined && formData.ejectionFraction !== null) { 
      conditions.push('`Ejection Fraction in %` = ?'); 
      values.push(formData.ejectionFraction); 
    }
    if (formData.bloodGroup !== undefined && formData.bloodGroup !== null) { 
      conditions.push('`Blood Type` = ?'); 
      values.push(formData.bloodGroup); 
    }

    query += conditions.join(' AND ');
    console.log("values: ",values);
    console.log("\nconditions: ", conditions);

  }

  //Selecting a specific table from database based on the user input about organ to be recieved
  if (formData.organToReceive === 'Liver') {
    query = `SELECT * FROM liver_donors WHERE `;
    const conditions = [];

    //Defining fields to be matched in the table to find compatible donor
    if (formData.meldScore !== undefined && formData.meldScore !== null) { 
      conditions.push('`MELD Score` = ?'); 
      values.push(formData.meldScore); 
    }
    if (formData.bloodGroup !== undefined && formData.bloodGroup !== null) { 
      conditions.push('`Blood Type` = ?'); 
      values.push(formData.bloodGroup); 
    }
    if (formData.hlaTyping !== undefined && formData.hlaTyping !== null) { 
      conditions.push('`HLA Typing` = ?'); 
      values.push(formData.hlaTyping); 
    }

    query += conditions.join(' AND ');
    console.log("values: ",values);
    console.log("\nconditions: ", conditions);
  }

  //Selecting a specific table from database based on the user input about organ to be recieved
  if (formData.organToReceive === 'Lungs') {
    query = `SELECT * FROM lung_donors WHERE `;
    const conditions = [];

    //Defining fields to be matched in the table to find compatible donor
    if (formData.totalLungCapacity !== undefined && formData.totalLungCapacity !== null) { 
      conditions.push('`Total Lung Capacity (in Litres)` = ?'); 
      values.push(formData.totalLungCapacity); 
    }
    if (formData.bloodGroup !== undefined && formData.bloodGroup !== null) { 
      conditions.push('`Blood Type` = ?'); 
      values.push(formData.bloodGroup); 
    }
    if (formData.fev1 !== undefined && formData.fev1 !== null) { 
      conditions.push('`FEV1 (in Litres)` = ?'); 
      values.push(formData.fev1); 
    }
    if (formData.dlco !== undefined && formData.dlco !== null) { 
      conditions.push('`DLCO (in mL/min/mmHg)` = ?'); 
      values.push(formData.dlco); 
    }

    query += conditions.join(' AND ');
    console.log("values: ",values);
    console.log("\nconditions: ", conditions);
  }

  //Selecting a specific table from database based on the user input about organ to be recieved
  if (formData.organToReceive === 'Pancreas') {
    query = `SELECT * FROM pancreas_donors WHERE `;
    const conditions = [];

    //Defining fields to be matched in the table to find compatible donor
    if (formData.length !== undefined && formData.length !== null) { 
      conditions.push('`Length` = ?'); 
      values.push(formData.length); 
    }
    if (formData.bloodGroup !== undefined && formData.bloodGroup !== null) { 
      conditions.push('`Blood Type` = ?'); 
      values.push(formData.bloodGroup); 
    }
    if (formData.width !== undefined && formData.width !== null) { 
      conditions.push('`Width` = ?'); 
      values.push(formData.width); 
    }
    if (formData.thickness !== undefined && formData.thickness !== null) { 
      conditions.push('`Thickness` = ?'); 
      values.push(formData.thickness); 
    }
    if (formData.insulinSecretionLevels !== undefined && formData.insulinSecretionLevels !== null) { 
      conditions.push('`Insulin Secretion Levels (in Î¼IU/mL)` = ?'); 
      values.push(formData.insulinSecretionLevels); 
    }

    query += conditions.join(' AND ');
    console.log("values: ",values);
    console.log("\nconditions: ", conditions);
  }
  console.log(query);

  // If query is still undefined, returning an error response
  if (!query) {
    return res.status(400).json({ error: 'Invalid organ specified' });
  }

  // Executing the SQL query
  connection.query(query, values, (err, results) => {
    if (err) {
      console.error('Error executing database query:', err);
      console.log("results1 = ",results);
      return res.status(500).json({ error: 'An error occurred while processing the request' });
    }
    if (results.length === 0) {
      // No matching rows found
      console.log("results2 = ",results);
      return res.status(404).json({ message: 'No matching data found' });
    } else {
      // Matching rows found, sending them back to the frontend
      console.log("results3 = ",results);
      return res.status(200).json({ data: results });
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});

const axios = require('axios');
const dotenv = require('dotenv');
const readline = require('readline');

dotenv.config();

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Database API configuration
const databaseAPI = {
  url: 'https://names-dc1b.restdb.io/rest/names',
  config: {
    headers: {
      'Content-Type': 'application/json',
      'x-apikey': process.env.REST_API_KEY // Your API key should be in your .env file
    }
  }
};

// Function to write a name to the database
async function writeNameToDatabase(nameData) {
  try {
    const postResponse = await axios.post(databaseAPI.url, nameData, databaseAPI.config);
    console.log('Data written to the database:', postResponse.data);
    return postResponse.data;
  } catch (error) {
    console.error('Error writing data to the database:', error.response ? error.response.data : error.message);
    throw error;
  }
}

// Prompt user for their name
rl.question('Enter your first name: ', (firstName) => {
  rl.question('Enter your last name: ', (lastName) => {
    const newName = {
      first: firstName,
      last: lastName
    };
    
    writeNameToDatabase(newName)
      .then(data => {
        console.log('Name successfully saved to the database:', data);
        rl.close();
      })
      .catch(error => {
        console.error('Failed to save name to the database:', error);
        rl.close();
      });
  });
});

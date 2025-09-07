document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('submitButton').addEventListener('click', function() {
      const formData = {
        // Get form data here (recipientId, age, etc.)
      };
  
      // Send form data to backend
      fetch('/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Display the result
        displayResult(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
    });
  
    function displayResult(result) {
      const resultDiv = document.getElementById('result');
      resultDiv.innerHTML = '';
  
      if (result === 'No matching data found') {
        resultDiv.innerText = result;
      } else {
        let resultHTML = '<h3>Matching Data:</h3>';
        // Construct HTML to display the matched data
        resultHTML += `<p>Recipient ID: ${result.recipient_id}</p>`;
        resultHTML += `<p>Age: ${result.age}</p>`;
        // Add more fields as needed
        resultDiv.innerHTML = resultHTML;
      }
    }
  });
  
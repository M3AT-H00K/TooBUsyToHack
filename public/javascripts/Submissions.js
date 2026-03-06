document.addEventListener('DOMContentLoaded', () => {

    // --- SIMULATED BACKEND DATA ---
    // In a real app, this data would come from a database via an API call.
    const submissionsData = [
        { task: 'Do this...', user: '232234<br>13', submission: 'zip file', time: '00:18', medal: 'no' },
        { task: 'Do this..', user: '232231<br>22', submission: 'zip file', time: '03:52', medal: 'yes' },
        { task: 'Another<br>task..', user: '232245<br>44', submission: '-', time: '-', medal: 'no' },
        { task: 'Another<br>task..', user: '232214<br>71', submission: '-', time: '04:33', medal: 'yes' },
        { task: 'task 3', user: '232209<br>12', submission: '-', time: '-', medal: 'no' },
        { task: 'task 3', user: '232214<br>41', submission: '-', time: '-', medal: 'no' },
        { task: 'task3', user: '232234<br>59', submission: 'zip file', time: '01:13', medal: 'yes' },
        { task: 'Project X', user: '232500<br>01', submission: 'pdf file', time: '12:45', medal: 'no' },
        { task: 'Final API', user: '232611<br>87', submission: 'link', time: '08:19', medal: 'no' }
    ];
    // --- END OF SIMULATED DATA ---

    const tableBody = document.getElementById('submissionTableBody');

    // Function to populate the table with data
    function populateTable() {
        // Clear any existing rows
        tableBody.innerHTML = '';

        // Loop through each submission object in our data array
        submissionsData.forEach(data => {
            const row = document.createElement('tr');

            // Set the inner HTML for the row, including the interactive select for the medal
            row.innerHTML = `
                <td>${data.task}</td>
                <td>${data.user}</td>
                <td>${data.submission}</td>
                <td>${data.time}</td>
                <td>
                    <select class="medal-select">
                        <option value="yes" ${data.medal === 'yes' ? 'selected' : ''}>yes</option>
                        <option value="no" ${data.medal === 'no' ? 'selected' : ''}>no</option>
                    </select>
                </td>
            `;

            // Append the newly created row to the table body
            tableBody.appendChild(row);
        });
    }

    // Initial call to populate the table when the page loads
    populateTable();

});
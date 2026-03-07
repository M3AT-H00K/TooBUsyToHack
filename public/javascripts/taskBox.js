const fileInput = document.getElementById('taskZip');
const fileNameDisplay = document.getElementById('fileName');

// Make label open file picker
document.querySelector('.file-label').addEventListener('click', () => fileInput.click());

// Show selected filename
fileInput.addEventListener('change', () => {
  fileNameDisplay.textContent = fileInput.files[0]?.name || "No file selected";
});

// Handle form submission
document.getElementById('createTaskForm').addEventListener('submit', async e => {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);

  try {
    const res = await fetch(form.action, {
      method: 'POST',
      body: formData
    });
    if (res.ok) {
      alert("Task created successfully!");
      form.reset();
      fileNameDisplay.textContent = "No file selected";
    } else {
      alert("Error creating task");
    }
  } catch (err) {
    console.error(err);
    alert("Error creating task");
  }
});
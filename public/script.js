const fileInput = document.getElementById('file-input');
const uploadButton = document.getElementById('upload-button');
const linkContainer = document.getElementById('link-container');
const dropArea = document.getElementById('drop-area');
let selectedFile = null; // Store the selected file

// Function to display messages
const displayMessage = (message, type) => {
  linkContainer.innerHTML = `<p class="${type}">${message}</p>`;
};

// Function to display download link
const displayDownloadLink = (link) => {
  linkContainer.innerHTML = `<p class="success">File uploaded successfully! <a href="${link}" target="_blank">Download here</a></p>`;
};

// Function to handle file upload
const uploadFile = () => {
  if (!selectedFile) {
    displayMessage('No file selected. Please choose a file.', 'error');
    return;
  }

  const formData = new FormData();
  formData.append('file', selectedFile);

  fetch('/upload', {
    method: 'POST',
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    if (data.status === 'success') {
      displayDownloadLink(data.link);
    } else {
      displayMessage(data.message, 'error');
    }
  })
  .catch(error => {
    displayMessage('An error occurred during the upload. Please try again.', 'error');
    console.error('Upload error:', error);
  });
};

// Handle file selection through input
uploadButton.addEventListener('click', () => {
  uploadFile(); // Trigger upload on button click
});

// Prevent the default behavior for drag-and-drop to avoid opening the file in a new tab
['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, (event) => {
    event.preventDefault();
    event.stopPropagation();
  });
});

// Highlight drop area when dragging a file
['dragenter', 'dragover'].forEach(eventName => {
  dropArea.addEventListener(eventName, () => {
    dropArea.classList.add('highlight');
  });
});

['dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, () => {
    dropArea.classList.remove('highlight');
  });
});

// Handle dropped files
dropArea.addEventListener('drop', (event) => {
  const file = event.dataTransfer.files[0];
  selectedFile = file; // Store the selected file
  displayMessage(`${file.name} ready to upload.`, 'success'); // Indicate file is ready
});

// Handle file selection when clicking on the drop area
dropArea.addEventListener('click', () => {
  fileInput.click();
});

// Handle file input change event to store the selected file
fileInput.addEventListener('change', () => {
  const file = fileInput.files[0];
  selectedFile = file; // Store the selected file
  displayMessage(`${file.name} ready to upload.`, 'success'); // Indicate file is ready
});

## Node.js File Upload App - Assignment 8

This markdown file documents a Node.js application for uploading files. Users can drag and drop or select files for upload, and the application provides a download link after successful upload.

### Project Structure

The project is organized into the following directory structure:

* **root**
    * `server.js`: Main application entry point
    * `public`: Static files (HTML, CSS, JavaScript)
        * `index.html`: Main user interface for file upload
        * `styles.css`: Styles for the user interface
        * `script.js`: JavaScript code for handling user interactions and file upload
    * `src`: Application logic
        * `controller`: Controllers for handling file upload logic
            * `uploadController.js`: Handles file upload and generates download link
        * `middleware`: Middleware functions for file processing and validation
            * `multerConfig.js`: Configures Multer for file storage and validation
        * `routes`: Routes for handling API requests
            * `uploadRoute.js`: Defines the upload route for file upload

### Application Functionality

1. **User Interface (`public/index.html`)**
   - Users can drag and drop files or click a button to select files for upload.
   - The application displays messages and download links based on upload status.

2. **File Upload (`script.js`)**
   - Handles user interactions and file selection.
   - Utilizes the Fetch API to send file data to the server for upload.
   - Displays success or error messages based on the server response.

3. **Server-Side Processing (`server.js`)**
   - Starts the Express server.
   - Serves static files from the `public` directory.
   - Defines routes for handling API requests.

4. **File Upload Route (`src/routes/uploadRoute.js`)**
   - Defines the `/upload` POST route for receiving file data.
   - Uses Multer middleware to handle file storage and validation.
   - Calls the `uploadController` to process the uploaded file.

5. **File Upload Controller (`src/controller/uploadController.js`)**
   - Receives the uploaded file object from Multer.
   - Generates a download link for the uploaded file.
   - Returns a response with the upload status and download link.

6. **Multer Configuration (`src/middleware/multerConfig.js`)**
   - Configures Multer for disk storage and file filtering.
   - Defines allowed file types (e.g., PNG, DOCX, PDF).
   - Optionally defines file size limits.
   - Validates image dimensions for PNG files (optional, less than 400x300 pixels).

### Running the Application

1.  Install dependencies:

    ```bash
    npm install express multer sharp 
    ```

2.  Run the server:

    ```bash
    node server.js
    ```

3.  Open http://localhost:8080 (default port) in your browser to access the file upload interface.

### Additional Notes

* This document provides a high-level overview of the application functionality.
* The code uses comments to explain specific functionalities within each file.
* You can customize the user interface, file types allowed, and error messages based on your specific requirements.
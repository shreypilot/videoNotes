# Video Player with Notes - README

## Overview

This project is a React application that integrates a YouTube video player with a note-taking feature. Users can watch YouTube videos, take notes at specific timestamps, edit, delete, and download their notes as a PDF. The notes can include text, images, and can be color-coded for better organization. The application also saves the notes to local storage for persistence.

## Features

- **YouTube Video Player**: Plays YouTube videos using `ReactPlayer`.
- **Timestamped Notes**: Users can add notes at specific timestamps in the video.
- **Edit and Delete Notes**: Notes can be edited or deleted.
- **Image Upload**: Users can upload images with their notes using `react-dropzone`.
- **Color-coded Notes**: Users can choose different colors for their notes.
- **Download as PDF**: Notes can be downloaded as a PDF file using `jsPDF`.
- **Local Storage**: Notes are saved to local storage based on the video ID, allowing persistence across sessions.

## Installation

### Prerequisites

- Node.js (version 14 or later)
- npm (version 6 or later)

### Steps

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd video-player-with-notes
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

4. Start the application:
   ```bash
   npm start
   ```

The application will be available at `http://localhost:3000`.

## Usage

1. **Enter YouTube Video ID**: Input the YouTube video ID in the provided input box. The video will automatically load and play.
2. **Watch Video**: Use the controls to play, pause, and navigate through the video.
3. **Add Notes**:
   - Click on "Add new notes" to open the notes editor.
   - Write your note using the `ReactQuill` editor.
   - Optionally, upload an image by dragging and dropping it into the dropzone or clicking to select a file.
   - Choose a color for your note using the color picker.
   - Click "Add Note" to save the note at the current timestamp.
4. **Manage Notes**:
   - Click on any note's timestamp to jump to that point in the video.
   - Edit or delete notes using the respective buttons.
5. **Download Notes**: Click "Download Notes as PDF" to save all your notes in a PDF file.

## Components

### `VideoPlayer`

- **State Variables**:
  - `videoId`: The current YouTube video ID.
  - `videoUrl`: The full URL of the YouTube video.
  - `notes`: An array of notes associated with the video.
  - `currentNote`: The text of the note currently being written or edited.
  - `currentColor`: The color of the current note.
  - `editingNote`: Index of the note being edited, if any.
  - `image`: The image uploaded for the current note.
  - `writeNotes`: Boolean flag to toggle the notes editor.

- **Handlers**:
  - `handleAddNote`: Adds or updates a note.
  - `handleEditNote`: Loads a note into the editor for editing.
  - `handleDeleteNote`: Deletes a note.
  - `handleTimestampClick`: Seeks the video to the note's timestamp.
  - `handleVideoIdChange`: Updates the video ID and loads the corresponding video and notes.
  - `onDrop`: Handles image uploads.

- **Effects**:
  - Loads the video URL and notes from local storage when `videoId` changes.

- **Utilities**:
  - `saveNotesToLocalStorage`: Saves notes to local storage.
  - `downloadPDF`: Generates and downloads a PDF of all notes.

## Dependencies

- `react`: Core library for building the user interface.
- `react-player`: Component for playing YouTube videos.
- `react-quill`: Rich text editor for note-taking.
- `react-dropzone`: Component for handling image uploads.
- `jspdf`: Library for generating PDF files.
- `react-icons`: Icons used in the UI.
- `localStorage`: Browser API for persisting notes.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any improvements or bug fixes.

## Contact

For questions or support, please contact [shreypilot28@gmail.com].

---

By following this README, you should be able to set up, run, and use the video player with notes application effectively. Enjoy!

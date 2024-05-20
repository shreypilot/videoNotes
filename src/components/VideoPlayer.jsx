import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player/youtube";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDropzone } from "react-dropzone";
import { GoPlusCircle } from "react-icons/go";
import { AiOutlineMinusCircle } from "react-icons/ai";
import { jsPDF } from "jspdf";
import { IoMdDownload } from "react-icons/io";
import DeleteNoteModal from "./DeleteModal"; 

const VideoPlayer = () => {
  const [videoId, setVideoId] = useState("dQw4w9WgXcQ");
  const [videoUrl, setVideoUrl] = useState(
    `https://www.youtube.com/watch?v=${videoId}`
  );
  const [notes, setNotes] = useState([]);
  const [currentNote, setCurrentNote] = useState("");
  const [currentColor, setCurrentColor] = useState("#ffffff");
  const [editingNote, setEditingNote] = useState(null);
  const [image, setImage] = useState(null);
  const playerRef = useRef(null);
  const [writeNotes, setWriteNotes] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);

  useEffect(() => {
    setVideoUrl(`https://www.youtube.com/watch?v=${videoId}`);
    const storedNotes = localStorage.getItem(videoId);
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    } else {
      setNotes([]);
    }
  }, [videoId]);

  const saveNotesToLocalStorage = (notes) => {
    localStorage.setItem(videoId, JSON.stringify(notes));
  };

  const handleAddNote = () => {
    if (currentNote.trim() !== "" && playerRef.current) {
      const currentTime = playerRef.current.getCurrentTime();
      const date = new Date();
      const formattedDate = `${date.getDate()} ${date.toLocaleString(
        "default",
        { month: "short" }
      )}'${String(date.getFullYear()).slice(-2)}`;

      const newNote = {
        time: currentTime,
        text: currentNote,
        date: formattedDate,
        image: image,
        color: currentColor,
      };
      let updatedNotes;
      if (editingNote !== null) {
        updatedNotes = notes.map((note, index) =>
          index === editingNote ? newNote : note
        );
        setEditingNote(null);
      } else {
        updatedNotes = [newNote, ...notes];
      }
      setNotes(updatedNotes);
      saveNotesToLocalStorage(updatedNotes);
      setCurrentNote("");
      setCurrentColor("#ffffff");
      setImage(null);
    }
  };

  const handleEditNote = (index) => {
    setWriteNotes(true);
    setCurrentNote(notes[index].text);
    setImage(notes[index].image || null);
    setCurrentColor(notes[index].color || "#ffffff");
    setEditingNote(index);
  };

  const handleDeleteNote = () => {
    const updatedNotes = notes.filter((_, i) => i !== noteToDelete);
    setNotes(updatedNotes);
    saveNotesToLocalStorage(updatedNotes);
    setIsDeleteModalOpen(false);
    setNoteToDelete(null);
  };

  const handleTimestampClick = (time) => {
    if (playerRef.current) {
      playerRef.current.seekTo(time, "seconds");
    }
  };

  const handleVideoIdChange = (e) => {
    const newVideoId = e.target.value;
    setVideoId(newVideoId);
  };

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Notes for Video", 10, 10);

    notes.forEach((note, index) => {
      doc.setFontSize(12);
      doc.text(`Note ${index + 1}`, 10, 20 + index * 20);
      doc.text(`Date: ${note.date}`, 10, 25 + index * 20);
      doc.text(
        `Timestamp: ${new Date(note.time * 1000).toISOString().substr(11, 8)}`,
        10,
        30 + index * 20
      );
      doc.text(`Text: ${note.text}`, 10, 35 + index * 20);
      if (note.image) {
        doc.addImage(note.image, "JPEG", 10, 40 + index * 20, 50, 50);
      }
    });

    doc.save("notes.pdf");
  };

  return (
    <div className="container mx-auto px-[32px] p-8  max-w-[1440px]  ">
      <h1 className="h-[38px] text-2xl font-semibold text-gray-800 underline">
        Video Player with Notes
      </h1>

      <div className="flex flex-col gap-[32px] py-8">
        <div className="flex flex-col">
          <label className="text-lg font-bold pb-2">
            Enter YouTube Video ID:
          </label>
          <input
            type="text"
            placeholder="Enter YouTube Video ID"
            className="border p-2 w-full rounded-lg"
            onChange={handleVideoIdChange}
            value={videoId}
          />
        </div>

        <div className="flex justify-center">
          <ReactPlayer
            width="1376px"
            height="574px"
            ref={playerRef}
            url={videoUrl}
            style={{ borderRadius: "8px" }}
            controls
          />
        </div>

        <div className="flex flex-col gap-[4px] h-[52px] w-full">
          <h1 className="pb-[8px] text-lg font-semibold h-[28px]">
            Video title goes here
          </h1>
          <p className="h-[20px] text-sm font-normal">
            This is the description of the video
          </p>
          <hr className="h-[1px] text-[#EAECF0] w-full" />
        </div>
      </div>
      <div>
        <div className=" h-full rounded-2xl pb-8 p-6 border border-[#EAECF0] flex flex-col gap-[24px] shadow-sm shadow-[#101828]">
          <div className="flex flex-col   gap-[4px] w-full ">
            <div className="flex flex-col md:flex-row justify-between ">
              <div className="flex flex-col gap-[12px]">
                <h1 className="text-lg font-semibold  ">My notes</h1>
                <p className="text-sm font-normal ">
                  All your notes at a single place. Click on any note to go to
                  specific timestamp in the video.
                </p>
              </div>
              <div
                className="flex  text-xl my-4 p-2 justify-center md:py-4 md:px-2 rounded-lg border border-[#D0D5DD] shadow-sm shadow-[#101828] cursor-pointer"
                onClick={() => setWriteNotes(!writeNotes)}
              >
                {writeNotes ? <AiOutlineMinusCircle /> : <GoPlusCircle />}
                <h1 className="text-xs  md:text-sm font-semibold pl-2 pt-1 md:pt-0">
                  {writeNotes ? "Close notes box" : "Add new notes"}
                </h1>
              </div>
            </div>
            <hr className="h-[1px] text-[#EAECF0] w-full" />
          </div>
          <button
            className="flex justify-end ml-auto bg-green-500 text-white py-2 px-4"
            onClick={downloadPDF}
          >
            <span className="pr-1"> Download Notes as PDF</span>
            <IoMdDownload size={22} />
          </button>
          {writeNotes && (
            <div className="bg-blue-50 p-4 rounded-lg">
              <ReactQuill
                value={currentNote}
                onChange={setCurrentNote}
                placeholder="Add a note"
                className="bg-white"
              />
              <div
                {...getRootProps()}
                className="border-dashed border-2 border-gray-400 p-4 mt-2 cursor-pointer bg-white"
              >
                <input {...getInputProps()} />
                {image ? (
                  <img src={image} alt="Note" className="mt-2" />
                ) : (
                  <p>Drag 'n' drop an image here, or click to select one</p>
                )}
              </div>
              <div className="mt-4 flex">
                <label className="text-sm text-gray-800 pr-4">
                  Select Your Text Color of Your Notes:
                </label>
                <input
                  type="color"
                  value={currentColor}
                  onChange={(e) => setCurrentColor(e.target.value)}
                  className=""
                />
              </div>

              <button
                className=" bg-blue-500 text-white flex justify-center mx-auto py-3 px-9 mt-4 rounded-lg"
                onClick={handleAddNote}
              >
                {editingNote !== null ? "Update Note" : "Add Note"}
              </button>
            </div>
          )}

          <div className="mt-4">
            {notes.map((note, index) => (
              <div
                key={index}
                className="border-b py-2 flex justify-between items-start p-6 rounded-lg"
              >
                <div className="flex flex-col gap-1">
                  <div className="text-sm text-gray-500">{note.date}</div>
                  <strong
                    className="text-[#475467] font-medium text-sm cursor-pointer flex"
                    onClick={() => handleTimestampClick(note.time)}
                  >
                    Timestamp:
                    <span className="text-[#6941C6]">
                      {new Date(note.time * 1000).toISOString().substr(11, 8)}
                    </span>
                  </strong>{" "}
                  <div
                    className="border border-[#EAECF0] p-4 w-[256px] md:w-[555px] lg:w-[1280px]  rounded-lg
"
                  >
                    <span
                      dangerouslySetInnerHTML={{ __html: note.text }}
                      style={{ color: note.color }}
                    ></span>
                    {note.image && (
                      <img src={note.image} alt="Note" className="mt-2" />
                    )}
                  </div>
                  <div className="flex space-x-2 justify-end p-3">
                    <button
                      className="text-sm text-gray-500 hover:bg-gray-500 hover:text-white border  border-gray-400 rounded-lg px-2 py-1"
                      onClick={() => {
                        setNoteToDelete(index);
                        setIsDeleteModalOpen(true);
                      }}
                    >
                      Delete
                    </button>
                    <button
                      className="text-sm text-gray-500 hover:bg-gray-500 hover:text-white border border-gray-400 rounded-lg px-2 py-1"
                      onClick={() => handleEditNote(index)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isDeleteModalOpen && (
        <DeleteNoteModal
          onClose={() => setIsDeleteModalOpen(false)}
          onDelete={handleDeleteNote}
        />
      )}
    </div>
  );
};

export default VideoPlayer;

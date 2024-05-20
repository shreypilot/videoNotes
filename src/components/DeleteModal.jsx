import React from "react";

const DeleteNoteModal = ({ onClose, onDelete }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="relative rounded-lg shadow-lg py-6 px-12 mx-6 text-black bg-white justify-center items-center flex flex-col">
        <span
          className="absolute top-2 text-2xl right-4 cursor-pointer"
          onClick={onClose}
        >
          &times;
        </span>
        <h2 className="text-2xl font-bold mb-4 pt-6">
          Are you sure you want to delete this notes?
        </h2>
        <div className="flex space-x-4">
          <button
            className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={onDelete}
          >
            Yes
          </button>
          <button
            className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={onClose}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteNoteModal;

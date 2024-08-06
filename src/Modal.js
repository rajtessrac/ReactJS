import React from 'react';
import './modal.css'; // Import the CSS file for styling

const Modal = ({ showModal, closeModal, handleSubmit }) => {
  if (!showModal) return null;

  let inputRef = React.createRef();

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Modal Title</h2>
        <input
          type="text"
          placeholder="Enter something..."
          ref={inputRef}
        />
        <div className="modal-buttons">
          <button onClick={closeModal}>Close</button>
          <button onClick={() => handleSubmit(inputRef.current.value)}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
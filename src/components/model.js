import React from "react";

import { Button } from "primereact/button";

const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal d-block" : "modal d-none";

  return (
    <div className={showHideClassName}>
      <div className="modal-container">
        {children}
        <Button
          type="button"
          label="Close"
          onClick={handleClose}
        />
      </div>
    </div>
  );
};

export default Modal;

import React, { useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import dropzoneStyles from "./styledDropzone.module.css";
import sharedStyles from "../../styles/GlobalStyles.module.css";
import { RxCross2 } from "react-icons/rx";
import { AiOutlineUpload } from "react-icons/ai";

const styles = { ...dropzoneStyles, ...sharedStyles };

function StyledDropzone({ maxFiles = 1, multiple = false, handleFilesUpdate }) {
  const [files, setFiles] = useState([]);
  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
    acceptedFiles,
    fileRejections,
  } = useDropzone({
    maxFiles: maxFiles,
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
    multiple: multiple,
    onDrop: (acceptedFiles) => {
      const droppedFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      setFiles(droppedFiles);
      handleFilesUpdate(droppedFiles);
    },
  });

  const handleRemove = (file) => {
    const newFiles = [...files];
    newFiles.splice(newFiles.indexOf(file), 1);
    setFiles(newFiles);
    handleFilesUpdate(newFiles);
  };

  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  const thumbs = files.map((file) => (
    <div className={styles.thumb} key={file.name}>
      <div className={styles.thumbInner}>
        <img
          src={file.preview}
          alt="house"
          className={`${styles.img} img-fluid img-thumbnail rounded-circle`}
          style={{ width: "150px", height: "150px" }}
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));

  const acceptedFileItems = files.map((file) => (
    <li
      key={file.path}
      className="d-flex justify-content-center align-items-center gap-2"
    >
      <span className="text-success text-break">
        {file.path} - {file.size / 1000} kb's
      </span>
      <button
        onClick={() => handleRemove(file)}
        className={styles.deleteButton}
      >
        <h3>
          <RxCross2 />
        </h3>
      </button>
    </li>
  ));

  const dropzoneStyle = useMemo(
    () => `${styles.baseStyle} ${isFocused ? styles.focusedStyle : {}}
    ${isDragAccept ? styles.acceptStyle : {}}
    ${isDragReject ? styles.rejectStyle : {}}
  `,
    [isFocused, isDragAccept, isDragReject]
  );

  return (
    <div className="container p-0">
      <div {...getRootProps()} className={dropzoneStyle}>
        <input {...getInputProps()} />
        {files && files.length === 0 && (
          <>
            <h1 className="text-primary">
              <AiOutlineUpload />
            </h1>
            <div className="w-100 d-flex justify-content-center align-items-center">
              <span className="text-center">
                <strong> Drag and drop </strong>
                <br />
                <span>your files here, or </span>
                <span className="text-primary" style={{ cursor: "pointer" }}>
                  browse
                </span>
              </span>
            </div>
          </>
        )}
        <div className={styles.thumbsContainer}>{thumbs}</div>
        <div>{acceptedFileItems}</div>
      </div>
    </div>
  );
}

export default StyledDropzone;

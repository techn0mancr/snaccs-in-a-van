import React from "react";
import Button from "@material-ui/core/Button";

const DisplayFile = ({ className, file }) => {
  return (
    /* Display image */
    <div>
      {file.mimetype.includes("image/") ? (
        <img
          className={className}
          alt={file.name}
          src={`data:${file.mimetype};base64,${file.data}`}
          style={{ objectFit: "cover" }}
        />
      ) : (
        /* Display downloadable button if it is not an image */
        <Button variant="outlined" color="primary">
          <a
            download={file.name}
            href={`data:${file.mimetype};base64,${file.data}`}
          >
            Download {` ${file.name}`}
          </a>
        </Button>
      )}
    </div>
  );
};

export default DisplayFile;

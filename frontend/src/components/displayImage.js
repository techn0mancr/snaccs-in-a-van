const DisplayImage = ({ className, file }) => {
  return (
    <div>
      (
      <img
        className={className}
        alt={file.name}
        src={`data:${file.mimetype};base64,${file.data}`}
        style={{ objectFit: "cover" }}
      />
      )
    </div>
  );
};

export default DisplayImage;
import React, { useState } from "react";
import axios from "axios";

const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (!selectedFile) {
      setMessage("Please select a file.");
      return;
    }

    const originalFileName = selectedFile.name;
    const fileExtension = originalFileName.split(".").pop();
    const productId = "6505633a5e1f00aab106609b"; // Replace with your product ID or generate as needed
    const renamedFileName = `${productId}.${fileExtension}`;
    const renamedFile = new File([selectedFile], renamedFileName, {
      type: selectedFile.type,
    });

    const formData = new FormData();
    formData.append("image", renamedFile);

    axios
      .post("http://localhost:3300/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setMessage(response.data);
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
        setMessage("An error occurred while uploading the image.");
      });
  };

  return (
    <div>
      <h2>Image Upload</h2>
      <input
        name="image"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />
      <br />
      <button onClick={handleUpload}>Upload</button>
      <p>{message}</p>
    </div>
  );
};

export default ImageUpload;

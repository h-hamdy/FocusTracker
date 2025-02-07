import { Upload } from "lucide-react";
import React, { useState } from "react";

export default function ProfileUpload() {
  const [error, setError] = useState("");
  const [fileName, setFileName] = useState("");
  const [dragging, setDragging] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
      if (!allowedTypes.includes(file.type)) {
        setError("Only .png, .jpg, and .jpeg files are allowed.");
        setFileName("");
        event.target.value = "";
        return;
      }

      setError("");
      setFileName(file.name);
      console.log("Valid file uploaded:", file.name);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files[0];

    if (file) {
      const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
      if (!allowedTypes.includes(file.type)) {
        setError("Only .png, .jpg, and .jpeg files are allowed.");
        setFileName("");
        return;
      }

      setError("");
      setFileName(file.name);
      console.log("Dropped file:", file.name);

      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      const input = document.getElementById("picture") as HTMLInputElement;
      if (input) {
        input.files = dataTransfer.files;
        input.dispatchEvent(new Event("change", { bubbles: true }));
      }
    }
  };
  return (
    <div className="">
      <div className="text-lg flex items-center justify-center font-semibold pb-5">
        Set your profile picture
      </div>

      <label
        htmlFor="picture"
        className={`border-2 border-dashed p-5 rounded-lg flex flex-col w-full items-center justify-center cursor-pointer relative transition-colors ${
          dragging ? "border-gray-600 bg-gray-100" : "border-gray-300"
        }`}
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
      >
        <Upload className="w-10 h-10 text-gray-500 mb-2" />
        <span className="text-sm text-gray-600">
          Click to upload or drag file here
        </span>

        <input
          id="picture"
          type="file"
          accept=".png,.jpg,.jpeg"
          className="absolute w-full h-full opacity-0 cursor-pointer"
          onChange={handleFileChange}
        />
      </label>

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      {fileName && !error && (
        <p className="text-green-500 text-sm mt-2">
          Profile Picture Set Successfully
        </p>
      )}
    </div>
  );
}

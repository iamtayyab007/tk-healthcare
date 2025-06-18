import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";

const fileTypes = ["JPG", "PNG", "GIF"];
interface DragDrop {
  value?: File[];
  onChange: (files: File[]) => void;
}
function DragDrop({ value, onChange }: DragDrop) {
  const [file, setFile] = useState(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onChange(Array.from(files));
    }
    return (
      <FileUploader
        handleChange={handleChange}
        name="file"
        types={fileTypes}
        multiple="true"
      />
    );
  };
}
export default DragDrop;

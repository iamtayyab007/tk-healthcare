import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import Image from "next/image";

const fileTypes = ["JPG", "PNG", "GIF"];

function DragDrop(props: any) {
  const [preview, setPreview] = useState<string[]>([]);

  const handleChange = (files: any) => {
    const fileArray = Array.isArray(files)
      ? files
      : files instanceof FileList
      ? Array.from(files)
      : [files];

    console.log("Processed fileArray:", fileArray);
    // ✅ Send files to React Hook Form
    props.onChange(fileArray);

    // if (fileArray[0] instanceof File) {
    //   const imageUrl = URL.createObjectURL(fileArray[0]);
    //   setPreview(imageUrl);
    // }
    const newPreviews = fileArray.map((file: File) =>
      URL.createObjectURL(file)
    );
    setPreview((prev) => [...prev, ...newPreviews]);

    // const updatedFiles = files ? [...files, ...fileArray] : fileArray;
    // props.onChange(updatedFiles);
  };
  console.log("preview", preview);
  return (
    <>
      <div className="flex flex-row gap-3 p-3">
        <FileUploader
          handleChange={handleChange}
          name="files"
          multiple={true}
          types={fileTypes}
          maxSize={2}
        />

        <div className="flex flex-wrap gap-4 p-4 border-2 border-dashed rounded cursor-pointer justify-center items-center min-h-[150px]">
          {preview.length === 0 ? (
            <p className="text-gray-500">Preview the Images</p>
          ) : (
            preview.map((src, idx) => (
              <Image
                key={idx}
                src={src}
                alt={`preview-${idx}`}
                width={100}
                height={100}
                className="rounded object-cover border"
                unoptimized
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default DragDrop;

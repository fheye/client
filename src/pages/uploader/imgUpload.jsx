import '../../styles/output.css'
import { useDropzone } from "react-dropzone";

export default function ImageUpload({setImages}) {

  const onDrop = (acceptedFiles) => {
    const previewImages = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    setImages((prev) => [...prev, ...previewImages]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
    multiple: true,
  });

  return (
    <div className="flex flex-col items-center w-full">
      <div
        {...getRootProps()}
        className={`p-4 border-2 border-sky-500 flex flex-col items-center justify-center w-full h-[30dvh] rounded-lg cursor-pointer transition-colors
          ${isDragActive ? "border-blue-500 bg-blue-100" : "border-gray-300 bg-gray-50 hover:border-blue-400"}`}
      >
        <input {...getInputProps()} />
        <p className="text-xl text-gray-500">
          {isDragActive ? "Add Images" : "Drag images or Click"}
        </p>
        <p className="text-xs text-gray-400">PNG, JPG (max 5MB)</p>
      </div>
    </div>
  );
}

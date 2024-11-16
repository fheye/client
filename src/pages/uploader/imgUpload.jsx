import '../../styles/output.css'
import { useDropzone } from "react-dropzone";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowUp } from '@fortawesome/free-solid-svg-icons';
export default function ImageUpload({ setImages }) {

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
        <div className="flex flex-col items-center w-full h-5/6 bg-customLight rounded-xl">
            <div
                {...getRootProps()}
                className={`p-4 flex flex-col items-center justify-center w-full h-full rounded-lg cursor-pointer transition-colors
          ${isDragActive ? "bg-blue-100" : "bg-customLight"}`}
            >
                <input {...getInputProps()} />
                <div className='w-full h-full relative'>
                    <FontAwesomeIcon icon={faCircleArrowUp} size="3x" style={{ color: 'var(--color-bg-dark' }} className='absolute bottom-8 left-1/2 transform -translate-x-1/2' />
                    <p className='text-2xl absolute bottom-48 left-1/2 transform -translate-x-1/2 -rotate-90 text-bgDark'>{'Upload >'}</p>
                </div>
            </div>
        </div>
    );
}

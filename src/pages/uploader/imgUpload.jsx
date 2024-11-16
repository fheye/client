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
        <div className="flex flex-col items-center w-full h-2/3 mt-20 rounded-xl ">
            <div
                {...getRootProps()}
                className={`relative p-4 flex flex-col items-center justify-center w-full h-full cursor-pointer shadow-video bg-[#ffffff]  rounded-lg`}
            >

                <video
                    className="absolute top-0 left-0 w-full h-full object-cover rounded-lg mix-blend-luminosity"
                    autoPlay
                    loop
                    muted
                    playsInline
                >
                    <source src="src/assets/videos/bluebg.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <input {...getInputProps()} />
                <div className='w-full h-full relative'>
                    <img src='src/assets/icons/arrow 1.png' alt='arrow' className='absolute bottom-8 left-1/2 transform -translate-x-1/2' />
                    <p className='text-xl absolute bottom-24 left-1/2 transform -translate-x-1/2 -rotate-90 text-customWhite opacity-8'>{'upload'}</p>
                </div>
            </div>
        </div>
    );
}

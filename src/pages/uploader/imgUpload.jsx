import { useState } from 'react';
import '../../styles/output.css'
import '../../styles/img_upload.css';
import { useDropzone } from "react-dropzone";
export default function ImageUpload({ images, setImages, videoBackground }) {

    const [arrowAnim, setArrowAnim] = useState(false);

    const onDrop = (acceptedFiles) => {
        const previewImages = acceptedFiles.map((file) =>
            Object.assign(file, {
                preview: URL.createObjectURL(file),
            })
        );
        setImages((prev) => [...prev, ...previewImages]);
        setArrowAnim(true);

        setTimeout(() => {
            setArrowAnim(false);
        }, 2000);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: "image/*",
        multiple: true,
    });

    return (
        <div className="flex flex-col items-center w-full h-full rounded-xl ">
            <div
                {...getRootProps()}
                className={`relative p-4 flex flex-col items-center justify-center w-full h-full cursor-pointer ${videoBackground ? 'bg-[#ffffff]' : 'bg-uploadGradient shadow-facedetector-shadow'}  rounded-lg`}
            >
                {
                    videoBackground &&
                    <video
                        className="absolute top-0 left-0 w-full h-full object-cover rounded-lg mix-blend-luminosity"
                        autoPlay
                        loop
                        muted
                        playsInline
                    >
                        <source src="/bluebg.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                }
                <input {...getInputProps()} />
                <div className="w-full h-full relative">
                    <p className="text-xl absolute bottom-14 left-1/2 transform -translate-x-1/2 -rotate-90 text-customWhite opacity-8">
                        {'Upload'}
                    </p>
                    {(images?.length > 0 && !arrowAnim) ? <img
                        src="/icons/tick.png"
                        alt="arrow-up"
                        className={`absolute bottom-28 left-1/2 transform -translate-x-1/2 w-12 h-12`}
                    /> : <img
                        src="/icons/arrow_1.png"
                        alt="arrow-up"
                        className={`${arrowAnim ? 'arrow-animation' : ''}  absolute bottom-28 left-1/2 transform -translate-x-1/2`}
                    />}
                </div>
            </div>
        </div>
    );
}

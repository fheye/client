import '../../styles/output.css'
import { useState } from "react";
import ImageUpload from './imgUpload';

export default function Uploader() {
    const [images, setImages] = useState([]);
    const handleSubmit = () => {
        console.log("images submitted", images);
    };

    return (
        <div className='relative w-full h-[50dvh] p-2 border-2 border-gray flex justify-center items-center'>
            <div>
                <ImageUpload images={images} setImages={setImages} />
                <div className="w-full h-[20dvh]  flex flex-row justify-center items-center">
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className="relative w-auto h-[10dvh] overflow-hidden border rounded-md"
                        >
                            <img
                                src={image.preview}
                                alt="uploaded preview"
                                className="object-cover h-full w-full"
                            />
                        </div>
                    ))}
                </div>
            </div>
            <button
                onClick={handleSubmit}
                className="absolute bottom-2 right-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
            >
                Submit
            </button>
        </div>
    );
};

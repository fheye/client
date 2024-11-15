import '../../styles/output.css'
import { useState } from "react";
import ImageUpload from '../uploader/imgUpload';
import Layout from '../../components/Layout';

export default function FaceDetector() {
    const [images, setImages] = useState([]);
    const handleSubmit = () => {
        console.log("images submitted", images);
    };
    const handleDeleteImage = () => {
        setImages([]);
    };

    return (
        <Layout>
            <div className='relative w-full h-[70dvh] p-2 border-2 border-gray flex justify-center items-center'>
                <div className="w-1/2 h-full p-2">
                    {images.length === 0 && (
                        <div className="w-full h-full flex flex-row justify-center items-center">
                            <ImageUpload images={images} setImages={setImages} />
                        </div>
                    )}
                    {images.length > 0 && (
                        <div className="w-full h-full flex flex-row justify-center items-center relative">
                            {images.map((image, index) => (
                                <div
                                    key={index}
                                    className="relative w-full h-auto overflow-hidden border rounded-md"
                                >
                                    <img
                                        src={image.preview}
                                        alt="uploaded preview"
                                        className="object-cover h-full w-full"
                                    />
                                </div>
                            ))}
                            <button
                                disabled={images.length <= 0}
                                onClick={handleDeleteImage}
                                className="bg-blue-500 text-white text-sm px-8 py-2 rounded-lg transition
               hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed absolute bottom-2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                            >
                                Delete Image
                            </button>
                        </div>
                    )}


                </div>

                <div className="w-1/2 h-full p-6 flex flex-col justify-evenly items-center">
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-500 text-white text-xl px-8 py-2 rounded-lg hover:bg-blue-600 transition w-full h-[8dvh]"
                    >
                        JSFHDS Input
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-500 text-white text-xl px-8 py-2 rounded-lg hover:bg-blue-600 transition w-full h-[8dvh]"
                    >
                        Generate Proof
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="bg-blue-500 text-white text-xl px-8 py-2 rounded-lg hover:bg-blue-600 transition w-full h-[8dvh]"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </Layout>
    );
};

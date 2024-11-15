import '../../styles/output.css'
import { useState } from "react";
import ImageUpload from '../uploader/imgUpload';
import Layout from '../../components/Layout';
import Card from '../../components/Card';

export default function FaceDetector() {
    const [images, setImages] = useState([]);
    const handleSubmit = () => {
        console.log("images submitted", images);
    };

    return (
        <Layout>
            <div className='relative w-full h-[70dvh] p-2 border-2 border-gray flex justify-center items-center'>
                <div className='w-1/2 h-full p-2'>
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
                <div className="w-1/2 h-full space-y-4 p-2">
                    <Card title="Information-1" description="Description-1" height="h-[18dvh]" />
                    <Card title="Information-1" description="Description-1" height="h-[18dvh]" />
                    <Card title="Information-1" description="Description-1" height="h-[18dvh]" />
                </div>
                <button
                    onClick={handleSubmit}
                    className="absolute w-1/4 bottom-2 left-1/2 transform -translate-x-1/2  bg-blue-500 text-white text-xl px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                    Submit
                </button>
            </div>
        </Layout>
    );
};

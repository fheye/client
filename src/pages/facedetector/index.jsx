import '../../styles/output.css'
import { useState } from "react";
import ImageUpload from '../uploader/imgUpload';
import Layout from '../../components/Layout';
import FaceDetectionArtifact from "../../../abi/FaceDetection.json"

import { ethers } from 'ethers'
import RandomDecimalGrid from '../../components/RandomGrid';
import { FhenixClient } from "fhenixjs";
import Notifications from '../../components/Notifications';

export default function FaceDetector() {
    const [images, setImages] = useState([]);
    const [embedding, setEmbedding] = useState([1, 2, 3, 4]);
    const [hasMatch, setHasMatch] = useState(false);
    const [matchedImage, setMatchedImage] = useState(-1);

    async function handleSubmit () {
        await getEmbeddingOfImage(images[0]);
        await faceDetection(embedding);
    }
    
    const handleDeleteImage = () => {
        setImages([]);
    };

    async function getEmbeddingOfImage(image) {
        // try to call the model and get the embedding of the image
        // if there is no response, return default value
        const numberOfDimensions = 4
        
        setEmbedding(Array.from({ length: numberOfDimensions }, (_, i) => i + 1))

        return [1, 2, 3, 4];
    }

    async function faceDetection(embedding) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const fhenix = new FhenixClient({ provider });

        const signer = await provider.getSigner();

        const contract = new ethers.Contract(
            FaceDetectionArtifact.address,
            FaceDetectionArtifact.abi,
            signer
        );

        const encrypted_embedding = await Promise.all(embedding.map(async (value) => {
            return await fhenix.encrypt_uint8(value);
        }));

        let imageId = 0

        const tx = await contract.faceDetectionChunk(
            imageId,
            encrypted_embedding,
            0
        );

        const recepient = await tx.wait();

        const distance = recepient.logs[0].data;
        if (distance > 5) {
            setHasMatch(true);
            setMatchedImage(imageId);
        }
    }
    

    async function handleReveal() {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const fhenix = new FhenixClient({ provider });

        const signer = await provider.getSigner();

        const contract = new ethers.Contract(
            FaceDetectionArtifact.address,
            FaceDetectionArtifact.abi,
            signer
        );

        const tx = await contract.accessMetadata(
            matchedImage,
        );

        const recepient = await tx.wait();

        console.log(recepient)

        const data = recepient.logs[0].data;

        const rawData = data.slice(2);

        const segmentSize = 64;

        const getSegment = (start) => rawData.slice(start, start + segmentSize);

        // Decode the parameters
        const imageId = BigInt(`0x${getSegment(0)}`); // First segment
        const accessor = `0x${getSegment(64).slice(24)}`; // Address is the last 20 bytes of the second segment
        const fee = BigInt(`0x${getSegment(128)}`); // Third segment
        const locationX = BigInt(`0x${getSegment(192)}`); // Fourth segment
        const locationY = BigInt(`0x${getSegment(256)}`); // Fifth segment
        const timestamp = BigInt(`0x${getSegment(320)}`); // Sixth segment
        
        // Combine into an object
        const decodedEvent = {
            imageId,
            accessor,
            fee,
            locationX,
            locationY,
            timestamp,
        };
        
        // Log the results
        console.log(decodedEvent);
    }


    return (
        <Layout>
            {/* <Notifications />    */}
            <div className='relative w-full h-[70dvh] p-2 border-2 border-gray flex justify-center items-center'>
                <div className="w-1/2 h-full p-2 space-y-4 flex flex-col items-center">
                    {images.length === 0 && (
                        <>
                        <div className="w-full h-full flex flex-row justify-center items-center">
                            <ImageUpload images={images} setImages={setImages} />
                        </div>
                        </>
                    )}
                    {images.length > 0 && (
                        <div className="w-full h-full flex flex-col justify-center items-center space-y-4">
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
                                onClick={handleSubmit}
                                className="bg-blue-500 text-white text-xl px-8 py-2 rounded-lg hover:bg-blue-600 transition w-1/2 h-[8dvh]"
                            >
                                Submit
                            </button>
                            <button
                                disabled={images.length <= 0}
                                onClick={handleDeleteImage}
                                className="bg-blue-500 text-white text-sm px-8 py-2 rounded-lg transition hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed "
                            >
                                Delete Image
                            </button>
                        </div>
                    )}


                </div>

                <div className="w-1/2 h-full p-6 flex flex-col justify-evenly items-center">
                    {
                        hasMatch && 
                        <RandomDecimalGrid />
                    }
                    {
                        hasMatch &&
                        <button
                            onClick={handleReveal}
                            className="bg-blue-500 text-white text-xl px-8 py-2 rounded-lg hover:bg-blue-600 transition w-1/2 h-[8dvh]"
                        >
                            Reveal Metadata
                        </button>
                    }
                </div>
            </div>
        </Layout>
    );
}

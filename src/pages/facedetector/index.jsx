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
    const [decryptedMetadata, setDecryptedMetadata] = useState({});

    async function handleSubmit() {
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

        console.log(decodedEvent);
        setDecryptedMetadata(decodedEvent);
    }


    return (
        <>
            {/* <Notifications />    */}
            < div className='relative w-full h-full flex justify-center items-center' >
                <video
                    className="absolute top-0 left-0 w-full h-full object-cover rounded-lg mix-blend-lighten"
                    autoPlay
                    loop
                    muted
                    playsInline
                >
                    <source src="/purplebg.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <div className="w-full h-full p-2 space-y-4 flex flex-row items-center justify-center">
                    <div className='z-10 text-customWhite w-[35dvw] h-[70dvh] p-2 my-24 bg-facedetectionGradient shadow-facedetector-shadow flex flex-col items-center justify-between'>
                        <span className='self-start pl-12'>{hasMatch ? `Match Found. lat: ${Number(decryptedMetadata.locationX) / 100}- long: ${Number(decryptedMetadata.locationY) / 100}` : 'No Match'}</span>
                        <div className='w-5/6 h-5/6  opacity-80 rounded-xl flex items-center justify-center'>
                            {
                                hasMatch &&
                                <RandomDecimalGrid />
                            }
                        </div>
                        <button
                            disabled={!hasMatch}
                            onClick={handleReveal}
                            className={`bg-blue-500 rounded-xl text-white text-xl w-5/6 h-[6dvh] px-4 transition ${!hasMatch ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
                                }`}
                        >
                            Reveal Metadata
                        </button>
                    </div>
                    <div className='w-[15dvw] h-1/2 px-4'>
                        <ImageUpload images={images} setImages={setImages} />
                        <button
                            onClick={handleSubmit}
                            className="bg-customLight w-full text-customWhite text-xl px-4 py-2 my-2 rounded-lg relative bg-[#ffffff] rounded-lg"
                        >
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
                            <span className="relative z-10">submit</span>
                        </button>
                    </div>
                </div>
            </div >
        </>
    );
}

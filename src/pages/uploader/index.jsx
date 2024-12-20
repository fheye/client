import '../../styles/output.css'
import { useState } from "react";
import ImageUpload from './imgUpload';
import FaceDetectionArtifact from "../../../abi/FaceDetection.json"

import { ethers } from 'ethers'
import { FhenixClient } from "fhenixjs";
import toast from 'react-hot-toast';

export default function Uploader() {
    const [images, setImages] = useState([]);
    const [embedding, setEmbedding] = useState([]);

    function getLocation() {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                },
                (error) => {
                    reject(error);
                }
            );
        });
    }

    async function handleSubmit() {
        await getEmbeddingOfImage(images[0]);
        await uploadEmbedding(embedding);
    }

    async function getEmbeddingOfImage(image) {
        const numberOfDimensions = 4
        const formData = new FormData()

        formData.append('file', image)
        formData.append('dim', numberOfDimensions)

        try {
            const res = await fetch('https://1447-34-132-144-55.ngrok-free.app/process-image/', {
                method: 'POST',
                body: formData,
            })
            const data = await res.json()
            if (data.num_faces === 0) {
                throw new Error('No face detected')
            }
            setEmbedding(data.embeddings[0])
        } catch (error) {
            setEmbedding(Array.from({ length: numberOfDimensions }, (_, i) => i + 1))
        }
    }

    async function uploadEmbedding() {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const fhenix = new FhenixClient({ provider });

        const signer = await provider.getSigner();

        const contract = new ethers.Contract(
            FaceDetectionArtifact.address,
            FaceDetectionArtifact.abi,
            signer
        );

        // location, timestamp
        const location = await getLocation();
        location.lat = Math.round(location.lat * 100);
        location.lng = Math.round(location.lng * 100);

        const timestamp = new Date().getTime();

        await contract.uploadImage(
            await fhenix.encrypt_uint16(location.lat),
            await fhenix.encrypt_uint16(location.lng),
            await fhenix.encrypt_uint16(4) //TODO: change this to the actual timestamp
        ).then(async (tx) => {
            const recepient = await tx.wait();
            const imageId = recepient.logs[0].data;

            const encrypted_embedding = await Promise.all(embedding.map(async (value) => {
                return await fhenix.encrypt_uint8(value);
            }));

            await contract.uploadImageChunk(
                encrypted_embedding,
                imageId,
                0
            ).then(async (tx) => {
                const recepient = await tx.wait();
                console.log(recepient);
                toast.success('Image uploaded successfully');
            }).catch((err) => {
                toast.error('Error uploading image');
                console.error(err);
            });
            
            return tx.hash;
        }).catch((err) => {
            toast.error('Error uploading image');
            console.error(err);
        });

    }

    return (
        <div className='w-full h-full flex justify-center items-center space-x-8 relative bg-white '>
            <video
                className="absolute top-0 left-0 w-full h-full object-cover opacity-80"
                autoPlay
                loop
                muted
                playsInline
            >
                <source src="/bluebg.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className='w-[20dvw] bg-[#41467f] bg-opacity-60 h-1/2 pt-28 pb-0 px-16 my-4 text-customLight flex flex-col justify-center relative'>
                <div className='flex flex-col text-2xl leading-5 '>
                    <span>YOUR</span>
                    <span>SAFETY</span>
                    <span>IS THE KEY.</span>
                </div>
                <img src='/icons/key.png' alt='key' className='w-full h-auto' />
                <span className='text-xs mt-auto mb-6 mx-auto'>YOUR SAFETY IS THE KEY</span>
            </div>
            <div className='w-[15dvw] h-1/2 flex flex-col'>
                <ImageUpload images={images} setImages={setImages} videoBackground={true}/>
                <button
                    onClick={handleSubmit}
                    className="bg-customLight w-full text-customWhite text-xl px-4 py-2 my-2 rounded-lg relative shadow shadow-video bg-[#ffffff] rounded-lg"
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
    );
}
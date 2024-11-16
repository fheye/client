import '../../styles/output.css'
import { useState } from "react";
import ImageUpload from './imgUpload';
import Layout from '../../components/Layout';
import Card from '../../components/Card';
import FaceDetectionArtifact from "../../../abi/FaceDetection.json"

import { ethers } from 'ethers'
import { FhenixClient } from "fhenixjs";

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

    async function handleSubmit () {
        await getEmbeddingOfImage(images[0]);
        await uploadEmbedding(embedding);
    }

    async function getEmbeddingOfImage(image) {
        // try to call the model and get the embedding of the image
        // if there is no response, return default value
        setEmbedding([1, 2, 3, 4]);
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
        location.lat = Math.round(location.lat);
        location.lng = Math.round(location.lng);

        const timestamp = new Date().getTime();

        await contract.uploadImage(
            await fhenix.encrypt_uint16(location.lat),
            await fhenix.encrypt_uint16(location.lng),
            await fhenix.encrypt_uint16(4) //TODO: change this to the actual timestamp
        ).then(async (tx) => {
            const recepient = await tx.wait();
            console.log('recepient:', recepient);
            const imageId = recepient.logs[0].data;
            console.log('imageId:', imageId);

            const encrypted_embedding = await Promise.all(embedding.map(async (value) => {
                return await fhenix.encrypt_uint16(value);
            }));

            await contract.uploadImageChunk(
                encrypted_embedding,
                imageId,
                0
            )
            return tx.hash;
        }).catch((err) => {
            console.error(err);
        });

        // console.log('imageId:', imageId);
    }

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
}

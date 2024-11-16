import Layout from '../../components/Layout.jsx'
import '../../styles/output.css'
import FaceDetectionArtifact from "../../../abi/FaceDetection.json"
import { ethers } from 'ethers'

export default function Landing() {
    async function readFromContract() {
        const provider = new ethers.BrowserProvider(window.ethereum);

        const contract = new ethers.Contract(
            FaceDetectionArtifact.address,
            FaceDetectionArtifact.abi,
            provider
        );
        
        const result = await contract.users("0x891f7737ceedc31dc149cbe6950321345d06477d");
        console.log('result:', result.toString());
    }

    async function writeToContract() {
        const provider = new ethers.BrowserProvider(window.ethereum);

        const signer = await provider.getSigner();

        const contract = new ethers.Contract(
            FaceDetectionArtifact.address,
            FaceDetectionArtifact.abi,
            signer
        );

        const tx = await contract.updateUserLocation(10, 10);
        console.log('tx:', tx);
    }

    return (
        <Layout>
            <div className={'flex flex-row text-4xl space-x-4'}>
                <button onClick={readFromContract} className={'bg-blue-500 text-white p-4 rounded-lg'}>Read from contract</button>
                <button onClick={writeToContract} className={'bg-blue-500 text-white p-4 rounded-lg'}>Write to contract</button>
            </div>
        </Layout>
    )
}
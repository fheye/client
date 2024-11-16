import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
    const [walletAddress, setWalletAddress] = useState('');

    async function onConnectWallet() {
        const res = await window.ethereum.request({ method: 'eth_requestAccounts' });

        if (res.length > 0) {
            setWalletAddress(res[0]);

            window.ethereum.on('accountsChanged', function (accounts) {
                setWalletAddress(accounts[0]);
            }
            );

            window.ethereum.on('chainChanged', function () {
                window.location.reload();
            }
            );

            window.ethereum.on('disconnect', function () {
                window.location.reload();
            }
            );
        }
    }

    async function onDisconnectWallet() {
        setWalletAddress('');
    }

    return (
        <nav style={{ fontFamily: 'RubikScribble' }} className="fixed w-full z-20 top-0 start-0">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to='/' href="" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="src/assets/icons/logo.png" alt="logo" /> <span className="text-white text-xl">fheye</span>
                </Link>
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                    {
                        walletAddress &&
                        <div className="flex items-center space-x-3 rtl:space-x-reverse">
                            <span className="text-sm font-medium text-gray-900 ">{walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}</span>
                            <button onClick={onDisconnectWallet} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center">Disconnect</button>
                        </div>
                    }
                    {
                        !walletAddress &&
                        <button onClick={onConnectWallet} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center">Connect Wallet</button>
                    }
                </div>
                <NavLink to="/" className={({ isActive }) =>
                    isActive ? "text-white" : "text-white"
                }>Home</NavLink>
                <NavLink to="/dashboard" className={({ isActive }) =>
                    isActive ? "text-white" : "text-white"
                }>Dashboard</NavLink>
                <NavLink to="/img" className={({ isActive }) =>
                    isActive ? "text-white" : "text-white"
                }>Image Upload</NavLink>
                <NavLink to="/map" className={({ isActive }) =>
                    isActive ? "text-white" : "text-white"
                }>Map</NavLink>
                <NavLink to="/facedetection" className={({ isActive }) =>
                    isActive ? "text-white" : "text-white"
                }>Face Detection</NavLink>
            </div>
        </nav>
    )
}
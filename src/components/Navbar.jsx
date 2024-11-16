import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
    const [walletAddress, setWalletAddress] = useState('');

    async function onConnectWallet() {
        const res = await window.ethereum.request({ method: 'eth_requestAccounts' });

        if (res.length > 0) {
            setWalletAddress(res[0]);
            localStorage.setItem('walletAddress', res[0]);

            window.ethereum.on('accountsChanged', function (accounts) {
                setWalletAddress(accounts[0]);
                localStorage.setItem('walletAddress', accounts[0]);
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
        localStorage.removeItem('walletAddress');
    }

    return (
        <nav style={{ fontFamily: 'RubikScribble' }} className="fixed w-full z-20 top-0 start-0">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to='/' href="" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src="/icons/logo.png" alt="logo" /> <span className="text-white text-xl">fheye</span>
                </Link>
                <div className="flex flex-row items-center md:order-2 space-x-6">
                    <NavLink to="/" className={({ isActive }) =>
                        isActive ? "text-white" : "text-white"
                    }>Home</NavLink>
                    <NavLink to="/img" className={({ isActive }) =>
                        isActive ? "text-white" : "text-white"
                    }>Submit</NavLink>
                    <NavLink to="/map" className={({ isActive }) =>
                        isActive ? "text-white" : "text-white"
                    }>Map</NavLink>
                    <NavLink to="/facedetection" className={({ isActive }) =>
                        isActive ? "text-white" : "text-white"
                    }>Detection</NavLink>
                    <div className="group flex items-center space-x-3 rtl:space-x-reverse">
                        <button
                            onClick={walletAddress ? onDisconnectWallet : onConnectWallet}
                            type="button"
                            className="group-hover:inline text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center"
                        >
                            {
                                walletAddress && (
                                    <div className="flex items-center space-x-2">
                                        Disconnect
                                    </div>
                                )
                            }
                            {
                                !walletAddress &&
                                <div className="flex items-center space-x-2">
                                    Connect Wallet
                                </div>
                            }
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}
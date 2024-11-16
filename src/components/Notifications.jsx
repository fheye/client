import { ethers } from 'ethers'
import { useEffect, useState } from 'react';
import { PushAPI, CONSTANTS } from '@pushprotocol/restapi';

export default function Notifications() {
    const [notifications, setNotifications] = useState([]);

    async function fetchNotifications() {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();

        const address = await signer.getAddress();

        console.log('address:', address);

        const userAlice = await PushAPI.initialize(
            signer,
            {
                env: CONSTANTS.ENV.STAGING,
            }
        );

        if (userAlice.errors.length > 0) {
            console.error('Error initializing userAlice:', userAlice.errors);
            return;
        }

        const inboxNotifications = await userAlice.notification.list('INBOX');

        console.log('inboxNotifications:', inboxNotifications);

        // setNotifications(inboxNotifications.data);
    }

    useEffect(() => {
        fetchNotifications();
    }, []);

    return (
        <div>
            {
                // notifications.map((notification) => {
                //     return (
                //         <div key={notification.id} className="flex items-center space-x-3 rtl:space-x-reverse">
                //             <span className="text-sm font-medium text-gray-900 ">{notification.title}</span>
                //         </div>
                //     );
                // })
            }
        </div>
    );
}

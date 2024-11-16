import { useEffect, useState } from 'react';
import { PushAPI, CONSTANTS } from '@pushprotocol/restapi';

export default function Notifications({ pushUser }) {
    const [notifications, setNotifications] = useState([]);

    async function fetchNotifications() {
        if (pushUser.errors.length > 0) {
            console.error('Error initializing pushUser:', pushUser.errors);
            return;
        }

        const inboxNotifications = await pushUser.notification.list('INBOX');
        console.log('inboxNotifications:', inboxNotifications);
        setNotifications(inboxNotifications.data);
    }

    useEffect(() => {
        fetchNotifications();
    }, []);

    if (!notifications || notifications.length <= 0) {
        return (
            <div className="bg-customWhite rounded-xl p-4 max-h-[40dvh] w-[30dvw] overflow-y-auto">
                <span className="text-sm font-bold text-gray-900">There are no notifications...</span>
            </div>
        )
    }
    return (
        <div className="bg-customWhite rounded-xl p-4 max-h-[40dvh] w-[30dvw] overflow-y-auto">
            {notifications.map((notification) => (
                <div
                    key={notification.sid}
                    className="flex flex-col items-center space-y-6 border-b-2 border-black py-4 text-center"
                >
                    <span className="text-sm font-bold text-gray-900">{notification.notification.title}</span>
                    <span className="text-sm font-medium text-gray-900">{notification.notification.body}</span>
                </div>
            ))}
        </div>
    )
}

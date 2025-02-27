import React, { useEffect, useState } from "react";

function Notification({ message, type, duration = 3000 }) {
    const [visible, setVisible] = useState(false); 

    useEffect(() => {
        if (message) {
        setVisible(true); 

        const timer = setTimeout(() => {
            setVisible(false); 
        }, duration);

        return () => clearTimeout(timer);
        }
    }, [message, duration]);

    const notificationStyles = `
        fixed bottom-4 left-1/2 transform -translate-x-1/2 
        px-4 py-2 rounded-lg shadow-lg text-white 
        ${type === "error" ? "bg-red-500" : "bg-green-500"}
        transition-opacity duration-300
        ${visible ? "opacity-100" : "opacity-0"}
    `;

    return message ? (
        <div className={notificationStyles}>
        {message}
        </div>
    ) : null;
}

export default Notification;

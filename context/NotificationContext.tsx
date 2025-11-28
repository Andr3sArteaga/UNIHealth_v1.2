import React, { createContext, useState, useContext, ReactNode } from "react";
import NotificationToast, { NotificationType } from "../components/NotificationToast";

interface NotificationState {
    visible: boolean;
    type: NotificationType;
    message?: string;
}

interface NotificationContextType {
    showNotification: (type: NotificationType, message?: string) => void;
    hideNotification: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
    undefined
);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [notification, setNotification] = useState<NotificationState>({
        visible: false,
        type: "success_alert", // Default
    });

    const showNotification = React.useCallback((type: NotificationType, message?: string) => {
        setNotification({
            visible: true,
            type,
            message,
        });
    }, []);

    const hideNotification = React.useCallback(() => {
        setNotification((prev) => ({ ...prev, visible: false }));
    }, []);

    return (
        <NotificationContext.Provider value={{ showNotification, hideNotification }}>
            {children}
            {notification.visible && (
                <NotificationToast
                    type={notification.type}
                    message={notification.message}
                    visible={notification.visible}
                    onClose={hideNotification}
                />
            )}
        </NotificationContext.Provider>
    );
};

export const useNotification = (): NotificationContextType => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error(
            "useNotification must be used within a NotificationProvider"
        );
    }
    return context;
};

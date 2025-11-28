import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { Theme } from "./colors";

export type NotificationType =
    | "success_alert"
    | "error_alert"
    | "appointment"
    | "vitals"
    | "welcome";

interface NotificationToastProps {
    type: NotificationType;
    message?: string;
    visible: boolean;
    onClose: () => void;
}

const { width } = Dimensions.get("window");

const getNotificationConfig = (type: NotificationType) => {
    switch (type) {
        case "success_alert":
            return {
                icon: "checkmark",
                defaultMessage: "Alerta de emergencia con éxito",
                iconColor: Theme.colors.primary,
            };
        case "error_alert":
            return {
                icon: "close",
                defaultMessage: "Error al enviar alerta",
                iconColor: Theme.colors.primary,
            };
        case "appointment":
            return {
                icon: "calendar",
                defaultMessage: "Tienes una cita médica pronto",
                iconColor: Theme.colors.primary,
            };
        case "vitals":
            return {
                icon: "pulse",
                defaultMessage: "Tu médico actualizo tus signos vitales",
                iconColor: Theme.colors.primary,
            };
        case "welcome":
            return {
                icon: "hand-left",
                defaultMessage: "Bienvenido @usuario",
                iconColor: Theme.colors.primary,
            };
        default:
            return {
                icon: "notifications",
                defaultMessage: "Notificación",
                iconColor: Theme.colors.primary,
            };
    }
};

const NotificationToast: React.FC<NotificationToastProps> = ({
    type,
    message,
    visible,
    onClose,
}) => {
    const translateY = useRef(new Animated.Value(-100)).current;
    const config = getNotificationConfig(type);

    useEffect(() => {
        if (visible) {
            Animated.spring(translateY, {
                toValue: 50, // Top position
                useNativeDriver: true,
                speed: 12,
                bounciness: 8,
            }).start();

            // Auto hide after 4 seconds
            const timer = setTimeout(() => {
                handleClose();
            }, 4000);

            return () => clearTimeout(timer);
        } else {
            // Reset position if not visible (though usually handled by handleClose)
        }
    }, [visible]);

    const handleClose = () => {
        Animated.timing(translateY, {
            toValue: -100,
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            onClose();
        });
    };

    if (!visible) return null;

    return (
        <AnimatedContainer style={{ transform: [{ translateY }] }}>
            <ToastContent activeOpacity={0.9} onPress={handleClose}>
                <IconCircle>
                    <Ionicons
                        name={config.icon as any}
                        size={24}
                        color={config.iconColor}
                    />
                </IconCircle>
                <MessageText>{message || config.defaultMessage}</MessageText>
            </ToastContent>
        </AnimatedContainer>
    );
};

export default NotificationToast;

/* ─────────────── STYLES ─────────────── */

const AnimatedContainer = styled(Animated.View)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  align-items: center;
  justify-content: center;
`;

const ToastContent = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: ${Theme.colors.primary};
  padding: ${Theme.spacing.space2}px ${Theme.spacing.space4}px;
  border-radius: 50px;
  width: ${width * 0.9}px;
  min-height: 60px;
  ${() => Theme.shadows.shadowMd}
`;

const IconCircle = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${Theme.colors.white};
  align-items: center;
  justify-content: center;
  margin-right: ${Theme.spacing.space3}px;
`;

const MessageText = styled.Text`
  flex: 1;
  font-size: ${Theme.typography.fontSizeBase}px;
  font-weight: 600;
  color: ${Theme.colors.white};
`;

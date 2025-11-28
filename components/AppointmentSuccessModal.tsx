import React from "react";
import { Modal } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { Theme } from "./colors";
import { AppointmentService } from "./AppointmentCard";

interface AppointmentSuccessModalProps {
    visible: boolean;
    service: AppointmentService | null;
    professionalName: string;
    date: Date | null;
    time: string | null;
    location: string;
    onClose: () => void;
    onAddToCalendar: () => void;
}

const getServiceName = (service: AppointmentService | null): string => {
    const names = {
        general_medicine: "Medicina General",
        psychology: "Salud Mental/Psicología",
        nursing: "Enfermería",
        nutrition: "Nutrición",
    };
    return service ? names[service] : "";
};

const formatDate = (date: Date | null): string => {
    if (!date) return "";
    const days = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
    const months = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    const dayName = days[date.getDay()];
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${dayName}, ${day} De ${month} De ${year}`;
};

const AppointmentSuccessModal: React.FC<AppointmentSuccessModalProps> = ({
    visible,
    service,
    professionalName,
    date,
    time,
    location,
    onClose,
    onAddToCalendar,
}) => {
    return (
        <Modal
            visible={visible}
            animationType="fade"
            transparent={false}
            onRequestClose={onClose}
        >
            <Container>
                <ContentContainer>
                    {/* Success Icon */}
                    <SuccessIconContainer>
                        <SuccessIcon>
                            <Ionicons name="checkmark" size={48} color={Theme.colors.white} />
                        </SuccessIcon>
                    </SuccessIconContainer>

                    {/* Success Message */}
                    <SuccessTitle>¡Cita Confirmada!</SuccessTitle>
                    <SuccessSubtitle>
                        Tu cita ha sido agendada exitosamente
                    </SuccessSubtitle>

                    {/* Appointment Card */}
                    <AppointmentCard>
                        <ServiceBadge>
                            <ServiceBadgeText>{getServiceName(service)}</ServiceBadgeText>
                        </ServiceBadge>

                        <ProfessionalName>{professionalName}</ProfessionalName>

                        <DetailRow>
                            <Ionicons
                                name="calendar"
                                size={16}
                                color={Theme.colors.textSecondary}
                            />
                            <DetailText>{formatDate(date)}</DetailText>
                        </DetailRow>

                        <TimeText>{time}</TimeText>

                        <DetailRow>
                            <Ionicons
                                name="location"
                                size={16}
                                color={Theme.colors.textSecondary}
                            />
                            <DetailText>{location}</DetailText>
                        </DetailRow>
                    </AppointmentCard>

                    {/* Action Buttons */}
                    <ButtonsContainer>
                        <PrimaryButton activeOpacity={0.9} onPress={onClose}>
                            <PrimaryButtonText>Volver al Inicio</PrimaryButtonText>
                        </PrimaryButton>

                        <SecondaryButton activeOpacity={0.9} onPress={onAddToCalendar}>
                            <Ionicons
                                name="calendar-outline"
                                size={20}
                                color={Theme.colors.primary}
                                style={{ marginRight: 8 }}
                            />
                            <SecondaryButtonText>Añadir al Calendario</SecondaryButtonText>
                        </SecondaryButton>
                    </ButtonsContainer>
                </ContentContainer>
            </Container>
        </Modal>
    );
};

export default AppointmentSuccessModal;

/* ─────────────── STYLES ─────────────── */

const Container = styled.View`
  flex: 1;
  background-color: ${Theme.colors.background};
  justify-content: center;
  align-items: center;
  padding: ${Theme.spacing.space4}px;
`;

const ContentContainer = styled.View`
  width: 100%;
  max-width: 400px;
  align-items: center;
`;

const SuccessIconContainer = styled.View`
  margin-bottom: ${Theme.spacing.space4}px;
`;

const SuccessIcon = styled.View`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  background-color: ${Theme.colors.success};
  align-items: center;
  justify-content: center;
  ${() => Theme.shadows.shadowMd}
`;

const SuccessTitle = styled.Text`
  font-size: ${Theme.typography.fontSizeXl}px;
  font-weight: 700;
  color: ${Theme.colors.textPrimary};
  margin-bottom: ${Theme.spacing.space2}px;
  text-align: center;
`;

const SuccessSubtitle = styled.Text`
  font-size: ${Theme.typography.fontSizeBase}px;
  color: ${Theme.colors.textSecondary};
  margin-bottom: ${Theme.spacing.space6}px;
  text-align: center;
`;

const AppointmentCard = styled.View`
  width: 100%;
  background-color: ${Theme.colors.white};
  border-radius: 16px;
  padding: ${Theme.spacing.space5}px;
  margin-bottom: ${Theme.spacing.space6}px;
  border-width: 1px;
  border-color: ${Theme.colors.border};
  ${() => Theme.shadows.shadowSm}
`;

const ServiceBadge = styled.View`
  background-color: ${Theme.colors.primary};
  padding: ${Theme.spacing.space2}px ${Theme.spacing.space3}px;
  border-radius: 20px;
  align-self: flex-start;
  margin-bottom: ${Theme.spacing.space3}px;
`;

const ServiceBadgeText = styled.Text`
  font-size: ${Theme.typography.fontSizeSm}px;
  font-weight: 600;
  color: ${Theme.colors.white};
`;

const ProfessionalName = styled.Text`
  font-size: ${Theme.typography.fontSizeLg}px;
  font-weight: 600;
  color: ${Theme.colors.textPrimary};
  margin-bottom: ${Theme.spacing.space3}px;
`;

const DetailRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
  margin-bottom: ${Theme.spacing.space2}px;
`;

const DetailText = styled.Text`
  font-size: ${Theme.typography.fontSizeSm}px;
  color: ${Theme.colors.textSecondary};
`;

const TimeText = styled.Text`
  font-size: ${Theme.typography.fontSizeXl}px;
  font-weight: 700;
  color: ${Theme.colors.textPrimary};
  margin: ${Theme.spacing.space2}px 0;
`;

const ButtonsContainer = styled.View`
  width: 100%;
  gap: ${Theme.spacing.space3}px;
`;

const PrimaryButton = styled.TouchableOpacity`
  background-color: ${Theme.colors.primary};
  padding: ${Theme.spacing.space4}px;
  border-radius: 12px;
  align-items: center;
  ${() => Theme.shadows.shadowSm}
`;

const PrimaryButtonText = styled.Text`
  font-size: ${Theme.typography.fontSizeBase}px;
  font-weight: 600;
  color: ${Theme.colors.white};
`;

const SecondaryButton = styled.TouchableOpacity`
  background-color: ${Theme.colors.white};
  padding: ${Theme.spacing.space4}px;
  border-radius: 12px;
  border-width: 2px;
  border-color: ${Theme.colors.primary};
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const SecondaryButtonText = styled.Text`
  font-size: ${Theme.typography.fontSizeBase}px;
  font-weight: 600;
  color: ${Theme.colors.primary};
`;

import React, { useState } from "react";
import { Modal, ScrollView, Switch } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { Theme } from "./colors";
import { AppointmentService } from "./AppointmentCard";
import { Professional, Kiosk } from "./AppointmentKioskModal";

interface AppointmentConfirmationModalProps {
    visible: boolean;
    service: AppointmentService | null;
    kiosk: Kiosk | null;
    professional: Professional | null;
    date: Date | null;
    time: string | null;
    onClose: () => void;
    onConfirm: (notes: string, emailReminder: boolean) => void;
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

const AppointmentConfirmationModal: React.FC<AppointmentConfirmationModalProps> = ({
    visible,
    service,
    kiosk,
    professional,
    date,
    time,
    onClose,
    onConfirm,
}) => {
    const [notes, setNotes] = useState("");
    const [emailReminder, setEmailReminder] = useState(true);

    const handleConfirm = () => {
        onConfirm(notes, emailReminder);
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            presentationStyle="pageSheet"
            onRequestClose={onClose}
        >
            <Container>
                {/* Header */}
                <Header>
                    <BackButton onPress={onClose} activeOpacity={0.7}>
                        <Ionicons
                            name="chevron-back"
                            size={24}
                            color={Theme.colors.textPrimary}
                        />
                    </BackButton>
                    <HeaderTitle>Confirmar Cita</HeaderTitle>
                    <Spacer />
                </Header>

                {/* Content */}
                <ContentScroll showsVerticalScrollIndicator={false}>
                    {/* Appointment Summary */}
                    <Section>
                        <SectionTitle>Revisa los detalles de tu cita</SectionTitle>

                        <SummaryContainer>
                            {/* Service */}
                            <SummaryItem>
                                <IconCircle>
                                    <Ionicons name="medical" size={20} color={Theme.colors.white} />
                                </IconCircle>
                                <SummaryContent>
                                    <SummaryLabel>Servicio</SummaryLabel>
                                    <SummaryValue>{getServiceName(service)}</SummaryValue>
                                </SummaryContent>
                            </SummaryItem>

                            {/* Professional */}
                            <SummaryItem>
                                <IconCircle>
                                    <Ionicons name="person" size={20} color={Theme.colors.white} />
                                </IconCircle>
                                <SummaryContent>
                                    <SummaryLabel>Profesional</SummaryLabel>
                                    <SummaryValue>{professional?.name || ""}</SummaryValue>
                                </SummaryContent>
                            </SummaryItem>

                            {/* Date */}
                            <SummaryItem>
                                <IconCircle>
                                    <Ionicons name="calendar" size={20} color={Theme.colors.white} />
                                </IconCircle>
                                <SummaryContent>
                                    <SummaryLabel>Fecha</SummaryLabel>
                                    <SummaryValue>{formatDate(date)}</SummaryValue>
                                </SummaryContent>
                            </SummaryItem>

                            {/* Time */}
                            <SummaryItem>
                                <IconCircle>
                                    <Ionicons name="time" size={20} color={Theme.colors.white} />
                                </IconCircle>
                                <SummaryContent>
                                    <SummaryLabel>Hora</SummaryLabel>
                                    <SummaryValue>{time || ""}</SummaryValue>
                                </SummaryContent>
                            </SummaryItem>

                            {/* Location */}
                            <SummaryItem>
                                <IconCircle>
                                    <Ionicons name="location" size={20} color={Theme.colors.white} />
                                </IconCircle>
                                <SummaryContent>
                                    <SummaryLabel>Ubicación</SummaryLabel>
                                    <SummaryValue>{kiosk?.name || ""}</SummaryValue>
                                </SummaryContent>
                            </SummaryItem>
                        </SummaryContainer>
                    </Section>

                    {/* Optional Notes */}
                    <Section>
                        <SectionTitle>Motivo de la consulta (opcional)</SectionTitle>
                        <NotesInput
                            placeholder="Describe brevemente el motivo de tu cita..."
                            multiline
                            numberOfLines={4}
                            value={notes}
                            onChangeText={setNotes}
                            textAlignVertical="top"
                        />
                    </Section>

                    {/* Reminders */}
                    <Section>
                        <SectionTitle>Recordatorios</SectionTitle>
                        <ReminderItem>
                            <ReminderContent>
                                <ReminderTitle>Recordatorio por email</ReminderTitle>
                                <ReminderSubtitle>Recibe un email 24h antes</ReminderSubtitle>
                            </ReminderContent>
                            <Switch
                                value={emailReminder}
                                onValueChange={setEmailReminder}
                                trackColor={{
                                    false: Theme.colors.border,
                                    true: Theme.colors.primary,
                                }}
                                thumbColor={Theme.colors.white}
                            />
                        </ReminderItem>
                    </Section>

                    {/* Confirm Button */}
                    <ConfirmButton activeOpacity={0.9} onPress={handleConfirm}>
                        <ConfirmButtonText>Confirmar Cita</ConfirmButtonText>
                    </ConfirmButton>
                </ContentScroll>
            </Container>
        </Modal>
    );
};

export default AppointmentConfirmationModal;

/* ─────────────── STYLES ─────────────── */

const Container = styled.View`
  flex: 1;
  background-color: ${Theme.colors.background};
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${Theme.spacing.space4}px;
  border-bottom-width: 1px;
  border-bottom-color: ${Theme.colors.border};
`;

const BackButton = styled.TouchableOpacity`
  padding: ${Theme.spacing.space1}px;
`;

const HeaderTitle = styled.Text`
  font-size: ${Theme.typography.fontSizeLg}px;
  font-weight: 600;
  color: ${Theme.colors.textPrimary};
`;

const Spacer = styled.View`
  width: 40px;
`;

const ContentScroll = styled.ScrollView`
  flex: 1;
  padding: ${Theme.spacing.space4}px;
`;

const Section = styled.View`
  margin-bottom: ${Theme.spacing.space6}px;
`;

const SectionTitle = styled.Text`
  font-size: ${Theme.typography.fontSizeBase}px;
  font-weight: 600;
  color: ${Theme.colors.textPrimary};
  margin-bottom: ${Theme.spacing.space3}px;
`;

const SummaryContainer = styled.View`
  background-color: ${Theme.colors.white};
  border-radius: 12px;
  border-left-width: 4px;
  border-left-color: ${Theme.colors.primary};
  padding: ${Theme.spacing.space4}px;
  ${() => Theme.shadows.shadowSm}
`;

const SummaryItem = styled.View`
  flex-direction: row;
  align-items: flex-start;
  gap: ${Theme.spacing.space3}px;
  margin-bottom: ${Theme.spacing.space4}px;

  &:last-child {
    margin-bottom: 0;
  }
`;

const IconCircle = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${Theme.colors.primary};
  align-items: center;
  justify-content: center;
`;

const SummaryContent = styled.View`
  flex: 1;
`;

const SummaryLabel = styled.Text`
  font-size: ${Theme.typography.fontSizeXs}px;
  color: ${Theme.colors.textSecondary};
  margin-bottom: 2px;
`;

const SummaryValue = styled.Text`
  font-size: ${Theme.typography.fontSizeBase}px;
  font-weight: 500;
  color: ${Theme.colors.textPrimary};
`;

const NotesInput = styled.TextInput`
  background-color: ${Theme.colors.white};
  border-radius: 12px;
  padding: ${Theme.spacing.space3}px;
  font-size: ${Theme.typography.fontSizeBase}px;
  color: ${Theme.colors.textPrimary};
  min-height: 100px;
  border-width: 1px;
  border-color: ${Theme.colors.border};
`;

const ReminderItem = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${Theme.colors.white};
  border-radius: 12px;
  padding: ${Theme.spacing.space4}px;
  ${() => Theme.shadows.shadowSm}
`;

const ReminderContent = styled.View`
  flex: 1;
`;

const ReminderTitle = styled.Text`
  font-size: ${Theme.typography.fontSizeBase}px;
  font-weight: 600;
  color: ${Theme.colors.textPrimary};
  margin-bottom: 2px;
`;

const ReminderSubtitle = styled.Text`
  font-size: ${Theme.typography.fontSizeSm}px;
  color: ${Theme.colors.textSecondary};
`;

const ConfirmButton = styled.TouchableOpacity`
  background-color: ${Theme.colors.primary};
  padding: ${Theme.spacing.space4}px;
  border-radius: 12px;
  align-items: center;
  margin-bottom: ${Theme.spacing.space4}px;
  ${() => Theme.shadows.shadowSm}
`;

const ConfirmButtonText = styled.Text`
  font-size: ${Theme.typography.fontSizeBase}px;
  font-weight: 600;
  color: ${Theme.colors.white};
`;

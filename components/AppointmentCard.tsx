import React from "react";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { Theme } from "./colors";

export interface Appointment {
    id: string;
    service: AppointmentService;
    doctorName: string;
    date: string; // ISO format
    startTime: string; // "HH:MM"
    endTime: string; // "HH:MM"
    location: string;
    status: AppointmentStatus;
}

export type AppointmentService =
    | "general_medicine"
    | "psychology"
    | "nursing"
    | "nutrition";

export type AppointmentStatus =
    | "scheduled"
    | "completed"
    | "cancelled"
    | "rescheduled";

interface AppointmentCardProps {
    appointment: Appointment;
    onReschedule?: () => void;
    onCancel?: () => void;
    onPress?: () => void;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({
    appointment,
    onReschedule,
    onCancel,
    onPress,
}) => {
    const formatDate = (dateString: string): { day: string; month: string } => {
        const date = new Date(dateString);
        const day = date.getDate().toString();
        const months = [
            "ene",
            "feb",
            "mar",
            "abr",
            "may",
            "jun",
            "jul",
            "ago",
            "sep",
            "oct",
            "nov",
            "dic",
        ];
        const month = months[date.getMonth()];
        return { day, month };
    };

    const getServiceName = (service: AppointmentService): string => {
        const names = {
            general_medicine: "Medicina General",
            psychology: "Psicología",
            nursing: "Enfermería",
            nutrition: "Nutrición",
        };
        return names[service];
    };

    const { day, month } = formatDate(appointment.date);
    const isCompleted = appointment.status === "completed";

    return (
        <Card activeOpacity={onPress ? 0.7 : 1} onPress={onPress}>
            <CardContent>
                <DateBadge isCompleted={isCompleted}>
                    <DateDay isCompleted={isCompleted}>{day}</DateDay>
                    <DateMonth isCompleted={isCompleted}>{month}</DateMonth>
                </DateBadge>

                <AppointmentInfo>
                    <ServiceRow>
                        <ServiceName>{getServiceName(appointment.service)}</ServiceName>
                        <Ionicons
                            name="chevron-forward"
                            size={20}
                            color={Theme.colors.textSecondary}
                        />
                    </ServiceRow>

                    <DoctorName>{appointment.doctorName}</DoctorName>

                    <DetailRow>
                        <Ionicons
                            name="time-outline"
                            size={16}
                            color={Theme.colors.textSecondary}
                        />
                        <DetailText>
                            {appointment.startTime} - {appointment.endTime}
                        </DetailText>
                    </DetailRow>

                    <DetailRow>
                        <Ionicons
                            name="location-outline"
                            size={16}
                            color={Theme.colors.textSecondary}
                        />
                        <DetailText>{appointment.location}</DetailText>
                    </DetailRow>

                    {isCompleted && (
                        <StatusBadge>
                            <StatusText>Completada</StatusText>
                        </StatusBadge>
                    )}
                </AppointmentInfo>
            </CardContent>

            {!isCompleted && (onReschedule || onCancel) && (
                <ActionsRow>
                    {onReschedule && (
                        <ActionButton
                            activeOpacity={0.7}
                            onPress={onReschedule}
                            isPrimary={true}
                        >
                            <ActionButtonText isPrimary={true}>Reprogramar</ActionButtonText>
                        </ActionButton>
                    )}

                    {onCancel && (
                        <ActionButton
                            activeOpacity={0.7}
                            onPress={onCancel}
                            isPrimary={false}
                        >
                            <ActionButtonText isPrimary={false}>Cancelar</ActionButtonText>
                        </ActionButton>
                    )}
                </ActionsRow>
            )}
        </Card>
    );
};

export default AppointmentCard;

/* ─────────────── STYLES ─────────────── */

const Card = styled.TouchableOpacity`
  background-color: ${Theme.colors.white};
  border-radius: 16px;
  padding: ${Theme.spacing.space4}px;
  margin-bottom: ${Theme.spacing.space3}px;
  ${() => Theme.shadows.shadowSm}
`;

const CardContent = styled.View`
  flex-direction: row;
  gap: ${Theme.spacing.space3}px;
`;

interface DateBadgeProps {
    isCompleted: boolean;
}

const DateBadge = styled.View<DateBadgeProps>`
  width: 56px;
  height: 56px;
  border-radius: 12px;
  background-color: ${({ isCompleted }) =>
        isCompleted ? Theme.colors.textTertiary : Theme.colors.primary};
  align-items: center;
  justify-content: center;
`;

const DateDay = styled.Text<{ isCompleted: boolean }>`
  font-size: ${Theme.typography.fontSizeXl}px;
  font-weight: 700;
  color: ${Theme.colors.white};
`;

const DateMonth = styled.Text<{ isCompleted: boolean }>`
  font-size: ${Theme.typography.fontSizeXs}px;
  font-weight: 500;
  color: ${Theme.colors.white};
  text-transform: lowercase;
`;

const AppointmentInfo = styled.View`
  flex: 1;
`;

const ServiceRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${Theme.spacing.space1}px;
`;

const ServiceName = styled.Text`
  font-size: ${Theme.typography.fontSizeBase}px;
  font-weight: 600;
  color: ${Theme.colors.textPrimary};
`;

const DoctorName = styled.Text`
  font-size: ${Theme.typography.fontSizeSm}px;
  color: ${Theme.colors.textSecondary};
  margin-bottom: ${Theme.spacing.space2}px;
`;

const DetailRow = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${Theme.spacing.space1}px;
  margin-bottom: ${Theme.spacing.space1}px;
`;

const DetailText = styled.Text`
  font-size: ${Theme.typography.fontSizeSm}px;
  color: ${Theme.colors.textSecondary};
`;

const StatusBadge = styled.View`
  background-color: ${Theme.colors.success};
  border-radius: 12px;
  padding: ${Theme.spacing.space1}px ${Theme.spacing.space2}px;
  align-self: flex-start;
  margin-top: ${Theme.spacing.space2}px;
`;

const StatusText = styled.Text`
  font-size: ${Theme.typography.fontSizeXs}px;
  font-weight: 600;
  color: ${Theme.colors.white};
`;

const ActionsRow = styled.View`
  flex-direction: row;
  gap: ${Theme.spacing.space2}px;
  margin-top: ${Theme.spacing.space3}px;
  padding-top: ${Theme.spacing.space3}px;
  border-top-width: 1px;
  border-top-color: ${Theme.colors.border};
`;

interface ActionButtonProps {
    isPrimary: boolean;
}

const ActionButton = styled.TouchableOpacity<ActionButtonProps>`
  flex: 1;
  padding: ${Theme.spacing.space2}px ${Theme.spacing.space3}px;
  border-radius: 999px;
  border-width: 1px;
  border-color: ${({ isPrimary }) =>
        isPrimary ? Theme.colors.primary : Theme.colors.border};
  background-color: ${Theme.colors.white};
  align-items: center;
`;

const ActionButtonText = styled.Text<{ isPrimary: boolean }>`
  font-size: ${Theme.typography.fontSizeSm}px;
  font-weight: 500;
  color: ${({ isPrimary }) =>
        isPrimary ? Theme.colors.primary : Theme.colors.textSecondary};
`;

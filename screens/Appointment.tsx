// src/screens/Appointment.tsx
import React, { useState, useMemo } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { Theme } from "../components/colors";
import { Ionicons } from "@expo/vector-icons";
import AppointmentCard, {
    Appointment as AppointmentType,
    AppointmentService,
} from "../components/AppointmentCard";
import AppointmentServiceModal from "../components/AppointmentServiceModal";
import AppointmentKioskModal, {
    Kiosk,
    Professional,
} from "../components/AppointmentKioskModal";
import AppointmentDateTimeModal from "../components/AppointmentDateTimeModal";
import AppointmentConfirmationModal from "../components/AppointmentConfirmationModal";
import AppointmentSuccessModal from "../components/AppointmentSuccessModal";
import { useNotification } from "../context/NotificationContext";

type TabType = "upcoming" | "past";

const Appointment: React.FC = () => {
    const [activeTab, setActiveTab] = useState<TabType>("upcoming");
    const { showNotification } = useNotification();

    // Multi-step scheduling state
    const [schedulingStep, setSchedulingStep] = useState<number>(0);
    const [appointmentData, setAppointmentData] = useState<{
        service: AppointmentService | null;
        kiosk: Kiosk | null;
        professional: Professional | null;
        date: Date | null;
        time: string | null;
        notes: string;
        emailReminder: boolean;
    }>({
        service: null,
        kiosk: null,
        professional: null,
        date: null,
        time: null,
        notes: "",
        emailReminder: true,
    });

    const [appointments, setAppointments] = useState<AppointmentType[]>([
        // Mock data - upcoming appointments
        {
            id: "1",
            service: "psychology",
            doctorName: "Dra. Ana Martínez",
            date: "2025-11-14T10:00:00",
            startTime: "10:00 AM",
            endTime: "11:00 AM",
            location: "Kiosco Campus Norte",
            status: "scheduled",
        },
        {
            id: "2",
            service: "general_medicine",
            doctorName: "Dr. Carlos Ramírez",
            date: "2025-11-19T14:00:00",
            startTime: "2:00 PM",
            endTime: "2:30 PM",
            location: "Kiosco Facultad Ciencias",
            status: "scheduled",
        },
        // Mock data - past appointment
        {
            id: "3",
            service: "nutrition",
            doctorName: "Lic. María Torres",
            date: "2025-10-09T09:00:00",
            startTime: "9:00 AM",
            endTime: "9:30 AM",
            location: "Kiosco Campus Sur",
            status: "completed",
        },
    ]);

    const isUpcoming = (appointment: AppointmentType): boolean => {
        const appointmentDate = new Date(appointment.date);
        const now = new Date();
        return appointmentDate >= now && appointment.status === "scheduled";
    };

    const upcomingAppointments = useMemo(() => {
        return appointments
            .filter(isUpcoming)
            .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }, [appointments]);

    const pastAppointments = useMemo(() => {
        return appointments
            .filter((apt) => !isUpcoming(apt))
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }, [appointments]);

    // Step 0 → Step 1: Open service selection
    const handleNewAppointment = () => {
        setSchedulingStep(1);
    };

    // Step 1 → Step 2: Service selected, go to kiosk/professional selection
    const handleServiceSelect = (service: AppointmentService) => {
        setAppointmentData((prev) => ({ ...prev, service }));
        setSchedulingStep(2);
    };

    // Step 2 → Step 3: Professional selected, go to date/time selection
    const handleProfessionalSelect = (kiosk: Kiosk, professional: Professional) => {
        setAppointmentData((prev) => ({ ...prev, kiosk, professional }));
        setSchedulingStep(3);
    };

    // Step 3 → Step 4: Date/time selected, go to confirmation
    const handleDateTimeSelect = (date: Date, time: string) => {
        setAppointmentData((prev) => ({ ...prev, date, time }));
        setSchedulingStep(4);
    };

    // Step 4 → Step 5: Confirmed, go to success
    const handleConfirm = (notes: string, emailReminder: boolean) => {
        setAppointmentData((prev) => ({ ...prev, notes, emailReminder }));

        // Create new appointment
        const newAppointment: AppointmentType = {
            id: Date.now().toString(),
            service: appointmentData.service!,
            doctorName: appointmentData.professional!.name,
            date: appointmentData.date!.toISOString(),
            startTime: appointmentData.time!,
            endTime: "", // Could calculate based on service duration
            location: appointmentData.kiosk!.name,
            status: "scheduled",
        };

        setAppointments((prev) => [...prev, newAppointment]);
        setSchedulingStep(5);
    };

    // Step 5 → Step 0: Close success and reset
    const handleCloseSuccess = () => {
        setSchedulingStep(0);
        setAppointmentData({
            service: null,
            kiosk: null,
            professional: null,
            date: null,
            time: null,
            notes: "",
            emailReminder: true,
        });
    };

    const handleAddToCalendar = () => {
        // TODO: Implement calendar integration
        console.log("Add to calendar");
    };

    // Close any modal (back button)
    const handleCloseModal = () => {
        if (schedulingStep > 1) {
            setSchedulingStep(schedulingStep - 1);
        } else {
            setSchedulingStep(0);
        }
    };

    const handleReschedule = (appointmentId: string) => {
        console.log("Reschedule appointment:", appointmentId);
        // TODO: Implement reschedule logic
    };

    const handleCancel = (appointmentId: string) => {
        console.log("Cancel appointment:", appointmentId);
        // TODO: Implement cancel logic
    };

    const handleFilterPress = () => {
        // TODO: Implement filter functionality
    };

    const displayedAppointments =
        activeTab === "upcoming" ? upcomingAppointments : pastAppointments;

    return (
        <Container>
            <ContentScroll
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: Theme.spacing.space10,
                }}
            >
                {/* Header */}
                <Header>
                    <HeaderTitle>Mis Citas</HeaderTitle>
                    <HeaderIconButton onPress={handleFilterPress} activeOpacity={0.7}>
                        <Ionicons
                            name="funnel-outline"
                            size={22}
                            color={Theme.colors.textSecondary}
                        />
                    </HeaderIconButton>
                </Header>

                {/* Agendar Nueva Cita Button */}
                <NewAppointmentButton
                    activeOpacity={0.9}
                    onPress={handleNewAppointment}
                >
                    <Ionicons
                        name="add"
                        size={20}
                        color={Theme.colors.white}
                        style={{ marginRight: 8 }}
                    />
                    <NewAppointmentText>Agendar Nueva Cita</NewAppointmentText>
                </NewAppointmentButton>

                {/* Tabs */}
                <TabsContainer>
                    <TabButton
                        active={activeTab === "upcoming"}
                        onPress={() => setActiveTab("upcoming")}
                        activeOpacity={0.7}
                    >
                        <TabText active={activeTab === "upcoming"}>Próximas</TabText>
                    </TabButton>

                    <TabButton
                        active={activeTab === "past"}
                        onPress={() => setActiveTab("past")}
                        activeOpacity={0.7}
                    >
                        <TabText active={activeTab === "past"}>Pasadas</TabText>
                    </TabButton>
                </TabsContainer>

                {/* Test Notification Button */}
                <TouchableOpacity
                    style={{
                        marginHorizontal: 16,
                        marginTop: 10,
                        padding: 10,
                        backgroundColor: Theme.colors.primaryLight,
                        borderRadius: 8,
                        alignItems: "center",
                    }}
                    onPress={() => showNotification("appointment")}
                >
                    <Text style={{ color: Theme.colors.primary, fontWeight: "600" }}>
                        Simular Recordatorio de Cita
                    </Text>
                </TouchableOpacity>

                {/* Appointments List */}
                <AppointmentsContainer>
                    {displayedAppointments.length > 0 ? (
                        displayedAppointments.map((appointment) => (
                            <AppointmentCard
                                key={appointment.id}
                                appointment={appointment}
                                onReschedule={
                                    activeTab === "upcoming"
                                        ? () => handleReschedule(appointment.id)
                                        : undefined
                                }
                                onCancel={
                                    activeTab === "upcoming"
                                        ? () => handleCancel(appointment.id)
                                        : undefined
                                }
                            />
                        ))
                    ) : (
                        <EmptyState>
                            <EmptyIconWrapper>
                                <Ionicons
                                    name="calendar-outline"
                                    size={48}
                                    color={Theme.colors.textTertiary}
                                />
                            </EmptyIconWrapper>
                            <EmptyText>
                                {activeTab === "upcoming"
                                    ? "No tienes citas próximas"
                                    : "No tienes citas pasadas"}
                            </EmptyText>
                        </EmptyState>
                    )}
                </AppointmentsContainer>
            </ContentScroll>

            {/* Step 1: Service Selection Modal */}
            <AppointmentServiceModal
                visible={schedulingStep === 1}
                onClose={handleCloseModal}
                onServiceSelect={handleServiceSelect}
            />

            {/* Step 2: Kiosk/Professional Selection Modal */}
            <AppointmentKioskModal
                visible={schedulingStep === 2}
                service={appointmentData.service}
                onClose={handleCloseModal}
                onProfessionalSelect={handleProfessionalSelect}
            />

            {/* Step 3: Date/Time Selection Modal */}
            <AppointmentDateTimeModal
                visible={schedulingStep === 3}
                onClose={handleCloseModal}
                onDateTimeSelect={handleDateTimeSelect}
            />

            {/* Step 4: Confirmation Modal */}
            <AppointmentConfirmationModal
                visible={schedulingStep === 4}
                service={appointmentData.service}
                kiosk={appointmentData.kiosk}
                professional={appointmentData.professional}
                date={appointmentData.date}
                time={appointmentData.time}
                onClose={handleCloseModal}
                onConfirm={handleConfirm}
            />

            {/* Step 5: Success Modal */}
            <AppointmentSuccessModal
                visible={schedulingStep === 5}
                service={appointmentData.service}
                professionalName={appointmentData.professional?.name || ""}
                date={appointmentData.date}
                time={appointmentData.time}
                location={appointmentData.kiosk?.name || ""}
                onClose={handleCloseSuccess}
                onAddToCalendar={handleAddToCalendar}
            />
        </Container>
    );
};

export default Appointment;

/* ─────────────── STYLES ─────────────── */

const Container = styled.View`
  flex: 1;
  background-color: ${Theme.colors.background};
`;

const ContentScroll = styled.ScrollView`
  flex: 1;
`;

const Header = styled.View`
  padding: ${Theme.spacing.space4}px ${Theme.spacing.space4}px 0;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const HeaderTitle = styled.Text`
  font-size: ${Theme.typography.fontSizeLg}px;
  font-weight: 600;
  color: ${Theme.colors.textPrimary};
`;

const HeaderIconButton = styled.TouchableOpacity`
  padding: ${Theme.spacing.space1}px;
`;

const NewAppointmentButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${Theme.colors.primary};
  margin: ${Theme.spacing.space4}px ${Theme.spacing.space4}px 0;
  padding: ${Theme.spacing.space3}px;
  border-radius: 12px;
  ${() => Theme.shadows.shadowSm}
`;

const NewAppointmentText = styled.Text`
  font-size: ${Theme.typography.fontSizeBase}px;
  font-weight: 600;
  color: ${Theme.colors.white};
`;

const TabsContainer = styled.View`
  flex-direction: row;
  margin: ${Theme.spacing.space4}px ${Theme.spacing.space4}px 0;
  gap: ${Theme.spacing.space2}px;
`;

interface TabButtonProps {
    active: boolean;
}

const TabButton = styled.TouchableOpacity<TabButtonProps>`
  flex: 1;
  padding: ${Theme.spacing.space2}px;
  border-radius: 8px;
  border-width: 1px;
  border-color: ${({ active }) =>
        active ? Theme.colors.primary : Theme.colors.border};
  background-color: ${({ active }) =>
        active ? Theme.colors.primaryLight : Theme.colors.white};
  align-items: center;
`;

const TabText = styled.Text<{ active: boolean }>`
  font-size: ${Theme.typography.fontSizeSm}px;
  font-weight: ${({ active }) => (active ? "600" : "400")};
  color: ${({ active }) =>
        active ? Theme.colors.primary : Theme.colors.textSecondary};
`;

const AppointmentsContainer = styled.View`
  padding: ${Theme.spacing.space4}px;
`;

const EmptyState = styled.View`
  align-items: center;
  justify-content: center;
  padding: ${Theme.spacing.space10}px ${Theme.spacing.space4}px;
`;

const EmptyIconWrapper = styled.View`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  border-width: 1px;
  border-color: ${Theme.colors.textTertiary}33;
  align-items: center;
  justify-content: center;
  margin-bottom: ${Theme.spacing.space3}px;
`;

const EmptyText = styled.Text`
  font-size: ${Theme.typography.fontSizeBase}px;
  color: ${Theme.colors.textSecondary};
  text-align: center;
`;

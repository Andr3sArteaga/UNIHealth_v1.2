import React, { useState } from "react";
import { Modal, ScrollView } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { Theme } from "./colors";
import { AppointmentService } from "./AppointmentCard";

interface ServiceOption {
    id: AppointmentService;
    title: string;
    description: string;
    icon: keyof typeof Ionicons.glyphMap;
}

interface AppointmentServiceModalProps {
    visible: boolean;
    onClose: () => void;
    onServiceSelect: (service: AppointmentService) => void;
}

const SERVICE_OPTIONS: ServiceOption[] = [
    {
        id: "general_medicine",
        title: "Medicina General",
        description: "Consultas generales y chequeos de rutina",
        icon: "medical",
    },
    {
        id: "psychology",
        title: "Salud Mental/Psicología",
        description: "Atención psicológica y apoyo emocional",
        icon: "heart",
    },
    {
        id: "nursing",
        title: "Enfermería",
        description: "Curaciones, inyecciones y primeros auxilios",
        icon: "fitness",
    },
    {
        id: "nutrition",
        title: "Nutrición",
        description: "Asesoría nutricional y planes alimenticios",
        icon: "nutrition",
    },
];

const AppointmentServiceModal: React.FC<AppointmentServiceModalProps> = ({
    visible,
    onClose,
    onServiceSelect,
}) => {
    const [selectedService, setSelectedService] =
        useState<AppointmentService | null>(null);

    const handleServicePress = (service: AppointmentService) => {
        setSelectedService(service);
        // Small delay for visual feedback before calling onServiceSelect
        setTimeout(() => {
            onServiceSelect(service);
            setSelectedService(null);
        }, 200);
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
                    <HeaderTitle>Agendar Cita</HeaderTitle>
                    <Spacer />
                </Header>

                {/* Content */}
                <ContentScroll showsVerticalScrollIndicator={false}>
                    <SectionHeader>
                        <SectionTitle>Selecciona el Servicio</SectionTitle>
                        <SectionSubtitle>¿Qué tipo de atención necesitas?</SectionSubtitle>
                    </SectionHeader>

                    <ServicesContainer>
                        {SERVICE_OPTIONS.map((service) => (
                            <ServiceCard
                                key={service.id}
                                activeOpacity={0.7}
                                onPress={() => handleServicePress(service.id)}
                                selected={selectedService === service.id}
                            >
                                <IconContainer>
                                    <Ionicons
                                        name={service.icon}
                                        size={28}
                                        color={Theme.colors.white}
                                    />
                                </IconContainer>

                                <ServiceInfo>
                                    <ServiceTitle>{service.title}</ServiceTitle>
                                    <ServiceDescription>{service.description}</ServiceDescription>
                                </ServiceInfo>

                                <Ionicons
                                    name="chevron-forward"
                                    size={20}
                                    color={Theme.colors.textSecondary}
                                />
                            </ServiceCard>
                        ))}
                    </ServicesContainer>
                </ContentScroll>
            </Container>
        </Modal>
    );
};

export default AppointmentServiceModal;

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

const SectionHeader = styled.View`
  margin-bottom: ${Theme.spacing.space4}px;
`;

const SectionTitle = styled.Text`
  font-size: ${Theme.typography.fontSizeLg}px;
  font-weight: 700;
  color: ${Theme.colors.textPrimary};
  margin-bottom: ${Theme.spacing.space1}px;
`;

const SectionSubtitle = styled.Text`
  font-size: ${Theme.typography.fontSizeSm}px;
  color: ${Theme.colors.textSecondary};
`;

const ServicesContainer = styled.View`
  gap: ${Theme.spacing.space3}px;
`;

interface ServiceCardProps {
    selected: boolean;
}

const ServiceCard = styled.TouchableOpacity<ServiceCardProps>`
  flex-direction: row;
  align-items: center;
  background-color: ${Theme.colors.white};
  border-radius: 16px;
  padding: ${Theme.spacing.space4}px;
  gap: ${Theme.spacing.space3}px;
  ${() => Theme.shadows.shadowSm}
  border-width: ${({ selected }) => (selected ? 2 : 0)}px;
  border-color: ${Theme.colors.primary};
`;

const IconContainer = styled.View`
  width: 56px;
  height: 56px;
  border-radius: 12px;
  background-color: ${Theme.colors.primary};
  align-items: center;
  justify-content: center;
`;

const ServiceInfo = styled.View`
  flex: 1;
`;

const ServiceTitle = styled.Text`
  font-size: ${Theme.typography.fontSizeBase}px;
  font-weight: 600;
  color: ${Theme.colors.textPrimary};
  margin-bottom: ${Theme.spacing.space1}px;
`;

const ServiceDescription = styled.Text`
  font-size: ${Theme.typography.fontSizeSm}px;
  color: ${Theme.colors.textSecondary};
  line-height: 18px;
`;

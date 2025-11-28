import React, { useState } from "react";
import { Modal, ScrollView } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { Theme } from "./colors";
import { AppointmentService } from "./AppointmentCard";

export interface Professional {
  id: string;
  name: string;
  initials: string;
  specialty: string;
  rating: number;
  nextAvailableSlot: {
    date: Date;
    time: string;
    label: string; // "Hoy" or "Mañana"
  };
}

export interface Kiosk {
  id: string;
  name: string;
  distance: string;
  isActive: boolean;
  professionals: Professional[];
}

interface AppointmentKioskModalProps {
  visible: boolean;
  service: AppointmentService | null;
  onClose: () => void;
  onProfessionalSelect: (kiosk: Kiosk, professional: Professional) => void;
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

const AppointmentKioskModal: React.FC<AppointmentKioskModalProps> = ({
  visible,
  service,
  onClose,
  onProfessionalSelect,
}) => {
  // Mock data - in production, this would be filtered by service
  const kiosks: Kiosk[] = [
    {
      id: "1",
      name: "Kiosco Campus Norte",
      distance: "0.3 km de distancia",
      isActive: true,
      professionals: [
        {
          id: "1",
          name: "Dra. Ana Martínez",
          initials: "DAM",
          specialty: "Psicología Clínica",
          rating: 4.8,
          nextAvailableSlot: {
            date: new Date(),
            time: "2:00 PM",
            label: "Hoy",
          },
        },
        {
          id: "2",
          name: "Dr. Roberto Mendoza",
          initials: "DRM",
          specialty: "Medicina General",
          rating: 4.9,
          nextAvailableSlot: {
            date: new Date(Date.now() + 86400000),
            time: "9:00 AM",
            label: "Mañana",
          },
        },
      ],
    },
    {
      id: "2",
      name: "Kiosco Facultad de Medicina",
      distance: "0.5 km de distancia",
      isActive: true,
      professionals: [
        {
          id: "3",
          name: "Dra. Laura Pérez",
          initials: "DLP",
          specialty: "Psicología",
          rating: 4.7,
          nextAvailableSlot: {
            date: new Date(),
            time: "4:00 PM",
            label: "Hoy",
          },
        },
      ],
    },
  ];

  const handleProfessionalSelect = (kiosk: Kiosk, professional: Professional) => {
    onProfessionalSelect(kiosk, professional);
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
          <HeaderContent>
            <HeaderTitle>Seleccionar Kiosco</HeaderTitle>
            <HeaderSubtitle>{getServiceName(service)}</HeaderSubtitle>
          </HeaderContent>
          <Spacer />
        </Header>

        {/* Content */}
        <ContentScroll showsVerticalScrollIndicator={false}>
          {kiosks.map((kiosk) => (
            <KioskSection key={kiosk.id}>
              {/* Kiosk Header */}
              <KioskHeader>
                <KioskInfo>
                  <KioskName>{kiosk.name}</KioskName>
                  <DistanceContainer>
                    <Ionicons
                      name="location"
                      size={14}
                      color={Theme.colors.primary}
                    />
                    <DistanceText>{kiosk.distance}</DistanceText>
                  </DistanceContainer>
                </KioskInfo>
                {kiosk.isActive && <ActiveIndicator />}
              </KioskHeader>

              {/* Professionals List */}
              <ProfessionalsContainer>
                {kiosk.professionals.map((professional) => (
                  <ProfessionalCard key={professional.id}>
                    <ProfessionalInfo>
                      <Avatar>
                        <AvatarText>{professional.initials}</AvatarText>
                      </Avatar>

                      <ProfessionalDetails>
                        <ProfessionalName>{professional.name}</ProfessionalName>
                        <SpecialtyText>{professional.specialty}</SpecialtyText>
                        <RatingContainer>
                          <Ionicons
                            name="star"
                            size={14}
                            color={Theme.colors.warning}
                          />
                          <RatingText>{professional.rating}</RatingText>
                        </RatingContainer>
                      </ProfessionalDetails>
                    </ProfessionalInfo>

                    <AvailabilityContainer>
                      <TimeSlotContainer>
                        <Ionicons
                          name="time-outline"
                          size={16}
                          color={Theme.colors.textSecondary}
                        />
                        <TimeSlotText>
                          {professional.nextAvailableSlot.label},{" "}
                          {professional.nextAvailableSlot.time}
                        </TimeSlotText>
                      </TimeSlotContainer>

                      <SelectButton
                        activeOpacity={0.8}
                        onPress={() => handleProfessionalSelect(kiosk, professional)}
                      >
                        <SelectButtonText>Seleccionar</SelectButtonText>
                      </SelectButton>
                    </AvailabilityContainer>
                  </ProfessionalCard>
                ))}
              </ProfessionalsContainer>
            </KioskSection>
          ))}
        </ContentScroll>
      </Container>
    </Modal>
  );
};

export default AppointmentKioskModal;

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

const HeaderContent = styled.View`
  flex: 1;
  align-items: center;
`;

const HeaderTitle = styled.Text`
  font-size: ${Theme.typography.fontSizeLg}px;
  font-weight: 600;
  color: ${Theme.colors.textPrimary};
`;

const HeaderSubtitle = styled.Text`
  font-size: ${Theme.typography.fontSizeSm}px;
  color: ${Theme.colors.textSecondary};
  margin-top: 2px;
`;

const Spacer = styled.View`
  width: 40px;
`;

const ContentScroll = styled.ScrollView`
  flex: 1;
  padding: ${Theme.spacing.space4}px;
`;

const KioskSection = styled.View`
  margin-bottom: ${Theme.spacing.space6}px;
`;

const KioskHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${Theme.spacing.space3}px;
`;

const KioskInfo = styled.View`
  flex: 1;
`;

const KioskName = styled.Text`
  font-size: ${Theme.typography.fontSizeBase}px;
  font-weight: 600;
  color: ${Theme.colors.textPrimary};
  margin-bottom: ${Theme.spacing.space1}px;
`;

const DistanceContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;

const DistanceText = styled.Text`
  font-size: ${Theme.typography.fontSizeXs}px;
  color: ${Theme.colors.textSecondary};
`;

const ActiveIndicator = styled.View`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: ${Theme.colors.success};
`;

const ProfessionalsContainer = styled.View`
  gap: ${Theme.spacing.space3}px;
`;

const ProfessionalCard = styled.View`
  background-color: ${Theme.colors.white};
  border-radius: 12px;
  padding: ${Theme.spacing.space4}px;
  ${() => Theme.shadows.shadowSm}
`;

const ProfessionalInfo = styled.View`
  flex-direction: row;
  gap: ${Theme.spacing.space3}px;
  margin-bottom: ${Theme.spacing.space3}px;
`;

const Avatar = styled.View`
  width: 48px;
  height: 48px;
  border-radius: 24px;
  background-color: ${Theme.colors.border};
  align-items: center;
  justify-content: center;
`;

const AvatarText = styled.Text`
  font-size: ${Theme.typography.fontSizeSm}px;
  font-weight: 600;
  color: ${Theme.colors.textSecondary};
`;

const ProfessionalDetails = styled.View`
  flex: 1;
`;

const ProfessionalName = styled.Text`
  font-size: ${Theme.typography.fontSizeBase}px;
  font-weight: 600;
  color: ${Theme.colors.textPrimary};
  margin-bottom: 2px;
`;

const SpecialtyText = styled.Text`
  font-size: ${Theme.typography.fontSizeSm}px;
  color: ${Theme.colors.textSecondary};
  margin-bottom: ${Theme.spacing.space1}px;
`;

const RatingContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 4px;
`;

const RatingText = styled.Text`
  font-size: ${Theme.typography.fontSizeSm}px;
  font-weight: 600;
  color: ${Theme.colors.textPrimary};
`;

const AvailabilityContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const TimeSlotContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 6px;
`;

const TimeSlotText = styled.Text`
  font-size: ${Theme.typography.fontSizeSm}px;
  color: ${Theme.colors.textSecondary};
`;

const SelectButton = styled.TouchableOpacity`
  background-color: ${Theme.colors.primary};
  padding: ${Theme.spacing.space2}px ${Theme.spacing.space4}px;
  border-radius: 8px;
`;

const SelectButtonText = styled.Text`
  font-size: ${Theme.typography.fontSizeSm}px;
  font-weight: 600;
  color: ${Theme.colors.white};
`;

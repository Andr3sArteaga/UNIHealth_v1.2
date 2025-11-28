import React from "react";
import { View, ScrollView, Image, TouchableOpacity, Text } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { Theme } from "../components/colors";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import api from "../api/api";
import { useNotification } from "../context/NotificationContext";

const Home: React.FC = () => {
  const navigation = useNavigation<any>();
  const { showNotification } = useNotification();
  const [userName, setUserName] = React.useState("Usuario");
  const [initials, setInitials] = React.useState("U");

  const fetchUserProfile = async () => {
    try {
      const response = await api.get('/user/profile');
      const profile = response.data.patientProfile;
      if (profile && profile.firstName) {
        setUserName(`${profile.firstName} ${profile.lastName}`);
        setInitials(`${profile.firstName[0]}${profile.lastName[0]}`);
      } else if (response.data.email) {
        setUserName(response.data.email.split('@')[0]);
        setInitials(response.data.email[0].toUpperCase());
      }
    } catch (error: any) {
      console.log("Error fetching profile", error);
      if (error.response) {
        console.log("Response status:", error.response.status);
        console.log("Response data:", error.response.data);
      } else {
        console.log("No response, check network or URL");
      }
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchUserProfile();
    }, [])
  );

  const handleOpenAlert = () => {
    navigation.navigate("Alert");
  }

  return (
    <Container>
      <ContentScroll
        contentContainerStyle={{
          paddingBottom: Theme.spacing.space12,
        }}
      >
        {/* HEADER ROJO */}
        <Header>
          <HeaderTopRow>
            <GreetingWrapper>
              <GreetingSmall>Hola,</GreetingSmall>
              <GreetingName>{userName}</GreetingName>
            </GreetingWrapper>

            <ProfileBubble>
              <ProfileInitials>{initials}</ProfileInitials>
            </ProfileBubble>
          </HeaderTopRow>

          <EmergencyButton activeOpacity={0.9} onPress={handleOpenAlert}>
            <EmergencyIconWrapper>
              <Ionicons
                name="radio-button-on"
                size={22}
                color={Theme.colors.primary}
              />
            </EmergencyIconWrapper>
            <EmergencyText>ALERTA DE EMERGENCIA</EmergencyText>
          </EmergencyButton>
        </Header>

        {/* CONTENIDO PRINCIPAL */}
        <ContentInner>
          {/* Accesos Rápidos */}
          <SectionHeader>
            <SectionTitle>Accesos Rápidos</SectionTitle>
          </SectionHeader>

          <QuickAccessGrid>
            <QuickCard>
              <QuickCardIcon>
                <Ionicons
                  name="document-text-outline"
                  size={24}
                  color={Theme.colors.white}
                />
              </QuickCardIcon>
              <QuickCardLabel>Historial Médico</QuickCardLabel>
            </QuickCard>

            <QuickCard>
              <QuickCardIcon>
                <Ionicons
                  name="calendar-outline"
                  size={24}
                  color={Theme.colors.white}
                />
              </QuickCardIcon>
              <QuickCardLabel>Agendar Cita</QuickCardLabel>
            </QuickCard>

            <QuickCard>
              <QuickCardIcon>
                <Ionicons
                  name="book-outline"
                  size={24}
                  color={Theme.colors.white}
                />
              </QuickCardIcon>
              <QuickCardLabel>Diario Médico</QuickCardLabel>
            </QuickCard>
          </QuickAccessGrid>

          {/* Próximas Citas */}
          <SectionHeaderRow>
            <SectionTitle>Próximas Citas</SectionTitle>
            <SeeAllRow>
              <SeeAllText>Ver todas</SeeAllText>
              <Ionicons
                name="chevron-forward"
                size={16}
                color={Theme.colors.primary}
              />
            </SeeAllRow>
          </SectionHeaderRow>

          <AppointmentCard>
            <AppointmentDateBlock>
              <AppointmentDay>15</AppointmentDay>
              <AppointmentMonth>Nov</AppointmentMonth>
            </AppointmentDateBlock>

            <AppointmentInfo>
              <AppointmentTitle>Consulta Psicología</AppointmentTitle>
              <AppointmentLine>
                <Ionicons
                  name="time-outline"
                  size={14}
                  color={Theme.colors.textSecondary}
                />
                <AppointmentLineText>
                  10:00 AM - 11:00 AM
                </AppointmentLineText>
              </AppointmentLine>
              <AppointmentLine>
                <Ionicons
                  name="location-outline"
                  size={14}
                  color={Theme.colors.textSecondary}
                />
                <AppointmentLineText>
                  Kiosco Campus Norte
                </AppointmentLineText>
              </AppointmentLine>
            </AppointmentInfo>

            <AppointmentArrow>
              <Ionicons
                name="chevron-forward"
                size={20}
                color={Theme.colors.textTertiary}
              />
            </AppointmentArrow>
          </AppointmentCard>

          {/* Signos Vitales Recientes */}
          <SectionHeader>
            <SectionTitle>Signos Vitales Recientes</SectionTitle>
          </SectionHeader>

          <VitalsGrid>
            <VitalCard>
              <VitalLabel>Presión Arterial</VitalLabel>
              <VitalValue>120/80</VitalValue>
              <VitalStatus>Normal</VitalStatus>
            </VitalCard>

            <VitalCard>
              <VitalLabel>Frecuencia Cardíaca</VitalLabel>
              <VitalValue>72</VitalValue>
              <VitalStatus>Normal</VitalStatus>
            </VitalCard>

            <VitalCard>
              <VitalLabel>Temperatura</VitalLabel>
              <VitalValue>36.5°C</VitalValue>
              <VitalStatus>Normal</VitalStatus>
            </VitalCard>

            <VitalCard>
              <VitalLabel>Peso</VitalLabel>
              <VitalValue>65 kg</VitalValue>
              <VitalSubStatus>Última medición</VitalSubStatus>
            </VitalCard>
          </VitalsGrid>

          {/* Test Notification Button */}
          <TouchableOpacity
            style={{
              marginTop: 20,
              padding: 10,
              backgroundColor: Theme.colors.primaryLight,
              borderRadius: 8,
              alignItems: "center",
            }}
            onPress={() => showNotification("vitals")}
          >
            <Text style={{ color: Theme.colors.primary, fontWeight: "600" }}>
              Simular Actualización de Signos Vitales
            </Text>
          </TouchableOpacity>
        </ContentInner>
      </ContentScroll>
    </Container>
  );
};

export default Home;

/* ─────────────── STYLES ─────────────── */

const Container = styled.View`
  flex: 1;
  background-color: ${Theme.colors.background};
`;

const ContentScroll = styled.ScrollView`
  flex: 1;
`;

const Header = styled.View`
  background-color: ${Theme.colors.primary};
  padding: ${Theme.spacing.space4}px;
  padding-top: ${Theme.spacing.space12}px;
  border-bottom-left-radius: 24px;
  border-bottom-right-radius: 24px;
`;

const HeaderTopRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${Theme.spacing.space6}px;
`;

const GreetingWrapper = styled.View``;

const GreetingSmall = styled.Text`
  font-size: ${Theme.typography.fontSizeSm}px;
  color: rgba(255, 255, 255, 0.8);
`;

const GreetingName = styled.Text`
  font-size: ${Theme.typography.fontSizeXl}px;
  font-weight: 700;
  color: ${Theme.colors.white};
`;

const ProfileBubble = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.2);
  justify-content: center;
  align-items: center;
`;

const ProfileInitials = styled.Text`
  font-size: ${Theme.typography.fontSizeSm}px;
  font-weight: 600;
  color: ${Theme.colors.white};
`;

const EmergencyButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${Theme.colors.white};
  padding: ${Theme.spacing.space3}px;
  border-radius: 12px;
  ${() => Theme.shadows.shadowSm}
`;

const EmergencyIconWrapper = styled.View`
  margin-right: ${Theme.spacing.space2}px;
`;

const EmergencyText = styled.Text`
  color: ${Theme.colors.primary};
  font-weight: 700;
  font-size: ${Theme.typography.fontSizeSm}px;
`;

const ContentInner = styled.View`
  padding: ${Theme.spacing.space4}px;
`;

const SectionHeader = styled.View`
  margin-bottom: ${Theme.spacing.space3}px;
`;

const SectionHeaderRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: ${Theme.spacing.space6}px;
  margin-bottom: ${Theme.spacing.space3}px;
`;

const SectionTitle = styled.Text`
  font-size: ${Theme.typography.fontSizeLg}px;
  font-weight: 700;
  color: ${Theme.colors.textPrimary};
`;

const SeeAllRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

const SeeAllText = styled.Text`
  font-size: ${Theme.typography.fontSizeSm}px;
  color: ${Theme.colors.primary};
  margin-right: 4px;
`;

const QuickAccessGrid = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const QuickCard = styled.View`
  width: 30%;
  background-color: ${Theme.colors.primary};
  border-radius: 16px;
  padding: ${Theme.spacing.space3}px;
  align-items: center;
  justify-content: center;
  height: 100px;
  ${() => Theme.shadows.shadowSm}
`;

const QuickCardIcon = styled.View`
  margin-bottom: ${Theme.spacing.space2}px;
`;

const QuickCardLabel = styled.Text`
  font-size: ${Theme.typography.fontSizeXs}px;
  color: ${Theme.colors.white};
  text-align: center;
  font-weight: 500;
`;

const AppointmentCard = styled.View`
  flex-direction: row;
  background-color: ${Theme.colors.white};
  border-radius: 16px;
  padding: ${Theme.spacing.space3}px;
  align-items: center;
  ${() => Theme.shadows.shadowSm}
`;

const AppointmentDateBlock = styled.View`
  background-color: ${Theme.colors.primaryLight};
  padding: ${Theme.spacing.space2}px;
  border-radius: 12px;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  margin-right: ${Theme.spacing.space3}px;
`;

const AppointmentDay = styled.Text`
  font-size: ${Theme.typography.fontSizeSm}px;
  font-weight: 700;
  color: ${Theme.colors.primary};
`;

const AppointmentMonth = styled.Text`
  font-size: ${Theme.typography.fontSizeXs}px;
  color: ${Theme.colors.primary};
`;

const AppointmentInfo = styled.View`
  flex: 1;
`;

const AppointmentTitle = styled.Text`
  font-size: ${Theme.typography.fontSizeSm}px;
  font-weight: 600;
  color: ${Theme.colors.textPrimary};
  margin-bottom: 4px;
`;

const AppointmentLine = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 2px;
`;

const AppointmentLineText = styled.Text`
  font-size: ${Theme.typography.fontSizeXs}px;
  color: ${Theme.colors.textSecondary};
  margin-left: 4px;
`;

const AppointmentArrow = styled.View``;

const VitalsGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const VitalCard = styled.View`
  width: 48%;
  background-color: ${Theme.colors.white};
  border-radius: 16px;
  padding: ${Theme.spacing.space3}px;
  margin-bottom: ${Theme.spacing.space3}px;
  ${() => Theme.shadows.shadowSm}
`;

const VitalLabel = styled.Text`
  font-size: ${Theme.typography.fontSizeSm}px;
  color: ${Theme.colors.textSecondary};
  margin-bottom: ${Theme.spacing.space1}px;
`;

const VitalValue = styled.Text`
  font-size: ${Theme.typography.fontSizeLg}px;
  font-weight: 700;
  color: ${Theme.colors.textPrimary};
  margin-bottom: ${Theme.spacing.space1}px;
`;

const VitalStatus = styled.Text`
  font-size: ${Theme.typography.fontSizeXs}px;
  color: ${Theme.colors.success};
  font-weight: 500;
`;

const VitalSubStatus = styled.Text`
  font-size: ${Theme.typography.fontSizeXs}px;
  color: ${Theme.colors.textTertiary};
`;

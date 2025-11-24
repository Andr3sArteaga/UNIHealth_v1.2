import React from "react";
import styled from "styled-components/native";
import { Theme } from "../components/colors";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Home: React.FC = () => {
    const navigation = useNavigation<any>();

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
              <GreetingName>María García</GreetingName>
            </GreetingWrapper>

            <ProfileBubble>
              <ProfileInitials>MG</ProfileInitials>
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

            <QuickCard>
              <QuickCardIcon>
                <Ionicons
                  name="chatbubbles-outline"
                  size={24}
                  color={Theme.colors.white}
                />
              </QuickCardIcon>
              <QuickCardLabel>Chat</QuickCardLabel>
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
  background-color: ${Theme.colors.primaryDark};
  padding: ${Theme.spacing.space5}px ${Theme.spacing.space4}px
    ${Theme.spacing.space6}px;
  border-bottom-left-radius: 24px;
  border-bottom-right-radius: 24px;
`;

const HeaderTopRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${Theme.spacing.space4}px;
`;

const GreetingWrapper = styled.View``;

const GreetingSmall = styled.Text`
  font-size: ${Theme.typography.fontSizeSm}px;
  color: ${Theme.colors.white};
`;

const GreetingName = styled.Text`
  font-size: ${Theme.typography.fontSizeLg}px;
  font-weight: 600;
  color: ${Theme.colors.white};
`;

const ProfileBubble = styled.View`
  width: 48px;
  height: 48px;
  border-radius: 24px;
  background-color: ${Theme.colors.white};
  align-items: center;
  justify-content: center;
`;

const ProfileInitials = styled.Text`
  font-size: ${Theme.typography.fontSizeSm}px;
  font-weight: 600;
  color: ${Theme.colors.primaryDark};
`;

const EmergencyButton = styled.TouchableOpacity`
  margin-top: ${Theme.spacing.space2}px;
  background-color: ${Theme.colors.white};
  border-radius: 18px;
  padding-vertical: ${Theme.spacing.space3}px;
  padding-horizontal: ${Theme.spacing.space4}px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const EmergencyIconWrapper = styled.View`
  width: 26px;
  height: 26px;
  border-radius: 13px;
  background-color: ${Theme.colors.primaryLight};
  align-items: center;
  justify-content: center;
  margin-right: ${Theme.spacing.space2}px;
`;

const EmergencyText = styled.Text`
  font-size: ${Theme.typography.fontSizeLg}px;
  font-weight: 600;
  color: ${Theme.colors.primary};
`;

/* Content */

const ContentInner = styled.View`
  padding: ${Theme.spacing.space4}px;
`;

const SectionHeader = styled.View`
  margin-top: ${Theme.spacing.space4}px;
  margin-bottom: ${Theme.spacing.space2}px;
`;

const SectionHeaderRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: ${Theme.spacing.space4}px;
  margin-bottom: ${Theme.spacing.space2}px;
`;

const SectionTitle = styled.Text`
  font-size: ${Theme.typography.fontSizeLg}px;
  font-weight: 600;
  color: ${Theme.colors.textPrimary};
`;

const SeeAllRow = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const SeeAllText = styled.Text`
  font-size: ${Theme.typography.fontSizeSm}px;
  color: ${Theme.colors.primary};
  margin-right: 2px;
`;

/* Quick access */

const QuickAccessGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const QuickCard = styled.TouchableOpacity`
  width: 48%;
  border-radius: 18px;
  background-color: ${Theme.colors.white};
  padding: ${Theme.spacing.space3}px;
  margin-bottom: ${Theme.spacing.space3}px;
  ${() => Theme.shadows.shadowSm}
  align-items: flex-start;
`;

const QuickCardIcon = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background-color: ${Theme.colors.primary};
  align-items: center;
  justify-content: center;
  margin-bottom: ${Theme.spacing.space2}px;
`;

const QuickCardLabel = styled.Text`
  font-size: ${Theme.typography.fontSizeSm}px;
  color: ${Theme.colors.textPrimary};
`;

/* Appointment */

const AppointmentCard = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${Theme.colors.white};
  border-radius: 18px;
  padding: ${Theme.spacing.space3}px ${Theme.spacing.space4}px;
  ${() => Theme.shadows.shadowSm}
`;

const AppointmentDateBlock = styled.View`
  width: 52px;
  border-radius: 16px;
  background-color: ${Theme.colors.primary};
  align-items: center;
  justify-content: center;
  padding-vertical: ${Theme.spacing.space2}px;
  margin-right: ${Theme.spacing.space3}px;
`;

const AppointmentDay = styled.Text`
  font-size: ${Theme.typography.fontSizeLg}px;
  font-weight: 700;
  color: ${Theme.colors.white};
`;

const AppointmentMonth = styled.Text`
  font-size: ${Theme.typography.fontSizeXs}px;
  color: ${Theme.colors.white};
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
  margin-top: 2px;
`;

const AppointmentLineText = styled.Text`
  margin-left: 4px;
  font-size: ${Theme.typography.fontSizeXs}px;
  color: ${Theme.colors.textSecondary};
`;

const AppointmentArrow = styled.View`
  margin-left: ${Theme.spacing.space2}px;
`;

/* Vitals */

const VitalsGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const VitalCard = styled.View`
  width: 48%;
  border-radius: 18px;
  background-color: ${Theme.colors.white};
  padding: ${Theme.spacing.space3}px;
  margin-bottom: ${Theme.spacing.space3}px;
  ${() => Theme.shadows.shadowSm}
`;

const VitalLabel = styled.Text`
  font-size: ${Theme.typography.fontSizeXs}px;
  color: ${Theme.colors.textSecondary};
  margin-bottom: 4px;
`;

const VitalValue = styled.Text`
  font-size: ${Theme.typography.fontSizeXl}px;
  font-weight: 600;
  color: ${Theme.colors.textPrimary};
`;

const VitalStatus = styled.Text`
  margin-top: 4px;
  font-size: ${Theme.typography.fontSizeXs}px;
  color: ${Theme.colors.success};
`;

const VitalSubStatus = styled.Text`
  margin-top: 4px;
  font-size: ${Theme.typography.fontSizeXs}px;
  color: ${Theme.colors.textSecondary};
`;

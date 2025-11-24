// screens/AlertState.tsx
import React from "react";
import styled from "styled-components/native";
import { Theme } from "../components/colors";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const AlertState: React.FC = () => {
  const navigation = useNavigation<any>();

  const handleClose = () => {
    navigation.navigate("MainTabs" as never);
  };

  const handleUnderstood = () => {
    navigation.navigate("MainTabs" as never);
  };

  const handleCancelAlert = () => {
    // Aquí luego podrás llamar a la API para cancelar
    navigation.navigate("MainTabs" as never);
  };

  return (
    <Container>
      <ContentScroll
        contentContainerStyle={{
          paddingBottom: Theme.spacing.space10,
        }}
      >
        {/* HEADER */}
        <Header>
          <HeaderTitle>Estado de Alerta</HeaderTitle>
          <CloseButton onPress={handleClose}>
            <Ionicons
              name="close"
              size={22}
              color={Theme.colors.textSecondary}
            />
          </CloseButton>
        </Header>

        {/* ICONO DE ÉXITO */}
        <SuccessWrapper>
          <SuccessOuter>
            <SuccessInner>
              <Ionicons
                name="checkmark"
                size={40}
                color={Theme.colors.white}
              />
            </SuccessInner>
          </SuccessOuter>

          <SuccessTitle>Alerta Enviada Exitosamente</SuccessTitle>
          <SuccessSubtitle>
            El personal médico ha sido notificado
          </SuccessSubtitle>
        </SuccessWrapper>

        {/* PROGRESO 3 ESTADOS */}
        <StatusSection>
          <StatusRow>
            <StatusLine />
            <StatusStep>
              <StatusCircle active>
                <Ionicons
                  name="checkmark"
                  size={14}
                  color={Theme.colors.white}
                />
              </StatusCircle>
              <StatusLabel active>Alerta enviada</StatusLabel>
            </StatusStep>

            <StatusStep>
              <StatusCircle active>
                <Ionicons
                  name="navigate"
                  size={14}
                  color={Theme.colors.white}
                />
              </StatusCircle>
              <StatusLabel active>En ruta</StatusLabel>
            </StatusStep>

            <StatusStep>
              <StatusCircle active={false}>
                <Ionicons
                  name="checkmark"
                  size={14}
                  color={Theme.colors.textTertiary}
                />
              </StatusCircle>
              <StatusLabel active={false}>Llegó</StatusLabel>
            </StatusStep>
          </StatusRow>
        </StatusSection>

        {/* CARD DEL PROFESIONAL */}
        <Section>
          <DoctorCard>
            <DoctorHeader>
              <DoctorAvatar>
                <DoctorAvatarText>DR</DoctorAvatarText>
              </DoctorAvatar>

              <DoctorInfo>
                <DoctorName>Dr. Roberto Mendoza</DoctorName>
                <DoctorSpecialty>Médico de Emergencias</DoctorSpecialty>
              </DoctorInfo>
            </DoctorHeader>

            <DoctorActionsRow>
              <DoctorActionPrimary>
                <Ionicons
                  name="call-outline"
                  size={18}
                  color={Theme.colors.white}
                />
                <DoctorActionPrimaryText>Llamar</DoctorActionPrimaryText>
              </DoctorActionPrimary>

              <DoctorActionSecondary>
                <Ionicons
                  name="chatbubble-ellipses-outline"
                  size={18}
                  color={Theme.colors.primary}
                />
                <DoctorActionSecondaryText>Chat</DoctorActionSecondaryText>
              </DoctorActionSecondary>
            </DoctorActionsRow>
          </DoctorCard>
        </Section>

        {/* UBICACIÓN Y RUTA */}
        <Section>
          <SectionTitle>Ubicación y Ruta</SectionTitle>
          <MapCard>
            <MapIconWrapper>
              <Ionicons
                name="location-sharp"
                size={28}
                color={Theme.colors.primary}
              />
            </MapIconWrapper>

            <MapFlyButton>
              <Ionicons
                name="navigate-outline"
                size={18}
                color={Theme.colors.primary}
              />
            </MapFlyButton>
          </MapCard>
        </Section>

        {/* CENTROS NOTIFICADOS */}
        <Section>
          <SectionTitle>Centros Notificados</SectionTitle>

          <CenterCard>
            <CenterInfo>
              <CenterName>Kiosco Campus Norte</CenterName>
              <CenterSubtitle>Profesional en ruta</CenterSubtitle>
            </CenterInfo>

            <CenterBadge>
              <CenterBadgeMain>0.3 km</CenterBadgeMain>
              <CenterBadgeSub>3-5 min</CenterBadgeSub>
            </CenterBadge>
          </CenterCard>

          <CenterCard>
            <CenterInfo>
              <CenterName>Kiosco Facultad de Medicina</CenterName>
              <CenterSubtitle>Alerta recibida</CenterSubtitle>
            </CenterInfo>

            <CenterBadge>
              <CenterBadgeMain>0.5 km</CenterBadgeMain>
              <CenterBadgeSub>5-7 min</CenterBadgeSub>
            </CenterBadge>
          </CenterCard>
        </Section>
      </ContentScroll>

      {/* BOTONES INFERIORES */}
      <BottomBar>
        <PrimaryButton onPress={handleUnderstood} activeOpacity={0.9}>
          <PrimaryButtonText>Entendido</PrimaryButtonText>
        </PrimaryButton>

        <SecondaryButton onPress={handleCancelAlert}>
          <SecondaryButtonText>Cancelar Alerta</SecondaryButtonText>
        </SecondaryButton>
      </BottomBar>
    </Container>
  );
};

export default AlertState;

/* ─────────────── STYLES ─────────────── */

const Container = styled.View`
  flex: 1;
  background-color: ${Theme.colors.background};
`;

const ContentScroll = styled.ScrollView`
  flex: 1;
`;

/* HEADER */

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${Theme.spacing.space4}px;
  padding-bottom: ${Theme.spacing.space2}px;
  border-bottom-width: 1px;
  border-bottom-color: ${Theme.colors.border};
`;

const HeaderTitle = styled.Text`
  font-size: ${Theme.typography.fontSizeLg}px;
  font-weight: 600;
  color: ${Theme.colors.textPrimary};
`;

const CloseButton = styled.TouchableOpacity`
  padding: ${Theme.spacing.space1}px;
`;

/* ÉXITO */

const SuccessWrapper = styled.View`
  align-items: center;
  margin-top: ${Theme.spacing.space4}px;
`;

const SuccessOuter = styled.View`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  background-color: #e7f8f0;
  justify-content: center;
  align-items: center;
  margin-bottom: ${Theme.spacing.space3}px;
`;

const SuccessInner = styled.View`
  width: 80px;
  height: 80px;
  border-radius: 40px;
  background-color: ${Theme.colors.success};
  justify-content: center;
  align-items: center;
`;

const SuccessTitle = styled.Text`
  font-size: ${Theme.typography.fontSizeBase}px;
  font-weight: 600;
  color: ${Theme.colors.textPrimary};
`;

const SuccessSubtitle = styled.Text`
  margin-top: ${Theme.spacing.space1}px;
  font-size: ${Theme.typography.fontSizeSm}px;
  color: ${Theme.colors.textSecondary};
`;

/* PROGRESO */

const StatusSection = styled.View`
  padding: 0 ${Theme.spacing.space4}px;
  margin-top: ${Theme.spacing.space4}px;
`;

const StatusRow = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

const StatusLine = styled.View`
  position: absolute;
  top: 20px;
  left: 15%;
  right: 15%;
  height: 3px;
  background-color: #fbd0e0;
`;

const StatusStep = styled.View`
  align-items: center;
  width: 33%;
`;

const StatusCircle = styled.View<{ active: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  background-color: ${({ active }) =>
    active ? Theme.colors.primary : Theme.colors.backgroundAlt};
  border-width: 2px;
  border-color: ${({ active }) =>
    active ? Theme.colors.primary : Theme.colors.border};
  justify-content: center;
  align-items: center;
  margin-bottom: ${Theme.spacing.space1}px;
`;

const StatusLabel = styled.Text<{ active: boolean }>`
  font-size: ${Theme.typography.fontSizeXs}px;
  color: ${({ active }) =>
    active ? Theme.colors.primary : Theme.colors.textTertiary};
`;

/* SECCIÓN GENÉRICA */

const Section = styled.View`
  padding: 0 ${Theme.spacing.space4}px;
  margin-top: ${Theme.spacing.space4}px;
`;

const SectionTitle = styled.Text`
  font-size: ${Theme.typography.fontSizeSm}px;
  font-weight: 600;
  color: ${Theme.colors.textPrimary};
  margin-bottom: ${Theme.spacing.space2}px;
`;

/* CARD DOCTOR */

const DoctorCard = styled.View`
  background-color: ${Theme.colors.primary};
  border-radius: 20px;
  padding: ${Theme.spacing.space3}px ${Theme.spacing.space4}px;
  ${() => Theme.shadows.shadowMd}
`;

const DoctorHeader = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${Theme.spacing.space3}px;
`;

const DoctorAvatar = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: ${Theme.colors.white};
  justify-content: center;
  align-items: center;
  margin-right: ${Theme.spacing.space3}px;
`;

const DoctorAvatarText = styled.Text`
  font-size: ${Theme.typography.fontSizeSm}px;
  font-weight: 600;
  color: ${Theme.colors.primary};
`;

const DoctorInfo = styled.View`
  flex: 1;
`;

const DoctorName = styled.Text`
  font-size: ${Theme.typography.fontSizeSm}px;
  font-weight: 600;
  color: ${Theme.colors.white};
`;

const DoctorSpecialty = styled.Text`
  font-size: ${Theme.typography.fontSizeXs}px;
  color: ${Theme.colors.backgroundAlt};
  margin-top: 2px;
`;

const DoctorActionsRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const DoctorActionPrimary = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: ${Theme.spacing.space2}px ${Theme.spacing.space3}px;
  border-radius: 20px;
  border-width: 1px;
  border-color: ${Theme.colors.white};
`;

const DoctorActionPrimaryText = styled.Text`
  margin-left: 6px;
  font-size: ${Theme.typography.fontSizeSm}px;
  color: ${Theme.colors.white};
`;

const DoctorActionSecondary = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding: ${Theme.spacing.space2}px ${Theme.spacing.space3}px;
  border-radius: 20px;
  background-color: ${Theme.colors.white};
`;

const DoctorActionSecondaryText = styled.Text`
  margin-left: 6px;
  font-size: ${Theme.typography.fontSizeSm}px;
  color: ${Theme.colors.primary};
`;

/* MAPA */

const MapCard = styled.View`
  border-radius: 20px;
  background-color: ${Theme.colors.backgroundAlt};
  height: 140px;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const MapIconWrapper = styled.View``;

const MapFlyButton = styled.TouchableOpacity`
  position: absolute;
  right: ${Theme.spacing.space3}px;
  top: ${Theme.spacing.space3}px;
  width: 34px;
  height: 34px;
  border-radius: 17px;
  background-color: ${Theme.colors.white};
  justify-content: center;
  align-items: center;
  ${() => Theme.shadows.shadowSm}
`;

/* CENTROS NOTIFICADOS */

const CenterCard = styled.View`
  margin-top: ${Theme.spacing.space2}px;
  border-radius: 16px;
  background-color: ${Theme.colors.white};
  padding: ${Theme.spacing.space3}px ${Theme.spacing.space4}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  ${() => Theme.shadows.shadowSm}
`;

const CenterInfo = styled.View`
  flex: 1;
  padding-right: ${Theme.spacing.space3}px;
`;

const CenterName = styled.Text`
  font-size: ${Theme.typography.fontSizeSm}px;
  font-weight: 600;
  color: ${Theme.colors.textPrimary};
`;

const CenterSubtitle = styled.Text`
  margin-top: 2px;
  font-size: ${Theme.typography.fontSizeXs}px;
  color: ${Theme.colors.textSecondary};
`;

const CenterBadge = styled.View`
  align-items: flex-end;
`;

const CenterBadgeMain = styled.Text`
  padding: 2px 8px;
  border-radius: 999px;
  background-color: ${Theme.colors.primary};
  color: ${Theme.colors.white};
  font-size: ${Theme.typography.fontSizeXs}px;
  font-weight: 600;
`;

const CenterBadgeSub = styled.Text`
  margin-top: 2px;
  font-size: ${Theme.typography.fontSizeXs}px;
  color: ${Theme.colors.textSecondary};
`;

/* BOTONES INFERIORES */

const BottomBar = styled.View`
  padding: ${Theme.spacing.space4}px;
  padding-bottom: ${Theme.spacing.space5}px;
  border-top-width: 1px;
  border-top-color: ${Theme.colors.border};
  background-color: ${Theme.colors.background};
`;

const PrimaryButton = styled.TouchableOpacity`
  background-color: ${Theme.colors.primary};
  padding: ${Theme.spacing.space4}px;
  border-radius: 18px;
  align-items: center;
  justify-content: center;
  ${() => Theme.shadows.shadowMd}
`;

const PrimaryButtonText = styled.Text`
  font-size: ${Theme.typography.fontSizeLg}px;
  font-weight: 600;
  color: ${Theme.colors.white};
`;

const SecondaryButton = styled.TouchableOpacity`
  margin-top: ${Theme.spacing.space3}px;
  padding: ${Theme.spacing.space4}px;
  border-radius: 18px;
  border-width: 1px;
  border-color: ${Theme.colors.primary};
  align-items: center;
  justify-content: center;
  background-color: ${Theme.colors.white};
`;

const SecondaryButtonText = styled.Text`
  font-size: ${Theme.typography.fontSizeSm}px;
  color: ${Theme.colors.primary};
`;

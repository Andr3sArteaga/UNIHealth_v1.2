// screens/Profile.tsx
import React, { useState } from "react";
import styled from "styled-components/native";
import { Theme } from "../components/colors";
import { Ionicons } from "@expo/vector-icons";
import { Switch } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Profile: React.FC = () => {
  const navigation = useNavigation<any>();

  // 🔹 Aquí luego conectas con el usuario real (contexto / API)
  const user = {
    initials: "MG",
    name: "María García Rodríguez",
    email: "maria.garcia@universidad.edu.ec",
    insuranceProvider: "Ecuasanitas",
    policyNumber: "ES-2025-123456",
    validUntil: "12/2025",
  };

  const [remindersEnabled, setRemindersEnabled] = useState(true);
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emergencyEnabled, setEmergencyEnabled] = useState(true);

  const handleEditPersonalInfo = () => {
    // aquí más adelante puedes navegar a una pantalla de edición
    console.log("Ir a Información Personal");
  };

  const handleOpenMedicalHistory = () => {
    navigation.navigate("MedicalHistory" as never);
  };

  return (
    <Container
      contentContainerStyle={{
        paddingBottom: Theme.spacing.space10,
      }}
    >
      {/* HEADER ROJO */}
      <Header>
        <HeaderTopRow>
          {/* podrías poner un botón de ajustes arriba a la derecha más adelante */}
        </HeaderTopRow>

        <AvatarContainer>
          <AvatarCircle>
            <AvatarInitials>{user.initials}</AvatarInitials>
            <AvatarEditBadge>
              <Ionicons
                name="pencil"
                size={14}
                color={Theme.colors.primary}
              />
            </AvatarEditBadge>
          </AvatarCircle>

          <UserName>{user.name}</UserName>
          <UserEmail>{user.email}</UserEmail>
        </AvatarContainer>
      </Header>

      {/* TARJETA QR */}
      <Section>
        <CardQR>
          <CardQRHeader>
            <CardQRTitle>Código QR de Identificación</CardQRTitle>
            <Ionicons
              name="qr-code-outline"
              size={20}
              color={Theme.colors.primary}
            />
          </CardQRHeader>
          <CardQRSubtitle>Muestra este código en el kiosco</CardQRSubtitle>

          <QRPlaceholder>
            <Ionicons
              name="qr-code-outline"
              size={56}
              color={Theme.colors.primary}
            />
          </QRPlaceholder>
        </CardQR>
      </Section>

      {/* TARJETA SEGURO MÉDICO */}
      <Section>
        <InsuranceCard>
          <InsuranceHeader>
            <InsuranceTextSmall>Seguro Médico</InsuranceTextSmall>
            <Ionicons
              name="card-outline"
              size={22}
              color={Theme.colors.white}
            />
          </InsuranceHeader>

          <InsuranceProvider>{user.insuranceProvider}</InsuranceProvider>

          <InsuranceDetailLabel>Número de póliza</InsuranceDetailLabel>
          <InsuranceDetailValue>{user.policyNumber}</InsuranceDetailValue>

          <InsuranceDetailLabel>Válida hasta</InsuranceDetailLabel>
          <InsuranceDetailValue>{user.validUntil}</InsuranceDetailValue>
        </InsuranceCard>
      </Section>

      {/* CUENTA */}
      <Section>
        <SectionTitle>CUENTA</SectionTitle>

        <SettingsGroup>
          <SettingsItem onPress={handleEditPersonalInfo}>
            <SettingsLeft>
              <SettingsIconWrapper>
                <Ionicons
                  name="person-outline"
                  size={18}
                  color={Theme.colors.primary}
                />
              </SettingsIconWrapper>
              <SettingsLabel>Información Personal</SettingsLabel>
            </SettingsLeft>
            <Ionicons
              name="chevron-forward"
              size={18}
              color={Theme.colors.textTertiary}
            />
          </SettingsItem>

          <ItemDivider />

          <SettingsItem onPress={handleOpenMedicalHistory}>
            <SettingsLeft>
              <SettingsIconWrapper>
                <Ionicons
                  name="heart-outline"
                  size={18}
                  color={Theme.colors.primary}
                />
              </SettingsIconWrapper>
              <SettingsLabel>Historial Médico</SettingsLabel>
            </SettingsLeft>
            <Ionicons
              name="chevron-forward"
              size={18}
              color={Theme.colors.textTertiary}
            />
          </SettingsItem>
        </SettingsGroup>
      </Section>

      {/* NOTIFICACIONES */}
      <Section>
        <SectionTitle>NOTIFICACIONES</SectionTitle>

        <SettingsGroup>
          <SettingsItem>
            <SettingsLeft>
              <SettingsIconWrapper>
                <Ionicons
                  name="alarm-outline"
                  size={18}
                  color={Theme.colors.primary}
                />
              </SettingsIconWrapper>
              <SettingsLabel>Recordatorios de citas</SettingsLabel>
            </SettingsLeft>
            <Switch
              value={remindersEnabled}
              onValueChange={setRemindersEnabled}
              trackColor={{
                false: Theme.colors.backgroundAlt,
                true: "#FDE7EE",
              }}
              thumbColor={
                remindersEnabled ? Theme.colors.primary : Theme.colors.white
              }
            />
          </SettingsItem>

          <ItemDivider />

          <SettingsItem>
            <SettingsLeft>
              <SettingsIconWrapper>
                <Ionicons
                  name="notifications-outline"
                  size={18}
                  color={Theme.colors.primary}
                />
              </SettingsIconWrapper>
              <SettingsLabel>Notificaciones push</SettingsLabel>
            </SettingsLeft>
            <Switch
              value={pushEnabled}
              onValueChange={setPushEnabled}
              trackColor={{
                false: Theme.colors.backgroundAlt,
                true: "#FDE7EE",
              }}
              thumbColor={
                pushEnabled ? Theme.colors.primary : Theme.colors.white
              }
            />
          </SettingsItem>

          <ItemDivider />

          <SettingsItem>
            <SettingsLeft>
              <SettingsIconWrapper>
                <Ionicons
                  name="warning-outline"
                  size={18}
                  color={Theme.colors.primary}
                />
              </SettingsIconWrapper>
              <SettingsLabel>Alertas de emergencia</SettingsLabel>
            </SettingsLeft>
            <Switch
              value={emergencyEnabled}
              onValueChange={setEmergencyEnabled}
              trackColor={{
                false: Theme.colors.backgroundAlt,
                true: "#FDE7EE",
              }}
              thumbColor={
                emergencyEnabled ? Theme.colors.primary : Theme.colors.white
              }
            />
          </SettingsItem>
        </SettingsGroup>
      </Section>

      {/* PRIVACIDAD Y SOPORTE – opcional, de relleno */}
      {/* Puedes agregar más items aquí si quieres */}
    </Container>
  );
};

export default Profile;

/* ─────────────── STYLES ─────────────── */

const Container = styled.ScrollView`
  flex: 1;
  background-color: ${Theme.colors.backgroundAlt};
`;

/* HEADER */

const Header = styled.View`
  background-color: ${Theme.colors.primary};
  padding: ${Theme.spacing.space5}px ${Theme.spacing.space4}px
    ${Theme.spacing.space6}px;
  border-bottom-left-radius: 28px;
  border-bottom-right-radius: 28px;
`;

const HeaderTopRow = styled.View`
  height: 24px;
`;

const AvatarContainer = styled.View`
  align-items: center;
  margin-top: ${Theme.spacing.space2}px;
`;

const AvatarCircle = styled.View`
  width: 90px;
  height: 90px;
  border-radius: 45px;
  background-color: ${Theme.colors.white};
  justify-content: center;
  align-items: center;
  position: relative;
  margin-bottom: ${Theme.spacing.space3}px;
`;

const AvatarInitials = styled.Text`
  font-size: ${Theme.typography.fontSizeLg}px;
  font-weight: 700;
  color: ${Theme.colors.primary};
`;

const AvatarEditBadge = styled.View`
  position: absolute;
  right: 0;
  bottom: 6px;
  width: 26px;
  height: 26px;
  border-radius: 13px;
  background-color: ${Theme.colors.white};
  justify-content: center;
  align-items: center;
  ${() => Theme.shadows.shadowSm}
`;

const UserName = styled.Text`
  font-size: ${Theme.typography.fontSizeBase}px;
  font-weight: 600;
  color: ${Theme.colors.white};
`;

const UserEmail = styled.Text`
  font-size: ${Theme.typography.fontSizeXs}px;
  color: ${Theme.colors.backgroundAlt};
  margin-top: 4px;
`;

/* SECTIONS GENERALES */

const Section = styled.View`
  padding: 0 ${Theme.spacing.space4}px;
  margin-top: ${Theme.spacing.space4}px;
`;

const SectionTitle = styled.Text`
  font-size: ${Theme.typography.fontSizeXs}px;
  font-weight: 600;
  color: ${Theme.colors.textSecondary};
  margin-bottom: ${Theme.spacing.space2}px;
`;

/* CARD QR */

const CardQR = styled.View`
  background-color: ${Theme.colors.white};
  border-radius: 20px;
  padding: ${Theme.spacing.space3}px ${Theme.spacing.space4}px;
  border-width: 1px;
  border-color: #f8d2de;
  ${() => Theme.shadows.shadowSm}
`;

const CardQRHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const CardQRTitle = styled.Text`
  font-size: ${Theme.typography.fontSizeSm}px;
  font-weight: 600;
  color: ${Theme.colors.textPrimary};
`;

const CardQRSubtitle = styled.Text`
  margin-top: 2px;
  font-size: ${Theme.typography.fontSizeXs}px;
  color: ${Theme.colors.textSecondary};
`;

const QRPlaceholder = styled.View`
  margin-top: ${Theme.spacing.space3}px;
  border-radius: 16px;
  background-color: ${Theme.colors.backgroundAlt};
  height: 140px;
  justify-content: center;
  align-items: center;
`;

/* INSURANCE CARD */

const InsuranceCard = styled.View`
  border-radius: 20px;
  padding: ${Theme.spacing.space4}px ${Theme.spacing.space4}px;
  background-color: ${Theme.colors.primary};
  ${() => Theme.shadows.shadowMd}
`;

const InsuranceHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const InsuranceTextSmall = styled.Text`
  font-size: ${Theme.typography.fontSizeXs}px;
  color: ${Theme.colors.white};
`;

const InsuranceProvider = styled.Text`
  margin-top: ${Theme.spacing.space2}px;
  font-size: ${Theme.typography.fontSizeBase}px;
  font-weight: 600;
  color: ${Theme.colors.white};
`;

const InsuranceDetailLabel = styled.Text`
  margin-top: ${Theme.spacing.space3}px;
  font-size: ${Theme.typography.fontSizeXs}px;
  color: #fbe3eb;
`;

const InsuranceDetailValue = styled.Text`
  font-size: ${Theme.typography.fontSizeSm}px;
  color: ${Theme.colors.white};
`;

/* SETTINGS LIST */

const SettingsGroup = styled.View`
  border-radius: 20px;
  background-color: ${Theme.colors.white};
  ${() => Theme.shadows.shadowSm}
`;

const SettingsItem = styled.TouchableOpacity`
  padding: ${Theme.spacing.space3}px ${Theme.spacing.space4}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const SettingsLeft = styled.View`
  flex-direction: row;
  align-items: center;
`;

const SettingsIconWrapper = styled.View`
  width: 26px;
  height: 26px;
  border-radius: 13px;
  background-color: ${Theme.colors.backgroundAlt};
  justify-content: center;
  align-items: center;
  margin-right: ${Theme.spacing.space2}px;
`;

const SettingsLabel = styled.Text`
  font-size: ${Theme.typography.fontSizeSm}px;
  color: ${Theme.colors.textPrimary};
`;

const ItemDivider = styled.View`
  height: 1px;
  background-color: ${Theme.colors.border};
  margin-left: ${Theme.spacing.space4}px;
  margin-right: ${Theme.spacing.space4}px;
`;
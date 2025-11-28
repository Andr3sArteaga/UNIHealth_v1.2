// screens/Profile.tsx
import React from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Theme } from "../components/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuth } from "../context/AuthContext";

/* ───────────────── Styled Components ───────────────── */

const Header = styled.View`
  background-color: ${Theme.colors.primary};
  padding-bottom: ${Theme.spacing.space6}px;
  padding-horizontal: ${Theme.spacing.space4}px;
  border-bottom-left-radius: 28px;
  border-bottom-right-radius: 28px;
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

/* ───────────────── Component ───────────────── */

const Profile: React.FC = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const { logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      "Cerrar Sesión",
      "¿Estás seguro que deseas cerrar sesión?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Cerrar Sesión", style: "destructive", onPress: logout },
      ]
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: Theme.colors.background }}>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {/* HEADER */}
        <Header style={{ paddingTop: insets.top + Theme.spacing.space4 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              marginBottom: 10,
            }}
          >
            <TouchableOpacity
              onPress={() => navigation.navigate("Alert" as never)} // FIX
            >
              <Ionicons
                name="notifications-outline"
                size={24}
                color={Theme.colors.white}
              />
            </TouchableOpacity>
          </View>

          <AvatarContainer>
            <AvatarCircle>
              <AvatarInitials>AG</AvatarInitials>

              <AvatarEditBadge>
                <Ionicons name="pencil" size={14} color={Theme.colors.primary} />
              </AvatarEditBadge>
            </AvatarCircle>

            <UserName>Ana García López</UserName>
            <UserEmail>ana.garcia@example.com</UserEmail>
          </AvatarContainer>
        </Header>

        {/* QR SECTION */}
        <Section>
          <SectionTitle>Mi Identificación</SectionTitle>
          <CardQR>
            <CardQRHeader>
              <View>
                <CardQRTitle>Código QR de Paciente</CardQRTitle>
                <CardQRSubtitle>Escanea para compartir historial</CardQRSubtitle>
              </View>
              <Ionicons
                name="qr-code-outline"
                size={24}
                color={Theme.colors.primary}
              />
            </CardQRHeader>

            <QRPlaceholder>
              <Ionicons
                name="qr-code"
                size={80}
                color={Theme.colors.primary}
                style={{ opacity: 0.5 }}
              />
            </QRPlaceholder>
          </CardQR>
        </Section>

        {/* INSURANCE */}
        <Section>
          <SectionTitle>Seguro Médico</SectionTitle>
          <InsuranceCard>
            <InsuranceHeader>
              <InsuranceTextSmall>Póliza Activa</InsuranceTextSmall>
              <Ionicons name="shield-checkmark" size={20} color="white" />
            </InsuranceHeader>

            <InsuranceProvider>Seguros Monterrey</InsuranceProvider>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View>
                <InsuranceDetailLabel>Nº de Póliza</InsuranceDetailLabel>
                <InsuranceDetailValue>GMM-8842-991</InsuranceDetailValue>
              </View>

              <View>
                <InsuranceDetailLabel>Vigencia</InsuranceDetailLabel>
                <InsuranceDetailValue>31 Dic 2025</InsuranceDetailValue>
              </View>
            </View>
          </InsuranceCard>
        </Section>

        {/* SETTINGS */}
        <Section>
          <SectionTitle>Configuración</SectionTitle>

          <SettingsGroup>
            <SettingsItem>
              <SettingsLeft>
                <SettingsIconWrapper>
                  <Ionicons
                    name="person-outline"
                    size={16}
                    color={Theme.colors.primary}
                  />
                </SettingsIconWrapper>
                <SettingsLabel>Datos Personales</SettingsLabel>
              </SettingsLeft>

              <Ionicons
                name="chevron-forward"
                size={20}
                color={Theme.colors.textTertiary}
              />
            </SettingsItem>

            <ItemDivider />

            <SettingsItem>
              <SettingsLeft>
                <SettingsIconWrapper>
                  <Ionicons
                    name="notifications-outline"
                    size={16}
                    color={Theme.colors.primary}
                  />
                </SettingsIconWrapper>
                <SettingsLabel>Notificaciones</SettingsLabel>
              </SettingsLeft>

              <Ionicons
                name="chevron-forward"
                size={20}
                color={Theme.colors.textTertiary}
              />
            </SettingsItem>

            <ItemDivider />

            <SettingsItem>
              <SettingsLeft>
                <SettingsIconWrapper>
                  <Ionicons
                    name="lock-closed-outline"
                    size={16}
                    color={Theme.colors.primary}
                  />
                </SettingsIconWrapper>
                <SettingsLabel>Privacidad y Seguridad</SettingsLabel>
              </SettingsLeft>

              <Ionicons
                name="chevron-forward"
                size={20}
                color={Theme.colors.textTertiary}
              />
            </SettingsItem>
          </SettingsGroup>
        </Section>

        {/* LOGOUT */}
        <Section>
          <SettingsGroup>
            <SettingsItem onPress={handleLogout}>
              <SettingsLeft>
                <SettingsIconWrapper style={{ backgroundColor: "#FDE7EE" }}>
                  <Ionicons
                    name="log-out-outline"
                    size={16}
                    color={Theme.colors.warning} // FIX
                  />
                </SettingsIconWrapper>

                <SettingsLabel style={{ color: Theme.colors.warning }}>
                  Cerrar Sesión
                </SettingsLabel>
              </SettingsLeft>
            </SettingsItem>
          </SettingsGroup>
        </Section>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
};

export default Profile;

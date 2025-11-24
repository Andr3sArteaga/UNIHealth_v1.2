// screens/Alert.tsx
import React, { useState } from "react";
import styled from "styled-components/native";
import { Theme } from "../components/colors";
import { Ionicons } from "@expo/vector-icons";
import { Switch } from "react-native";
import { useNavigation } from "@react-navigation/native";

const EMERGENCY_TYPES = [
  "Caída",
  "Dolor de pecho",
  "Dificultad para respirar",
  "Desmayo",
  "Crisis de ansiedad",
  "Otra emergencia",
];

const AlertScreen: React.FC = () => {
  const navigation = useNavigation<any>();

  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [canMove, setCanMove] = useState(true);

  const isReady = !!selectedType;

  const handleSendAlert = () => {
    if (!isReady) return;
    // Aquí iría tu llamada a la API para enviar la alerta
    console.log("Enviando alerta:", {
      type: selectedType,
      description,
      canMove,
    });
    navigation.navigate("AlertSending" as never, {
      type: selectedType,
      description,
      canMove,
    } as never);
    // Podrías navegar a una pantalla de confirmación, etc.
  };

  const handleClose = () => {
    navigation.goBack();
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
          <HeaderTitle>Alerta de Emergencia</HeaderTitle>
          <CloseButton onPress={handleClose}>
            <Ionicons
              name="close"
              size={22}
              color={Theme.colors.textSecondary}
            />
          </CloseButton>
        </Header>

        {/* CÍRCULO PRINCIPAL */}
        <CircleWrapper>
          <CircleButton disabled={!isReady} activeOpacity={0.9} onPress={handleSendAlert}>
            {isReady ? (
              <>
                <CircleInnerActive />
                <CircleContent>
                  <CircleText>ENVIAR ALERTA</CircleText>
                </CircleContent>
              </>
            ) : (
              <>
                <CircleInnerInactive>
                  <Ionicons
                    name="alert-circle-outline"
                    size={40}
                    color={Theme.colors.textTertiary}
                  />
                </CircleInnerInactive>
                <CircleSubtitle>Selecciona tipo</CircleSubtitle>
              </>
            )}
          </CircleButton>
          <CircleHelperText>
            Presiona el botón para enviar la alerta
          </CircleHelperText>
        </CircleWrapper>

        {/* TIPO DE EMERGENCIA */}
        <Section>
          <SectionLabel>
            Tipo de emergencia <Required>*</Required>
          </SectionLabel>

          {EMERGENCY_TYPES.map((type) => {
            const active = selectedType === type;
            return (
              <EmergencyTypeItem
                key={type}
                active={active}
                onPress={() => setSelectedType(type)}
              >
                <RadioOuter active={active}>
                  {active && <RadioInner />}
                </RadioOuter>
                <EmergencyTypeText active={active}>{type}</EmergencyTypeText>
              </EmergencyTypeItem>
            );
          })}
        </Section>

        {/* DESCRIPCIÓN ADICIONAL */}
        <Section>
          <SectionLabel>Descripción adicional (opcional)</SectionLabel>
          <DescriptionInput
            placeholder="Describe lo que está ocurriendo..."
            placeholderTextColor={Theme.colors.textTertiary}
            value={description}
            onChangeText={setDescription}
            multiline
            textAlignVertical="top"
          />
        </Section>

        {/* UBICACIÓN */}
        <Section>
          <LocationCard>
            <LocationHeader>
              <LocationTitleRow>
                <Ionicons
                  name="location-outline"
                  size={18}
                  color={Theme.colors.primary}
                />
                <LocationTitle>Tu ubicación</LocationTitle>
              </LocationTitleRow>

              <LocationAction>
                <Ionicons
                  name="send-outline"
                  size={16}
                  color={Theme.colors.primary}
                />
              </LocationAction>
            </LocationHeader>

            <LocationText>Campus Universidad Central</LocationText>
            <LocationSubText>Lat: -0.1807, Lng: -78.4678</LocationSubText>

            <LocationMapPlaceholder>
              <Ionicons
                name="location-sharp"
                size={26}
                color={Theme.colors.primary}
              />
            </LocationMapPlaceholder>
          </LocationCard>
        </Section>

        {/* PUEDES MOVERTE */}
        <Section>
          <MoveCard>
            <MoveRow>
              <MoveTitle>¿Puedes moverte?</MoveTitle>
              <Switch
                value={canMove}
                onValueChange={setCanMove}
                trackColor={{
                  false: Theme.colors.backgroundAlt,
                  true: Theme.colors.primaryLight || "#FDE7EE",
                }}
                thumbColor={
                  canMove ? Theme.colors.primary : Theme.colors.white
                }
              />
            </MoveRow>
            <MoveSubtitle>
              Indica si puedes desplazarte o necesitas atención inmediata
            </MoveSubtitle>
          </MoveCard>
        </Section>
      </ContentScroll>

      {/* BOTONES INFERIORES */}
      <BottomBar>
        <PrimaryButton
          disabled={!isReady}
          activeOpacity={0.9}
          onPress={handleSendAlert}
        >
          <PrimaryButtonText disabled={!isReady}>
            Enviar Alerta de Emergencia
          </PrimaryButtonText>
        </PrimaryButton>

        <SecondaryButton onPress={handleClose}>
          <SecondaryButtonText>Cancelar</SecondaryButtonText>
        </SecondaryButton>
      </BottomBar>
    </Container>
  );
};

export default AlertScreen;

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

/* CÍRCULO PRINCIPAL */

const CircleWrapper = styled.View`
  align-items: center;
  margin-top: ${Theme.spacing.space4}px;
  margin-bottom: ${Theme.spacing.space4}px;
`;

const CircleButton = styled.TouchableOpacity<{ disabled?: boolean }>`
  width: 220px;
  height: 220px;
  border-radius: 110px;
  align-items: center;
  justify-content: center;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

const CircleInnerInactive = styled.View`
  width: 180px;
  height: 180px;
  border-radius: 90px;
  background-color: ${Theme.colors.backgroundAlt};
  align-items: center;
  justify-content: center;
`;

const CircleSubtitle = styled.Text`
  margin-top: ${Theme.spacing.space2}px;
  font-size: ${Theme.typography.fontSizeSm}px;
  color: ${Theme.colors.textSecondary};
`;

const CircleInnerActive = styled.View`
  position: absolute;
  width: 220px;
  height: 220px;
  border-radius: 110px;
  background-color: ${Theme.colors.primary};
  ${() => Theme.shadows.shadowLg}
`;

const CircleContent = styled.View`
  width: 220px;
  height: 220px;
  border-radius: 110px;
  align-items: center;
  justify-content: center;
`;

const CircleText = styled.Text`
  font-size: ${Theme.typography.fontSizeLg}px;
  font-weight: 600;
  color: ${Theme.colors.white};
`;

const CircleHelperText = styled.Text`
  margin-top: ${Theme.spacing.space2}px;
  font-size: ${Theme.typography.fontSizeXs}px;
  color: ${Theme.colors.textSecondary};
`;

/* SECCIONES */

const Section = styled.View`
  padding: 0 ${Theme.spacing.space4}px;
  margin-bottom: ${Theme.spacing.space4}px;
`;

const SectionLabel = styled.Text`
  font-size: ${Theme.typography.fontSizeSm}px;
  color: ${Theme.colors.textPrimary};
  font-weight: 600;
  margin-bottom: ${Theme.spacing.space2}px;
`;

const Required = styled.Text`
  color: ${Theme.colors.primary};
`;

/* EMERGENCY TYPES */

const EmergencyTypeItem = styled.TouchableOpacity<{ active: boolean }>`
  flex-direction: row;
  align-items: center;
  border-radius: 16px;
  padding: ${Theme.spacing.space3}px ${Theme.spacing.space4}px;
  margin-bottom: ${Theme.spacing.space2}px;
  background-color: ${({ active }) =>
    active ? Theme.colors.primary : Theme.colors.white};
  border-width: 1px;
  border-color: ${({ active }) =>
    active ? Theme.colors.primary : Theme.colors.border};
`;

const RadioOuter = styled.View<{ active: boolean }>`
  width: 22px;
  height: 22px;
  border-radius: 11px;
  border-width: 2px;
  border-color: ${({ active }) =>
    active ? Theme.colors.white : Theme.colors.textTertiary};
  align-items: center;
  justify-content: center;
  margin-right: ${Theme.spacing.space3}px;
  background-color: ${({ active }) =>
    active ? Theme.colors.primary : "transparent"};
`;

const RadioInner = styled.View`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: ${Theme.colors.white};
`;

const EmergencyTypeText = styled.Text<{ active: boolean }>`
  font-size: ${Theme.typography.fontSizeSm}px;
  color: ${({ active }) =>
    active ? Theme.colors.white : Theme.colors.textPrimary};
`;

/* DESCRIPCIÓN */

const DescriptionInput = styled.TextInput`
  border-radius: 16px;
  background-color: ${Theme.colors.backgroundAlt};
  padding: ${Theme.spacing.space3}px ${Theme.spacing.space4}px;
  min-height: 100px;
  font-size: ${Theme.typography.fontSizeSm}px;
  color: ${Theme.colors.textPrimary};
`;

/* UBICACIÓN */

const LocationCard = styled.View`
  border-radius: 18px;
  background-color: ${Theme.colors.white};
  padding: ${Theme.spacing.space3}px ${Theme.spacing.space4}px;
  ${() => Theme.shadows.shadowSm}
`;

const LocationHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${Theme.spacing.space2}px;
`;

const LocationTitleRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

const LocationTitle = styled.Text`
  margin-left: 4px;
  font-size: ${Theme.typography.fontSizeSm}px;
  font-weight: 600;
  color: ${Theme.colors.textPrimary};
`;

const LocationAction = styled.TouchableOpacity`
  padding: ${Theme.spacing.space1}px;
`;

const LocationText = styled.Text`
  font-size: ${Theme.typography.fontSizeSm}px;
  color: ${Theme.colors.textPrimary};
`;

const LocationSubText = styled.Text`
  font-size: ${Theme.typography.fontSizeXs}px;
  color: ${Theme.colors.textSecondary};
  margin-bottom: ${Theme.spacing.space3}px;
`;

const LocationMapPlaceholder = styled.View`
  border-radius: 14px;
  background-color: ${Theme.colors.backgroundAlt};
  height: 100px;
  align-items: center;
  justify-content: center;
`;

/* PUEDES MOVERTE */

const MoveCard = styled.View`
  border-radius: 18px;
  background-color: ${Theme.colors.white};
  padding: ${Theme.spacing.space3}px ${Theme.spacing.space4}px;
  ${() => Theme.shadows.shadowSm}
`;

const MoveRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const MoveTitle = styled.Text`
  font-size: ${Theme.typography.fontSizeSm}px;
  font-weight: 600;
  color: ${Theme.colors.textPrimary};
`;

const MoveSubtitle = styled.Text`
  margin-top: ${Theme.spacing.space2}px;
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

const PrimaryButton = styled.TouchableOpacity<{ disabled?: boolean }>`
  background-color: ${({ disabled }) =>
    disabled ? "#F3B4C5" : Theme.colors.primary};
  padding: ${Theme.spacing.space4}px;
  border-radius: 18px;
  align-items: center;
  justify-content: center;
  opacity: ${({ disabled }) => (disabled ? 0.8 : 1)};
  ${() => Theme.shadows.shadowMd}
`;

const PrimaryButtonText = styled.Text<{ disabled?: boolean }>`
  font-size: ${Theme.typography.fontSizeLg}px;
  font-weight: 600;
  color: ${Theme.colors.white};
`;

const SecondaryButton = styled.TouchableOpacity`
  margin-top: ${Theme.spacing.space3}px;
  padding: ${Theme.spacing.space4}px;
  border-radius: 18px;
  border-width: 1px;
  border-color: ${Theme.colors.border};
  align-items: center;
  justify-content: center;
  background-color: ${Theme.colors.white};
`;

const SecondaryButtonText = styled.Text`
  font-size: ${Theme.typography.fontSizeSm}px;
  color: ${Theme.colors.textPrimary};
`;
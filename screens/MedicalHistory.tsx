// screens/MedicalHistory.tsx
import React, { useRef, useState } from "react";
import { TextInput } from "react-native";
import styled from "styled-components/native";
import { Theme } from "../components/colors";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import api from "../api/api";
import { useFocusEffect } from "@react-navigation/native";

const MOCK_CONSULTATIONS = [
  {
    id: "1",
    type: "Consulta General",
    date: "15/11/2024",
    doctor: "Dr. Carlos Méndez",
    diagnosis: "Control de hipertensión y diabetes",
    treatment:
      "Ajuste de dosis de Losartán a 100mg. Mantener Metformina.",
    notes: "Presión arterial: 135/85. Glucosa en ayunas: 110 mg/dL",
  },
  {
    id: "2",
    type: "Consulta Especialista",
    date: "03/10/2024",
    doctor: "Dra. Ana Torres - Endocrinología",
    diagnosis: "Seguimiento diabetes tipo 2",
    treatment: "Continuar con Metformina 500mg 2 veces al día.",
    notes: "HbA1c: 6.8%. Paciente muestra buen control glucémico.",
  },
  {
    id: "3",
    type: "Urgencias",
    date: "12/08/2024",
    doctor: "Dr. Miguel Ángel Ruiz",
    diagnosis: "Crisis hipertensiva",
    treatment:
      "Administración de antihipertensivo IV. Observación 4 horas.",
    notes: "PA al ingreso: 180/100. PA al alta: 140/85",
  },
];

const PIN_LENGTH = 6;
const HARDCODED_PIN = "123456"; // Add this line

const MedicalHistory: React.FC = () => {
  const navigation = useNavigation<any>();

  const [isUnlocked, setIsUnlocked] = useState(false);
  const [pin, setPin] = useState("");
  const [showPin, setShowPin] = useState(false);
  const hiddenInputRef = useRef<TextInput | null>(null);

  // Patient data state
  const [patientData, setPatientData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchPatientData = async () => {
    try {
      setLoading(true);
      const response = await api.get('/user/profile');
      const profile = response.data.patientProfile;
      setPatientData(profile);
    } catch (error) {
      console.log("Error fetching patient data", error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchPatientData();
    }, [])
  );

  const calculateAge = (dob: string) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handleChangePin = (value: string) => {
    const clean = value.replace(/[^0-9]/g, "").slice(0, PIN_LENGTH);
    setPin(clean);
  };

  const handleUnlock = () => {
    if (pin.length === PIN_LENGTH) {
      // Check if entered PIN matches hardcoded PIN
      if (pin === HARDCODED_PIN) {
        setIsUnlocked(true);
      } else {
        // Optional: You can add an alert or error message here
        console.log("Incorrect PIN");
        // Reset PIN on wrong entry
        setPin("");
      }
    }
  };

  const handleLock = () => {
    setIsUnlocked(false);
    setPin("");
  };

  const handleToggleShowPin = () => {
    setShowPin((prev) => !prev);
  };

  const handleFocusBoxes = () => {
    hiddenInputRef.current?.focus();
  };

  return (
    <Container>
      <Scroll
        contentContainerStyle={{
          paddingBottom: Theme.spacing.space10,
        }}
      >
        {/* HEADER */}
        <Header>
          <HeaderLeft onPress={handleBack}>
            <Ionicons
              name="chevron-back"
              size={24}
              color={Theme.colors.textPrimary}
            />
          </HeaderLeft>

          <HeaderCenter>
            <HeaderTitle>Historial Médico</HeaderTitle>
            {isUnlocked && (
              <StatusRow>
                <StatusDot />
                <StatusText>Desbloqueado</StatusText>
              </StatusRow>
            )}
          </HeaderCenter>

          <HeaderRight onPress={isUnlocked ? handleLock : undefined}>
            {isUnlocked && (
              <>
                <Ionicons
                  name="lock-closed-outline"
                  size={18}
                  color={Theme.colors.textPrimary}
                />
                <HeaderRightText>Bloquear</HeaderRightText>
              </>
            )}
          </HeaderRight>
        </Header>

        {/* TARJETA DE SEGURO MÉDICO */}
        <InsuranceCard>
          <InsuranceTopRow>
            <InsuranceTitle>Seguro Médico</InsuranceTitle>
            <InsuranceIconWrapper>
              <Ionicons
                name="card-outline"
                size={22}
                color={Theme.colors.white}
              />
            </InsuranceIconWrapper>
          </InsuranceTopRow>

          <InsuranceProvider>{patientData?.hasInsurance ? patientData.insuranceProvider || "Proveedor no especificado" : "Sin seguro médico"}</InsuranceProvider>

          {patientData?.hasInsurance && (
            <>
              <InsuranceFieldLabel>Número de póliza</InsuranceFieldLabel>
              <InsuranceFieldValue>No disponible</InsuranceFieldValue>

              <InsuranceFieldLabel>Válida hasta</InsuranceFieldLabel>
              <InsuranceFieldValue>No disponible</InsuranceFieldValue>
            </>
          )}
        </InsuranceCard>

        {/* CONTENIDO BLOQUEADO vs DESBLOQUEADO */}
        {!isUnlocked ? (
          <>
            {/* CARD DE PIN / PROTECCIÓN */}
            <LockCard>
              <LockIconCircle>
                <Ionicons
                  name="lock-closed-outline"
                  size={30}
                  color={Theme.colors.primary}
                />
              </LockIconCircle>

              <LockTitle>Información Protegida</LockTitle>
              <LockDescription>
                Tu historial médico está encriptado.{"\n"}
                Ingresa tu código de 6 dígitos para desbloquear.
              </LockDescription>

              {/* INPUT OCULTO */}
              <HiddenInput
                ref={hiddenInputRef}
                keyboardType="number-pad"
                value={pin}
                onChangeText={handleChangePin}
                maxLength={PIN_LENGTH}
                autoFocus
              />

              {/* CAJITAS DE CÓDIGO */}
              <CodeBoxesContainer onPress={handleFocusBoxes} activeOpacity={1}>
                {Array.from({ length: PIN_LENGTH }).map((_, index) => {
                  const char = pin[index] ?? "";
                  return (
                    <CodeBox key={index} isFilled={!!char}>
                      <CodeChar>
                        {char
                          ? showPin
                            ? char
                            : "•"
                          : ""}
                      </CodeChar>
                    </CodeBox>
                  );
                })}
              </CodeBoxesContainer>

              {/* Mostrar/Ocultar */}
              <ShowCodeRow onPress={handleToggleShowPin}>
                <Ionicons
                  name={showPin ? "eye-off-outline" : "eye-outline"}
                  size={18}
                  color={Theme.colors.textSecondary}
                />
                <ShowCodeText>
                  {showPin ? "Ocultar código" : "Mostrar código"}
                </ShowCodeText>
              </ShowCodeRow>

              {/* Botón desbloquear */}
              <UnlockButton
                disabled={pin.length !== PIN_LENGTH}
                onPress={handleUnlock}
              >
                <UnlockButtonText>Desbloquear Historial</UnlockButtonText>
              </UnlockButton>

              {/* Recuperar acceso */}
              <RecoverRow>
                <RecoverText>¿Olvidaste tu código? </RecoverText>
                <RecoverLink>Recuperar acceso</RecoverLink>
              </RecoverRow>
            </LockCard>

            {/* CARD DE SEGURIDAD DE DATOS */}
            <InfoCard>
              <InfoIconWrapper>
                <Ionicons
                  name="shield-checkmark-outline"
                  size={20}
                  color={Theme.colors.info}
                />
              </InfoIconWrapper>
              <InfoTextContainer>
                <InfoTitle>Seguridad de datos</InfoTitle>
                <InfoBody>
                  Tu información médica está encriptada de extremo a extremo.
                  Solo tú y los médicos autorizados pueden acceder a ella.
                </InfoBody>
              </InfoTextContainer>
            </InfoCard>
          </>
        ) : (
          <>
            {/* RESUMEN DEL PACIENTE */}
            <PatientCard>
              <PatientName>{patientData ? `${patientData.firstName} ${patientData.lastName}` : "Cargando..."}</PatientName>
              <PatientSubtitle>
                {patientData ? `${calculateAge(patientData.dob)} años • ${patientData.gender === 'M' ? 'Masculino' : patientData.gender === 'F' ? 'Femenino' : 'Otro'} • Grupo: O+` : ""}
              </PatientSubtitle>

              <PatientRow>
                <PatientColumn>
                  <PatientSectionLabel>Condiciones crónicas</PatientSectionLabel>
                  <ChipsRow>
                    {patientData?.chronicDiseases?.length > 0 ? patientData.chronicDiseases.map((c: string) => (
                      <ConditionChip key={c}>
                        <ConditionText>{c}</ConditionText>
                      </ConditionChip>
                    )) : <ConditionText>Ninguna</ConditionText>}
                  </ChipsRow>
                </PatientColumn>

                <PatientColumn>
                  <PatientSectionLabel>Alergias</PatientSectionLabel>
                  <ChipsRow>
                    {patientData?.allergies ? (
                      <AllergyChip>
                        <Ionicons
                          name="alert-circle-outline"
                          size={14}
                          color={Theme.colors.warning}
                          style={{ marginRight: 4 }}
                        />
                        <AllergyText>{patientData.allergies}</AllergyText>
                      </AllergyChip>
                    ) : <AllergyText>Ninguna</AllergyText>}
                  </ChipsRow>
                </PatientColumn>
              </PatientRow>

              <SectionDivider />
            </PatientCard>

            {/* HISTORIAL DE CONSULTAS */}
            <SectionTitle>Historial de Consultas</SectionTitle>

            {MOCK_CONSULTATIONS.map((c) => (
              <ConsultationCard key={c.id}>
                <ConsultationHeader>
                  <ConsultationIconCircle>
                    <Ionicons
                      name="calendar-outline"
                      size={20}
                      color={Theme.colors.primary}
                    />
                  </ConsultationIconCircle>
                  <ConsultationHeaderText>
                    <ConsultationType>{c.type}</ConsultationType>
                    <ConsultationDate>{c.date}</ConsultationDate>
                  </ConsultationHeaderText>
                </ConsultationHeader>

                <ConsultationFieldLabel>Médico</ConsultationFieldLabel>
                <ConsultationFieldValue>{c.doctor}</ConsultationFieldValue>

                <ConsultationFieldLabel>Diagnóstico</ConsultationFieldLabel>
                <ConsultationFieldValue>{c.diagnosis}</ConsultationFieldValue>

                <ConsultationFieldLabel>Tratamiento</ConsultationFieldLabel>
                <ConsultationFieldValue>{c.treatment}</ConsultationFieldValue>

                <ConsultationFieldLabel>Notas</ConsultationFieldLabel>
                <ConsultationNotes>{c.notes}</ConsultationNotes>
              </ConsultationCard>
            ))}

            {/* INFO ACCESO MÉDICO */}
            <InfoCard>
              <InfoIconWrapper>
                <Ionicons
                  name="medkit-outline"
                  size={20}
                  color={Theme.colors.info}
                />
              </InfoIconWrapper>
              <InfoTextContainer>
                <InfoTitle>Acceso médico</InfoTitle>
                <InfoBody>
                  Los médicos autorizados pueden ver y actualizar tu historial
                  durante las consultas.
                </InfoBody>
              </InfoTextContainer>
            </InfoCard>
          </>
        )}
      </Scroll>
    </Container>
  );
};

export default MedicalHistory;

/* ─────────────── STYLES ─────────────── */

const Container = styled.View`
  flex: 1;
  background-color: ${Theme.colors.background};
`;

const Scroll = styled.ScrollView`
  flex: 1;
`;

/* HEADER */

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  padding: ${Theme.spacing.space4}px;
  padding-top: ${Theme.spacing.space5}px;
  border-bottom-width: 1px;
  border-bottom-color: ${Theme.colors.border};
`;

const HeaderLeft = styled.TouchableOpacity`
  padding-right: ${Theme.spacing.space2}px;
`;

const HeaderCenter = styled.View`
  flex: 1;
`;

const HeaderTitle = styled.Text`
  font-size: ${Theme.typography.fontSizeLg}px;
  font-weight: 600;
  color: ${Theme.colors.textPrimary};
`;

const StatusRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 4px;
`;

const StatusDot = styled.View`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background-color: ${Theme.colors.success};
  margin-right: 4px;
`;

const StatusText = styled.Text`
  font-size: ${Theme.typography.fontSizeXs}px;
  color: ${Theme.colors.textSecondary};
`;

const HeaderRight = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  padding-left: ${Theme.spacing.space2}px;
`;

const HeaderRightText = styled.Text`
  margin-left: 4px;
  font-size: ${Theme.typography.fontSizeSm}px;
  color: ${Theme.colors.textPrimary};
`;

/* INSURANCE CARD */

const InsuranceCard = styled.View`
  margin: ${Theme.spacing.space4}px;
  border-radius: 24px;
  padding: ${Theme.spacing.space4}px;
  background-color: ${Theme.colors.primary};
  ${() => Theme.shadows.shadowLg}
`;

const InsuranceTopRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${Theme.spacing.space3}px;
`;

const InsuranceTitle = styled.Text`
  font-size: ${Theme.typography.fontSizeSm}px;
  color: ${Theme.colors.white};
  opacity: 0.9;
`;

const InsuranceIconWrapper = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: rgba(255, 255, 255, 0.16);
  align-items: center;
  justify-content: center;
`;

const InsuranceProvider = styled.Text`
  font-size: ${Theme.typography.fontSize2xl}px;
  font-weight: 700;
  color: ${Theme.colors.white};
  margin-bottom: ${Theme.spacing.space4}px;
`;

const InsuranceFieldLabel = styled.Text`
  font-size: ${Theme.typography.fontSizeSm}px;
  color: rgba(255, 255, 255, 0.9);
  margin-top: ${Theme.spacing.space1}px;
`;

const InsuranceFieldValue = styled.Text`
  font-size: ${Theme.typography.fontSizeBase}px;
  color: ${Theme.colors.white};
`;

/* LOCKED STATE */

const LockCard = styled.View`
  margin: 0 ${Theme.spacing.space4}px;
  margin-top: ${Theme.spacing.space2}px;
  border-radius: 24px;
  padding: ${Theme.spacing.space4}px;
  background-color: ${Theme.colors.white};
  ${() => Theme.shadows.shadowSm}
`;

const LockIconCircle = styled.View`
  width: 72px;
  height: 72px;
  border-radius: 36px;
  background-color: #fde7ee;
  align-items: center;
  justify-content: center;
  align-self: center;
  margin-bottom: ${Theme.spacing.space3}px;
`;

const LockTitle = styled.Text`
  font-size: ${Theme.typography.fontSizeLg}px;
  font-weight: 600;
  text-align: center;
  color: ${Theme.colors.textPrimary};
`;

const LockDescription = styled.Text`
  font-size: ${Theme.typography.fontSizeSm}px;
  color: ${Theme.colors.textSecondary};
  text-align: center;
  margin-top: ${Theme.spacing.space2}px;
  margin-bottom: ${Theme.spacing.space3}px;
`;

const HiddenInput = styled(TextInput).withConfig({
  shouldForwardProp: (prop) => prop !== 'ref',
})`
  position: absolute;
  opacity: 0;
  width: 1px;
  height: 1px;
`;

const CodeBoxesContainer = styled.TouchableOpacity`
  flex-direction: row;
  align-self: center;
  margin-bottom: ${Theme.spacing.space2}px;
`;

const CodeBox = styled.View<{ isFilled: boolean }>`
  width: 46px;
  height: 56px;
  border-radius: 12px;
  border-width: 2px;
  border-color: ${({ isFilled }) =>
    isFilled ? Theme.colors.primary : Theme.colors.border};
  margin-horizontal: 4px;
  align-items: center;
  justify-content: center;
  background-color: ${Theme.colors.background};
`;

const CodeChar = styled.Text`
  font-size: ${Theme.typography.fontSizeLg}px;
  color: ${Theme.colors.textPrimary};
`;

const ShowCodeRow = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  align-self: center;
  margin-bottom: ${Theme.spacing.space3}px;
`;

const ShowCodeText = styled.Text`
  margin-left: 6px;
  font-size: ${Theme.typography.fontSizeSm}px;
  color: ${Theme.colors.textSecondary};
`;

const UnlockButton = styled.TouchableOpacity<{ disabled?: boolean }>`
  margin-top: ${Theme.spacing.space1}px;
  padding: ${Theme.spacing.space4}px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
  background-color: ${({ disabled }) =>
    disabled ? "#F3B4C5" : Theme.colors.primary};
  opacity: ${({ disabled }) => (disabled ? 0.85 : 1)};
`;

const UnlockButtonText = styled.Text`
  font-size: ${Theme.typography.fontSizeLg}px;
  font-weight: 600;
  color: ${Theme.colors.white};
`;

const RecoverRow = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-top: ${Theme.spacing.space3}px;
`;

const RecoverText = styled.Text`
  font-size: ${Theme.typography.fontSizeSm}px;
  color: ${Theme.colors.textSecondary};
`;

const RecoverLink = styled.Text`
  font-size: ${Theme.typography.fontSizeSm}px;
  color: ${Theme.colors.primary};
  font-weight: 600;
`;

/* INFO CARD (SEGURIDAD / ACCESO MÉDICO) */

const InfoCard = styled.View`
  margin: ${Theme.spacing.space4}px;
  margin-top: ${Theme.spacing.space4}px;
  border-radius: 18px;
  padding: ${Theme.spacing.space3}px ${Theme.spacing.space4}px;
  background-color: #e5f1ff;
`;

const InfoIconWrapper = styled.View`
  margin-bottom: ${Theme.spacing.space1}px;
`;

const InfoTextContainer = styled.View``;

const InfoTitle = styled.Text`
  font-size: ${Theme.typography.fontSizeSm}px;
  font-weight: 600;
  color: ${Theme.colors.textPrimary};
  margin-bottom: 2px;
`;

const InfoBody = styled.Text`
  font-size: ${Theme.typography.fontSizeSm}px;
  color: ${Theme.colors.textSecondary};
`;

/* UNLOCKED STATE */

const PatientCard = styled.View`
  margin: 0 ${Theme.spacing.space4}px;
  margin-top: ${Theme.spacing.space4}px;
  border-radius: 20px;
  padding: ${Theme.spacing.space4}px;
  background-color: ${Theme.colors.white};
  ${() => Theme.shadows.shadowSm}
`;

const PatientName = styled.Text`
  font-size: ${Theme.typography.fontSizeLg}px;
  font-weight: 600;
  color: ${Theme.colors.textPrimary};
`;

const PatientSubtitle = styled.Text`
  margin-top: 2px;
  font-size: ${Theme.typography.fontSizeSm}px;
  color: ${Theme.colors.textSecondary};
`;

const PatientRow = styled.View`
  flex-direction: row;
  margin-top: ${Theme.spacing.space3}px;
`;

const PatientColumn = styled.View`
  flex: 1;
  margin-right: ${Theme.spacing.space2}px;
`;

const PatientSectionLabel = styled.Text`
  font-size: ${Theme.typography.fontSizeSm}px;
  font-weight: 600;
  color: ${Theme.colors.textPrimary};
  margin-bottom: ${Theme.spacing.space1}px;
`;

const ChipsRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

const ConditionChip = styled.View`
  padding-vertical: 4px;
  padding-horizontal: 10px;
  border-radius: 999px;
  background-color: #fde7ee;
  margin-right: 6px;
  margin-bottom: 6px;
`;

const ConditionText = styled.Text`
  font-size: ${Theme.typography.fontSizeXs}px;
  color: ${Theme.colors.primary};
`;

const AllergyChip = styled.View`
  flex-direction: row;
  align-items: center;
  padding-vertical: 4px;
  padding-horizontal: 10px;
  border-radius: 999px;
  background-color: #fff2e6;
  margin-right: 6px;
  margin-bottom: 6px;
`;

const AllergyText = styled.Text`
  font-size: ${Theme.typography.fontSizeXs}px;
  color: ${Theme.colors.warning};
`;

const SectionDivider = styled.View`
  height: 1px;
  background-color: ${Theme.colors.border};
  margin-top: ${Theme.spacing.space4}px;
`;

/* CONSULTATIONS */

const SectionTitle = styled.Text`
  margin: ${Theme.spacing.space4}px;
  margin-bottom: ${Theme.spacing.space2}px;
  font-size: ${Theme.typography.fontSizeLg}px;
  font-weight: 600;
  color: ${Theme.colors.textPrimary};
`;

const ConsultationCard = styled.View`
  margin: 0 ${Theme.spacing.space4}px;
  margin-bottom: ${Theme.spacing.space3}px;
  border-radius: 18px;
  padding: ${Theme.spacing.space3}px ${Theme.spacing.space4}px;
  background-color: ${Theme.colors.white};
  ${() => Theme.shadows.shadowSm}
`;

const ConsultationHeader = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${Theme.spacing.space2}px;
`;

const ConsultationIconCircle = styled.View`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: #fde7ee;
  align-items: center;
  justify-content: center;
  margin-right: ${Theme.spacing.space2}px;
`;

const ConsultationHeaderText = styled.View``;

const ConsultationType = styled.Text`
  font-size: ${Theme.typography.fontSizeSm}px;
  font-weight: 600;
  color: ${Theme.colors.textPrimary};
`;

const ConsultationDate = styled.Text`
  font-size: ${Theme.typography.fontSizeXs}px;
  color: ${Theme.colors.textSecondary};
`;

const ConsultationFieldLabel = styled.Text`
  margin-top: ${Theme.spacing.space2}px;
  font-size: ${Theme.typography.fontSizeSm}px;
  color: ${Theme.colors.textSecondary};
`;

const ConsultationFieldValue = styled.Text`
  font-size: ${Theme.typography.fontSizeSm}px;
  color: ${Theme.colors.textPrimary};
`;

const ConsultationNotes = styled.Text`
  margin-top: ${Theme.spacing.space1}px;
  font-size: ${Theme.typography.fontSizeSm}px;
  color: ${Theme.colors.textPrimary};
  background-color: ${Theme.colors.backgroundAlt};
  padding: ${Theme.spacing.space2}px;
  border-radius: 12px;
`;
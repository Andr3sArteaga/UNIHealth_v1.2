// screens/MedicalHistory.tsx
import React, { useRef, useState } from "react";
import { TextInput, TouchableOpacity, View, Text, ScrollView } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Theme } from "../components/colors";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import api from "../api/api";

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  padding: ${Theme.spacing.space4}px;
  border-bottom-width: 1px;
  border-bottom-color: ${Theme.colors.border};
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
  font-size: ${Theme.typography.fontSizeSm}px;
  color: ${Theme.colors.textSecondary};
  font-style: italic;
  margin-top: 4px;
`;

const MedicalHistory = () => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();

  const [isLocked, setIsLocked] = useState(true);
  const [code, setCode] = useState(["", "", "", ""]);
  const [isCodeVisible, setIsCodeVisible] = useState(false);
  const inputRef = useRef<TextInput>(null);

  // Data state
  const [loading, setLoading] = useState(true);
  const [patientName, setPatientName] = useState("Cargando...");
  const [patientAge, setPatientAge] = useState("");
  const [conditions, setConditions] = useState<any[]>([]);
  const [allergies, setAllergies] = useState<any[]>([]);
  const [medications, setMedications] = useState<any[]>([]);
  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      // 1. Get User Profile to know ID and Name
      const profileRes = await api.get('/user/profile');
      const userData = profileRes.data;
      const patientId = userData.id;

      if (userData.patientProfile) {
        setPatientName(`${userData.patientProfile.firstName} ${userData.patientProfile.lastName} `);
        // Calculate age if DOB exists
        if (userData.patientProfile.dob) {
          const dob = new Date(userData.patientProfile.dob);
          const ageDifMs = Date.now() - dob.getTime();
          const ageDate = new Date(ageDifMs);
          setPatientAge(`${Math.abs(ageDate.getUTCFullYear() - 1970)} años`);
        }
      }

      // 2. Get Full Medical History
      const historyRes = await api.get(`/medical-history/full/${patientId}`);
      const data = historyRes.data;

      // Filter conditions (fisico)
      const physicalConditions = (data.history || []).filter((h: any) => h.type === 'fisico');
      setConditions(physicalConditions);

      setAllergies(data.allergies || []);
      setMedications(data.medications || []);

    } catch (error) {
      console.error("Error fetching medical history:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCodeChange = (text: string) => {
    // Limitar a números
    const numericText = text.replace(/[^0-9]/g, "");
    const newCode = numericText.split("").slice(0, 4);
    // Rellenar con vacíos si es necesario
    while (newCode.length < 4) {
      newCode.push("");
    }
    setCode(newCode);

    // Auto-unlock si es correcto (ejemplo 1234)
    if (numericText === "1234") {
      setTimeout(() => {
        setIsLocked(false);
      }, 300);
    }
  };

  const handleUnlock = () => {
    // Lógica manual
    if (code.join("") === "1234") {
      setIsLocked(false);
    } else {
      alert("Código incorrecto (prueba 1234)");
    }
  };

  const codeValue = code.join("");

  return (
    <View style={{ flex: 1, backgroundColor: Theme.colors.background }}>
      {/* HEADER */}
      <Header style={{ paddingTop: insets.top + Theme.spacing.space4 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="arrow-back"
            size={24}
            color={Theme.colors.textPrimary}
          />
        </TouchableOpacity>
        <HeaderCenter>
          <View style={{ alignItems: "center" }}>
            <HeaderTitle>Historial Médico</HeaderTitle>
            <StatusRow>
              <StatusDot />
              <StatusText>Actualizado hoy</StatusText>
            </StatusRow>
          </View>
        </HeaderCenter>
        <HeaderRight>
          <Ionicons
            name="share-outline"
            size={22}
            color={Theme.colors.primary}
          />
          <HeaderRightText>Exportar</HeaderRightText>
        </HeaderRight>
      </Header>

      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {/* INSURANCE CARD */}
        <InsuranceCard>
          <InsuranceTopRow>
            <InsuranceTitle>Seguro Médico</InsuranceTitle>
            <InsuranceIconWrapper>
              <Ionicons name="shield-checkmark" size={20} color="white" />
            </InsuranceIconWrapper>
          </InsuranceTopRow>

          <InsuranceProvider>Seguros Monterrey</InsuranceProvider>

          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <View>
              <InsuranceFieldLabel>Póliza</InsuranceFieldLabel>
              <InsuranceFieldValue>GMM-8842-991</InsuranceFieldValue>
            </View>
            <View>
              <InsuranceFieldLabel>Vigencia</InsuranceFieldLabel>
              <InsuranceFieldValue>Dic 2025</InsuranceFieldValue>
            </View>
          </View>
        </InsuranceCard>

        {isLocked ? (
          /* LOCKED VIEW */
          <View>
            <LockCard>
              <LockIconCircle>
                <Ionicons name="lock-closed" size={32} color={Theme.colors.primary} />
              </LockIconCircle>
              <LockTitle>Información Protegida</LockTitle>
              <LockDescription>
                Ingresa tu código de acceso para ver el historial clínico completo.
              </LockDescription>

              {/* CODE INPUT */}
              <CodeBoxesContainer onPress={() => inputRef.current?.focus()}>
                {code.map((digit, index) => (
                  <CodeBox key={index} isFilled={!!digit}>
                    <CodeChar>
                      {digit ? (isCodeVisible ? digit : "•") : ""}
                    </CodeChar>
                  </CodeBox>
                ))}
              </CodeBoxesContainer>

              <HiddenInput
                ref={inputRef}
                value={codeValue}
                onChangeText={handleCodeChange}
                keyboardType="number-pad"
                maxLength={4}
                caretHidden
              />

              <ShowCodeRow onPress={() => setIsCodeVisible(!isCodeVisible)}>
                <Ionicons
                  name={isCodeVisible ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color={Theme.colors.textSecondary}
                />
                <ShowCodeText>
                  {isCodeVisible ? "Ocultar código" : "Mostrar código"}
                </ShowCodeText>
              </ShowCodeRow>

              <UnlockButton
                disabled={codeValue.length < 4}
                onPress={handleUnlock}
              >
                <UnlockButtonText>Desbloquear</UnlockButtonText>
              </UnlockButton>

              <RecoverRow>
                <RecoverText>¿Olvidaste tu código? </RecoverText>
                <TouchableOpacity>
                  <RecoverLink>Recuperar</RecoverLink>
                </TouchableOpacity>
              </RecoverRow>
            </LockCard>

            <InfoCard>
              <View style={{ flexDirection: "row" }}>
                <InfoIconWrapper>
                  <Ionicons
                    name="information-circle"
                    size={24}
                    color={Theme.colors.primary}
                  />
                </InfoIconWrapper>
                <View style={{ marginLeft: 12, flex: 1 }}>
                  <InfoTitle>Acceso de Emergencia</InfoTitle>
                  <InfoBody>
                    Los médicos autorizados pueden solicitar acceso temporal
                    escaneando tu código QR de perfil.
                  </InfoBody>
                </View>
              </View>
            </InfoCard>
          </View>
        ) : (
          /* UNLOCKED VIEW */
          <View>
            <PatientCard>
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <View>
                  <PatientName>{patientName}</PatientName>
                  <PatientSubtitle>{patientAge} • O+</PatientSubtitle>
                </View>
                <TouchableOpacity onPress={() => setIsLocked(true)}>
                  <Ionicons
                    name="lock-open-outline"
                    size={24}
                    color={Theme.colors.textSecondary}
                  />
                </TouchableOpacity>
              </View>

              <PatientRow>
                <PatientColumn>
                  <PatientSectionLabel>Condiciones</PatientSectionLabel>
                  <ChipsRow>
                    {conditions.length > 0 ? (
                      conditions.map((cond, i) => (
                        <ConditionChip key={i}>
                          <ConditionText>{cond.condition}</ConditionText>
                        </ConditionChip>
                      ))
                    ) : (
                      <Text style={{ color: Theme.colors.textSecondary, fontSize: 12 }}>
                        Ninguna registrada
                      </Text>
                    )}
                  </ChipsRow>
                </PatientColumn>
              </PatientRow>

              <PatientRow>
                <PatientColumn>
                  <PatientSectionLabel>Alergias</PatientSectionLabel>
                  <ChipsRow>
                    {allergies.length > 0 ? (
                      allergies.map((alg, i) => (
                        <AllergyChip key={i}>
                          <Ionicons
                            name="alert-circle"
                            size={14}
                            color={Theme.colors.warning}
                            style={{ marginRight: 4 }}
                          />
                          <AllergyText>{alg.allergen}</AllergyText>
                        </AllergyChip>
                      ))
                    ) : (
                      <Text style={{ color: Theme.colors.textSecondary, fontSize: 12 }}>
                        Ninguna registrada
                      </Text>
                    )}
                  </ChipsRow>
                </PatientColumn>
              </PatientRow>

              <SectionDivider />

              <PatientRow>
                <PatientColumn>
                  <PatientSectionLabel>Medicamentos Activos</PatientSectionLabel>
                  <View style={{ marginTop: 4 }}>
                    {medications.length > 0 ? (
                      medications.map((med, i) => (
                        <Text key={i} style={{ fontSize: 14, color: Theme.colors.textPrimary, marginBottom: 4 }}>
                          • {med.name} {med.dosage ? `- ${med.dosage} ` : ''}
                        </Text>
                      ))
                    ) : (
                      <Text style={{ fontSize: 14, color: Theme.colors.textSecondary }}>
                        Ningún medicamento activo
                      </Text>
                    )}
                  </View>
                </PatientColumn>
              </PatientRow>
            </PatientCard>

            <SectionTitle>Consultas Recientes</SectionTitle>

            <ConsultationCard>
              <ConsultationHeader>
                <ConsultationIconCircle>
                  <Ionicons name="medkit" size={20} color={Theme.colors.primary} />
                </ConsultationIconCircle>
                <ConsultationHeaderText>
                  <ConsultationType>Medicina General</ConsultationType>
                  <ConsultationDate>10 Nov 2023 • Dr. Roberto Silva</ConsultationDate>
                </ConsultationHeaderText>
              </ConsultationHeader>
              <ConsultationFieldLabel>Diagnóstico</ConsultationFieldLabel>
              <ConsultationFieldValue>Infección respiratoria leve</ConsultationFieldValue>
              <ConsultationFieldLabel>Notas</ConsultationFieldLabel>
              <ConsultationNotes>
                Paciente presenta tos y congestión. Se receta descanso y líquidos.
              </ConsultationNotes>
            </ConsultationCard>

            <ConsultationCard>
              <ConsultationHeader>
                <ConsultationIconCircle>
                  <Ionicons name="eye" size={20} color={Theme.colors.primary} />
                </ConsultationIconCircle>
                <ConsultationHeaderText>
                  <ConsultationType>Oftalmología</ConsultationType>
                  <ConsultationDate>25 Oct 2023 • Dra. Elena Torres</ConsultationDate>
                </ConsultationHeaderText>
              </ConsultationHeader>
              <ConsultationFieldLabel>Diagnóstico</ConsultationFieldLabel>
              <ConsultationFieldValue>Revisión anual de miopía</ConsultationFieldValue>
              <ConsultationFieldLabel>Notas</ConsultationFieldLabel>
              <ConsultationNotes>
                Aumento ligero en graduación ojo izquierdo. Se actualizan lentes.
              </ConsultationNotes>
            </ConsultationCard>
          </View>
        )}
      </ScrollView>
    </View >
  );
};

export default MedicalHistory;
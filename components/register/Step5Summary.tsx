import React from "react";
import styled from "styled-components/native";
import { Theme } from "../colors";
import { Ionicons } from "@expo/vector-icons";

import { Step1PersonalDataForm } from "./Step1PersonalData";
import { Step2MedicalDataForm } from "./Step2MedicalData";
import { Step3EmergencyContactForm } from "./Step3EmergencyContact";
import { Step4PreferencesForm } from "./Step4Preferences";

export type Step5SummaryData = Step1PersonalDataForm &
  Step2MedicalDataForm &
  Step3EmergencyContactForm &
  Step4PreferencesForm;

type Props = {
  data: Step5SummaryData;
  onEditStep: (step: number) => void;
  onConfirm: () => void;
  onBack: () => void;
};

const stressText: Record<number, string> = {
  1: "Muy bajo",
  2: "Bajo",
  3: "Moderado",
  4: "Alto",
  5: "Muy alto",
};

const smokingLabels: Record<string, string> = {
  no_fumo: "No fumo",
  ocasional: "Ocasionalmente",
  regular: "Regularmente",
};

const alcoholLabels: Record<string, string> = {
  no_consumo: "No consumo",
  ocasional: "Ocasionalmente",
  regular: "Regularmente",
};

const activityLabels: Record<string, string> = {
  sedentario: "Sedentario",
  "1-2": "1-2 días/semana",
  "3-5": "3-5 días/semana",
  diario: "Diariamente",
};

const Step5Summary: React.FC<Props> = ({
  data,
  onEditStep,
  onConfirm,
  onBack,
}) => {
  const chronic = data.chronicDiseases || [];
  const familyHistory = data.familyHistory || [];
  const medsLines = data.medications || [];

  const stressLabel = stressText[data.stressLevel] ?? "";

  return (
    <Container>
      {/* TITULOS GENERALES */}
      <PageTitle>Resumen de Información</PageTitle>
      <PageSubtitle>
        Revisa que toda la información sea correcta antes de continuar
      </PageSubtitle>

      {/* DATOS PERSONALES (Step 1) */}
      <SummaryCard>
        <CardHeader>
          <CardTitle>Datos Personales</CardTitle>
          <EditButton onPress={() => onEditStep(1)}>
            <EditIcon
              name="create-outline"
              size={16}
              color={Theme.colors.primary}
            />
            <EditText>Editar</EditText>
          </EditButton>
        </CardHeader>

        <ItemRow>
          <ItemLabel>Nombre completo</ItemLabel>
          <ItemValue>{data.fullName || "-"}</ItemValue>
        </ItemRow>
        <Divider />

        <ItemRow>
          <ItemLabel>Cédula/DNI</ItemLabel>
          <ItemValue>{data.dni || "-"}</ItemValue>
        </ItemRow>
        <Divider />

        <ItemRow>
          <ItemLabel>Fecha de nacimiento</ItemLabel>
          <ItemValue>{data.birthDate || "-"}</ItemValue>
        </ItemRow>
        <Divider />

        <ItemRow>
          <ItemLabel>Sexo biológico</ItemLabel>
          <ItemValue>
            {data.biologicalSex === "M"
              ? "Masculino"
              : data.biologicalSex === "F"
                ? "Femenino"
                : data.biologicalSex === "O"
                  ? "Otro"
                  : "-"}
          </ItemValue>
        </ItemRow>
        <Divider />

        <ItemRow>
          <ItemLabel>Identidad de género</ItemLabel>
          <ItemValue>{data.genderIdentity || "-"}</ItemValue>
        </ItemRow>
        <Divider />

        <ItemRow>
          <ItemLabel>Estado civil</ItemLabel>
          <ItemValue>{data.maritalStatus || "-"}</ItemValue>
        </ItemRow>
      </SummaryCard>

      {/* ANTECEDENTES MÉDICOS (Step 2) */}
      <SummaryCard>
        <CardHeader>
          <CardTitle>Antecedentes Médicos</CardTitle>
          <EditButton onPress={() => onEditStep(2)}>
            <EditIcon
              name="create-outline"
              size={16}
              color={Theme.colors.primary}
            />
            <EditText>Editar</EditText>
          </EditButton>
        </CardHeader>

        {/* Enfermedades crónicas */}
        <ItemRow>
          <ItemLabel>Enfermedades crónicas</ItemLabel>
        </ItemRow>
        {chronic.length > 0 ? (
          <TagContainer>
            {chronic.map((c) => (
              <Tag key={c}>
                <TagText>{c}</TagText>
              </Tag>
            ))}
          </TagContainer>
        ) : (
          <ItemValueSecondary>Ninguna registrada</ItemValueSecondary>
        )}
        <Divider />

        {/* Medicamentos */}
        <ItemRow>
          <ItemLabel>Medicamentos regulares</ItemLabel>
        </ItemRow>
        {medsLines.length > 0 ? (
          <BulletList>
            {medsLines.map((line, idx) => (
              <BulletItem key={idx}>
                <BulletDot>{"\u2022"}</BulletDot>
                <BulletText>{line}</BulletText>
              </BulletItem>
            ))}
          </BulletList>
        ) : (
          <ItemValueSecondary>No se registraron medicamentos</ItemValueSecondary>
        )}
        <Divider />

        {/* Alergias */}
        <ItemRow>
          <ItemLabel>Alergias</ItemLabel>
          <ItemValue>{data.allergies || "Sin alergias registradas"}</ItemValue>
        </ItemRow>
        <Divider />

        {/* Cirugías */}
        <ItemRow>
          <ItemLabel>Cirugías previas</ItemLabel>
          <ItemValue>{data.surgeries || "No se registraron cirugías"}</ItemValue>
        </ItemRow>
      </SummaryCard>

      {/* CONTACTO Y SEGURO (Step 3) */}
      <SummaryCard>
        <CardHeader>
          <CardTitle>Información de Contacto</CardTitle>
          <EditButton onPress={() => onEditStep(3)}>
            <EditIcon
              name="create-outline"
              size={16}
              color={Theme.colors.primary}
            />
            <EditText>Editar</EditText>
          </EditButton>
        </CardHeader>

        <ItemRow>
          <ItemLabel>Dirección</ItemLabel>
          <ItemValue>{data.address || "-"}</ItemValue>
        </ItemRow>
        <Divider />

        <ItemRow>
          <ItemLabel>Teléfono</ItemLabel>
          <ItemValue>{data.phone || "-"}</ItemValue>
        </ItemRow>
        <Divider />

        <ItemRow>
          <ItemLabel>Contacto de emergencia</ItemLabel>
          <ItemValue>{data.emergencyName || "-"}</ItemValue>
        </ItemRow>
        <Divider />

        <ItemRow>
          <ItemLabel>Teléfono de emergencia</ItemLabel>
          <ItemValue>{data.emergencyPhone || "-"}</ItemValue>
        </ItemRow>
        <Divider />

        <ItemRow>
          <ItemLabel>Seguro médico</ItemLabel>
          <ItemValue>
            {data.hasInsurance
              ? data.insuranceProvider || "Con seguro privado"
              : "Sin seguro privado registrado"}
          </ItemValue>
        </ItemRow>
      </SummaryCard>

      {/* HÁBITOS Y ESTILO DE VIDA (Step 4) */}
      <SummaryCard>
        <CardHeader>
          <CardTitle>Hábitos y Estilo de Vida</CardTitle>
          <EditButton onPress={() => onEditStep(4)}>
            <EditIcon
              name="create-outline"
              size={16}
              color={Theme.colors.primary}
            />
            <EditText>Editar</EditText>
          </EditButton>
        </CardHeader>

        <ItemRow>
          <ItemLabel>Hábito de fumar</ItemLabel>
          <ItemValue>
            {data.smokingHabit
              ? smokingLabels[data.smokingHabit] || "-"
              : "-"}
          </ItemValue>
        </ItemRow>
        <Divider />

        <ItemRow>
          <ItemLabel>Consumo de alcohol</ItemLabel>
          <ItemValue>
            {data.alcoholConsumption
              ? alcoholLabels[data.alcoholConsumption] || "-"
              : "-"}
          </ItemValue>
        </ItemRow>
        <Divider />

        <ItemRow>
          <ItemLabel>Actividad física</ItemLabel>
          <ItemValue>
            {data.physicalActivity
              ? activityLabels[data.physicalActivity] || "-"
              : "-"}
          </ItemValue>
        </ItemRow>
        <Divider />

        <ItemRow>
          <ItemLabel>Nivel de estrés</ItemLabel>
        </ItemRow>

        <StressCirclesRow>
          {[1, 2, 3, 4, 5].map((lvl) => {
            const selected = data.stressLevel === lvl;
            return (
              <StressCircle key={lvl} $selected={selected}>
                <StressCircleText $selected={selected}>
                  {lvl}
                </StressCircleText>
              </StressCircle>
            );
          })}
          {stressLabel ? (
            <StressLabelText>({stressLabel})</StressLabelText>
          ) : null}
        </StressCirclesRow>
      </SummaryCard>

      {/* BOTONES FINALES */}
      <ButtonsContainer>
        <PrimaryButton onPress={onConfirm}>
          <PrimaryButtonText>Confirmar y Continuar</PrimaryButtonText>
        </PrimaryButton>

        <SecondaryButton onPress={onBack}>
          <SecondaryButtonText>Volver Atrás</SecondaryButtonText>
        </SecondaryButton>
      </ButtonsContainer>
    </Container>
  );
};

export default Step5Summary;

/* ─────────────── STYLES ─────────────── */

const Container = styled.View`
  padding-bottom: ${Theme.spacing.space6}px;
`;

const PageTitle = styled.Text`
  font-size: ${Theme.typography.fontSize2xl}px;
  font-weight: 700;
  color: ${Theme.colors.textPrimary};
  margin-bottom: 4px;
`;

const PageSubtitle = styled.Text`
  font-size: ${Theme.typography.fontSizeSm}px;
  color: ${Theme.colors.textSecondary};
  margin-bottom: ${Theme.spacing.space4}px;
`;

const SummaryCard = styled.View`
  background-color: ${Theme.colors.white};
  border-radius: 18px;
  padding: ${Theme.spacing.space4}px;
  margin-bottom: ${Theme.spacing.space4}px;
  ${() => Theme.shadows.shadowSm}
`;

const CardHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${Theme.spacing.space3}px;
`;

const CardTitle = styled.Text`
  font-size: ${Theme.typography.fontSizeLg}px;
  font-weight: 600;
  color: ${Theme.colors.textPrimary};
`;

const EditButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const EditIcon = styled(Ionicons)``;

const EditText = styled.Text`
  margin-left: 4px;
  font-size: ${Theme.typography.fontSizeSm}px;
  color: ${Theme.colors.primary};
  font-weight: 500;
`;

const ItemRow = styled.View`
  margin-bottom: ${Theme.spacing.space2}px;
`;

const ItemLabel = styled.Text`
  font-size: ${Theme.typography.fontSizeXs}px;
  color: ${Theme.colors.textSecondary};
`;

const ItemValue = styled.Text`
  font-size: ${Theme.typography.fontSizeSm}px;
  color: ${Theme.colors.textPrimary};
  margin-top: 2px;
`;

const ItemValueSecondary = styled.Text`
  font-size: ${Theme.typography.fontSizeSm}px;
  color: ${Theme.colors.textSecondary};
  margin-top: 4px;
`;

const Divider = styled.View`
  height: 1px;
  background-color: ${Theme.colors.border};
  margin-vertical: ${Theme.spacing.space2}px;
`;

/* Tags (chips grises) */

const TagContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: ${Theme.spacing.space2}px;
`;

const Tag = styled.View`
  padding: 4px 10px;
  border-radius: 999px;
  background-color: ${Theme.colors.backgroundAlt};
  margin-right: ${Theme.spacing.space2}px;
  margin-bottom: ${Theme.spacing.space2}px;
`;

const TagText = styled.Text`
  font-size: ${Theme.typography.fontSizeXs}px;
  color: ${Theme.colors.textPrimary};
`;

/* Bullet list de medicamentos */

const BulletList = styled.View`
  margin-top: ${Theme.spacing.space1}px;
  margin-bottom: ${Theme.spacing.space1}px;
`;

const BulletItem = styled.View`
  flex-direction: row;
  margin-bottom: 2px;
`;

const BulletDot = styled.Text`
  margin-right: 6px;
  color: ${Theme.colors.textPrimary};
`;

const BulletText = styled.Text`
  flex: 1;
  font-size: ${Theme.typography.fontSizeSm}px;
  color: ${Theme.colors.textPrimary};
`;

/* Estrés */

const StressCirclesRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: ${Theme.spacing.space2}px;
`;

const StressCircle = styled.View<{ $selected: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  justify-content: center;
  align-items: center;
  margin-right: ${Theme.spacing.space2}px;
  background-color: ${({ $selected }) =>
    $selected ? Theme.colors.primary : "#E5E7EB"};
`;

const StressCircleText = styled.Text<{ $selected: boolean }>`
  font-size: ${Theme.typography.fontSizeSm}px;
  font-weight: 600;
  color: ${({ $selected }) =>
    $selected ? Theme.colors.white : Theme.colors.textPrimary};
`;

const StressLabelText = styled.Text`
  font-size: ${Theme.typography.fontSizeSm}px;
  color: ${Theme.colors.textSecondary};
  margin-left: ${Theme.spacing.space2}px;
`;

/* Botones finales */

const ButtonsContainer = styled.View`
  margin-top: ${Theme.spacing.space4}px;
`;

const PrimaryButton = styled.TouchableOpacity`
  background-color: ${Theme.colors.primary};
  padding: ${Theme.spacing.space4}px;
  border-radius: 16px;
  ${() => Theme.shadows.shadowMd}
`;

const PrimaryButtonText = styled.Text`
  font-size: ${Theme.typography.fontSizeLg}px;
  color: ${Theme.colors.white};
  text-align: center;
  font-weight: 600;
`;

const SecondaryButton = styled.TouchableOpacity`
  margin-top: ${Theme.spacing.space3}px;
  padding: ${Theme.spacing.space4}px;
  border-radius: 16px;
  border-width: 1px;
  border-color: ${Theme.colors.border};
  background-color: ${Theme.colors.white};
`;

const SecondaryButtonText = styled.Text`
  font-size: ${Theme.typography.fontSizeLg}px;
  color: ${Theme.colors.textPrimary};
  text-align: center;
  font-weight: 500;
`;
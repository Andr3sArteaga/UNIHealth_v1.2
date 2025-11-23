import React from "react";
import styled from "styled-components/native";
import { Theme } from "../colors";
import { TouchableOpacity, ViewStyle } from "react-native";

export type Step4PreferencesForm = {
  familyHistory: string[];          
  smokingHabit: string | null;      
  alcoholConsumption: string | null;
  physicalActivity: string | null;  
  stressLevel: number;              
};

type Props = {
  data: Step4PreferencesForm;
  onChange: (partial: Partial<Step4PreferencesForm>) => void;
};

const familyHistoryOptions = [
  "Diabetes",
  "Hipertensión",
  "Enfermedad cardíaca",
  "Cáncer",
  "Alzheimer",
  "Depresión",
  "Osteoporosis",
  "Ninguna",
];

const smokingOptions = [
  { key: "no_fumo", label: "No fumo" },
  { key: "ocasional", label: "Ocasionalmente" },
  { key: "regular", label: "Regularmente" },
];

const alcoholOptions = [
  { key: "no_consumo", label: "No consumo" },
  { key: "ocasional", label: "Ocasionalmente" },
  { key: "regular", label: "Regularmente" },
];

const physicalActivityOptions = [
  { key: "sedentario", label: "Sedentario" },
  { key: "1-2", label: "1-2 días/semana" },
  { key: "3-5", label: "3-5 días/semana" },
  { key: "diario", label: "Diariamente" },
];

const Step4Preferences: React.FC<Props> = ({ data, onChange }) => {
  const toggleFamilyHistory = (option: string) => {
    const exists = data.familyHistory.includes(option);
    const familyHistory = exists
      ? data.familyHistory.filter((o) => o !== option)
      : [...data.familyHistory, option];
    onChange({ familyHistory });
  };

  const selectSmoking = (key: string) => onChange({ smokingHabit: key });
  const selectAlcohol = (key: string) => onChange({ alcoholConsumption: key });
  const selectActivity = (key: string) => onChange({ physicalActivity: key });

  const selectStressLevel = (level: number) =>
    onChange({ stressLevel: level });

  const stressFillStyle: ViewStyle = {
    width: `${(data.stressLevel / 5) * 100}%`,
  };

  return (
    <Container>
      {/* Título sección */}
      <SectionHeader>
        <SectionTitle>Antecedentes Familiares y Hábitos</SectionTitle>
        <SectionSubtitle>
          Última información para completar tu perfil
        </SectionSubtitle>
      </SectionHeader>

      {/* Historial enfermedades familia */}
      <FieldGroup>
        <Label>Historial de enfermedades en la familia</Label>
        <ChipsGrid>
          {familyHistoryOptions.map((opt) => {
            const selected = data.familyHistory.includes(opt);
            return (
              <ChipMulti
                key={opt}
                activeOpacity={0.8}
                onPress={() => toggleFamilyHistory(opt)}
                $selected={selected}
              >
                <ChipMultiText $selected={selected}>{opt}</ChipMultiText>
              </ChipMulti>
            );
          })}
        </ChipsGrid>
      </FieldGroup>

      {/* Hábito de fumar */}
      <FieldGroup>
        <Label>Hábito de fumar</Label>
        <ChipRow>
          {smokingOptions.map((opt) => {
            const selected = data.smokingHabit === opt.key;
            return (
              <ChipSingle
                key={opt.key}
                activeOpacity={0.8}
                onPress={() => selectSmoking(opt.key)}
                $selected={selected}
              >
                <ChipSingleText $selected={selected}>
                  {opt.label}
                </ChipSingleText>
              </ChipSingle>
            );
          })}
        </ChipRow>
      </FieldGroup>

      {/* Consumo de alcohol */}
      <FieldGroup>
        <Label>Consumo de alcohol</Label>
        <ChipRow>
          {alcoholOptions.map((opt) => {
            const selected = data.alcoholConsumption === opt.key;
            return (
              <ChipSingle
                key={opt.key}
                activeOpacity={0.8}
                onPress={() => selectAlcohol(opt.key)}
                $selected={selected}
              >
                <ChipSingleText $selected={selected}>
                  {opt.label}
                </ChipSingleText>
              </ChipSingle>
            );
          })}
        </ChipRow>
      </FieldGroup>

      {/* Actividad física */}
      <FieldGroup>
        <Label>Actividad física</Label>
        <ChipRow>
          {physicalActivityOptions.map((opt) => {
            const selected = data.physicalActivity === opt.key;
            return (
              <ChipSingle
                key={opt.key}
                activeOpacity={0.8}
                onPress={() => selectActivity(opt.key)}
                $selected={selected}
              >
                <ChipSingleText $selected={selected}>
                  {opt.label}
                </ChipSingleText>
              </ChipSingle>
            );
          })}
        </ChipRow>
      </FieldGroup>

      {/* Nivel de estrés */}
      <FieldGroup>
        <Label>Nivel de estrés</Label>

        <StressCirclesRow>
          {[1, 2, 3, 4, 5].map((lvl) => {
            const selected = data.stressLevel === lvl;
            return (
              <StressCircle
                key={lvl}
                activeOpacity={0.8}
                onPress={() => selectStressLevel(lvl)}
                $selected={selected}
              >
                <StressCircleText $selected={selected}>
                  {lvl}
                </StressCircleText>
              </StressCircle>
            );
          })}
        </StressCirclesRow>

        <StressBarContainer>
          <StressBarFill style={stressFillStyle} />
        </StressBarContainer>

        <StressLabelsRow>
          <StressLabel>Bajo</StressLabel>
          <StressLabel>Alto</StressLabel>
        </StressLabelsRow>
      </FieldGroup>
    </Container>
  );
};

export default Step4Preferences;

/* ─────────────── STYLES ─────────────── */

const Container = styled.View`
  padding: ${Theme.spacing.space4}px;
`;

const SectionHeader = styled.View`
  margin-bottom: ${Theme.spacing.space4}px;
`;

const SectionTitle = styled.Text`
  font-size: ${Theme.typography.fontSizeLg}px;
  font-weight: 700;
  color: ${Theme.colors.textPrimary};
  margin-bottom: 2px;
`;

const SectionSubtitle = styled.Text`
  font-size: ${Theme.typography.fontSizeSm}px;
  color: ${Theme.colors.textSecondary};
`;

const FieldGroup = styled.View`
  margin-bottom: ${Theme.spacing.space4}px;
`;

const Label = styled.Text`
  font-size: ${Theme.typography.fontSizeSm}px;
  color: ${Theme.colors.textPrimary};
  font-weight: 600;
  margin-bottom: 8px;
`;

/* Chips multi-selección (historial familiar) */

const ChipsGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${Theme.spacing.space2}px;
`;

const ChipMulti = styled(TouchableOpacity)<{ $selected: boolean }>`
  padding-vertical: ${Theme.spacing.space3}px;
  padding-horizontal: ${Theme.spacing.space4}px;
  border-radius: 16px;
  min-width: 45%;
  align-items: center;
  border-width: 1px;
  border-color: ${({ $selected }) =>
    $selected ? Theme.colors.primary : Theme.colors.border};
  background-color: ${({$selected }) =>
    $selected ? "#FDE7EE" : Theme.colors.white};
`;

const ChipMultiText = styled.Text<{ $selected: boolean }>`
  font-size: ${Theme.typography.fontSizeSm}px;
  color: ${({ $selected }) =>
    $selected ? Theme.colors.primary : Theme.colors.textPrimary};
`;

/* Chips selección única (hábitos) */

const ChipRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${Theme.spacing.space2}px;
`;

const ChipSingle = styled(TouchableOpacity)<{ $selected: boolean }>`
  padding-vertical: ${Theme.spacing.space3}px;
  padding-horizontal: ${Theme.spacing.space4}px;
  border-radius: 16px;
  min-width: 30%;
  align-items: center;
  border-width: 1px;
  border-color: ${({ $selected }) =>
    $selected ? Theme.colors.primary : Theme.colors.border};
  background-color: ${({ $selected }) =>
    $selected ? Theme.colors.primary : Theme.colors.white};
`;

const ChipSingleText = styled.Text<{ $selected: boolean }>`
  font-size: ${Theme.typography.fontSizeSm}px;
  color: ${({ $selected }) =>
    $selected ? Theme.colors.white : Theme.colors.textPrimary};
`;

/* Nivel de estrés */

const StressCirclesRow = styled.View`
  flex-direction: row;
  margin-bottom: ${Theme.spacing.space2}px;
`;

const StressCircle = styled(TouchableOpacity)<{ $selected: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 16px;
  margin-right: ${Theme.spacing.space2}px;
  justify-content: center;
  align-items: center;
  background-color: ${({ $selected }) =>
    $selected ? Theme.colors.primary : "#E5E7EB"};
`;

const StressCircleText = styled.Text<{ $selected: boolean }>`
  font-size: ${Theme.typography.fontSizeSm}px;
  color: ${({ $selected }) =>
    $selected ? Theme.colors.white : Theme.colors.textPrimary};
  font-weight: 600;
`;

const StressBarContainer = styled.View`
  height: 6px;
  border-radius: 999px;
  background-color: ${Theme.colors.backgroundAlt};
  overflow: hidden;
  margin-bottom: ${Theme.spacing.space1}px;
`;

const StressBarFill = styled.View`
  height: 100%;
  background-color: ${Theme.colors.primary};
`;

const StressLabelsRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const StressLabel = styled.Text`
  font-size: ${Theme.typography.fontSizeXs}px;
  color: ${Theme.colors.textSecondary};
`;
 
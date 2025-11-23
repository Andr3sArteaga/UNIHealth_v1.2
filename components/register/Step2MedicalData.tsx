import React from "react";
import styled from "styled-components/native";
import { Theme } from "../colors";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

export type Step2MedicalDataForm = {
  chronicDiseases: string[];      
  medicationName: string;         
  allergies: string;              
  surgeries: string;              
  hasDisability: boolean;        
};

type Props = {
  data: Step2MedicalDataForm;
  onChange: (partial: Partial<Step2MedicalDataForm>) => void;
};

const chronicOptions = [
  "Diabetes",
  "Hipertensión",
  "Asma",
  "Artritis",
  "Enfermedad cardíaca",
  "Cáncer",
  "Epilepsia",
  "Otro",
];

const Step2MedicalData: React.FC<Props> = ({ data, onChange }) => {
  const toggleChronic = (option: string) => {
    const exists = data.chronicDiseases.includes(option);
    const chronicDiseases = exists
      ? data.chronicDiseases.filter((o) => o !== option)
      : [...data.chronicDiseases, option];

    onChange({ chronicDiseases });
  };

  const toggleDisability = () => {
    onChange({ hasDisability: !data.hasDisability });
  };

  return (
    <Container>
      {/* Título de sección */}
      <SectionHeader>
        <SectionTitle>Antecedentes Médicos</SectionTitle>
        <SectionSubtitle>
          Esta información ayudará a brindarte mejor atención
        </SectionSubtitle>
      </SectionHeader>

      {/* Enfermedades crónicas */}
      <FieldGroup>
        <Label>¿Padece alguna enfermedad crónica?</Label>

        <ChipsGrid>
          {chronicOptions.map((opt) => {
            const selected = data.chronicDiseases.includes(opt);
            return (
              <Chip
                key={opt}
                activeOpacity={0.8}
                onPress={() => toggleChronic(opt)}
                $selected={selected}
              >
                <ChipText $selected={selected}>{opt}</ChipText>
              </Chip>
            );
          })}
        </ChipsGrid>
      </FieldGroup>

      {/* Medicamentos regulares */}
      <FieldGroup>
        <Label>Medicamentos que toma regularmente</Label>
        <MedicationRow>
          <MedicationInput
            placeholder="Nombre del medicamento"
            value={data.medicationName}
            onChangeText={(text) => onChange({ medicationName: text })}
            placeholderTextColor={Theme.colors.textTertiary}
          />
          <AddButton activeOpacity={0.8}>
            <Ionicons name="add" size={22} color={Theme.colors.white} />
          </AddButton>
        </MedicationRow>
      </FieldGroup>

      {/* Alergias */}
      <AllergiesCard>
        <AllergiesHeader>
          <AlertIconWrapper>
            <Ionicons
              name="alert-circle-outline"
              size={18}
              color={Theme.colors.primary}
            />
          </AlertIconWrapper>
          <AllergiesLabel>
            ¿Alergias a medicamentos, alimentos o sustancias?
          </AllergiesLabel>
        </AllergiesHeader>

        <TextArea
          placeholder="Describe tus alergias..."
          value={data.allergies}
          onChangeText={(text) => onChange({ allergies: text })}
          multiline
          textAlignVertical="top"
          placeholderTextColor={Theme.colors.textTertiary}
        />
      </AllergiesCard>

      {/* Cirugías previas */}
      <FieldGroup>
        <Label>Cirugías previas</Label>
        <TextArea
          placeholder="Describe cirugías anteriores, si las hay..."
          value={data.surgeries}
          onChangeText={(text) => onChange({ surgeries: text })}
          multiline
          textAlignVertical="top"
          placeholderTextColor={Theme.colors.textTertiary}
        />
      </FieldGroup>

      {/* Checkbox discapacidad */}
      <CheckboxRow onPress={toggleDisability}>
        <CheckboxBox $checked={data.hasDisability}>
          {data.hasDisability && (
            <Ionicons
              name="checkmark"
              size={14}
              color={Theme.colors.white}
            />
          )}
        </CheckboxBox>
        <CheckboxLabel>
          Tengo alguna discapacidad física o mental
        </CheckboxLabel>
      </CheckboxRow>
    </Container>
  );
};

export default Step2MedicalData;

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

/* Chips de enfermedades crónicas */

const ChipsGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${Theme.spacing.space2}px;
`;

const Chip = styled(TouchableOpacity)<{ $selected: boolean }>`
  padding-vertical: ${Theme.spacing.space3}px;
  padding-horizontal: ${Theme.spacing.space4}px;
  border-radius: 16px;
  min-width: 45%;
  align-items: center;
  border-width: 1px;
  border-color: ${({ $selected }) =>
    $selected ? Theme.colors.primary : Theme.colors.border};
  background-color: ${({ $selected }) =>
    $selected ? "#FDE7EE" : Theme.colors.white};
`;

const ChipText = styled.Text<{ $selected: boolean }>`
  font-size: ${Theme.typography.fontSizeSm}px;
  color: ${({ $selected }) =>
    $selected ? Theme.colors.primary : Theme.colors.textPrimary};
`;

/* Medicamentos */

const MedicationRow = styled.View`
  flex-direction: row;
  align-items: center;
`;

const MedicationInput = styled.TextInput`
  flex: 1;
  background-color: ${Theme.colors.backgroundAlt};
  border-radius: 12px;
  padding: ${Theme.spacing.space3}px ${Theme.spacing.space4}px;
  font-size: ${Theme.typography.fontSizeBase}px;
  color: ${Theme.colors.textPrimary};
  margin-right: ${Theme.spacing.space2}px;
`;

const AddButton = styled(TouchableOpacity)`
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background-color: ${Theme.colors.primary};
  justify-content: center;
  align-items: center;
`;

/* Alergias */

const AllergiesCard = styled.View`
  border-width: 1px;
  border-color: ${Theme.colors.primary};
  border-radius: 16px;
  padding: ${Theme.spacing.space4}px;
  margin-bottom: ${Theme.spacing.space4}px;
`;

const AllergiesHeader = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${Theme.spacing.space2}px;
`;

const AlertIconWrapper = styled.View`
  margin-right: ${Theme.spacing.space2}px;
`;

const AllergiesLabel = styled.Text`
  flex: 1;
  font-size: ${Theme.typography.fontSizeSm}px;
  color: ${Theme.colors.textPrimary};
  font-weight: 600;
`;

/* TextArea reutilizable */

const TextArea = styled.TextInput`
  background-color: ${Theme.colors.backgroundAlt};
  border-radius: 12px;
  padding: ${Theme.spacing.space3}px ${Theme.spacing.space4}px;
  font-size: ${Theme.typography.fontSizeBase}px;
  color: ${Theme.colors.textPrimary};
  min-height: 100px;
`;

/* Checkbox discapacidad */

const CheckboxRow = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  margin-top: ${Theme.spacing.space2}px;
`;

const CheckboxBox = styled.View<{ $checked: boolean }>`
  width: 20px;
  height: 20px;
  border-radius: 4px;
  border-width: 1px;
  border-color: ${Theme.colors.primary};
  background-color: ${({ $checked }) =>
    $checked ? Theme.colors.primary : Theme.colors.white};
  justify-content: center;
  align-items: center;
  margin-right: ${Theme.spacing.space2}px;
`;

const CheckboxLabel = styled.Text`
  font-size: ${Theme.typography.fontSizeSm}px;
  color: ${Theme.colors.textPrimary};
`;
 
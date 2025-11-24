import React from "react";
import styled from "styled-components/native";
import { Theme } from "../colors";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
// Si usas Picker, instala: yarn add @react-native-picker/picker
import { Picker } from "@react-native-picker/picker";

export type Step1PersonalDataForm = {
  email: string;
  password: string;
  fullName: string;
  dni: string;
  birthDate: string;
  biologicalSex: "M" | "F" | "O" | null;
  genderIdentity: string;
  maritalStatus: string;
};

type Props = {
  data: Step1PersonalDataForm;
  onChange: (partial: Partial<Step1PersonalDataForm>) => void;
};

const maritalOptions = [
  "Soltero/a",
  "Casado/a",
  "Unión libre",
  "Divorciado/a",
  "Viudo/a",
  "Separado/a",
];

const Step1PersonalData: React.FC<Props> = ({ data, onChange }) => {
  return (
    <Container>
      {/* Título de sección */}
      <SectionHeader>
        <SectionTitle>Datos Personales</SectionTitle>
        <SectionSubtitle>
          Completa tu información personal básica
        </SectionSubtitle>
      </SectionHeader>

      {/* Correo Institucional */}
      <FieldGroup>
        <Label>
          Correo Institucional <Required>*</Required>
        </Label>
        <Input
          placeholder="tu.nombre@universidad.edu"
          keyboardType="email-address"
          autoCapitalize="none"
          value={data.email}
          onChangeText={(text) => onChange({ email: text })}
          placeholderTextColor={Theme.colors.textTertiary}
        />
      </FieldGroup>

      {/* Contraseña */}
      <FieldGroup>
        <Label>
          Contraseña <Required>*</Required>
        </Label>
        <Input
          placeholder="Crea una contraseña segura"
          secureTextEntry
          value={data.password}
          onChangeText={(text) => onChange({ password: text })}
          placeholderTextColor={Theme.colors.textTertiary}
        />
      </FieldGroup>

      {/* Nombre completo */}
      <FieldGroup>
        <Label>
          Nombre completo <Required>*</Required>
        </Label>
        <Input
          placeholder="Ej: María García Rodríguez"
          value={data.fullName}
          onChangeText={(text) => onChange({ fullName: text })}
          placeholderTextColor={Theme.colors.textTertiary}
        />
      </FieldGroup>

      {/* Cédula / DNI */}
      <FieldGroup>
        <Label>
          Cédula/DNI <Required>*</Required>
        </Label>
        <Input
          placeholder="Ej: 1234567890"
          keyboardType="numeric"
          value={data.dni}
          onChangeText={(text) => onChange({ dni: text })}
          placeholderTextColor={Theme.colors.textTertiary}
        />
      </FieldGroup>

      {/* Fecha de nacimiento */}
      <FieldGroup>
        <Label>
          Fecha de nacimiento <Required>*</Required>
        </Label>
        <DateInputWrapper>
          <DateInput
            placeholder="dd/mm/aaaa"
            value={data.birthDate}
            onChangeText={(text) => onChange({ birthDate: text })}
            placeholderTextColor={Theme.colors.textTertiary}
          />
          <CalendarIconWrapper>
            <MaterialIcons
              name="calendar-today"
              size={20}
              color={Theme.colors.textSecondary}
            />
          </CalendarIconWrapper>
        </DateInputWrapper>
      </FieldGroup>

      {/* Sexo biológico */}
      <FieldGroup>
        <Label>
          Sexo biológico <Required>*</Required>
        </Label>

        <RadioGroup>
          <RadioRow onPress={() => onChange({ biologicalSex: "M" })}>
            <RadioOuter>
              {data.biologicalSex === "M" && <RadioInner />}
            </RadioOuter>
            <RadioLabel>Masculino</RadioLabel>
          </RadioRow>

          <RadioRow onPress={() => onChange({ biologicalSex: "F" })}>
            <RadioOuter>
              {data.biologicalSex === "F" && <RadioInner />}
            </RadioOuter>
            <RadioLabel>Femenino</RadioLabel>
          </RadioRow>

          <RadioRow onPress={() => onChange({ biologicalSex: "O" })}>
            <RadioOuter>
              {data.biologicalSex === "O" && <RadioInner />}
            </RadioOuter>
            <RadioLabel>Otro</RadioLabel>
          </RadioRow>
        </RadioGroup>
      </FieldGroup>

      {/* Identidad de género (opcional) */}
      <FieldGroup>
        <Label>Identidad de género (opcional)</Label>
        <Input
          placeholder="Ej: Mujer, Hombre, No binario"
          value={data.genderIdentity}
          onChangeText={(text) => onChange({ genderIdentity: text })}
          placeholderTextColor={Theme.colors.textTertiary}
        />
      </FieldGroup>

      {/* Estado civil */}
      <FieldGroup>
        <Label>
          Estado civil <Required>*</Required>
        </Label>
        <DropdownWrapper>
          <Picker
            selectedValue={data.maritalStatus}
            onValueChange={(value) => onChange({ maritalStatus: value })}
            dropdownIconColor={Theme.colors.textSecondary}
            style={{ color: Theme.colors.textPrimary }}
          >
            <Picker.Item
              label="Selecciona tu estado civil"
              value=""
              color={Theme.colors.textTertiary}
            />
            {maritalOptions.map((opt) => (
              <Picker.Item key={opt} label={opt} value={opt} />
            ))}
          </Picker>
          <DropdownIcon>
            <Ionicons
              name="chevron-down"
              size={18}
              color={Theme.colors.textSecondary}
            />
          </DropdownIcon>
        </DropdownWrapper>
      </FieldGroup>
    </Container>
  );
};

export default Step1PersonalData;

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
  margin-bottom: 4px;
`;

const Required = styled.Text`
  color: ${Theme.colors.primary};
`;

const Input = styled.TextInput`
  background-color: ${Theme.colors.backgroundAlt};
  border-radius: 12px;
  padding: ${Theme.spacing.space3}px ${Theme.spacing.space4}px;
  font-size: ${Theme.typography.fontSizeBase}px;
  color: ${Theme.colors.textPrimary};
`;

const DateInputWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${Theme.colors.backgroundAlt};
  border-radius: 12px;
  padding-right: ${Theme.spacing.space4}px;
`;

const DateInput = styled.TextInput`
  flex: 1;
  padding: ${Theme.spacing.space3}px ${Theme.spacing.space4}px;
  font-size: ${Theme.typography.fontSizeBase}px;
  color: ${Theme.colors.textPrimary};
`;

const CalendarIconWrapper = styled.View`
  margin-left: 4px;
`;

const RadioGroup = styled.View`
  margin-top: 4px;
`;

const RadioRow = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  margin-bottom: 6px;
`;

const RadioOuter = styled.View`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  border-width: 2px;
  border-color: ${Theme.colors.textSecondary};
  justify-content: center;
  align-items: center;
  margin-right: 8px;
`;

const RadioInner = styled.View`
  width: 10px;
  height: 10px;
  border-radius: 5px;
  background-color: ${Theme.colors.primary};
`;

const RadioLabel = styled.Text`
  font-size: ${Theme.typography.fontSizeSm}px;
  color: ${Theme.colors.textPrimary};
`;

const DropdownWrapper = styled.View`
  position: relative;
  background-color: ${Theme.colors.backgroundAlt};
  border-radius: 12px;
  overflow: hidden;
`;

const DropdownIcon = styled.View`
  position: absolute;
  right: 14px;
  top: 50%;
  margin-top: -10px;
`;
 
import React from "react";
import styled from "styled-components/native";
import { Theme } from "../colors";
import { Switch } from "react-native";
import { Picker } from "@react-native-picker/picker";

export type Step3EmergencyContactForm = {
  address: string;
  phone: string;
  emergencyName: string;
  emergencyPhone: string;
  hasInsurance: boolean;
  insuranceProvider: string;
};

type Props = {
  data: Step3EmergencyContactForm;
  onChange: (partial: Partial<Step3EmergencyContactForm>) => void;
  errors?: Partial<Record<keyof Step3EmergencyContactForm, string>>;
};

const insuranceProviders = [
  "Seguros UNIHealth",
  "Seguro Privado A",
  "Seguro Privado B",
  "Otro",
];

const Step3EmergencyContact: React.FC<Props> = ({ data, onChange, errors }) => {
  const toggleInsurance = () => {
    onChange({
      hasInsurance: !data.hasInsurance,
      // si desactiva, vaciamos proveedor
      insuranceProvider: !data.hasInsurance ? data.insuranceProvider : "",
    });
  };

  return (
    <Container>
      {/* Título de sección */}
      <SectionHeader>
        <SectionTitle>Información de Contacto</SectionTitle>
        <SectionSubtitle>
          Completa tus datos de contacto y emergencia
        </SectionSubtitle>
      </SectionHeader>

      {/* Dirección */}
      <FieldGroup>
        <Label>
          Dirección <Required>*</Required>
        </Label>
        <Input
          placeholder="Calle, número, ciudad"
          value={data.address}
          onChangeText={(text) => onChange({ address: text })}
          placeholderTextColor={Theme.colors.textTertiary}
        />
        {errors?.address && <ErrorText>{errors.address}</ErrorText>}
      </FieldGroup>

      {/* Teléfono */}
      <FieldGroup>
        <Label>
          Teléfono <Required>*</Required>
        </Label>
        <Input
          placeholder="+591 700 000 00"
          keyboardType="phone-pad"
          value={data.phone}
          onChangeText={(text) => onChange({ phone: text })}
          placeholderTextColor={Theme.colors.textTertiary}
        />
        {errors?.phone && <ErrorText>{errors.phone}</ErrorText>}
      </FieldGroup>

      {/* Contacto de emergencia */}
      <EmergencyCard>
        <CardTitle>Contacto de Emergencia</CardTitle>

        <InnerFieldGroup>
          <Label>
            Nombre completo <Required>*</Required>
          </Label>
          <Input
            placeholder="Nombre del contacto de emergencia"
            value={data.emergencyName}
            onChangeText={(text) => onChange({ emergencyName: text })}
            placeholderTextColor={Theme.colors.textTertiary}
          />
          {errors?.emergencyName && <ErrorText>{errors.emergencyName}</ErrorText>}
        </InnerFieldGroup>

        <InnerFieldGroup>
          <Label>
            Teléfono <Required>*</Required>
          </Label>
          <Input
            placeholder="+591 700 000 00"
            keyboardType="phone-pad"
            value={data.emergencyPhone}
            onChangeText={(text) => onChange({ emergencyPhone: text })}
            placeholderTextColor={Theme.colors.textTertiary}
          />
          {errors?.emergencyPhone && <ErrorText>{errors.emergencyPhone}</ErrorText>}
        </InnerFieldGroup>
      </EmergencyCard>

      {/* Seguro médico */}
      <InsuranceCard>
        <InsuranceHeader>
          <InsuranceTextWrapper>
            <Label>¿Tienes seguro médico?</Label>
            <InsuranceSubtitle>
              Indica si cuentas con seguro médico privado
            </InsuranceSubtitle>
          </InsuranceTextWrapper>

          <Switch
            value={data.hasInsurance}
            onValueChange={toggleInsurance}
            trackColor={{
              false: Theme.colors.border,
              true: "#FDE7EE",
            }}
            thumbColor={
              data.hasInsurance ? Theme.colors.primary : "#f4f3f4"
            }
          />
        </InsuranceHeader>

        {/* Proveedor de seguro */}
        <FieldGroup style={{ marginBottom: 0 }}>
          <Label>
            Proveedor de seguro <Required>*</Required>
          </Label>
          <DropdownWrapper $disabled={!data.hasInsurance}>
            <Picker
              enabled={data.hasInsurance}
              selectedValue={data.insuranceProvider}
              onValueChange={(value) =>
                onChange({ insuranceProvider: value.toString() })
              }
              dropdownIconColor={Theme.colors.textSecondary}
              style={{
                color: data.hasInsurance
                  ? Theme.colors.textPrimary
                  : Theme.colors.textTertiary,
              }}
            >
              <Picker.Item
                label="Selecciona tu proveedor"
                value=""
                color={Theme.colors.textTertiary}
              />
              {insuranceProviders.map((opt) => (
                <Picker.Item key={opt} label={opt} value={opt} />
              ))}
            </Picker>
          </DropdownWrapper>
          {errors?.insuranceProvider && <ErrorText>{errors.insuranceProvider}</ErrorText>}
        </FieldGroup>
      </InsuranceCard>
    </Container>
  );
};

export default Step3EmergencyContact;

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

const InnerFieldGroup = styled.View`
  margin-bottom: ${Theme.spacing.space3}px;
`;

const Label = styled.Text`
  font-size: ${Theme.typography.fontSizeSm}px;
  color: ${Theme.colors.textPrimary};
  font-weight: 600;
  margin-bottom: 6px;
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

/* Tarjeta contacto de emergencia */

const EmergencyCard = styled.View`
  border-width: 1px;
  border-color: ${Theme.colors.primary};
  border-radius: 16px;
  padding: ${Theme.spacing.space4}px;
  margin-bottom: ${Theme.spacing.space4}px;
`;

const CardTitle = styled.Text`
  font-size: ${Theme.typography.fontSizeSm}px;
  color: ${Theme.colors.textPrimary};
  font-weight: 600;
  margin-bottom: ${Theme.spacing.space3}px;
`;

/* Tarjeta de seguro */

const InsuranceCard = styled.View`
  background-color: ${Theme.colors.backgroundAlt};
  border-radius: 16px;
  padding: ${Theme.spacing.space4}px;
`;

const InsuranceHeader = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${Theme.spacing.space3}px;
`;

const InsuranceTextWrapper = styled.View`
  flex: 1;
  margin-right: ${Theme.spacing.space3}px;
`;

const InsuranceSubtitle = styled.Text`
  font-size: ${Theme.typography.fontSizeXs}px;
  color: ${Theme.colors.textSecondary};
  margin-top: 2px;
`;

/* Dropdown */

const DropdownWrapper = styled.View<{ $disabled: boolean }>`
  position: relative;
  background-color: ${Theme.colors.backgroundAlt};
  border-radius: 12px;
  border-width: 1px;
  border-color: ${({ $disabled }) =>
    $disabled ? Theme.colors.border : Theme.colors.border};
  opacity: ${({ $disabled }) => ($disabled ? 0.6 : 1)};
  overflow: hidden;
`;

const ErrorText = styled.Text`
  color: ${Theme.colors.primary};
  margin-top: 6px;
  font-size: ${Theme.typography.fontSizeXs}px;
`;
 
// screens/Register.tsx
import React, { useState } from "react";
import styled from "styled-components/native";
import { Theme } from "../components/colors";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import api from "../api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Step1PersonalData, {
  Step1PersonalDataForm,
} from "../components/register/Step1PersonalData";

import Step2MedicalData, {
  Step2MedicalDataForm,
} from "../components/register/Step2MedicalData";

import Step3EmergencyContact, {
  Step3EmergencyContactForm,
} from "../components/register/Step3EmergencyContact";

import Step4Preferences, {
  Step4PreferencesForm,
} from "../components/register/Step4Preferences";

import Step5Summary from "../components/register/Step5Summary";

const TOTAL_STEPS = 5;

// Forma global del formulario (steps 1–4)
export type RegisterForm =
  Step1PersonalDataForm &
  Step2MedicalDataForm &
  Step3EmergencyContactForm &
  Step4PreferencesForm;

const Register: React.FC = () => {
  const navigation = useNavigation<any>();
  const [step, setStep] = useState<number>(1);

  const [form, setForm] = useState<RegisterForm>({
    // Step 1
    email: "",
    password: "",
    fullName: "",
    dni: "",
    birthDate: "",
    biologicalSex: null,
    genderIdentity: "",
    maritalStatus: "",
    // Step 2
    chronicDiseases: [],
    medicationName: "",
    allergies: "",
    surgeries: "",
    hasDisability: false,
    // Step 3
    address: "",
    phone: "",
    emergencyName: "",
    emergencyPhone: "",
    hasInsurance: false,
    insuranceProvider: "",
    // Step 4
    familyHistory: [],
    smokingHabit: null,
    alcoholConsumption: null,
    physicalActivity: null,
    stressLevel: 1,
  });

  const updateForm = (partial: Partial<RegisterForm>) => {
    setForm((prev) => ({ ...prev, ...partial }));
  };

  const goNext = () => {
    if (step < TOTAL_STEPS) {
      setStep((s) => s + 1);
    }
    // En el paso 5 ya no usamos este botón, solo los de Step5Summary
  };

  const goBack = () => {
    if (step > 1) setStep((s) => s - 1);
    else navigation.goBack();
  };

  const handleSubmit = async () => {
    try {
      // 1. Register User
      await api.post('/auth/register', {
        email: form.email,
        password: form.password,
        name: form.fullName,
      });

      // 2. Login to get token
      const loginResponse = await api.post('/auth/login', {
        email: form.email,
        password: form.password,
      });
      
      const { access_token } = loginResponse.data;
      await AsyncStorage.setItem('access_token', access_token);

      // 3. Create Patient Profile
      const names = form.fullName.split(' ');
      const firstName = names[0];
      const lastName = names.slice(1).join(' ') || names[0]; // Fallback if only one name

      // Format DOB to ISO string if needed, assuming DD/MM/YYYY input
      // Simple conversion, might need more robust parsing depending on input mask
      const [day, month, year] = form.birthDate.split('/');
      const dobISO = new Date(`${year}-${month}-${day}`).toISOString();

      await api.post('/patients', {
        firstName,
        lastName,
        email: form.email,
        phone: form.phone,
        dob: dobISO,
        gender: form.biologicalSex || 'O',
        // Add other fields if backend supports them or update backend DTO
      });

      console.log("Registro completo");
      navigation.navigate("Tutorial");
    } catch (error) {
      console.error("Error en registro:", error);
      alert("Hubo un error al registrar. Por favor intenta de nuevo.");
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1PersonalData data={form} onChange={updateForm} />;
      case 2:
        return <Step2MedicalData data={form} onChange={updateForm} />;
      case 3:
        return (
          <Step3EmergencyContact data={form} onChange={updateForm} />
        );
      case 4:
        return <Step4Preferences data={form} onChange={updateForm} />;
      case 5:
        return (
          <Step5Summary
            data={form}
            onEditStep={(targetStep) => setStep(targetStep)}
            onConfirm={handleSubmit}
            onBack={() => setStep(4)}
          />
        );
      default:
        return null;
    }
  };

  const progress = step / TOTAL_STEPS;

  return (
    <Container>
      {/* HEADER */}
      <Header>
        <BackButton onPress={goBack}>
          <Ionicons
            name="chevron-back"
            size={24}
            color={Theme.colors.textPrimary}
          />
        </BackButton>

        <HeaderTitle>
          Paso {step} de {TOTAL_STEPS}
        </HeaderTitle>
      </Header>

      {/* PROGRESS BAR */}
      <ProgressBarContainer>
        <ProgressFill style={{ width: `${progress * 100}%` }} />
      </ProgressBarContainer>

      {/* CONTENIDO */}
      <FormScroll
        contentContainerStyle={{ padding: Theme.spacing.space4 }}
        keyboardShouldPersistTaps="handled"
      >
        {renderStep()}
      </FormScroll>

      {/* BOTÓN INFERIOR SOLO EN PASOS 1–4 */}
      {step < TOTAL_STEPS && (
        <BottomBar>
          <PrimaryButton onPress={goNext}>
            <PrimaryButtonText>Siguiente</PrimaryButtonText>
          </PrimaryButton>
        </BottomBar>
      )}
    </Container>
  );
};

export default Register;

/* ─────────────── STYLES ─────────────── */

const Container = styled.View`
  flex: 1;
  background-color: ${Theme.colors.background};
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  padding: ${Theme.spacing.space4}px;
  padding-top: ${Theme.spacing.space5}px;
`;

const BackButton = styled.TouchableOpacity`
  padding: ${Theme.spacing.space1}px 0;
  margin-right: ${Theme.spacing.space2}px;
`;

const HeaderTitle = styled.Text`
  flex: 1;
  text-align: right;
  font-size: ${Theme.typography.fontSizeSm}px;
  color: ${Theme.colors.textSecondary};
`;

const ProgressBarContainer = styled.View`
  height: 6px;
  margin: 0 ${Theme.spacing.space4}px ${Theme.spacing.space4}px;
  border-radius: 999px;
  background-color: ${Theme.colors.backgroundAlt};
  overflow: hidden;
`;

const ProgressFill = styled.View`
  height: 100%;
  background-color: ${Theme.colors.primary};
`;

const FormScroll = styled.ScrollView`
  flex: 1;
`;

const BottomBar = styled.View`
  padding: ${Theme.spacing.space4}px;
  padding-bottom: ${Theme.spacing.space5}px;
  background-color: ${Theme.colors.background};
`;

const PrimaryButton = styled.TouchableOpacity`
  background-color: ${Theme.colors.primary};
  padding: ${Theme.spacing.space4}px;
  border-radius: 16px;
  ${() => Theme.shadows.shadowMd}
`;

const PrimaryButtonText = styled.Text`
  text-align: center;
  color: ${Theme.colors.white};
  font-size: ${Theme.typography.fontSizeLg}px;
  font-weight: 600;
`;
 
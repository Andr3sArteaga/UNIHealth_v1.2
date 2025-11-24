// screens/LogIn.tsx
import React from "react";
import styled from "styled-components/native";
import { Theme } from "../components/colors";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import api from "../api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";


const LogIn: React.FC = () => {
    const navigation = useNavigation<any>();
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [loading, setLoading] = React.useState(false);

    const handleGoBack = () => {
      navigation.navigate("Welcome");
    }

    const handleStartRegister = () => {
      navigation.navigate("Register");
    }

    const handleLogin = async () => {
      if (!email || !password) {
        alert("Por favor ingresa correo y contraseña");
        return;
      }

      try {
        setLoading(true);
        const response = await api.post('/auth/login', {
          email,
          password
        });
        
        const { access_token } = response.data;
        await AsyncStorage.setItem('access_token', access_token);
        
        // Optional: Get user details to store locally if needed
        // const userResponse = await api.get('/users/me'); 
        
        setLoading(false);
        navigation.reset({
          index: 0,
          routes: [{ name: 'MainTabs' }],
        });
      } catch (error) {
        setLoading(false);
        console.error(error);
        alert("Error al iniciar sesión. Verifica tus credenciales.");
      }
    };

  return (

    <Container contentContainerStyle={{ padding: Theme.spacing.space6 }}>
      {/* Header con botón de retroceso */}
      <HeaderContainer>
        <BackButton onPress={handleGoBack}>
            <Ionicons name="chevron-back" size={24} color={Theme.colors.textPrimary} />
        </BackButton>
       </HeaderContainer>
      {/* Logo */}
      <LogoContainer>
        <LogoIcon name="heart" size={50} color={Theme.colors.white} />
      </LogoContainer>

      {/* Títulos */}
      <Title>Bienvenido a UNIHealth</Title>
      <Subtitle>Inicia sesión con tu correo institucional</Subtitle>

      {/* Correo institucional */}
      <FieldGroup>
        <Label>Correo Institucional</Label>
        <InputWrapper>
          <IconBox>
            <Ionicons
              name="mail-outline"
              size={20}
              color={Theme.colors.primary}
            />
          </IconBox>
          <Input
            placeholder="tu.nombre@universidad.edu"
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor={Theme.colors.textTertiary}
            value={email}
            onChangeText={setEmail}
          />
        </InputWrapper>
        <HelperText>
          Solo correos institucionales (@universidad.edu)
        </HelperText>
      </FieldGroup>

      {/* Contraseña */}
      <FieldGroup>
        <Label>Contraseña</Label>
        <InputWrapper>
          <IconBox>
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color={Theme.colors.primary}
            />
          </IconBox>
          <Input
            placeholder="Ingresa tu contraseña"
            secureTextEntry
            placeholderTextColor={Theme.colors.textTertiary}
            value={password}
            onChangeText={setPassword}
          />
        </InputWrapper>
      </FieldGroup>

      {/* ¿Olvidaste tu contraseña? */}
      <ForgotPasswordText>¿Olvidaste tu contraseña?</ForgotPasswordText>

      {/* Botón Iniciar sesión */}
      <PrimaryButton onPress={handleLogin} disabled={loading}>
        <PrimaryButtonText>{loading ? "Cargando..." : "Iniciar Sesión"}</PrimaryButtonText>
      </PrimaryButton>

      {/* Divider */}
      <DividerContainer>
        <DividerLine />
        <DividerText>¿No tienes cuenta?</DividerText>
        <DividerLine />
      </DividerContainer>

      {/* Botón Comenzar registro (outlined) */}
      <SecondaryButton onPress={handleStartRegister}>
        <SecondaryButtonText>Comenzar Registro</SecondaryButtonText>
      </SecondaryButton>
    </Container>
  );
};

export default LogIn;

/* ───────────── STYLES ───────────── */

const Container = styled.ScrollView`
  flex: 1;
  background-color: ${Theme.colors.background};
`;

const LogoContainer = styled.View`
  width: 120px;
  height: 120px;
  background-color: ${Theme.colors.primary};
  border-radius: 30px;
  align-self: center;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
  margin-bottom: 24px;
  ${() => Theme.shadows.shadowMd}
`;

const LogoIcon = styled(Ionicons)``;

const Title = styled.Text`
  font-size: ${Theme.typography.fontSize2xl}px;
  font-weight: 700;
  color: ${Theme.colors.textPrimary};
  text-align: center;
`;

const Subtitle = styled.Text`
  font-size: ${Theme.typography.fontSizeSm}px;
  color: ${Theme.colors.textSecondary};
  text-align: center;
  margin-top: 4px;
  margin-bottom: 28px;
`;

const FieldGroup = styled.View`
  margin-bottom: ${Theme.spacing.space4}px;
`;

const Label = styled.Text`
  font-size: ${Theme.typography.fontSizeSm}px;
  color: ${Theme.colors.textPrimary};
  font-weight: 600;
  margin-bottom: 6px;
`;

const InputWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${Theme.colors.backgroundAlt};
  border-radius: 16px;
  padding-right: ${Theme.spacing.space4}px;
`;

const IconBox = styled.View`
  width: 44px;
  height: 44px;
  justify-content: center;
  align-items: center;
`;

const Input = styled.TextInput`
  flex: 1;
  height: 48px;
  font-size: ${Theme.typography.fontSizeBase}px;
  color: ${Theme.colors.textPrimary};
`;

const HelperText = styled.Text`
  font-size: ${Theme.typography.fontSizeXs}px;
  color: ${Theme.colors.textTertiary};
  margin-top: 4px;
`;

const ForgotPasswordText = styled.Text`
  font-size: ${Theme.typography.fontSizeSm}px;
  color: ${Theme.colors.primary};
  text-align: center;
  margin-top: 4px;
  margin-bottom: 24px;
`;

const PrimaryButton = styled.TouchableOpacity`
  background-color: ${Theme.colors.primary};
  padding: ${Theme.spacing.space4}px;
  border-radius: 999px;
  margin-bottom: ${Theme.spacing.space4}px;
  ${() => Theme.shadows.shadowMd}
`;

const PrimaryButtonText = styled.Text`
  font-size: ${Theme.typography.fontSizeLg}px;
  color: ${Theme.colors.white};
  text-align: center;
  font-weight: 600;
`;

const DividerContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${Theme.spacing.space4}px;
`;

const DividerLine = styled.View`
  flex: 1;
  height: 1px;
  background-color: ${Theme.colors.border};
`;

const DividerText = styled.Text`
  font-size: ${Theme.typography.fontSizeXs}px;
  color: ${Theme.colors.textTertiary};
  margin: 0 ${Theme.spacing.space2}px;
`;

const SecondaryButton = styled.TouchableOpacity`
  border-width: 1px;
  border-color: ${Theme.colors.primary};
  padding: ${Theme.spacing.space4}px;
  border-radius: 999px;
  margin-bottom: 40px;
`;

const SecondaryButtonText = styled.Text`
  font-size: ${Theme.typography.fontSizeLg}px;
  color: ${Theme.colors.primary};
  text-align: center;
  font-weight: 600;
`;
 
const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;

const BackButton = styled.TouchableOpacity`
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
`;
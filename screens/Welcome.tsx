import React from "react";
import styled from "styled-components/native";
import { Theme } from "../components/colors"; 
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const Welcome: React.FC = () => {
    const navigation = useNavigation<any>();

    const handleStartRegister = () => {
        navigation.navigate("Register");
    }

    const handleStartLogIn = () => {
      navigation.navigate("LogIn");
    }
  return (
    <Container>
      <LogoContainer>
        <LogoIcon name="heart" size={50} color={Theme.colors.white} />
      </LogoContainer>

      <Title>Bienvenido a UNIHealth</Title>
      <Subtitle>Tu salud universitaria en una sola aplicación</Subtitle>

      <Card>
        <IconWrapper>
          <Ionicons
            name="calendar-outline"
            size={26}
            color={Theme.colors.primary}
          />
        </IconWrapper>
        <CardTextContainer>
          <CardTitle>Agenda tus citas</CardTitle>
          <CardSubtitle>
            Programa citas médicas y de psicología fácilmente
          </CardSubtitle>
        </CardTextContainer>
      </Card>

      <Card>
        <IconWrapper>
          <Ionicons
            name="shield-checkmark-outline"
            size={26}
            color={Theme.colors.primary}
          />
        </IconWrapper>
        <CardTextContainer>
          <CardTitle>Alertas de emergencia</CardTitle>
          <CardSubtitle>
            Contacto rápido con personal médico para ayudarte en emergencias
          </CardSubtitle>
        </CardTextContainer>
      </Card>

      <Card>
        <IconWrapper>
          <Ionicons
            name="chatbubble-ellipses-outline"
            size={26}
            color={Theme.colors.primary}
          />
        </IconWrapper>
        <CardTextContainer>
          <CardTitle>Chat con profesionales</CardTitle>
          <CardSubtitle>
            Contacto rápido con personal médico cercano
          </CardSubtitle>
        </CardTextContainer>
      </Card>

      <ButtonPrimary onPress={handleStartLogIn}>
        <ButtonPrimaryText>Iniciar Sesión</ButtonPrimaryText>
      </ButtonPrimary>

      <ButtonSecondary onPress={handleStartRegister}>
        <ButtonSecondaryText>Comenzar Registro</ButtonSecondaryText>
      </ButtonSecondary>

      <FooterText>
        Al continuar, aceptas nuestros términos y condiciones
      </FooterText>
    </Container>
  );
};

export default Welcome;

/* ──────────────────── STYLES ──────────────────── */

const Container = styled.ScrollView`
  flex: 1;
  padding: ${Theme.spacing.space6}px;
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
  margin-bottom: 20px;
  ${() => Theme.shadows.shadowMd}
`;

const LogoIcon = styled(Ionicons)``;

const Title = styled.Text`
  font-size: ${Theme.typography.fontSize2xl}px;
  font-weight: bold;
  color: ${Theme.colors.textPrimary};
  text-align: center;
`;

const Subtitle = styled.Text`
  font-size: ${Theme.typography.fontSizeSm}px;
  color: ${Theme.colors.textSecondary};
  text-align: center;
  margin-bottom: 30px;
`;

const Card = styled.View`
  flex-direction: row;
  background-color: ${Theme.colors.white};
  border-radius: 16px;
  padding: ${Theme.spacing.space4}px;
  margin-bottom: 15px;
  align-items: center;
  ${() => Theme.shadows.shadowSm}
`;

const IconWrapper = styled.View`
  width: 50px;
  height: 50px;
  background-color: ${Theme.colors.backgroundAlt};
  border-radius: 14px;
  justify-content: center;
  align-items: center;
`;

const CardTextContainer = styled.View`
  flex: 1;
  margin-left: 12px;
`;

const CardTitle = styled.Text`
  font-size: ${Theme.typography.fontSizeLg}px;
  font-weight: 600;
  color: ${Theme.colors.textPrimary};
`;

const CardSubtitle = styled.Text`
  font-size: ${Theme.typography.fontSizeSm}px;
  color: ${Theme.colors.textSecondary};
  margin-top: 2px;
`;

const ButtonPrimary = styled.TouchableOpacity`
  background-color: ${Theme.colors.primary};
  padding: ${Theme.spacing.space4}px;
  border-radius: 14px;
  margin-top: 20px;
`;

const ButtonPrimaryText = styled.Text`
  font-size: ${Theme.typography.fontSizeLg}px;
  color: ${Theme.colors.white};
  text-align: center;
  font-weight: 600;
`;

const ButtonSecondary = styled.TouchableOpacity`
  background-color: ${Theme.colors.primaryDark};
  padding: ${Theme.spacing.space4}px;
  border-radius: 14px;
  margin-top: 16px;
`;

const ButtonSecondaryText = styled.Text`
  font-size: ${Theme.typography.fontSizeLg}px;
  color: ${Theme.colors.white};
  text-align: center;
  font-weight: 600;
`;

const FooterText = styled.Text`
  font-size: ${Theme.typography.fontSizeXs}px;
  color: ${Theme.colors.textTertiary};
  text-align: center;
  margin-top: 25px;
  margin-bottom: 30px;
`;

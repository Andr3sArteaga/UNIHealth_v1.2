// screens/AlertSending.tsx
import React, { useEffect } from "react";
import styled from "styled-components/native";
import { Theme } from "../components/colors";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";

type AlertSendingParams = {
  type: string;
  description: string;
  canMove: boolean;
};

const AlertSending: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const params = route.params as AlertSendingParams | undefined;

  useEffect(() => {
    // Simulación de envío:
    // mínimo 4s, máx 7s (aquí lo dejamos fijo en 5s, puedes ajustarlo)
    const timer = setTimeout(() => {
      console.log("Alerta enviada con éxito:", params);
      // Después de enviar, por ejemplo ir al Home (tabs)
      navigation.navigate("AlertState" as never);
    }, 5000); // 5000ms = 5s

    return () => clearTimeout(timer);
  }, [navigation, params]);

  return (
    <Container>
      <Content>
        <BigCircle>
          <MiddleCircle>
            <InnerCircle>
              <Ionicons
                name="sync-outline"
                size={40}
                color={Theme.colors.white}
              />
            </InnerCircle>
          </MiddleCircle>
        </BigCircle>

        <Title>Enviando Alerta</Title>
        <Subtitle>Contactando centros médicos cercanos...</Subtitle>
        <HelperText>Por favor espera un momento</HelperText>
      </Content>
    </Container>
  );
};

export default AlertSending;

/* ─────────────── STYLES ─────────────── */

const Container = styled.View`
  flex: 1;
  background-color: ${Theme.colors.background};
  justify-content: center;
  align-items: center;
`;

const Content = styled.View`
  align-items: center;
  padding: ${Theme.spacing.space4}px;
`;

const BigCircle = styled.View`
  width: 260px;
  height: 260px;
  border-radius: 130px;
  border-width: 2px;
  border-color: #fde4ec;
  justify-content: center;
  align-items: center;
  margin-bottom: ${Theme.spacing.space4}px;
`;

const MiddleCircle = styled.View`
  width: 220px;
  height: 220px;
  border-radius: 110px;
  border-width: 2px;
  border-color: #fbd0e0;
  justify-content: center;
  align-items: center;
`;

const InnerCircle = styled.View`
  width: 90px;
  height: 90px;
  border-radius: 45px;
  background-color: ${Theme.colors.primary};
  justify-content: center;
  align-items: center;
  border-width: 2px;
  border-color: #fbd0e0;
`;

const Title = styled.Text`
  font-size: ${Theme.typography.fontSizeLg}px;
  font-weight: 600;
  color: ${Theme.colors.textPrimary};
  margin-top: ${Theme.spacing.space3}px;
`;

const Subtitle = styled.Text`
  margin-top: ${Theme.spacing.space2}px;
  font-size: ${Theme.typography.fontSizeSm}px;
  color: ${Theme.colors.textSecondary};
  text-align: center;
`;

const HelperText = styled.Text`
  margin-top: ${Theme.spacing.space1}px;
  font-size: ${Theme.typography.fontSizeXs}px;
  color: ${Theme.colors.textSecondary};
`;
 
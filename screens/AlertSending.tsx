// screens/AlertSending.tsx
import React, { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";
import styled from "styled-components/native";
import { Theme } from "../components/colors";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useNotification } from "../context/NotificationContext";

type AlertSendingParams = {
  type: string;
  description: string;
  canMove: boolean;
  simulateError?: boolean;
};

const AlertSending: React.FC = () => {
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const params = route.params as AlertSendingParams | undefined;
  const spinValue = useRef(new Animated.Value(0)).current;
  const { showNotification } = useNotification();

  useEffect(() => {
    // Start rotation animation
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    // Simulación de envío:
    const timer = setTimeout(() => {
      if (params?.simulateError) {
        showNotification("error_alert");
        navigation.goBack();
      } else {
        showNotification("success_alert");
        console.log("Alerta enviada con éxito:", params);
        navigation.navigate("AlertState" as never);
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigation, params, showNotification]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <Container>
      <Content>
        <BigCircle>
          <MiddleCircle>
            <AnimatedInnerCircle style={{ transform: [{ rotate: spin }] }}>
              <Ionicons
                name="sync-outline"
                size={40}
                color={Theme.colors.white}
              />
            </AnimatedInnerCircle>
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

const AnimatedInnerCircle = Animated.createAnimatedComponent(InnerCircle);

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
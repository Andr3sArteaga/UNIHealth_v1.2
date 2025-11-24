// screens/Tutorial.tsx
import React, { useState } from "react";
import styled from "styled-components/native";
import { Theme } from "../components/colors";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

type Slide = {
  key: string;
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
};

const slides: Slide[] = [
  {
    key: "history",
    title: "Tu Historial Médico",
    description:
      "Accede a toda tu información de salud en un solo lugar, actualízala cuando quieras.",
    icon: "document-text-outline",
  },
  {
    key: "appointments",
    title: "Agenda Citas",
    description:
      "Programa citas con médicos generales, psicólogos y nutricionistas fácilmente.",
    icon: "calendar-outline",
  },
  {
    key: "alerts",
    title: "Alertas de Emergencia",
    description:
      "En caso de emergencia, contacta rápidamente al personal médico más cercano.",
    icon: "alert-circle-outline",
  },
];

const Tutorial: React.FC = () => {
  const navigation = useNavigation<any>();
  const [index, setIndex] = useState(0);

  const currentSlide = slides[index];
  const isLast = index === slides.length - 1;

  const handlePrimary = () => {
    if (!isLast) {
      setIndex((prev) => prev + 1);
    } else {
      // destino final después del tutorial
      navigation.navigate("MainTabs" as never);
    }
  };

  const handleSkip = () => {
    navigation.navigate("MainTabs" as never); 
  };

  return (
    <Container>
      <ContentScroll
        contentContainerStyle={{
          padding: Theme.spacing.space6,
          paddingBottom: Theme.spacing.space4,
          flexGrow: 1,
        }}
      >
        <SuccessIconWrapper>
          <SuccessCircle>
            <Ionicons
              name="checkmark"
              size={40}
              color={Theme.colors.white}
            />
          </SuccessCircle>
        </SuccessIconWrapper>

        <Title>¡Registro Completado!</Title>
        <Subtitle>
          Tu perfil ha sido creado exitosamente.{"\n"}
          Ahora puedes comenzar a usar UNIHealth.
        </Subtitle>

        <Card>
          <CardIconWrapper>
            <CardIconContainer>
              <Ionicons
                name={currentSlide.icon}
                size={26}
                color={Theme.colors.white}
              />
            </CardIconContainer>
          </CardIconWrapper>

          <CardTextWrapper>
            <CardTitle>{currentSlide.title}</CardTitle>
            <CardDescription>{currentSlide.description}</CardDescription>
          </CardTextWrapper>
        </Card>

        <DotsRow>
          {slides.map((s, i) => {
            const active = i === index;
            return <Dot key={s.key} $active={active} />;
          })}
        </DotsRow>

        <Spacer />
      </ContentScroll>

      <BottomArea>
        <PrimaryButton onPress={handlePrimary}>
          <PrimaryButtonText>
            {isLast ? "Comenzar a Usar UNIHealth" : "Siguiente"}
          </PrimaryButtonText>
        </PrimaryButton>

        {!isLast && (
          <SkipButton onPress={handleSkip}>
            <SkipText>Saltar tutorial</SkipText>
          </SkipButton>
        )}
      </BottomArea>
    </Container>
  );
};

export default Tutorial;

/* ─────────────── STYLES ─────────────── */

const Container = styled.View`
  flex: 1;
  background-color: ${Theme.colors.background};
`;

const ContentScroll = styled.ScrollView`
  flex: 1;
`;

const SuccessIconWrapper = styled.View`
  align-items: center;
  margin-top: ${Theme.spacing.space4}px;
`;

const SuccessCircle = styled.View`
  width: 96px;
  height: 96px;
  border-radius: 48px;
  background-color: ${Theme.colors.success};
  justify-content: center;
  align-items: center;
  ${() => Theme.shadows.shadowMd}
`;

const Title = styled.Text`
  margin-top: ${Theme.spacing.space4}px;
  font-size: ${Theme.typography.fontSize2xl}px;
  font-weight: 700;
  color: ${Theme.colors.textPrimary};
  text-align: center;
`;

const Subtitle = styled.Text`
  margin-top: ${Theme.spacing.space2}px;
  font-size: ${Theme.typography.fontSizeSm}px;
  color: ${Theme.colors.textSecondary};
  text-align: center;
`;

const Card = styled.View`
  margin-top: ${Theme.spacing.space6}px;
  background-color: ${Theme.colors.white};
  border-radius: 20px;
  padding: ${Theme.spacing.space4}px;
  flex-direction: row;
  align-items: center;
  ${() => Theme.shadows.shadowSm}
`;

const CardIconWrapper = styled.View`
  margin-right: ${Theme.spacing.space4}px;
`;

const CardIconContainer = styled.View`
  width: 56px;
  height: 56px;
  border-radius: 18px;
  background-color: ${Theme.colors.primary};
  justify-content: center;
  align-items: center;
`;

const CardTextWrapper = styled.View`
  flex: 1;
`;

const CardTitle = styled.Text`
  font-size: ${Theme.typography.fontSizeLg}px;
  font-weight: 600;
  color: ${Theme.colors.textPrimary};
  margin-bottom: 4px;
`;

const CardDescription = styled.Text`
  font-size: ${Theme.typography.fontSizeSm}px;
  color: ${Theme.colors.textSecondary};
`;

const DotsRow = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-top: ${Theme.spacing.space4}px;
`;

const Dot = styled.View<{ $active: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 4px;
  margin-horizontal: 4px;
  background-color: ${({ $active }) =>
    $active ? Theme.colors.primary : "#E5E7EB"};
`;

const Spacer = styled.View`
  flex: 1;
`;

const BottomArea = styled.View`
  padding: ${Theme.spacing.space4}px;
  padding-bottom: ${Theme.spacing.space5}px;
  background-color: ${Theme.colors.background};
`;

const PrimaryButton = styled.TouchableOpacity`
  background-color: ${Theme.colors.primary};
  padding: ${Theme.spacing.space4}px;
  border-radius: 18px;
  ${() => Theme.shadows.shadowMd}
`;

const PrimaryButtonText = styled.Text`
  font-size: ${Theme.typography.fontSizeLg}px;
  color: ${Theme.colors.white};
  text-align: center;
  font-weight: 600;
`;

const SkipButton = styled.TouchableOpacity`
  margin-top: ${Theme.spacing.space3}px;
`;

const SkipText = styled.Text`
  font-size: ${Theme.typography.fontSizeSm}px;
  color: ${Theme.colors.textSecondary};
  text-align: center;
`;
 
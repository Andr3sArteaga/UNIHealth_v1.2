import React from "react";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { Theme } from "./colors";
import { DiaryEntry } from "./DiaryEntryModal";

interface DiaryEntryCardProps {
    entry: DiaryEntry;
    onPress?: () => void;
}

const DiaryEntryCard: React.FC<DiaryEntryCardProps> = ({ entry, onPress }) => {
    const formatTime = (dateString: string): string => {
        const date = new Date(dateString);
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        return `${hours}:${minutes}`;
    };

    const getMoodEmoji = (mood: "good" | "normal" | "bad"): string => {
        switch (mood) {
            case "good":
                return "😊";
            case "normal":
                return "😐";
            case "bad":
                return "😞";
        }
    };

    const getMoodLabel = (mood: "good" | "normal" | "bad"): string => {
        switch (mood) {
            case "good":
                return "Bien";
            case "normal":
                return "Normal";
            case "bad":
                return "Mal";
        }
    };

    const getSeverityColor = (severity: number): string => {
        if (severity <= 2) return Theme.colors.success;
        if (severity <= 4) return Theme.colors.warning;
        return Theme.colors.primary;
    };

    return (
        <Card activeOpacity={onPress ? 0.7 : 1} onPress={onPress}>
            {/* Header with time and mood */}
            <CardHeader>
                <TimeText>{formatTime(entry.date)}</TimeText>
                <MoodContainer>
                    <MoodEmoji>{getMoodEmoji(entry.mood)}</MoodEmoji>
                    <MoodText>{getMoodLabel(entry.mood)}</MoodText>
                </MoodContainer>
            </CardHeader>

            {/* Symptoms */}
            {entry.symptoms.length > 0 && (
                <SymptomsSection>
                    <SectionTitle>Síntomas</SectionTitle>
                    <SymptomsRow>
                        {entry.symptoms.map((symptom, index) => (
                            <SymptomTag key={index}>
                                <SymptomTagText>{symptom}</SymptomTagText>
                            </SymptomTag>
                        ))}
                    </SymptomsRow>
                </SymptomsSection>
            )}

            {/* Severity */}
            <SeveritySection>
                <SectionTitle>Severidad</SectionTitle>
                <SeverityIndicator>
                    <SeverityBars>
                        {[1, 2, 3, 4, 5, 6].map((level) => (
                            <SeverityBarMini
                                key={level}
                                active={level <= entry.severity}
                                color={getSeverityColor(entry.severity)}
                            />
                        ))}
                    </SeverityBars>
                    <SeverityLabel>
                        {entry.severity <= 2
                            ? "Leve"
                            : entry.severity <= 4
                                ? "Moderado"
                                : "Severo"}
                    </SeverityLabel>
                </SeverityIndicator>
            </SeveritySection>

            {/* Notes preview */}
            {entry.notes && (
                <NotesSection>
                    <SectionTitle>Notas</SectionTitle>
                    <NotesPreview numberOfLines={2}>{entry.notes}</NotesPreview>
                </NotesSection>
            )}

            {/* Photo indicator */}
            {entry.photos && entry.photos.length > 0 && (
                <PhotoIndicator>
                    <Ionicons
                        name="image"
                        size={16}
                        color={Theme.colors.textSecondary}
                    />
                    <PhotoIndicatorText>
                        {entry.photos.length} foto{entry.photos.length > 1 ? "s" : ""}
                    </PhotoIndicatorText>
                </PhotoIndicator>
            )}
        </Card>
    );
};

export default DiaryEntryCard;

/* ─────────────── STYLES ─────────────── */

const Card = styled.TouchableOpacity`
  background-color: ${Theme.colors.white};
  border-radius: 16px;
  padding: ${Theme.spacing.space4}px;
  margin-bottom: ${Theme.spacing.space3}px;
  ${() => Theme.shadows.shadowSm}
`;

const CardHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${Theme.spacing.space3}px;
`;

const TimeText = styled.Text`
  font-size: ${Theme.typography.fontSizeSm}px;
  font-weight: 600;
  color: ${Theme.colors.textPrimary};
`;

const MoodContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${Theme.spacing.space2}px;
`;

const MoodEmoji = styled.Text`
  font-size: 20px;
`;

const MoodText = styled.Text`
  font-size: ${Theme.typography.fontSizeSm}px;
  color: ${Theme.colors.textSecondary};
`;

const SymptomsSection = styled.View`
  margin-bottom: ${Theme.spacing.space3}px;
`;

const SectionTitle = styled.Text`
  font-size: ${Theme.typography.fontSizeXs}px;
  font-weight: 600;
  color: ${Theme.colors.textSecondary};
  margin-bottom: ${Theme.spacing.space1}px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const SymptomsRow = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${Theme.spacing.space1}px;
`;

const SymptomTag = styled.View`
  background-color: ${Theme.colors.primaryLight};
  border-radius: 12px;
  padding: ${Theme.spacing.space1}px ${Theme.spacing.space2}px;
`;

const SymptomTagText = styled.Text`
  font-size: ${Theme.typography.fontSizeXs}px;
  color: ${Theme.colors.primary};
`;

const SeveritySection = styled.View`
  margin-bottom: ${Theme.spacing.space3}px;
`;

const SeverityIndicator = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${Theme.spacing.space2}px;
`;

const SeverityBars = styled.View`
  flex-direction: row;
  gap: 2px;
`;

interface SeverityBarMiniProps {
    active: boolean;
    color: string;
}

const SeverityBarMini = styled.View<SeverityBarMiniProps>`
  width: 4px;
  height: 16px;
  border-radius: 2px;
  background-color: ${({ active, color }) =>
        active ? color : Theme.colors.border};
`;

const SeverityLabel = styled.Text`
  font-size: ${Theme.typography.fontSizeXs}px;
  color: ${Theme.colors.textSecondary};
`;

const NotesSection = styled.View`
  margin-bottom: ${Theme.spacing.space2}px;
`;

const NotesPreview = styled.Text`
  font-size: ${Theme.typography.fontSizeSm}px;
  color: ${Theme.colors.textPrimary};
  line-height: 20px;
`;

const PhotoIndicator = styled.View`
  flex-direction: row;
  align-items: center;
  gap: ${Theme.spacing.space1}px;
  padding-top: ${Theme.spacing.space2}px;
  border-top-width: 1px;
  border-top-color: ${Theme.colors.border};
`;

const PhotoIndicatorText = styled.Text`
  font-size: ${Theme.typography.fontSizeXs}px;
  color: ${Theme.colors.textSecondary};
`;

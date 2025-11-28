import React, { useState, useEffect } from "react";
import {
    Modal,
    ScrollView,
    TouchableOpacity,
    Platform,
    KeyboardAvoidingView,
} from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { Theme } from "./colors";

export interface DiaryEntry {
    id: string;
    date: string; // ISO format
    mood: "good" | "normal" | "bad";
    symptoms: string[];
    severity: number; // 1-6
    photos?: string[];
    notes: string;
}

interface DiaryEntryModalProps {
    visible: boolean;
    selectedDate: Date;
    onClose: () => void;
    onSubmit: (entry: Omit<DiaryEntry, "id">) => void;
}

const SYMPTOMS = [
    "Dolor de cabeza",
    "Fatiga",
    "Náuseas",
    "Estrés",
    "Ansiedad",
    "Insomnio",
    "Dolor muscular",
    "Fiebre",
];

const DiaryEntryModal: React.FC<DiaryEntryModalProps> = ({
    visible,
    selectedDate,
    onClose,
    onSubmit,
}) => {
    const [mood, setMood] = useState<"good" | "normal" | "bad" | null>(null);
    const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
    const [severity, setSeverity] = useState<number>(1);
    const [notes, setNotes] = useState<string>("");

    // Reset form when modal opens
    useEffect(() => {
        if (visible) {
            setMood(null);
            setSelectedSymptoms([]);
            setSeverity(1);
            setNotes("");
        }
    }, [visible]);

    const formatDateTime = (date: Date): string => {
        const days = [
            "domingo",
            "lunes",
            "martes",
            "miércoles",
            "jueves",
            "viernes",
            "sábado",
        ];
        const months = [
            "enero",
            "febrero",
            "marzo",
            "abril",
            "mayo",
            "junio",
            "julio",
            "agosto",
            "septiembre",
            "octubre",
            "noviembre",
            "diciembre",
        ];

        const dayName = days[date.getDay()];
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");

        return `${dayName}, ${day} de ${month} de ${year}, ${hours}:${minutes}`;
    };

    const toggleSymptom = (symptom: string) => {
        setSelectedSymptoms((prev) =>
            prev.includes(symptom)
                ? prev.filter((s) => s !== symptom)
                : [...prev, symptom]
        );
    };

    const handleSubmit = () => {
        if (!mood) {
            // Could add validation alert here
            return;
        }

        const entry: Omit<DiaryEntry, "id"> = {
            date: selectedDate.toISOString(),
            mood,
            symptoms: selectedSymptoms,
            severity,
            notes,
        };

        onSubmit(entry);
        onClose();
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={onClose}
        >
            <ModalBackdrop activeOpacity={1} onPress={onClose}>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={{ flex: 1, justifyContent: "flex-end" }}
                >
                    <ModalContent
                        activeOpacity={1}
                        onPress={(e) => e.stopPropagation()}
                    >
                        <ContentScrollView
                            showsVerticalScrollIndicator={false}
                            bounces={false}
                        >
                            {/* Header */}
                            <ModalHeader>
                                <ModalTitle>Nueva Entrada</ModalTitle>
                                <CloseButton onPress={onClose} activeOpacity={0.7}>
                                    <Ionicons
                                        name="close"
                                        size={24}
                                        color={Theme.colors.textPrimary}
                                    />
                                </CloseButton>
                            </ModalHeader>

                            {/* Date and Time */}
                            <Section>
                                <SectionLabel>Fecha y hora</SectionLabel>
                                <DateTimeText>{formatDateTime(selectedDate)}</DateTimeText>
                            </Section>

                            {/* Mood Selection */}
                            <Section>
                                <SectionLabel>
                                    ¿Cómo te sientes? <Required>*</Required>
                                </SectionLabel>
                                <MoodRow>
                                    <MoodButton
                                        selected={mood === "good"}
                                        onPress={() => setMood("good")}
                                        activeOpacity={0.8}
                                    >
                                        <MoodIcon>😊</MoodIcon>
                                        <MoodLabel selected={mood === "good"}>Bien</MoodLabel>
                                    </MoodButton>

                                    <MoodButton
                                        selected={mood === "normal"}
                                        onPress={() => setMood("normal")}
                                        activeOpacity={0.8}
                                    >
                                        <MoodIcon>😐</MoodIcon>
                                        <MoodLabel selected={mood === "normal"}>Normal</MoodLabel>
                                    </MoodButton>

                                    <MoodButton
                                        selected={mood === "bad"}
                                        onPress={() => setMood("bad")}
                                        activeOpacity={0.8}
                                    >
                                        <MoodIcon>😞</MoodIcon>
                                        <MoodLabel selected={mood === "bad"}>Mal</MoodLabel>
                                    </MoodButton>
                                </MoodRow>
                            </Section>

                            {/* Symptoms */}
                            <Section>
                                <SectionLabel>Síntomas</SectionLabel>
                                <SymptomsGrid>
                                    {SYMPTOMS.map((symptom) => (
                                        <SymptomChip
                                            key={symptom}
                                            selected={selectedSymptoms.includes(symptom)}
                                            onPress={() => toggleSymptom(symptom)}
                                            activeOpacity={0.8}
                                        >
                                            <SymptomText selected={selectedSymptoms.includes(symptom)}>
                                                {symptom}
                                            </SymptomText>
                                        </SymptomChip>
                                    ))}
                                </SymptomsGrid>
                            </Section>

                            {/* Severity */}
                            <Section>
                                <SectionLabel>Severidad</SectionLabel>
                                <SeverityContainer>
                                    <SeverityBars>
                                        {[1, 2, 3, 4, 5, 6].map((level) => (
                                            <SeverityBar
                                                key={level}
                                                active={level <= severity}
                                                onPress={() => setSeverity(level)}
                                                activeOpacity={0.8}
                                            />
                                        ))}
                                    </SeverityBars>
                                    <SeverityLabels>
                                        <SeverityLabelText>Leve</SeverityLabelText>
                                        <SeverityLabelText>Severo</SeverityLabelText>
                                    </SeverityLabels>
                                </SeverityContainer>
                            </Section>

                            {/* Photos (Optional) */}
                            <Section>
                                <SectionLabel>Fotos (opcional)</SectionLabel>
                                <PhotoUploadBox activeOpacity={0.7}>
                                    <Ionicons
                                        name="camera"
                                        size={32}
                                        color={Theme.colors.primary}
                                    />
                                    <PhotoUploadText>Añadir foto</PhotoUploadText>
                                </PhotoUploadBox>
                            </Section>

                            {/* Additional Notes */}
                            <Section>
                                <SectionLabel>Notas adicionales</SectionLabel>
                                <NotesInput
                                    placeholder="Escribe cualquier detalle adicional..."
                                    placeholderTextColor={Theme.colors.textTertiary}
                                    multiline
                                    numberOfLines={4}
                                    textAlignVertical="top"
                                    value={notes}
                                    onChangeText={setNotes}
                                />
                            </Section>

                            {/* Submit Button */}
                            <SubmitButton
                                onPress={handleSubmit}
                                activeOpacity={0.9}
                                disabled={!mood}
                            >
                                <SubmitButtonText>Crear Nueva Entrada</SubmitButtonText>
                            </SubmitButton>

                            {/* Bottom spacing for keyboard */}
                            <BottomSpacer />
                        </ContentScrollView>
                    </ModalContent>
                </KeyboardAvoidingView>
            </ModalBackdrop>
        </Modal>
    );
};

export default DiaryEntryModal;

/* ─────────────── STYLES ─────────────── */

const ModalBackdrop = styled.TouchableOpacity`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: flex-end;
`;

const ModalContent = styled.TouchableOpacity`
  background-color: ${Theme.colors.white};
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  max-height: 90%;
  ${() => Theme.shadows.shadowLg}
`;

const ContentScrollView = styled.ScrollView`
  padding: ${Theme.spacing.space5}px ${Theme.spacing.space4}px;
`;

const ModalHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${Theme.spacing.space4}px;
`;

const ModalTitle = styled.Text`
  font-size: ${Theme.typography.fontSizeLg}px;
  font-weight: 700;
  color: ${Theme.colors.textPrimary};
`;

const CloseButton = styled.TouchableOpacity`
  padding: ${Theme.spacing.space1}px;
`;

const Section = styled.View`
  margin-bottom: ${Theme.spacing.space5}px;
`;

const SectionLabel = styled.Text`
  font-size: ${Theme.typography.fontSizeSm}px;
  font-weight: 600;
  color: ${Theme.colors.textPrimary};
  margin-bottom: ${Theme.spacing.space2}px;
`;

const Required = styled.Text`
  color: ${Theme.colors.primary};
`;

const DateTimeText = styled.Text`
  font-size: ${Theme.typography.fontSizeBase}px;
  color: ${Theme.colors.textSecondary};
  padding: ${Theme.spacing.space3}px 0;
`;

/* Mood Selection */

const MoodRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  gap: ${Theme.spacing.space3}px;
`;

interface MoodButtonProps {
    selected: boolean;
}

const MoodButton = styled.TouchableOpacity<MoodButtonProps>`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: ${Theme.spacing.space4}px;
  border-radius: 16px;
  border-width: 2px;
  border-color: ${({ selected }) =>
        selected ? Theme.colors.primary : Theme.colors.border};
  background-color: ${({ selected }) =>
        selected ? Theme.colors.primaryLight : Theme.colors.white};
`;

const MoodIcon = styled.Text`
  font-size: 32px;
  margin-bottom: ${Theme.spacing.space2}px;
`;

const MoodLabel = styled.Text<{ selected: boolean }>`
  font-size: ${Theme.typography.fontSizeSm}px;
  font-weight: ${({ selected }) => (selected ? "600" : "400")};
  color: ${({ selected }) =>
        selected ? Theme.colors.primary : Theme.colors.textPrimary};
`;

/* Symptoms */

const SymptomsGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${Theme.spacing.space2}px;
`;

interface SymptomChipProps {
    selected: boolean;
}

const SymptomChip = styled.TouchableOpacity<SymptomChipProps>`
  padding: ${Theme.spacing.space2}px ${Theme.spacing.space3}px;
  border-radius: 20px;
  border-width: 1px;
  border-color: ${({ selected }) =>
        selected ? Theme.colors.primary : Theme.colors.border};
  background-color: ${({ selected }) =>
        selected ? Theme.colors.primary : Theme.colors.white};
`;

const SymptomText = styled.Text<{ selected: boolean }>`
  font-size: ${Theme.typography.fontSizeSm}px;
  color: ${({ selected }) =>
        selected ? Theme.colors.white : Theme.colors.textPrimary};
`;

/* Severity */

const SeverityContainer = styled.View`
  margin-top: ${Theme.spacing.space2}px;
`;

const SeverityBars = styled.View`
  flex-direction: row;
  gap: ${Theme.spacing.space1}px;
  margin-bottom: ${Theme.spacing.space2}px;
`;

interface SeverityBarProps {
    active: boolean;
}

const SeverityBar = styled.TouchableOpacity<SeverityBarProps>`
  flex: 1;
  height: 32px;
  border-radius: 4px;
  background-color: ${({ active }) =>
        active ? Theme.colors.primary : Theme.colors.border};
`;

const SeverityLabels = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const SeverityLabelText = styled.Text`
  font-size: ${Theme.typography.fontSizeXs}px;
  color: ${Theme.colors.textSecondary};
`;

/* Photo Upload */

const PhotoUploadBox = styled.TouchableOpacity`
  border-width: 2px;
  border-style: dashed;
  border-color: ${Theme.colors.primary};
  border-radius: 12px;
  padding: ${Theme.spacing.space6}px;
  align-items: center;
  justify-content: center;
  background-color: ${Theme.colors.white};
`;

const PhotoUploadText = styled.Text`
  font-size: ${Theme.typography.fontSizeSm}px;
  color: ${Theme.colors.primary};
  margin-top: ${Theme.spacing.space2}px;
`;

/* Notes */

const NotesInput = styled.TextInput`
  background-color: ${Theme.colors.backgroundAlt};
  border-radius: 12px;
  padding: ${Theme.spacing.space3}px ${Theme.spacing.space4}px;
  font-size: ${Theme.typography.fontSizeBase}px;
  color: ${Theme.colors.textPrimary};
  min-height: 100px;
`;

/* Submit Button */

const SubmitButton = styled.TouchableOpacity<{ disabled: boolean }>`
  background-color: ${({ disabled }) =>
        disabled ? Theme.colors.textTertiary : Theme.colors.primary};
  border-radius: 12px;
  padding: ${Theme.spacing.space4}px;
  align-items: center;
  justify-content: center;
  margin-top: ${Theme.spacing.space2}px;
`;

const SubmitButtonText = styled.Text`
  font-size: ${Theme.typography.fontSizeBase}px;
  font-weight: 600;
  color: ${Theme.colors.white};
`;

const BottomSpacer = styled.View`
  height: ${Theme.spacing.space8}px;
`;

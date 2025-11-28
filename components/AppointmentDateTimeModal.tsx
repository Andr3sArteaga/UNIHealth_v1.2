import React, { useState, useMemo } from "react";
import { Modal, ScrollView } from "react-native";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import { Theme } from "./colors";

interface AppointmentDateTimeModalProps {
    visible: boolean;
    onClose: () => void;
    onDateTimeSelect: (date: Date, time: string) => void;
}

interface CalendarDay {
    date: Date;
    label: string;
    isCurrentMonth: boolean;
    isToday: boolean;
}

const weekDaysShort = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const timeSlots = [
    "08:00 AM",
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
];

const AppointmentDateTimeModal: React.FC<AppointmentDateTimeModalProps> = ({
    visible,
    onClose,
    onDateTimeSelect,
}) => {
    const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);

    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    const calendarDays = useMemo(() => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        const days: CalendarDay[] = [];
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // Previous month days
        const prevMonthLastDay = new Date(year, month, 0).getDate();
        for (let i = startingDayOfWeek - 1; i >= 0; i--) {
            const date = new Date(year, month - 1, prevMonthLastDay - i);
            days.push({
                date,
                label: (prevMonthLastDay - i).toString(),
                isCurrentMonth: false,
                isToday: false,
            });
        }

        // Current month days
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            date.setHours(0, 0, 0, 0);
            days.push({
                date,
                label: day.toString(),
                isCurrentMonth: true,
                isToday: date.getTime() === today.getTime(),
            });
        }

        // Next month days
        const remainingDays = 42 - days.length; // 6 weeks * 7 days
        for (let day = 1; day <= remainingDays; day++) {
            const date = new Date(year, month + 1, day);
            days.push({
                date,
                label: day.toString(),
                isCurrentMonth: false,
                isToday: false,
            });
        }

        return days;
    }, [currentMonth]);

    const handlePrevMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
    };

    const handleNextMonth = () => {
        setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
    };

    const handleDateSelect = (day: CalendarDay) => {
        if (day.isCurrentMonth) {
            setSelectedDate(day.date);
        }
    };

    const handleTimeSelect = (time: string) => {
        setSelectedTime(time);
        if (selectedDate) {
            onDateTimeSelect(selectedDate, time);
        }
    };

    const isSameDay = (date1: Date | null, date2: Date): boolean => {
        if (!date1) return false;
        return (
            date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate()
        );
    };

    return (
        <Modal
            visible={visible}
            animationType="slide"
            presentationStyle="pageSheet"
            onRequestClose={onClose}
        >
            <Container>
                {/* Header */}
                <Header>
                    <BackButton onPress={onClose} activeOpacity={0.7}>
                        <Ionicons
                            name="chevron-back"
                            size={24}
                            color={Theme.colors.textPrimary}
                        />
                    </BackButton>
                    <HeaderTitle>Fecha y Hora</HeaderTitle>
                    <Spacer />
                </Header>

                {/* Content */}
                <ContentScroll showsVerticalScrollIndicator={false}>
                    {/* Date Selection */}
                    <Section>
                        <SectionTitle>Selecciona una fecha</SectionTitle>

                        {/* Month Navigation */}
                        <MonthNavigation>
                            <NavButton onPress={handlePrevMonth} activeOpacity={0.7}>
                                <Ionicons
                                    name="chevron-back"
                                    size={20}
                                    color={Theme.colors.textPrimary}
                                />
                            </NavButton>
                            <MonthText>
                                {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                            </MonthText>
                            <NavButton onPress={handleNextMonth} activeOpacity={0.7}>
                                <Ionicons
                                    name="chevron-forward"
                                    size={20}
                                    color={Theme.colors.textPrimary}
                                />
                            </NavButton>
                        </MonthNavigation>

                        {/* Calendar */}
                        <CalendarContainer>
                            {/* Week days header */}
                            <WeekDaysRow>
                                {weekDaysShort.map((day) => (
                                    <WeekDayCell key={day}>
                                        <WeekDayText>{day}</WeekDayText>
                                    </WeekDayCell>
                                ))}
                            </WeekDaysRow>

                            {/* Calendar days */}
                            <DaysGrid>
                                {calendarDays.map((day, index) => (
                                    <DayCell
                                        key={index}
                                        onPress={() => handleDateSelect(day)}
                                        activeOpacity={0.7}
                                        disabled={!day.isCurrentMonth}
                                    >
                                        <DayButton
                                            isCurrentMonth={day.isCurrentMonth}
                                            isSelected={isSameDay(selectedDate, day.date)}
                                            isToday={day.isToday}
                                        >
                                            <DayText
                                                isCurrentMonth={day.isCurrentMonth}
                                                isSelected={isSameDay(selectedDate, day.date)}
                                                isToday={day.isToday}
                                            >
                                                {day.label}
                                            </DayText>
                                        </DayButton>
                                    </DayCell>
                                ))}
                            </DaysGrid>
                        </CalendarContainer>
                    </Section>

                    {/* Time Selection */}
                    <Section>
                        <SectionTitle>Selecciona un horario</SectionTitle>
                        <TimeSlotsGrid>
                            {timeSlots.map((time) => (
                                <TimeSlotButton
                                    key={time}
                                    onPress={() => handleTimeSelect(time)}
                                    activeOpacity={0.7}
                                    isSelected={selectedTime === time}
                                >
                                    <TimeSlotText isSelected={selectedTime === time}>
                                        {time}
                                    </TimeSlotText>
                                </TimeSlotButton>
                            ))}
                        </TimeSlotsGrid>
                    </Section>
                </ContentScroll>
            </Container>
        </Modal>
    );
};

export default AppointmentDateTimeModal;

/* ─────────────── STYLES ─────────────── */

const Container = styled.View`
  flex: 1;
  background-color: ${Theme.colors.background};
`;

const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${Theme.spacing.space4}px;
  border-bottom-width: 1px;
  border-bottom-color: ${Theme.colors.border};
`;

const BackButton = styled.TouchableOpacity`
  padding: ${Theme.spacing.space1}px;
`;

const HeaderTitle = styled.Text`
  font-size: ${Theme.typography.fontSizeLg}px;
  font-weight: 600;
  color: ${Theme.colors.textPrimary};
`;

const Spacer = styled.View`
  width: 40px;
`;

const ContentScroll = styled.ScrollView`
  flex: 1;
  padding: ${Theme.spacing.space4}px;
`;

const Section = styled.View`
  margin-bottom: ${Theme.spacing.space6}px;
`;

const SectionTitle = styled.Text`
  font-size: ${Theme.typography.fontSizeBase}px;
  font-weight: 600;
  color: ${Theme.colors.textPrimary};
  margin-bottom: ${Theme.spacing.space3}px;
`;

const MonthNavigation = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${Theme.spacing.space3}px;
`;

const NavButton = styled.TouchableOpacity`
  padding: ${Theme.spacing.space2}px;
`;

const MonthText = styled.Text`
  font-size: ${Theme.typography.fontSizeBase}px;
  font-weight: 600;
  color: ${Theme.colors.textPrimary};
`;

const CalendarContainer = styled.View`
  background-color: ${Theme.colors.white};
  border-radius: 12px;
  padding: ${Theme.spacing.space3}px;
  ${() => Theme.shadows.shadowSm}
`;

const WeekDaysRow = styled.View`
  flex-direction: row;
  margin-bottom: ${Theme.spacing.space2}px;
`;

const WeekDayCell = styled.View`
  flex: 1;
  align-items: center;
`;

const WeekDayText = styled.Text`
  font-size: ${Theme.typography.fontSizeXs}px;
  font-weight: 600;
  color: ${Theme.colors.textSecondary};
`;

const DaysGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
`;

const DayCell = styled.TouchableOpacity`
  width: 14.28%;
  aspect-ratio: 1;
  padding: 2px;
`;

interface DayButtonProps {
    isCurrentMonth: boolean;
    isSelected: boolean;
    isToday: boolean;
}

const DayButton = styled.View<DayButtonProps>`
  flex: 1;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background-color: ${({ isSelected }) =>
        isSelected ? Theme.colors.primary : "transparent"};
  border-width: ${({ isToday, isSelected }) =>
        isToday && !isSelected ? "2px" : "0px"};
  border-color: ${Theme.colors.primary};
`;

interface DayTextProps {
    isCurrentMonth: boolean;
    isSelected: boolean;
    isToday: boolean;
}

const DayText = styled.Text<DayTextProps>`
  font-size: ${Theme.typography.fontSizeSm}px;
  font-weight: ${({ isToday }) => (isToday ? "600" : "400")};
  color: ${({ isCurrentMonth, isSelected }) => {
        if (isSelected) return Theme.colors.white;
        if (!isCurrentMonth) return Theme.colors.textTertiary;
        return Theme.colors.textPrimary;
    }};
`;

const TimeSlotsGrid = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${Theme.spacing.space2}px;
`;

interface TimeSlotButtonProps {
    isSelected: boolean;
}

const TimeSlotButton = styled.TouchableOpacity<TimeSlotButtonProps>`
  width: 30%;
  padding: ${Theme.spacing.space3}px;
  border-radius: 8px;
  border-width: 1px;
  border-color: ${({ isSelected }) =>
        isSelected ? Theme.colors.primary : Theme.colors.border};
  background-color: ${({ isSelected }) =>
        isSelected ? Theme.colors.primary : Theme.colors.white};
  align-items: center;
`;

const TimeSlotText = styled.Text<{ isSelected: boolean }>`
  font-size: ${Theme.typography.fontSizeSm}px;
  font-weight: ${({ isSelected }) => (isSelected ? "600" : "400")};
  color: ${({ isSelected }) =>
        isSelected ? Theme.colors.white : Theme.colors.textPrimary};
`;

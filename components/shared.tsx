import { Dimensions } from "react-native";
import styled from "styled-components/native";
import { Colors } from "./colors";

const container = styled.View`
    flex: 1;
    align-items: center;
    background-color: ${Colors.background};
`;

export const screenWidth = Dimensions.get('window').width;
export const screenHeight = Dimensions.get('window').height;

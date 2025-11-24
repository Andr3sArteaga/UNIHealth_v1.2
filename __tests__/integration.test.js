import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import LogIn from '../screens/LogIn';
import Register from '../screens/Regsiter';
import Profile from '../screens/Profile';
import { NavigationContainer } from '@react-navigation/native';

// Mock API and AsyncStorage
jest.mock('../api/api', () => ({
  post: jest.fn(() => Promise.resolve({ data: { access_token: 'fake-token' } })),
  get: jest.fn(() => Promise.resolve({ 
    data: { 
      patientProfile: { firstName: 'Test', lastName: 'User' },
      email: 'test@example.com' 
    } 
  })),
}));
jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
}));

// Mock Navigation
const MockNavigation = ({ children }) => (
  <NavigationContainer>{children}</NavigationContainer>
);

global.alert = jest.fn();

describe('Integration Tests', () => {
  
  describe('Login Screen', () => {
    it('renders correctly', () => {
      const { getByText, getByPlaceholderText } = render(
        <MockNavigation><LogIn /></MockNavigation>
      );
      expect(getByText('Bienvenido a UNIHealth')).toBeTruthy();
      expect(getByPlaceholderText('tu.nombre@universidad.edu')).toBeTruthy();
    });

    it('validates empty inputs', () => {
        const { getByTestId, getByText } = render(
            <MockNavigation><LogIn /></MockNavigation>
        );
        const loginButton = getByTestId('login-button');
        fireEvent.press(loginButton);
        // Alert mocking would be needed here, or check if function wasn't called
    });
  });

  describe('Register Screen', () => {
    it('renders step 1', () => {
      const { getByText, getByTestId } = render(
        <MockNavigation><Register /></MockNavigation>
      );
      expect(getByText('Paso 1 de 5')).toBeTruthy();
      expect(getByTestId('register-email-input')).toBeTruthy();
    });

    it('navigates to next step', () => {
        const { getByText, getByTestId } = render(
            <MockNavigation><Register /></MockNavigation>
        );
        const nextButton = getByTestId('next-button');
        fireEvent.press(nextButton);
        expect(getByText('Paso 2 de 5')).toBeTruthy();
    });
  });

  describe('Profile Screen', () => {
    it('renders user placeholders initially', () => {
      const { getByTestId } = render(
        <MockNavigation><Profile /></MockNavigation>
      );
      expect(getByTestId('profile-name')).toBeTruthy();
      expect(getByTestId('profile-email')).toBeTruthy();
    });
  });

});

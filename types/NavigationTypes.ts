// BetterPhoneApp/types/NavigationTypes.ts

export type RootStackParamList = {
  Home: undefined; // No params expected
  BetterVoice: undefined; // No params expected
  BetterSMS: undefined;
  BetterContacts: undefined;
  Profile: { userId: string }; // Expecting a user ID as a param
  Settings: { enableNotifications: boolean }; // Expecting a boolean flag as a param
};

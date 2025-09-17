// app/context/VolunteerContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the shape of the context data
interface VolunteerContextType {
  isRegistered: boolean;
  registerVolunteer: (details: any) => void; // 'details' can be the form data
}

// Create the context with a default value
const VolunteerContext = createContext<VolunteerContextType | undefined>(
  undefined
);

// Create the Provider component
export const VolunteerProvider = ({ children }: { children: ReactNode }) => {
  // We'll use a simple state.
  // In a real app, you'd check AsyncStorage or a server here.
  const [isRegistered, setIsRegistered] = useState(false);

  // This function will be called from the registration form
  const registerVolunteer = (details: any) => {
    console.log("Registering volunteer with details:", details);
    // Here you would save the details to your backend or AsyncStorage
    setIsRegistered(true);
  };

  return (
    <VolunteerContext.Provider value={{ isRegistered, registerVolunteer }}>
      {children}
    </VolunteerContext.Provider>
  );
};

// Create a custom hook to easily use the context
export const useVolunteer = () => {
  const context = useContext(VolunteerContext);
  if (context === undefined) {
    throw new Error("useVolunteer must be used within a VolunteerProvider");
  }
  return context;
};

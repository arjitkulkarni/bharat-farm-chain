import React, { createContext, useContext, useState, ReactNode } from "react";

export type Language = "en" | "hi" | "kn";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Comprehensive translations for all pages
const translations = {
  en: {
    // Header
    appName: "KisanConnect",
    forFarmers: "For Farmers",
    forVendors: "For Vendors",
    forBuyers: "For Buyers",
    
    // Common
    login: "Login",
    dashboard: "Dashboard",
    logout: "Logout",
    save: "Save",
    cancel: "Cancel",
    submit: "Submit",
    back: "Back",
    next: "Next",
    search: "Search",
    filter: "Filter",
    export: "Export",
    
    // Footer
    aboutUs: "About Us",
    contactUs: "Contact Us",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    allRightsReserved: "All rights reserved.",
  },
  hi: {
    // Header
    appName: "किसानकनेक्ट",
    forFarmers: "किसानों के लिए",
    forVendors: "विक्रेताओं के लिए",
    forBuyers: "खरीदारों के लिए",
    
    // Common
    login: "लॉगिन",
    dashboard: "डैशबोर्ड",
    logout: "लॉगआउट",
    save: "सहेजें",
    cancel: "रद्द करें",
    submit: "जमा करें",
    back: "वापस",
    next: "आगे",
    search: "खोजें",
    filter: "फ़िल्टर",
    export: "निर्यात",
    
    // Footer
    aboutUs: "हमारे बारे में",
    contactUs: "संपर्क करें",
    privacyPolicy: "गोपनीयता नीति",
    termsOfService: "सेवा की शर्तें",
    allRightsReserved: "सर्वाधिकार सुरक्षित।",
  },
  kn: {
    // Header
    appName: "ಕಿಸಾನ್‌ಕನೆಕ್ಟ್",
    forFarmers: "ರೈತರಿಗಾಗಿ",
    forVendors: "ಮಾರಾಟಗಾರರಿಗಾಗಿ",
    forBuyers: "ಖರೀದಿದಾರರಿಗಾಗಿ",
    
    // Common
    login: "ಲಾಗಿನ್",
    dashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    logout: "ಲಾಗ್ಔಟ್",
    save: "ಉಳಿಸಿ",
    cancel: "ರದ್ದುಮಾಡಿ",
    submit: "ಸಲ್ಲಿಸಿ",
    back: "ಹಿಂದೆ",
    next: "ಮುಂದೆ",
    search: "ಹುಡುಕಿ",
    filter: "ಫಿಲ್ಟರ್",
    export: "ರಫ್ತು",
    
    // Footer
    aboutUs: "ನಮ್ಮ ಬಗ್ಗೆ",
    contactUs: "ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ",
    privacyPolicy: "ಗೌಪ್ಯತಾ ನೀತಿ",
    termsOfService: "ಸೇವಾ ನಿಯಮಗಳು",
    allRightsReserved: "ಎಲ್ಲಾ ಹಕ್ಕುಗಳನ್ನು ಕಾಯ್ದಿರಿಸಲಾಗಿದೆ.",
  },
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};


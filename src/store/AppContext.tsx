import React, { createContext, useContext, useState } from 'react';

export type UserRole = 'learner' | 'company';

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  selectedLearnerId: string; // 'learner-maya' or 'learner-alex'
  setSelectedLearnerId: (id: string) => void;
  selectedCompanyId: string; // 'aws'
  setSelectedCompanyId: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>('learner');
  const [selectedLearnerId, setSelectedLearnerId] = useState('learner-alex');
  const [selectedCompanyId, setSelectedCompanyId] = useState('aws');

  const value: AppContextType = {
    role,
    setRole,
    selectedLearnerId,
    setSelectedLearnerId,
    selectedCompanyId,
    setSelectedCompanyId,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};

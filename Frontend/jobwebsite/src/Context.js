
import React, { createContext, useState } from 'react';

export const Context = createContext();

export const JobIdProvider = ({ children }) => {
  const [jobId, setJobId] = useState(null);

  return (
    <Context.Provider value={{ jobId, setJobId }}>
      {children}
    </Context.Provider>
  );
};


import React, { createContext, useState } from 'react';

export const SiteContext = createContext();

export const SiteProvider = ({ children }) => {
  const [footerData, setFooterData] = useState({
    description: 'Eduforcetech is a Section-8 non-profit organization committed to transforming IT education through industry-aligned programs and cutting-edge specializations.',
    address: '18, Vithal Plaza, 4th Floor, Opp. GEB Office, Dehgam Rd, Nava Naroda, Ahmedabad 382330',
    phone1: '+91 93775 77596',
    phone2: '+91 93775 77597',
    email: 'info@educationforce.com'
  });

  return (
    <SiteContext.Provider value={{ footerData, setFooterData }}>
      {children}
    </SiteContext.Provider>
  );
};

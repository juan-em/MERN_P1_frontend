import { useState } from 'react';
import { IntlProvider } from 'react-intl';
import TimeZoneContext from './TimeZoneContext';

const TimeZoneProvider = ({ children }) => {
  const browserTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const defaultTimeZone = 'America/Lima';
  const [timeZone, setTimeZone] = useState(browserTimeZone || defaultTimeZone);
  
  const formattedDate = (date) => new Intl.DateTimeFormat('es', {
    timeZone,
    dateStyle: 'full',
    timeStyle: 'long'
  }).format(date);

  // Pasa los valores al contexto
  const contextValue = {
    timeZone,
    setTimeZone,
    formattedDate, 
  };

  return (
    <TimeZoneContext.Provider value={contextValue}>
      <IntlProvider locale="es" timeZone={timeZone}>
        {children}
      </IntlProvider>
    </TimeZoneContext.Provider>
  );
};

export default TimeZoneProvider;
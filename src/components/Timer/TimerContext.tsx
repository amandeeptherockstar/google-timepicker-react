import React, { createContext, useContext, useRef } from "react";
import TimerRef from "./TimerRef";

const TimerContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useTimerContext = () => useContext(TimerContext);

const TimerContextProvider = ({ children }: { children: React.ReactNode }) => {
  const timerRef = useRef();

  return (
    <TimerContext.Provider
      value={{
        timerRef,
        hello: 123,
      }}
    >
      <TimerRef ref={timerRef} />
      {children}
    </TimerContext.Provider>
  );
};

export default TimerContextProvider;

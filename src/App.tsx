import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { addMinutes, startOfDay } from "date-fns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import TimerPicker, { OptionType } from "./components/TimePicker";
import "./App.css";
import Timer from "./components/Timer";
import TimerOperations from "./components/Timer/TimerOperations";

export const minutesInterval = 15;

function App() {
  const [date, setDate] = React.useState<Date | null>(startOfDay(new Date()));
  const [startTime, setStartTime] = React.useState<OptionType | null>(null);

  const onStartSelect = React.useCallback((time: OptionType) => {
    setStartTime(time);
  }, []);

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <div className="flex gap-x-2">
          <DatePicker value={date} onChange={setDate} format="dd-MM-yyyy" />
          <TimerPicker
            startDate={date}
            placeholder="Start Time"
            onSelect={onStartSelect}
          />
          <TimerPicker
            placeholder="End Time"
            startDate={
              startTime ? addMinutes(startTime.date, minutesInterval) : date
            }
          />
        </div>
      </LocalizationProvider>
      <Timer />
      <TimerOperations />
    </>
  );
}

export default App;

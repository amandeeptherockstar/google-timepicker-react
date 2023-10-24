import React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { addMinutes, startOfDay } from "date-fns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import TimerPicker, { OptionType } from "./components/TimePicker";
import TimerPickerO, {
  OptionType as TimePickerType,
} from "./components/TimePickerO";
// import Timer from "./components/Timer";
import TimerOperations, {
  OptionType,
} from "./components/Timer/TimerOperations";
import TimerUpdate from "./components/Timer/TimerUpdate";
import TimerContextProvider from "./components/Timer/TimerContext";
import TimerContextOperations from "./components/Timer/TimerContextOperations";
import TimerUI from "./components/Timer/TimerUI";

export const minutesInterval = 15;

function App() {
  const [date, setDate] = React.useState<Date | null>(startOfDay(new Date()));
  const [startTime, setStartTime] = React.useState<OptionType | null>(null);

  const onStartSelect = React.useCallback((time: OptionType) => {
    setStartTime(time);
  }, []);

  console.log("APp started");

  return (
    <TimerContextProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <div className="flex gap-x-2">
          <DatePicker value={date} onChange={setDate} format="dd-MM-yyyy" />
          <TimerPickerO
            startDate={date}
            placeholder="Start Time"
            onSelect={onStartSelect}
            defaultDate={new Date()}
          />
          <TimerPickerO
            placeholder="End Time"
            startDate={
              startTime ? addMinutes(startTime.date, minutesInterval) : date
            }
            defaultDate={new Date(new Date().setHours(20, 0, 0, 0))}
          />
        </div>
      </LocalizationProvider>
      {/* <Timer /> */}
      {/* <TimerOperations /> */}
      <TimerContextOperations />
      <TimerUpdate />
      <br />
      <br />
      <TimerUI />
    </TimerContextProvider>
  );
}

export default App;

import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { startOfDay, endOfDay } from "date-fns";
import {
  IDateTimeSlot,
  ITimeSlot,
  formatTime,
  generateDateTimeSlots,
  replaceTime,
} from "./helper";

interface IProps {
  startDate?: Date | null;
  placeholder?: string;
  minutesInterval?: number;
  onSelect?: (time: OptionType) => void;
}

const filter = createFilterOptions<OptionType>();

const today = new Date();
const defaultStartDate = startOfDay(today);
const defaultPlaceholder = "Select Time";
const defaultMinutesInterval = 15;

const TimePicker = ({
  startDate = defaultStartDate,
  placeholder = defaultPlaceholder,
  minutesInterval = defaultMinutesInterval,
  onSelect,
}: IProps) => {
  const [value, setValue] = React.useState<OptionType | null>(null);

  const slots = React.useMemo(() => {
    const endDate = endOfDay(startDate!);
    return generateDateTimeSlots(startDate!, endDate, minutesInterval);
  }, [startDate, minutesInterval]);
  const timeSlots: ITimeSlot[] = React.useMemo(
    () =>
      slots.map((slot: IDateTimeSlot, index) => ({
        ...slot,
        key: `option-${index}`,
        inputValue: "",
      })),
    [slots]
  );

  // whenver the start date changes, reset the value
  React.useEffect(() => {
    setValue(null);
  }, [startDate]);

  return (
    <Autocomplete
      disableClearable
      clearOnBlur
      selectOnFocus
      blurOnSelect
      handleHomeEndKeys
      value={value!}
      freeSolo
      // onInputChange={(e, value, reason) => {
      //   console.log(value, "value");
      // }}
      onChange={(_, newValue) => {
        console.log(newValue, "newValue");
        setValue(newValue as OptionType);
        onSelect?.(newValue as OptionType);
      }}
      filterOptions={(options, params) => {
        // console.log(options, "options");
        const filtered = filter(options, params);

        const { inputValue } = params;
        if (
          inputValue !== "" &&
          !options.some((option) => option.time.includes(inputValue))
        ) {
          const formattedTime = formatTime(inputValue);
          console.log(formattedTime, "formattedTime");
          const formattedTimeArray = [];
          // if formattedTime does not includes am and pm, push both am and pm as options
          if (!["AM", "PM"].includes(formattedTime)) {
            formattedTimeArray.push(`${formattedTime} AM`);
            formattedTimeArray.push(`${formattedTime} PM`);
          } else {
            // else just push the formatted time
            formattedTimeArray.push(formattedTime);
          }

          for (const time of formattedTimeArray) {
            const replacedDate = replaceTime(new Date(), time);
            if (replacedDate) {
              filtered.push({
                ...replacedDate,
                inputValue: replacedDate.time,
              });
            }
          }
          // const replacedDate = replaceTime(new Date(), formattedTime);
          // console.log(replacedDate, "replacedDate");
          // if (replacedDate) {
          //   filtered.push({
          //     ...replacedDate,
          //     // inputValue: `Add - ${inputValue}`,
          //     inputValue: replacedDate.time,
          //   });
          // }
        }
        return filtered;
      }}
      id="free-solo-with-text-demo"
      options={timeSlots}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      getOptionLabel={(option: any) => {
        if (typeof option === "string") {
          return option;
        }
        if (option.inputValue) {
          return option.inputValue;
        }
        return option.time;
      }}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      renderOption={(props, option: any) => {
        return <li {...props}>{option.time}</li>;
      }}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label={placeholder} />}
    />
  );
};

const TimePickerMemoized = React.memo(TimePicker);

export default TimePickerMemoized;

export interface OptionType {
  inputValue?: string;
  date: Date;
  time: string;
  iso: string;
}

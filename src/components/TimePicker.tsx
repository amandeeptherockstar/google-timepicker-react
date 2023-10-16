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

const filter = createFilterOptions<OptionType>();

const startDate = startOfDay(new Date());
const endDate = endOfDay(new Date());

const slots = generateDateTimeSlots(startDate, endDate);
const timeSlots: ITimeSlot[] = slots.map((slot: IDateTimeSlot, index) => ({
  key: `option-${index}`,
  ...slot,
  inputValue: "",
}));

const TimerPicker = () => {
  const [value, setValue] = React.useState<OptionType | null>(null);

  return (
    <Autocomplete
      disableClearable
      clearOnBlur
      selectOnFocus
      blurOnSelect
      handleHomeEndKeys
      value={value!}
      freeSolo
      onChange={(_, newValue) => {
        console.log(newValue, "newValue");
        setValue(newValue as OptionType);
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        const { inputValue } = params;
        if (
          inputValue !== "" &&
          !options.some((option) => option.time.includes(inputValue))
        ) {
          const formattedTime = formatTime(inputValue);
          const replacedDate = replaceTime(new Date(), formattedTime);
          if (replacedDate) {
            filtered.push({
              ...replacedDate,
              // inputValue: `Add - ${inputValue}`,
              inputValue: replacedDate.time,
            });
          }
        }
        return filtered;
      }}
      id='free-solo-with-text-demo'
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
      renderInput={(params) => <TextField {...params} label='Select time' />}
    />
  );
};

export default TimerPicker;

interface OptionType {
  inputValue?: string;
  date: Date;
  time: string;
  iso: string;
}

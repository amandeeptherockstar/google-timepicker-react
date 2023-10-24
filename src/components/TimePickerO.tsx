import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { startOfDay, endOfDay, format, isEqual } from "date-fns";
import {
  IDateTimeSlot,
  ITimeSlot,
  formatTime,
  generateDateTimeSlots,
  replaceTime,
} from "./helpero";

export type OptionType = Date | null;

interface IProps {
  startDate?: Date | null;
  placeholder?: string;
  minutesInterval?: number;
  onSelect?: (time: IDateTimeSlot) => void;
  defaultDate?: Date | null;
}

const filter = createFilterOptions<ITimeSlot>();

const today = new Date();
const defaultStartDate = startOfDay(today);
const defaultPlaceholder = "Select Time";
const defaultMinutesInterval = 15;

// const defaultDate = new Date(new Date().setHours(20, 48, 37, 20));
// const formattedDefaultDate = format(defaultDate, "hh:mm a");
// console.log(formattedDefaultDate, "formattedDefaultDate");

// console.log(defaultDate, "defaultDate");

const TimePicker = ({
  startDate = defaultStartDate,
  placeholder = defaultPlaceholder,
  minutesInterval = defaultMinutesInterval,
  onSelect,
  defaultDate,
}: IProps) => {
  const [value, setValue] = React.useState<NonNullable<
    string | ITimeSlot
  > | null>(() => {
    if (defaultDate) {
      return {
        date: defaultDate,
        key: "defaultDate",
        inputValue: format(defaultDate, "hh:mm a"),
      };
    }
    return null;
  });

  console.log(value, "value valuevalue");

  const slots = React.useMemo(() => {
    const endDate = endOfDay(startDate!);
    return generateDateTimeSlots(startDate!, endDate, minutesInterval);
  }, [startDate, minutesInterval]);

  console.log(slots, "slots slots slots");

  const timeSlots: ITimeSlot[] = React.useMemo(
    () =>
      slots.map((slot: IDateTimeSlot, index) => ({
        date: slot,
        key: `option-${index}`,
        inputValue: "",
      })),
    [slots]
  );

  console.log(timeSlots, "timeSlots");

  // whenver the start date changes, reset the value
  // React.useEffect(() => {
  //   setValue(null);
  // }, [startDate]);

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
        if (typeof newValue !== "string") {
          setValue(newValue);
          onSelect?.(newValue as unknown as Date);
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        const { inputValue } = params;
        if (
          inputValue !== "" &&
          !options.some(
            (option: ITimeSlot) => format(option.date, "hh:mm a") === inputValue
          )
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
        }
        return filtered;
      }}
      id="free-solo-with-text-demo"
      options={timeSlots}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      getOptionLabel={(option) => {
        if (typeof option === "string") {
          return option;
        }
        if (option.inputValue) {
          return option.inputValue;
        }
        return format(option.date, "hh:mm a");
      }}
      renderOption={(props, option) => {
        console.log(option, "ppppppp");
        // if (
        //   typeof value === "object" &&
        //   format(option.date as Date, "hh:mm a") ===
        //     format(new Date(value?.date || Date.now()), "hh:mm a")
        // ) {
        //   console.log("MATCHED =>>>");
        //   props.className = props.className + " !bg-blue-200";
        // }
        return (
          <li
            {...props}
            // className={
            //   typeof value === "object" && (option.date as Date) === value?.date
            //     ? "bg-red-600"
            //     : ""
            // }
          >
            {format(option.date, "hh:mm a")}
          </li>
        );
      }}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label={placeholder} />}
    />
  );
};

const TimePickerMemoized = React.memo(TimePicker);

export default TimePickerMemoized;

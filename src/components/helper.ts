import {
  addMinutes,
  format,
  isAfter,
  isEqual,
  setHours,
  setMinutes,
  parse,
  isValid,
} from 'date-fns';

export interface IDateTimeSlot {
  date: Date; // Date object
  time: string; // Formatted time string like 12:12 AM
  iso: string; // ISO string like 2021-01-01T00:00:00.000Z
  timestamp: number; // Timestamp like 1612123200000
}

export interface ITimeSlot extends IDateTimeSlot {
  inputValue: string;
}

export function generateDateTimeSlots(
  startDate: Date,
  endDate: Date
): IDateTimeSlot[] {
  const slots: IDateTimeSlot[] = [];
  let currentSlot = startDate;

  while (isAfter(endDate, currentSlot) || isEqual(endDate, currentSlot)) {
    slots.push({
      date: currentSlot,
      time: format(currentSlot, 'hh:mm a'),
      iso: currentSlot.toISOString(),
      timestamp: currentSlot.getTime(),
    });
    currentSlot = addMinutes(currentSlot, 15);
  }

  return slots;
}

export const replaceTime = (
  originalDate: Date = new Date(),
  timeStr: string
) => {
  const time = parse(timeStr, 'hh:mm a', originalDate);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if (!isNaN(time as any)) {
    const newDate = setMinutes(
      setHours(originalDate, time.getHours()),
      time.getMinutes()
    );

    return {
      date: newDate,
      time: format(newDate, 'hh:mm a'),
      iso: newDate.toISOString(),
      timestamp: newDate.getTime(),
    };
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function formatTime(input: any) {
  const cleanedInput = input.replace(/[^0-9a-z:]/gi, '').toUpperCase();

  const validTimeRegex = /^(0?[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)?$/i;
  if (!input || validTimeRegex.test(input)) {
    // If the input is valid or empty, return it as is
    return input || '';
  }
  const date = parse(cleanedInput, 'hh:mmaaa', new Date());

  if (isValid(date)) {
    return format(date, 'hh:mm a');
  } else {
    const parsedTime = parseTime(input);
    if (parsedTime !== 'Invalid time') {
      const time = parse(parsedTime, 'hh:mm a', new Date());
      const newDate = setMinutes(
        setHours(new Date(), time.getHours()),
        time.getMinutes()
      );
      return format(newDate, 'hh:mm a');
    }
  }
}

const parseTime = (input: string) => {
  // Define regular expressions to match various time formats
  const amPmRegex = /(am|pm)/i;
  const hhmmRegex = /(\d{1,2}):(\d{2})/;

  const timeStr = input.trim().toLowerCase();
  // Handle "AM" and "PM" inputs
  if (amPmRegex.test(timeStr)) {
    if (timeStr.includes('am')) {
      return '12:00 AM';
    } else if (timeStr.includes('pm')) {
      return '12:00 PM';
    }
  }

  // Handle HH:MM inputs with optional "am" or "pm"
  const match = timeStr.match(hhmmRegex);
  if (match) {
    let hours = parseInt(match[1], 10);
    const minutes = parseInt(match[2], 10);

    if (hours < 1 || hours > 12) {
      return 'Invalid time';
    }

    if (timeStr.includes('pm') && hours !== 12) {
      hours += 12;
    } else if (timeStr.includes('am') && hours === 12) {
      hours = 0;
    }

    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')} ${hours < 12 ? 'AM' : 'PM'}`;
  }
  return 'Invalid time';
};

function isTimeValid(timeStr: string) {
  const timeRegex = /^([01][0-9]|2[0-3]):[0-5][0-9]$/; // HH:MM format

  if (timeRegex.test(timeStr)) {
    const [hours, minutes] = timeStr.split(':');
    const parsedHours = parseInt(hours.padEnd(2, '0'), 10);
    const parsedMinutes = parseInt(minutes.padEnd(2, '0'), 10);

    // Check if hours and minutes are within valid range
    if (
      parsedHours >= 0 &&
      parsedHours <= 23 &&
      parsedMinutes >= 0 &&
      parsedMinutes <= 59
    ) {
      return true; // Valid time
    }
  }

  return false; // Invalid time
}

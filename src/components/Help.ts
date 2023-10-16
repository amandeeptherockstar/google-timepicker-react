import React from 'react';
import { format, setHours, setMinutes } from 'date-fns';

const ReplaceTime = () => {
  // Example date with some hours and minutes
  const originalDate = new Date();
  originalDate.setHours(8); // Set the hours to 8
  originalDate.setMinutes(30); // Set the minutes to 30

  // New time to replace HH and MM
  const newHours = 11;
  const newMinutes = 22;

  // Replace HH and MM
  const updatedDate = setMinutes(setHours(originalDate, newHours), newMinutes);

  console.log(updatedDate, 'updatedDate updatedDate');
  // Format the updated date as a string
  const formattedDate = format(updatedDate, 'h:mm a'); // "11:22 AM"
  console.log(formattedDate, 'formatted date');
  console.log(originalDate, 'original date');
  return null;
};

export default ReplaceTime;

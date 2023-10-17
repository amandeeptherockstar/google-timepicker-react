import { differenceInSeconds } from "date-fns";
import { publishEvent } from "../../utils/custom-events-helper";

// const startTimer = (start?: Date | string) => {
const startTimer = () => {
  // calculate the seconds difference using date-fns between startDate and now
  // and pass it as offsetTimestamp
  // let offsetTimestamp = 0;
  // if (start) {
  //   const currentTime = new Date();
  //   offsetTimestamp = differenceInSeconds(currentTime, new Date(start));
  // }

  // publishEvent("start-timer", {
  //   offsetTimestamp,
  //   // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // } as any);
  publishEvent("start-timer");
};

const pauseTimer = () => publishEvent("pause-timer");

const stopTimer = () => publishEvent("stop-timer");

const resetTimer = (start?: Date | string | undefined) => {
  let offsetTimestamp = undefined;
  if (start) {
    const currentTime = new Date();
    const offsetTime = new Date();
    const seconds = differenceInSeconds(currentTime, new Date(start));
    offsetTimestamp = offsetTime.setSeconds(offsetTime.getSeconds() + seconds);
  }
  publishEvent("reset-timer", {
    offsetTimestamp,
    autoStart: false,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any);
};

const updateTimer = (seconds: number) => {
  publishEvent("update-timer", {
    seconds
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } as any);
}

export { startTimer, pauseTimer, stopTimer, resetTimer, updateTimer };

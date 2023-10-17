/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { useStopwatch } from "react-timer-hook";
import {
  subscribeEvent,
  unsubscribeEvent,
} from "../../utils/custom-events-helper";

const padStartZero = (value: number, digits = 2) =>
  value.toString().padStart(digits, "0");

export interface IOffsetTimestamp {
  offsetTimestamp?: Date;
  autoStart?: boolean;
}

const Timer = () => {
  const {
    totalSeconds,
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    reset,
  } = useStopwatch({ autoStart: false });

  const stop = () => reset(undefined, false);

  console.log(isRunning, "isRunning");

  // const _start: any = () => {
  //   if (isRunning) return;

  //   start();
  // };

  // const _pause: any = () => {
  //   if (isRunning) {
  //     pause();
  //   }
  // };

  // const _stop: any = () => {
  //   console.log("Stop timer");
  //   if (isRunning) {
  //     stop();
  //   }
  // };

  const _reset: any = (event: any) => {
    const eventData = (event as CustomEvent).detail as IOffsetTimestamp;
    console.log(eventData, "eventData");
    reset(eventData.offsetTimestamp, true);
    // const stopwatchOffset = new Date();
    // stopwatchOffset.setSeconds(stopwatchOffset.getSeconds() + 300);
    // reset(stopwatchOffset, Boolean(eventData.autoStart));
    // reset(stopwatchOffset, true);
  };

  // add the ability to start the timer from outside using event listeners
  useEffect(() => {
    subscribeEvent("start-timer", start);
    subscribeEvent("pause-timer", pause);
    subscribeEvent("stop-timer", stop);
    subscribeEvent("reset-timer", _reset);

    return () => {
      unsubscribeEvent("start-timer", start);
      unsubscribeEvent("pause-timer", pause);
      unsubscribeEvent("stop-timer", stop);
      unsubscribeEvent("reset-timer", _reset);
    };
  }, []);

  return (
    <>
      Total Seconds: {totalSeconds}
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: "100px" }}>
          {days > 0 && (
            <>
              <span>{padStartZero(days)}</span>:
            </>
          )}
          <span>{padStartZero(hours)}</span>:
          <span>{padStartZero(minutes)}</span>:
          <span>{padStartZero(seconds)}</span>
        </div>
        <p className="text-xl bg-red-50 font-bold">
          {isRunning ? "Running" : "Not running"}
        </p>
        {/* <button onClick={start}>Start</button>
        <br />
        <button onClick={pause}>Pause</button>
        <br />
        <button onClick={() => reset(undefined, false)}>Stop</button> */}
      </div>
    </>
  );
};

export default Timer;

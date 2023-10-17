/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { useStopwatch } from "react-timer-hook";
import { addSeconds, subSeconds } from "date-fns";
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

export interface IUpdateTimer {
  seconds: number;
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

  console.log(totalSeconds, 'totalSeconds')

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

  const onUpdateTime: any = (event: any) => {
    const eventData = (event as CustomEvent).detail as IUpdateTimer;
    console.log(eventData, "eventData");
    console.log(totalSeconds, 'ttttt')

    // // get the seconds from event data
    // const seconds = eventData.seconds;
    // console.log(totalSeconds, 'totalSeconds totalSeconds')
    // // find the date when timer was started when timer was started, by subtracting the totalSeconds from the current date
    // const timerStartTime = subSeconds(new Date(), totalSeconds);
    // console.log(timerStartTime, "timerStartTime timerStartTime");
    // // add the seconds for the update
    // const updatedStartTime =
    //   seconds < 0
    //     ? subSeconds(timerStartTime, seconds)
    //     : addSeconds(timerStartTime, seconds);
    // reset(updatedStartTime, true);
  };

  // add the ability to start the timer from outside using event listeners
  useEffect(() => {
    subscribeEvent("start-timer", start);
    subscribeEvent("pause-timer", pause);
    subscribeEvent("stop-timer", stop);
    subscribeEvent("reset-timer", _reset);

    // update timer
    subscribeEvent("update-timer", onUpdateTime);

    return () => {
      unsubscribeEvent("start-timer", start);
      unsubscribeEvent("pause-timer", pause);
      unsubscribeEvent("stop-timer", stop);
      unsubscribeEvent("reset-timer", _reset);

      // update timer
      unsubscribeEvent("update-timer", onUpdateTime);
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
        <p className='text-xl bg-red-50 font-bold'>
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

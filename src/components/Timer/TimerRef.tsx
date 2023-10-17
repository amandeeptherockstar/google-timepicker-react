/* eslint-disable @typescript-eslint/no-explicit-any */
import { forwardRef, useCallback, useImperativeHandle } from "react";
import { useStopwatch } from "react-timer-hook";

const padStartZero = (value: number, digits = 2) =>
  value.toString().padStart(digits, "0");

export interface IOffsetTimestamp {
  offsetTimestamp?: Date;
  autoStart?: boolean;
}

export interface IUpdateTimer {
  seconds: number;
}

const TimerRef = (props: any, ref: any) => {
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

  const stop = useCallback(() => reset(undefined, false), [reset]);

  console.log(isRunning, "isRunning");

  console.log(totalSeconds, "totalSeconds");

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

  const _reset: any = useCallback(
    (offsetTimestamp: Date) => {
      // const eventData = (event as CustomEvent).detail as IOffsetTimestamp;
      // console.log(eventData, "eventData");
      reset(offsetTimestamp, true);
      // const stopwatchOffset = new Date();
      // stopwatchOffset.setSeconds(stopwatchOffset.getSeconds() + 300);
      // reset(stopwatchOffset, Boolean(eventData.autoStart));
      // reset(stopwatchOffset, true);
    },
    [reset]
  );

  // const onUpdateTime: any = useCallback((event: any) => {
  //   const eventData = (event as CustomEvent).detail as IUpdateTimer;
  //   console.log(eventData, "eventData");
  //   console.log(totalSeconds, "ttttt");

  //   // // get the seconds from event data
  //   // const seconds = eventData.seconds;
  //   // console.log(totalSeconds, 'totalSeconds totalSeconds')
  //   // // find the date when timer was started when timer was started, by subtracting the totalSeconds from the current date
  //   // const timerStartTime = subSeconds(new Date(), totalSeconds);
  //   // console.log(timerStartTime, "timerStartTime timerStartTime");
  //   // // add the seconds for the update
  //   // const updatedStartTime =
  //   //   seconds < 0
  //   //     ? subSeconds(timerStartTime, seconds)
  //   //     : addSeconds(timerStartTime, seconds);
  //   // reset(updatedStartTime, true);
  // }, [totalSeconds]);

  useImperativeHandle(
    ref,
    () => {
      return {
        isRunning,
        totalSeconds,
        start,
        stop,
        pause,
        reset: _reset,
        // update: onUpdateTime
      };
    },
    [isRunning, totalSeconds, start, stop, pause, _reset]
  );

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

const TimerComponent = forwardRef(TimerRef);

export default TimerComponent;

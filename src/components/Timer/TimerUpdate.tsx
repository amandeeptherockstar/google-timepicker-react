import { addSeconds, differenceInSeconds, subSeconds } from "date-fns";
import { updateTimer } from "./timer-events";
import { useTimerContext } from "./TimerContext";

const TimerUpdate = () => {
  const timer: any = useTimerContext();
  console.log(timer, 'timer__ context')

  return (
    <>
      <br />
      <p className='mt-4 font-semibold text-xl'>Timer Update</p>
      <button onClick={() => {
        console.log(timer?.timerRef?.current?.totalSeconds, 'passed seconds');
        // const now = new Date();
        // const timerPassedTime = new Date().setSeconds(timer?.timerRef?.current?.totalSeconds || 0);
        // const timerStartTime = subSeconds(new Date(), -(timer?.timerRef?.current?.totalSeconds || 0));
        const offsetTime = subSeconds(new Date(), -((timer?.timerRef?.current?.totalSeconds || 0) + 300));

        // const currentTime = addSeconds(timerStartTime, )

        // console.log(timerPassedTime, 'timerPassedTime')
        // // const seconds = (timer?.timerRef?.current?.totalSeconds || 0) + 300;
        // const offsetTime = addSeconds(timerPassedTime, 300);
        // console.log(offsetTime, 'offsetTime offsetTime')
        // // offsetTimestamp = offsetTime.setSeconds(
        // //   offsetTime.getSeconds() + seconds
        // // );
        timer?.timerRef?.current?.reset(offsetTime);
        // timer?.timerRef?.current?.reset(600)
      }}>Add 5 minutes</button>
      <button onClick={() => console.log(timer, 'timerrrr')}>
        Asdf
      </button>
    </>
  );
};

export default TimerUpdate;

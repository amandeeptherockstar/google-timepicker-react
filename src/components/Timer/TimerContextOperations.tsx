import { differenceInSeconds } from "date-fns";
import { useTimerContext } from "./TimerContext";

const activeTimeEntry = {
  createdAt: "2023-10-17T04:33:04.550Z",
  createdBy: {
    id: "10125",
    email: "lekifa8756@pro5g.com",
    disabled: false,
    self: false,
  },
  lastModifiedBy: {
    id: "10125",
    email: "lekifa8756@pro5g.com",
    disabled: false,
    self: false,
  },
  lastModifiedDate: "2023-10-17T04:33:04.550Z",
  id: "27813",
  owner: {
    id: "10125",
    email: "lekifa8756@pro5g.com",
    disabled: false,
    self: false,
  },
  from: "2023-10-17T04:33:05.000Z",
  shareLogWithPeople: [],
  category_ids: [],
  category: {
    id: "TC_PRSNL",
    name: "Personal",
    color: {
      id: "lavender",
      foreground: "#ffffff",
      background: "#7986cb",
    },
  },
  billable: false,
};

const TimerContextOperations = () => {
  const from = activeTimeEntry.from;
  const timer: any = useTimerContext();

  const onReset = () => {
    let offsetTimestamp = undefined;
    if (from) {
      const currentTime = new Date();
      const offsetTime = new Date();
      const seconds = differenceInSeconds(currentTime, new Date(from));
      offsetTimestamp = offsetTime.setSeconds(
        offsetTime.getSeconds() + seconds
      );
    }
    timer?.timerRef?.current?.reset(offsetTimestamp);
  };

  return (
    <>
      <button onClick={() => timer?.timerRef?.current?.start()}>Start</button>
      <br />
      <button onClick={onReset}>Start using timestamp</button>
      <br />
      <button onClick={() => timer?.timerRef?.current?.pause()}>Pause</button>
      <br />
      <button onClick={() => timer?.timerRef?.current?.stop()}>Stop</button>
    </>
  );
};

export default TimerContextOperations;

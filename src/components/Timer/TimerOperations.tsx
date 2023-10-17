import { pauseTimer, resetTimer, startTimer, stopTimer } from "./timer-events";

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

const TimerOperations = () => {
  const from = activeTimeEntry.from;
  return (
    <>
      <button onClick={() => startTimer()}>Start</button>
      <br />
      <button onClick={() => resetTimer(from)}>Start using timestamp</button>
      <br />
      <button onClick={() => pauseTimer()}>Pause</button>
      <br />
      <button onClick={() => stopTimer()}>Stop</button>
    </>
  );
};

export default TimerOperations;

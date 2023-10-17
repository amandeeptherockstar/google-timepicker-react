import { Tooltip } from "@mui/material";
import { ClockIcon } from "@mui/x-date-pickers";
import { format } from "date-fns";

const TimerUI = () => {
  return (
    <nav className="bg-[#fefcbf] shadow app-nav-bar border-0">
    <div className={`flex p-2 items-center`}>
      {/* Show start time, with an option to change it, only if mode is not compact */}
      {true && (
        <>
          <div className="flex flex-col md:flex-row">
            <p>Started at</p>
            {/* Link to change the start time */}
            <a
              href="#"
              className="font-medium px-2"
              title="Click to change the start time"
              onClick={() => {}}
            >
              {format(new Date(), 'hh:mm a')}
            </a>

            {/* If not today, show the started date */}
            {/* {moment(startTime).local().format('YYYY-MM-DD') !== moment().format('YYYY-MM-DD') && (
              
            )} */}
            <span
              className="text-gray-500"
              title={`Started on `}
            >
              From now
            </span>
          </div>
        </>
      )}
      <div className="flex flex-col md:flex-row gap-2">
        {/* Renders the time face, live ticking time in hh mm ss format */}
        <div className="px-2 text-right">
        <Tooltip title="Click to update timer details">
          {true ? (
            <span className="text-sm font-semibold flex space-x-2 items-center">
              <ClockIcon
                className={`${
                  true ? 'animate-spin spin-slow text-green-800 border-2 border-green-200' : ''
                } h-5 w-5 border-2 text-sm opacity-50 rounded-full`}
              />
              {/* {formattedTime(watch)} */}
              00:00:00
            </span>
          ) : (
            <div>FOrmatted timerPassedTime</div>
          )}
        </Tooltip>
        {/* {!isCompactMode ? (
          <div className="text-xs uppercase font-semibold text-gray-600">Time elapsed</div>
        ) : null} */}
      </div>
        <div className="flex items-center justify-center">
          {/* Renders timer control buttons, start/stop etc. */}
          Render time control
          {/* {adjustTime && (
          <Dropdown
            placement="bottomCenter"
            getPopupContainer={(trigger) => trigger.parentNode}
            trigger={['click']}
            overlay={
              <Menu>
                <Menu.Item key="label" disabled>
                  Go backward by
                </Menu.Item>
                {[
                  {
                    name: 'Go backward by',
                    divider: true,
                  },
                  {
                    ms: -300000,
                    name: '5 mins',
                    onClick: () => adjustTime(-300000, initialState),
                  },
                  {
                    ms: -600000,
                    name: '10 mins',
                    onClick: () => adjustTime(-600000, initialState),
                  },
                  {
                    ms: -900000,
                    name: '15 mins',
                    onClick: () => adjustTime(-900000, initialState),
                  },
                  {
                    ms: -1200000,
                    name: '20 mins',
                    onClick: () => adjustTime(-1200000, initialState),
                  },
                  {
                    ms: -1500000,
                    name: '25 mins',
                    onClick: () => adjustTime(-1500000, initialState),
                  },
                  {
                    ms: -1800000,
                    name: '30 mins',
                    onClick: () => adjustTime(-1800000, initialState),
                  },
                  {
                    ms: -2700000,
                    name: '45 mins',
                    onClick: () => adjustTime(-2700000, initialState),
                  },
                  {
                    ms: -3600000,
                    name: '1 hr',
                    onClick: () => adjustTime(-3600000, initialState),
                  },
                ]?.map(({ ms, name, divider, onClick }) => (
                  <>
                    {divider ? (
                      <Menu.Divider />
                    ) : (
                      <Menu.Item
                        key={name}
                        onClick={() => {
                          if (onClick) onClick();
                        }}
                      >
                        <div className="text-blue-600">{name}</div>
                      </Menu.Item>
                    )}
                  </>
                ))}
              </Menu>
            }
          >
            <EditFilled />
          </Dropdown>
        )} */}
        </div>
      </div>
    </div>
    </nav>
  )
}

export default TimerUI;
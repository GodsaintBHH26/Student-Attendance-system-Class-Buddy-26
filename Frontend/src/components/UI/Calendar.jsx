import React, { useState } from "react";
import dayjs from "dayjs";
import {
  DateCalendar,
  PickersDay,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function Calendar({ role }) {
  const [event, setEvent] = useState([
    { status: "present", date: "2025-09-15" },
    { status: "absent", date: "2025-09-16" },
  ]);

  const handleClick = (day) => {
    if (role !== "teacher") return;

    const dateStr = day.format("YYYY-MM-DD");
    setEvent((prev) => {
      const existing = prev.find((rec) => rec.date === dateStr);
      if (existing) {
        return prev.map((rec) =>
          rec.date === dateStr
            ? {
                ...rec,
                status: rec.status === "present" ? "absent" : "present",
              }
            : rec
        );
      } else {
        return [...prev, { date: dateStr, status: "present" }];
      }
    });
  };

  return (
    <>
      <div className="bg-white h-154">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            className="!w-164  !text-black"
            sx={{
              width: 1000,
             "& .MuiPickersSlideTransition-root":{
              height:1000
             },
              "& .MuiDayCalendar-monthContainer": {
                overflow: "visible !important",
              },
              // Ensure the calendar container doesn't scroll
              "& .MuiDateCalendar-viewTransitionContainer": {
                overflow: "hidden",
              },
              // Existing styles
              "& .MuiDayCalendar-header": {
                "& .MuiTypography-root": {
                  fontSize: "1.5rem",
                  fontWeight: 600,
                  width: 500,
                },
              },
              "& .MuiPickersCalendarHeader-label": {
                fontSize: "1.8rem",
                fontWeight: 700,
              },
              "& .MuiDayCalendar-weekContainer": {
                gap: "16px",
              },
              "& .MuiPickersDay-root": {
                width: 70, 
                height: 70, 
                fontSize: "1.2rem",
              },
            }}
            slots={{
              day: (props) => {
                const dateStr = props.day.format("YYYY-MM-DD");
                const record = event.find((rec) => rec.date === dateStr);
                const isPresent = record?.status === "present";
                const isAbsent = record?.status === "absent";

                return (
                  <PickersDay
                    {...props}
                    onClick={() => handleClick(props.day)}
                    sx={{
                      bgcolor: isPresent
                        ? "green"
                        : isAbsent
                        ? "red"
                        : "transparent",
                      color: isPresent || isAbsent ? "white" : "inherit",
                      borderRadius: "50%",
                      width: 50,
                      height: 50,
                      fontWeight: 600,
                      fontSize: "1.1rem",
                    }}
                  />
                );
              },
            }}
          />
        </LocalizationProvider>
      </div>
    </>
  );
}

export default Calendar;

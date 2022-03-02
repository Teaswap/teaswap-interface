import React, { useEffect, useMemo, useState } from "react";
import {
  REWARDS_DURATION_DAYS,
  STAKING_GENESIS,
} from "../../state/stake/hooks";
import { TYPE } from "../../theme";

const MINUTE = 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;
const REWARDS_DURATION = DAY * REWARDS_DURATION_DAYS;

export function Countdown({
  exactEnd,
  rewardsDuration,
}: {
  exactEnd?: Date;
  rewardsDuration?: number;
}) {
  // get end/beginning times

  const duration = useMemo(
    () => (rewardsDuration ? rewardsDuration : REWARDS_DURATION),
    [rewardsDuration]
  );

  const end = useMemo(
    () =>
      exactEnd
        ? Math.floor(exactEnd.getTime() / 1000)
        : STAKING_GENESIS + duration,
    [exactEnd, duration]
  );

  const begin = useMemo(() => end - duration, [end, duration]);

  // get current time
  const [time, setTime] = useState(() => Math.floor(Date.now() / 1000));
  useEffect((): (() => void) | void => {
    // we only need to tick if rewards haven't ended yet
    if (time <= end) {
      const timeout = setTimeout(
        () => setTime(Math.floor(Date.now() / 1000)),
        1000
      );
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [time, end]);

  const timeUntilGenesis = begin - time;
  const timeUntilEnd = end - time;

  // console.log(begin)
  // console.log(duration)
  // console.log(end)
  // console.log(time)
  // console.log(timeUntilGenesis)
  // console.log(timeUntilGenesis)

  let timeRemaining: number;
  let message: string;
  if (timeUntilGenesis >= 0) {
    message = "Rewards begin in";
    timeRemaining = timeUntilGenesis;
  } else {
    const ongoing = timeUntilEnd >= 0;
    if (ongoing) {
      message = "Rewards end in";
      timeRemaining = timeUntilEnd;
    } else {
      // message = 'Rewards have ended!'
      message = "";
      timeRemaining = Infinity;
    }
  }

  const days = (timeRemaining - (timeRemaining % DAY)) / DAY;
  timeRemaining -= days * DAY;
  const hours = (timeRemaining - (timeRemaining % HOUR)) / HOUR;
  timeRemaining -= hours * HOUR;
  const minutes = (timeRemaining - (timeRemaining % MINUTE)) / MINUTE;
  timeRemaining -= minutes * MINUTE;
  const seconds = timeRemaining;

  return (
    <TYPE.black fontWeight={400} style={{ color: "#000000" }}>
      {message}{" "}
      {Number.isFinite(timeRemaining) && (
        <code>
          {`${days} Days ${hours
            .toString()
            .padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`}
        </code>
      )}
    </TYPE.black>
  );
}

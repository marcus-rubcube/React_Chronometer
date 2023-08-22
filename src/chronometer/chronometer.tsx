import { ReactElement, useEffect, useState } from "react";

import { Button, Container, Timer } from "./chronometer.styles";
import { getFormattedTime } from "./utils/format-time";

export function Chronometer(): ReactElement {
  const [running, setRunning] = useState(false);
  const [time, setTime] = useState(0);

  useEffect(() => {
    let timer: string | number | NodeJS.Timer | undefined;

    if (running) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(timer);
    }

    return () => {
      clearInterval(timer);
    };
  }, [running]);

  const startStopHandler = () => {
    setRunning((prevRunning) => !prevRunning);
  };

  const resetHandler = () => {
    setRunning(false);
    setTime(0);
  };

  return (
    <Container>
      <Timer>{getFormattedTime(time)}</Timer>
      <Button onClick={startStopHandler}>{running ? 'Stop' : 'Start'}</Button>
      <Button onClick={resetHandler}>Reset</Button>
    </Container>
  );
}

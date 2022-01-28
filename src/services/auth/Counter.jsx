import React from "react"
import ReactDOM from "react-dom"
import { CountdownCircleTimer } from "react-countdown-circle-timer"
import { Image, useMediaQuery } from "@chakra-ui/react"
import "./Counterstyles.css"

const formatRemainingTime = (time) => {
  const minutes = Math.floor((time % 3600) / 60)
  const seconds = time % 60

  return `${minutes}:${seconds}`
}

const renderTime = ({ remainingTime }) => {
  if (remainingTime === 0) {
    return <div className="timer">Too lale...</div>
  }

  return (
    <div className="timer">
      <div className="value">{formatRemainingTime(remainingTime)}</div>
    </div>
  )
}

export default function Counter() {
  const [mb] = useMediaQuery("(max-width: 600px)")
  return (
    <div className="App">
      <div className="timer-wrapper">
        <CountdownCircleTimer
          isPlaying
          duration={900}
          size={mb ? "35" : "50"}
          strokeWidth={mb ? "2" : "4"}
          colors={"#0A8754"}
          onComplete={() => [true, 1000]}
        >
          {renderTime}
        </CountdownCircleTimer>
      </div>
    </div>
  )
}

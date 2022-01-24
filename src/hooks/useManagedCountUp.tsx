import { useCountUp } from "react-countup"
import { useCountUpProps } from "react-countup/build/useCountUp"
import { usePreviousDistinct } from "react-use"

export const useManagedCountUp = (props: useCountUpProps) => {
  return useCountUp({
    start: usePreviousDistinct(props.end),
    separator: ",",
    decimals: 2,
    duration: 1,
    ...props,
  })
}

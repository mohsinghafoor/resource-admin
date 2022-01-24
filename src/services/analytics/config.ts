import Analytics from "analytics"
import SegmentPlugin from "@analytics/segment"
import { config } from "../../config"

const analytics = Analytics({
  app: "resource-client",
  plugins: [
    SegmentPlugin({
      writeKey: config.SEGMENT.SEGMENT_WRITE,
    }),
  ],
})

/* Track events */
const createAnalyticsTrack = (event: string) => {
  return (payload: unknown) => analytics.track(event, payload)
}

/* Identify users */
const createAnalyticsIdentify = (payload: unknown | null) => {
  return (id: string) => analytics.identify(id, payload)
}

export { analytics, createAnalyticsTrack, createAnalyticsIdentify }

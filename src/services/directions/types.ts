import { getDirectionsResponse } from "./fixtures"

export type GetDirectionsResponse = typeof getDirectionsResponse

export type Direction =
  GetDirectionsResponse["features"][number]["properties"]["segments"][number]

export type Step =
  GetDirectionsResponse["features"][number]["properties"]["segments"][number]["steps"][number]

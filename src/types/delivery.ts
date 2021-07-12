import { GetDirectionsResponse } from "src/services/directions/types"

export type Coordinates = {
  latitude: number
  longitude: number
}

export type Direction =
  GetDirectionsResponse["features"][number]["properties"]["segments"][number]

export type Step =
  GetDirectionsResponse["features"][number]["properties"]["segments"][number]["steps"][number]

import { NetworkService } from "@services"
import { Coordinates } from "@types"
import { ssm } from "@utils"
import { GetDirectionsResponse } from "./types"

export class DirectionsService {
  private networkClient: NetworkService
  static serviceBaseURL = process.env.OPENROUTE_URL

  constructor() {
    this.networkClient = new NetworkService(DirectionsService.serviceBaseURL)
  }

  public async getDirections(
    storeCoordinates: Coordinates,
    deliveryCoordinates: Coordinates
  ): Promise<GetDirectionsResponse["features"][number]["properties"]> {
    const apiKey = await ssm.getParameter({
      Name: process.env.OPENROUTE_API_KEY_SSM_NAME,
      WithDecryption: true,
    })
    const requestURL =
      `directions/driving-car?api_key=${apiKey}` +
      `&start=${storeCoordinates.longitude},${storeCoordinates.latitude}` +
      `&end=${deliveryCoordinates.longitude},${deliveryCoordinates.latitude}`

    const response = await this.networkClient.get<GetDirectionsResponse>(
      requestURL
    )
    return response.data.features[0].properties
  }
}

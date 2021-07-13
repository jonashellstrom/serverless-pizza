import axios, { AxiosInstance, AxiosResponse } from "axios"

export default class NetworkService {
  private client: AxiosInstance

  constructor(baseURL: string) {
    this.client = this.getClient(baseURL)
  }

  private getClient(baseURL: string): AxiosInstance {
    const client = axios.create({
      baseURL,
    })

    // Cleanse error to prevent sensitive content from being exposed
    client.interceptors.response.use(
      (response) => response,
      (error) => Promise.reject(new Error(error.message))
    )

    return client
  }

  public async get<T>(url: string): Promise<AxiosResponse<T>> {
    try {
      return await this.client.get<T>(url)
    } catch (error) {
      throw error
    }
  }

  public async post<T>(url: string, data: unknown): Promise<AxiosResponse<T>> {
    try {
      return await this.client.post<T>(url, data)
    } catch (error) {
      throw error
    }
  }

  public async delete<T>(url: string): Promise<AxiosResponse<T>> {
    try {
      return await this.client.delete<T>(url)
    } catch (error) {
      throw error
    }
  }
}

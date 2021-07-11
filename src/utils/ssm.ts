import * as SSM from "aws-sdk/clients/ssm"

const ssmClient = new SSM({ region: process.env.REGION })

export const ssm = {
  getParameter: async (
    options: SSM.GetParameterRequest
  ): Promise<SSM.GetParameterResult["Parameter"]["Value"]> => {
    try {
      const result: SSM.GetParameterResult = await ssmClient
        .getParameter(options)
        .promise()

      if (!result.Parameter?.Value) throw Error("Error accessing SSM parameter")

      return result.Parameter?.Value
    } catch (error) {
      throw error
    }
  },
}

import * as StepFunctions from "aws-sdk/clients/stepfunctions"

export default class StateMachineService {
  private sf: StepFunctions

  constructor() {
    this.sf = new StepFunctions()
  }

  public async start<T>(args: {
    stateMachineArn: string
    name: string
    input: T
  }) {
    const { stateMachineArn, name, input } = args
    await this.sf
      .startExecution({
        stateMachineArn,
        name,
        input: JSON.stringify(input),
      })
      .promise()
  }

  public async stop(args: { executionArn: string }) {
    const { executionArn } = args
    await this.sf
      .stopExecution({
        executionArn,
      })
      .promise()
  }

  public async sendTaskSuccess(args: { taskToken: string; output: any }) {
    const { taskToken, output } = args
    await this.sf
      .sendTaskSuccess({ taskToken, output: JSON.stringify(output) })
      .promise()
  }

  public async sendTaskFailure(args: { taskToken: string; error: string }) {
    const { taskToken, error } = args
    await this.sf.sendTaskFailure({ taskToken, error }).promise()
  }
}

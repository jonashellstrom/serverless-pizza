import * as StepFunctions from "aws-sdk/clients/stepfunctions"

export default class StateMachineService {
  private sf: StepFunctions
  public stateMachineArn: string

  constructor(stateMachineArn: string) {
    this.sf = new StepFunctions()
    this.stateMachineArn = stateMachineArn
  }

  public async start<T>(args: { name: string; input: T }) {
    const { name, input } = args
    await this.sf
      .startExecution({
        stateMachineArn: this.stateMachineArn,
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

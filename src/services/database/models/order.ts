import type { DeliveryOrder } from "@types"
import dynamodb from "../dynamodb"

export type OrderModel = DeliveryOrder

const tableName = process.env.ORDER_TABLE_NAME

const save = async (order: OrderModel): Promise<void> => {
  try {
    await dynamodb
      .put({
        TableName: tableName,
        Item: {
          ...order,
        },
      })
      .promise()
  } catch (error) {
    throw error
  }
}
const getById = async (orderId: string): Promise<OrderModel | null> => {
  try {
    const { Item } = await dynamodb
      .get({
        TableName: tableName,
        Key: {
          orderId,
        },
        ConsistentRead: true,
      })
      .promise()

    if (Item) return Item as OrderModel

    return null
  } catch (error) {
    console.error("Error getting order from order-table: ", error)
    return null
  }
}
const addPickupTaskToken = async (
  orderId: string,
  taskToken: string
): Promise<void> => {
  try {
    await dynamodb
      .update({
        TableName: tableName,
        Key: {
          orderId,
        },
        UpdateExpression: "SET pickUpTaskToken = :taskToken",
        ExpressionAttributeValues: {
          ":taskToken": taskToken,
        },
      })
      .promise()
  } catch (error) {
    console.error("Error updating order with pickup details: ", error)
  }
}

export default {
  save,
  getById,
  addPickupTaskToken,
}

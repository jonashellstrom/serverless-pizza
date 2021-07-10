import type { Coordinates } from "@types"
import dynamodb from "../dynamodb"

export type StoreModel = {
  id: string
  coordinates: Coordinates
}

const tableName = process.env.STORE_TABLE_NAME

const getById = async (storeId: string): Promise<StoreModel> => {
  try {
    const { Item } = await dynamodb
      .get({
        TableName: tableName,
        Key: {
          storeId,
        },
        ConsistentRead: true,
      })
      .promise()

    if (Item) return Item as StoreModel

    return null
  } catch (error) {
    console.error("Error getting store from store-table: ", error)
    return null
  }
}

export default {
  getById,
}

# Get details on an existing order

Retrieve details on an order as a customer, store or driver. The response will the order status as well as any relevant fields for each type of party (customer, store or driver).

**URL** : `/order/<orderId>/?party=<orderParty>`

**Method** : `POST`

**Auth required** : NO

**Permissions required** : None

**Data constraints and example**

Construct the request URL with orderId and party (either 'customer', 'store' or 'driver'). The party query string parameter is required.

```url
/order/jhFyp_VgILTz1xW5NNAbn/?party=store
```

## Success Response

**Condition** : If order id is valid and a valid party was specified.

**Code** : `200 OK`

**Content example**

```json
{
  "order": {
    "status": "order_placed",
    "storeId": "ouudJiBWJd0HQUafMVLvX",
    "pies": [
      {
        "size": "medium",
        "cheese": "medium",
        "toppings": ["pepperoni", "greenPepper", "onion"]
      }
    ],
    "dispatchEstimatedAt": "2021-07-12T02:31:41.204Z",
    "createdAt": "2021-07-12T02:16:41.204Z"
  }
}
```

## Error Responses

**Condition** : If no party was specified in query string parameters, or if the party specified is of an invalid type.

**Code** : `400 BAD REQUEST`

**Content example**

```json
{
  "message": "Must specify a party 'customer', 'store' or 'driver' as a query string parameter."
}
```

## Or

**Condition** : No order exists for order id.

**Code** : `404 NOT FOUND`

**Content example**

```json
{
  "message": "Order with id [ouudJiBWJd0HQUafMVLvW] does not exist."
}
```

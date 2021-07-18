# Pickup an order

Pickup an order at an affiliate store. The response will include delivery steps from the store to the delivery address.

**URL** : `/order/pickup/`

**Method** : `POST`

**Auth required** : NO

**Permissions required** : None

**Data constraints**

Provide the order id.

```json
{
  "orderId": "string"
}
```

**Data example** All fields required.

```json
{
  "orderId": "jhFyp_VgILTz1xW5NNAbn"
}
```

## Success Response

**Condition** : If store id is valid and an order was successfully placed.

**Code** : `200 OK`

**Content example**

```json
{
  "message": "Pickup has been recorded for order [jhFyp_VgILTz1xW5NNAbn].",
  "deliverySteps": [
    {
      "distance": 110.3,
      "duration": 11.4,
      "type": 11,
      "instruction": "Head east on 5 Avenue SW",
      "name": "5 Avenue SW",
      "way_points": [0, 2]
    },
    ...
    {
      "distance": 0,
      "duration": 0,
      "type": 10,
      "instruction": "Arrive at 12 Avenue SW, on the right",
      "name": "-",
      "way_points": [51, 51]
    }
  ],
}
```

## Error Response

**Condition** : If fields are missed or incorrectly formatted.

**Code** : `400 BAD REQUEST`

**Content example**

```json
{
  "message": "Invalid request body"
}
```

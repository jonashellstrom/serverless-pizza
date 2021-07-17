# Place a New Order

Place an order at an affiliate store. For successfully placed orders, the response will include the full order object including an initial ETA.

**URL** : `/order/`

**Method** : `POST`

**Auth required** : NO

**Permissions required** : None

**Data constraints**

Provide the store id, the payment id, an array of pies and the delivery address (all inputs are validated against a JSON schema with regex matching for address input).

```json
{
  "storeId": "string",
  "paymentId": "string",
  "pies": "[array of pie objects]",
  "deliveryAddress": "[address object]"
}
```

**Data example** All fields required.

```json
{
  "storeId": "ouudJiBWJd0HQUafMVLvX",
  "paymentId": "Q2N_R4yoDzki50LXRQmyi",
  "pies": [
    {
      "size": "medium",
      "cheese": "medium",
      "toppings": ["pepperoni", "greenPepper", "onion"]
    }
  ],
  "deliveryAddress": {
    "coordinates": {
      "latitude": 51.04127158888242,
      "longitude": -114.06902572788017
    },
    "streetAddress": "1221 2 St SW",
    "city": "Calgary",
    "postalCode": "T2R 0W5",
    "province": "AB"
  }
}
```

## Success Response

**Condition** : If store id is valid and an order was successfully placed.

**Code** : `201 CREATED`

**Content example**

```json
{
  "message": "Order of [1] pizza(s) has been initiated!",
  "order": {
    "orderId": "jhFyp_VgILTz1xW5NNAbn",
    "storeId": "ouudJiBWJd0HQUafMVLvX",
    "status": "initiated",
    "pies": [
      {
        "size": "medium",
        "cheese": "medium",
        "toppings": ["pepperoni", "greenPepper", "onion"]
      }
    ],
    "deliveryAddress": {
      "coordinates": {
        "latitude": 51.04127158888242,
        "longitude": -114.06902572788017
      },
      "streetAddress": "1221 2 St SW",
      "city": "Calgary",
      "postalCode": "T2R 0W5",
      "province": "AB"
    },
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
    "paymentId": "Q2N_R4yoDzki50LXRQmyi",
    "tipPaid": null,
    "createdAt": "2021-07-12T02:16:41.204Z",
    "dispatchEstimatedAt": "2021-07-12T02:31:41.204Z",
    "deliveryEstimatedAt": "2021-07-12T02:34:37.304Z",
    "deliveredAt": null
  }
}
```

## Error Responses

**Condition** : If store id does not exist.

**Code** : `404 NOT FOUND`

**Content example**

```json
{
  "message": "Store with id [YpObkjllOumFS-gjaEbwM] does not exist."
}
```

### Or

**Condition** : If fields are missed or incorrectly formatted.

**Code** : `400 BAD REQUEST`

**Content example**

```json
{
  "message": "Invalid request body"
}
```

# Accept or Decline an Order

This endpoint is used by an affiliate store to accept or decline a new order.

**URL** : `/order/decision/`

**Method** : `POST`

**Auth required** : NO

**Permissions required** : None

**Data constraints**

Provide the order id, store id, the decision and for declined orders, a declined reason..

```json
{
  "orderId": "string",
  "storeId": "string",
  "accepted": "boolean",
  "taskToken": "string"
}
```

```json
{
  "orderId": "string",
  "storeId": "string",
  "accepted": "boolean",
  "declinedReason": "enum [no_capacity, closing_time, opening_time]",
  "taskToken": "string"
}
```

**Data example** All fields required.

```json
{
  "orderId": "Q2N_R4yoDzki50LXRQmyi",
  "storeId": "ouudJiBWJd0HQUafMVLvX",
  "accepted": true,
  "taskToken": "Sg1mH3JWRnsxYKuzeG1WZA1uQ7XUm"
}
```

```json
{
  "orderId": "Q2N_R4yoDzki50LXRQmyi",
  "storeId": "ouudJiBWJd0HQUafMVLvX",
  "accepted": false,
  "declinedReason": "no_capacity",
  "taskToken": "Sg1mH3JWRnsxYKuzeG1WZA1uQ7XUm"
}
```

## Success Response

**Condition** : If all required fields are included, correctly formatted.

**Code** : `200 OK`

**Content example**

```json
{
  "message": "Decision to accept order [Q2N_R4yoDzki50LXRQmyi] has been received."
}
```

## Error Responses

**Condition** : If fields are missed or incorrectly formatted.

**Code** : `400 BAD REQUEST`

**Content example**

```json
{
  "message": "Invalid request body"
}
```

## Or

**Condition** : Server was unable to receive order decision.

**Code** : `500 INTERNAL SERVER ERROR`

**Content example**

```json
{
  "message": "Decision for order [Q2N_R4yoDzki50LXRQmyi] was not received."
}
```

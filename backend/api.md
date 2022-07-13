# wallet api document

## /api/
- Method: `GET`
- Header: `None`
- Body: `None`
- Param: `None`
- Success Response: 
```json
{
    "success": true,
    "message": "",
    "data": {}
}
```
- Error Response:
```json
{
    "success": false,
    "message": "Some error occurs.",
    "data": {}
}
```

## /api/profile
- Method: `GET`
- Header: `Authorization: Bearer {jwt}`
- Body: `None`
- Param: `None`
- Success Response: 
```json
{
    "success": true,
    "message": "",
    "data": {
        "user_id": "user_",
        "user_name": "user",
        "user_nick_name": "UESR",
        "selected_wallet_id": "wallet_2c36aaad-2d40-48cb-9e36-9d3a841ffb37",
        "wallets" :[
            {
                "wallet_id": "wallet_2c36aaad-2d40-48cb-9e36-9d3a841ffb37",
                "wallet_name": "my-wallet",
                "wallet_title": "some title",
                "wallet_total": "wallet total",
                "selected": true,
                "record_num": "quantity of records",
                "records": [
                    {
                        "record_id":"record_0e0d10d0-531b-4f0d-abc2-f157b9f27dfd",
                        "wallet_record_tag_id":"tag_80d4a691-14bd-494c-98e1-8187a669e0d2",
                        "record_ordinary": "",
                        "record_name": "Some name",
                        "record_description": "Some description",
                        "record_amount": "100",
                        "record_type": "income",
                        "record_date": "1648912357",
                        "record_created_time": "1648912357",
                        "record_updated_time": "1648912357",
                        "record_debtors": [
                            {
                                "debtor_id": "debtor_123456",
                                "debtor_name": "james"
                            }
                        ]
                    },
                ]
            },
        ]
        "debtors": [
            {
                "debtor_id": "debtor_123456",
                "debtor_user_id": "user_123456",
                "debtor_name": "james",
                "debtor_amount": "100",
                "debtor_created_time": "",
                "debtor_updated_time": ""
            }
        ]
    }
}
```
- Error Response:
```json
{
    "success": false,
    "message": "Some error occurs.",
    "data": {}
}
```

## /api/signup
- Method: `POST`
- Header: `Authorization: Bearer {jwt}`
- Body:
```json
{
    "nick_name": "my_name"
}
```
- Param: `None`
- Success Response: 
```json
{
    "success": true,
    "message": "",
    "data": {}
}
```
- Error Response:
```json
{
    "success": false,
    "message": "Some error occurs.",
    "data": {}
}
```

## /api/wallet
- Method: `GET`
- Header: `Authorization: Bearer {jwt}`
- Body: `None`
- Param:
```json
{
    "user_id": "user_id",
    "wallet_id": "wallet_2c36aaad-2d40-48cb-9e36-9d3a841ffb37"
}
```
- Success Response: 
```json
{
    "success": true,
    "message": "",
    "data": {
        "wallet_id": "wallet_2c36aaad-2d40-48cb-9e36-9d3a841ffb37",
        "wallet_name": "my-wallet",
        "wallet_title": "wallet-title",
        "wallet_total": "wallet-total",
        "wallet_description": "my-wallet-description",
        "record_num": "quantity of records",
        "records": [
            {
                "record_id":"record_0e0d10d0-531b-4f0d-abc2-f157b9f27dfd",
                "wallet_record_tag_id":"tag_80d4a691-14bd-494c-98e1-8187a669e0d2",
                "record_ordinary": "",
                "record_name": "Some name",
                "record_description": "Some description",
                "record_amount": "100",
                "record_type": "income",
                "record_date": "1648912357",
                "record_created_time": "1648912357",
                "record_updated_time": "1648912357",
            },
        ]
    }
}
```
- Error Response:
```json
{
    "success": false,
    "message": "Some error occurs.",
    "data": {}
}
```

## /api/wallet/create
- Method: `POST`
- Header: `Authorization: Bearer {jwt}`
- Body:
```json
{
    "wallet_name": "my-wallet",
    "wallet_description": "my-wallet-description",
}
```
- Param: `None`
- Success Response: 
```json
{
    "success": true,
    "message": "",
    "data": {}
}
```
- Error Response:
```json
{
    "success": false,
    "message": "Some error occurs.",
    "data": {}
}
```

## /api/wallet/edit
- Method: `POST`
- Header: `Authorization: Bearer {jwt}`
- Body:
```json
{
    "wallet_id": "wallet_2c36aaad-2d40-48cb-9e36-9d3a841ffb37",
    "wallet_name": "my-wallet",
    "wallet_description": "my-wallet-description",
}
```
- Param: `None`
- Success Response: 
```json
{
    "success": true,
    "message": "",
    "data": {}
}
```
- Error Response:
```json
{
    "success": false,
    "message": "Some error occurs.",
    "data": {}
}
```

## /api/wallet/delete
- Method: `POST`
- Header: `Authorization: Bearer {jwt}`
- Body:
```json
{
    "wallet_id": "wallet_2c36aaad-2d40-48cb-9e36-9d3a841ffb37",
}
```
- Param: `None`
- Success Response: 
```json
{
    "success": true,
    "message": "",
    "data": {}
}
```
- Error Response:
```json
{
    "success": false,
    "message": "Some error occurs.",
    "data": {}
}
```

## /api/wallet/search
- Method: `GET`
- Header: `Authorization: Bearer {jwt}`
- Body: `None`
- Param:
```json
{
    "wallet_id": "wallet_2c36aaad-2d40-48cb-9e36-9d3a841ffb37",
    "search_str": "123456"
}
```
- Success Response: 
```json
{
    "success": true,
    "message": "",
    "data": {[searched records]}
}
```
- Error Response:
```json
{
    "success": false,
    "message": "Some error occurs.",
    "data": {}
}
```

## /api/record
- Method: `GET`
- Header: `Authorization: Bearer {jwt}`
- Body: `None`
- Param:
```json
{
    "record_id": "record_2c36aaad-2d40-48cb-9e36-9d3a841ffb37"
}
```
- Success Response: 
```json
{
    "success": true,
    "message": "",
    "data": {
        "record_wallet_id": "wallet_2c36aaad-2d40-48cb-9e36-9d3a841ffb37",
        "record_id":"record_0e0d10d0-531b-4f0d-abc2-f157b9f27dfd",
        "wallet_record_tag_id":"tag_80d4a691-14bd-494c-98e1-8187a669e0d2",
        "record_ordinary": "",
        "record_name": "Some name",
        "record_description": "Some description",
        "record_amount": "100",
        "record_type": "income",
        "record_date": "1648912357",
        "record_created_time": "1648912357",
        "record_updated_time": "1648912357",
    }
}
```
- Error Response:
```json
{
    "success": false,
    "message": "Some error occurs.",
    "data": {}
}
```

## /api/record/create
- Method: `POST`
- Header: `Authorization: Bearer {jwt}`
- Body:
```json
{
    "wallet_id": "wallet_2c36aaad-2d40-48cb-9e36-9d3a841ffb37",
    "wallet_record_tag_id":"tag_80d4a691-14bd-494c-98e1-8187a669e0d2",
    "record_debtors": [
        "many debtor_id, (not necessary)"
    ]
    "record_ordinary": "",
    "record_name": "Some name",
    "record_description": "Some description",
    "record_amount": "100",
    "record_type": "income",
    "record_date": "1648912357",
}
```
- Param: `None`
- Success Response: 
```json
{
    "success": true,
    "message": "",
    "data": {}
}
```
- Error Response:
```json
{
    "success": false,
    "message": "Some error occurs.",
    "data": {}
}
```

## /api/record/edit
- Method: `POST`
- Header: `Authorization: Bearer {jwt}`
- Body:
```json
{
    "record_id":"record_0e0d10d0-531b-4f0d-abc2-f157b9f27dfd",
    "wallet_id": "wallet_2c36aaad-2d40-48cb-9e36-9d3a841ffb37",
    "wallet_record_tag_id":"tag_80d4a691-14bd-494c-98e1-8187a669e0d2",
    "record_ordinary": "",
    "record_name": "Some name",
    "record_description": "Some description",
    "record_amount": "100",
    "record_type": "income",
    "record_date": "1648912357",
}
```
- Param: `None`
- Success Response: 
```json
{
    "success": true,
    "message": "",
    "data": {}
}
```
- Error Response:
```json
{
    "success": false,
    "message": "Some error occurs.",
    "data": {}
}
```

## /api/record/delete
- Method: `POST`
- Header: `Authorization: Bearer {jwt}`
- Body:
```json
{
    "record_id":"record_0e0d10d0-531b-4f0d-abc2-f157b9f27dfd",
    "record_wallet_id": "wallet_123456",
    "record_amount": "100",
    "debtor_id": "debtor_123456"
}
```
- Param: `None`
- Success Response: 
```json
{
    "success": true,
    "message": "",
    "data": {}
}
```
- Error Response:
```json
{
    "success": false,
    "message": "Some error occurs.",
    "data": {}
}
```


## /api/wallet/record
- Method: `POST`
- Header: `Authorization: Bearer {jwt}`
- Body:
```json
{
    "record_id":"record_0e0d10d0-531b-4f0d-abc2-f157b9f27dfd",
}
```
- Param: `None`
- Success Response: 
```json
{
    "success": true,
    "message": "",
    "data": {}
}
```
- Error Response:
```json
{
    "success": false,
    "message": "Some error occurs.",
    "data": {}
}
```


## /api/tag/all/update
- Method: `POST`
- Header: `Authorization: Bearer {jwt}`
- Body:
```json
{
    "tags":
    [
        {
            "tag_color": "#BEBEBE",
            "tag_created_time": "2022-05-18T10:50:28.000Z",
            "tag_id": "tag_1b232d1a-8cbf-465b-b4fe-a8ab0a5bec90",
            "tag_name": "午餐",
            "tag_ordinary": 2,
            "tag_type": "支出",
            "tag_updated_time": "2022-05-18T10:50:28.000Z",
            "tag_wallet_id": "wallet_bff0af0b-a0c6-4d78-91a9-27b931020513"
        }
    ]
}
```
- Param: `None`
- Success Response: 
```json
{
    "success": true,
    "message": "",
    "data": {}
}
```
- Error Response:
```json
{
    "success": false,
    "message": "Some error occurs.",
    "data": {}
}
```

## /oauth/google/login
## /oauth/google/redirect

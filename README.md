# API Project: Timestamp Microservice

This project is based on the challenge in the FreeCodeCamp community.

This microservice is just translating the given valid date into a unix timestamp and utc timestamp. To use this microservice, check out the API docs below

### How to use?
1. Create a request into the API endpoint which is GET method, the url pattern is [project_url]/api/timestamp/**:date_string?**

```json
{
    "unix": 1479663089000 ,
    "utc": "Sun, 20 Nov 2016 17:31:29 GMT
}
```
> This is the sample response when the date_string is a valid date
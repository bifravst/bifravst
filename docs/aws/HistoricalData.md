# Storage of Historical Data

Use [AWS Athena](https://docs.aws.amazon.com/athena/latest/ug/what-is.html) to analyze historical data. This offers developers a flexible schema through creation of tables nevertheless which is however instant and they are immediately available for querying. This offers and advantage over storing IoT messages in DynamoDB which works with a fixed schema and can't be quickly optimized for querying data where the structure is not known.

AWS Athena does not perform well when working with many small files (generally less than 128 MB, for example if every messages comes from AWS IoT and is stored in individual files). Therefore there needs to be a process to concatenate individual files into bigger archive files.

![Pipeline](./AWS%20Historical%20Data%20Pipieline.jpg)

## Evalutation

Using 1,000,000 temperature readings in per-month JSON files over 6 months stored on S3.

 - [Test data](https://drive.google.com/open?id=1COcGT_04FSXtOGqIrz4gKoZaxtYv7ezo)
 - [Script to generate test data](./generate-sensor-messages.ts)
 - [Top 10 Performance Tuning Tips for Amazon Athena](https://aws.amazon.com/blogs/big-data/top-10-performance-tuning-tips-for-amazon-athena/)

### File name

`yyyy-mm.json`

### File structure

```
<json>\n
<json>\n
```

### Message structure

```json
{
  "timestamp": "2018-12-31T23:18:12.181Z",
  "temp": {
    "21e6a093-7e81-4369-9ac9-db70fd35f91a": 14.615334102668445,
    "71c4610b-1d8d-427e-bec7-50a1ebed3c1b": 7.992562097121897,
    "0adbb052-9f13-4f4d-bf95-c8f670c7901f": 5.430938739122258,
    "c72ba996-b1a3-4d60-ba0d-cb191841742d": 4.109410071350069,
    "c43ed758-5333-4cd2-aba6-f17db671fb70": 3.3069649953894857
  }
}
```

### Athena table

```sql
CREATE EXTERNAL TABLE IF NOT EXISTS messages.messages_multi (
  `timestamp` string,
  `temp` map<string,float> 
)
ROW FORMAT SERDE 'org.openx.data.jsonserde.JsonSerDe'
WITH SERDEPROPERTIES (
  'serialization.format' = '1'
) LOCATION 's3://messages-to-index/sensor-messages-multi/'
TBLPROPERTIES ('has_encrypted_data'='false');
```

### Athena query

Calculate daily average temperature of sensor 1 over 30 days.

```sql
SELECT avg(temp['71c4610b-1d8d-427e-bec7-50a1ebed3c1b']) AS sensor1_temp_avg, CAST(substr(timestamp, 1, 10) AS DATE) AS day
FROM messages_multi
WHERE timestamp >= '2019-06-01T00:00:00.000Z'
        AND timestamp < '2019-07-01T00:00:00.000Z'
GROUP BY CAST(substr(timestamp, 1, 10) AS DATE) 
ORDER BY day
```

> (Run time: 2.17 seconds, Data scanned: 321.74 MB)

| day| sensor1_temp_avg |
|----|------------------|
| 2019-06-01 | 4.9532347 |
| 2019-06-02 | 4.8583508 |
| 2019-06-03 | 4.8492146 |
| 2019-06-04 | 4.854227 |
| 2019-06-05 | 4.8358293 |
| 2019-06-06 | 4.8849325 |
| 2019-06-07 | 4.7746887 |
| 2019-06-08 | 4.847645 |
| 2019-06-09 | 4.824582 |
| 2019-06-10 | 4.8964396 |
| 2019-06-11 | 4.8358784 |
| 2019-06-12 | 4.841581 |
| 2019-06-13 | 4.852991 |
| 2019-06-14 | 4.815382 |
| 2019-06-15 | 4.8393536 |
| 2019-06-16 | 4.7559533 |
| 2019-06-17 | 4.866683 |
| 2019-06-18 | 4.91957 |
| 2019-06-19 | 4.8216724 |
| 2019-06-20 | 4.8456826 |
| 2019-06-21 | 4.8362107 |
| 2019-06-22 | 4.894185 |
| 2019-06-23 | 4.870294 |
| 2019-06-24 | 4.8472314 |
| 2019-06-25 | 4.948552 |
| 2019-06-26 | 4.872993 |
| 2019-06-27 | 4.8472123 |
| 2019-06-28 | 4.910658 |
| 2019-06-29 | 4.914099 |
| 2019-06-30 | 4.8913875 |


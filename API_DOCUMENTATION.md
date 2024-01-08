## API Documentation

### Create New Worker Entry

**Endpoint:**

POST /workers
Request Format:
```json
{
  "Vorname": "John",
  "Nachname": "Doe",
  "Email": "john.doe@example.com",
  "GebrachtVonLvl1": "workerID",
  // ... (other fields)
}

Response Format:
{
  "_id": "generatedID",
  // ... (other fields)
}

Notes:

'GebrachtVonLvl1' is optional and can be null.
'Lvl 2' and 'Lvl 3' are calculated automatically.
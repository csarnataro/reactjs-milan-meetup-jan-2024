import settings from 'electron-settings'
import ArduinoIotClient from '@arduino/arduino-iot-client'

let cachedThingsList
const getToken = async () => {
  const apiKey = await settings.get('api-key')

  if (!apiKey) {
    throw new Error(`Can’t connect to Arduino Cloud, API KEY is not configured.
    You can use the Settings panel to configure your Arduino API Key`)
  }

  var options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    json: true,
    body: JSON.stringify({
      grant_type: 'client_credentials',
      client_id: apiKey.clientId,
      client_secret: apiKey.clientSecret,
      audience: 'https://api2.arduino.cc/iot'
    })
  }

  const res = await fetch('https://api2.arduino.cc/iot/v1/clients/token', options)
  const json = await res.json()
  return json.access_token
}

const extractThings = (thingsList) =>
  thingsList.map((thing) => ({ value: thing.id, label: thing.name }))

const extractVariableNames = (thingsList, thingId) => {
  const thing = thingsList.find((thing) => thing.id === thingId)
  if (thing && Array.isArray(thing.properties)) {
    return thing.properties.map((property) => ({ value: property.name, label: property.name }))
  }
  return []
}

const getThings = async () => {
  const token = await getToken()

  const defaultClient = ArduinoIotClient.ApiClient.instance

  // Configure OAuth2 access token for authorization: oauth2
  const oauth2 = defaultClient.authentications['oauth2']
  oauth2.accessToken = token

  // Create an instance of the API class
  const api = new ArduinoIotClient.ThingsV2Api()
  const opts = {
    showProperties: true
  }
  console.log('Fetching things...')
  const ret = await api.thingsV2List(opts)
  return ret
}

const getThing = async (thingId) => {
  const token = await getToken()

  const defaultClient = ArduinoIotClient.ApiClient.instance

  // Configure OAuth2 access token for authorization: oauth2
  const oauth2 = defaultClient.authentications['oauth2']
  oauth2.accessToken = token

  // Create an instance of the API class
  const api = new ArduinoIotClient.ThingsV2Api()
  const opts = {
    showProperties: true
  }
  console.log(`Fetching thing ${thingId} ...`)
  return await api.thingsV2Show(thingId, opts)
}

const handleRequest = async (_event, args) => {
  switch (args.op) {
    case 'get-properties-initial-values': {
      const thing = await getThing(args.thingId)
      const lastValues = thing.properties.reduce(
        (acc, value) => ({
          ...acc,
          [value.name]: value.last_value
        }),
        {}
      )
      return lastValues
    }
    case 'get-things-properties': {
      if (!cachedThingsList) {
        cachedThingsList = await getThings()
      }
      if (args.settingName === 'thingId') {
        return extractThings(cachedThingsList)
      } else if (args.settingName === 'variableNames') {
        return extractVariableNames(cachedThingsList, args.thingId.value)
      }
    }
  }
}

export default { handleRequest }

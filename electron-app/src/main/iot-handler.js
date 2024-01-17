import { ArduinoIoTCloud } from 'arduino-iot-js'
import packageJson from '../../package.json'
import { getThingDetails } from './get-thing-details'
import settings from 'electron-settings'

const clients = {}

const handleRequest = async (event, args) => {
  switch (args.op) {
    case 'version': {
      const iotVersion = packageJson.dependencies['@arduino/arduino-iot-client']
      const iotJSVersion = packageJson.dependencies['arduino-iot-js']
      return [iotVersion, iotJSVersion]
    }
    case 'start-listening':
      {
        const apiKey = await settings.get('api-key')
        const source = args.source
        if (!apiKey) {
          throw new Error(`Can’t connect to Arduino Cloud, API KEY is not configured.
          You can use the Settings panel to configure your Arduino API Key`)
        }

        const connectionOptions = {
          clientId: apiKey.clientId,
          clientSecret: apiKey.clientSecret,
          onDisconnect: (message) => {
            console.error(message)
          }
        }

        const [thingId, variables] = await getThingDetails(source)

        try {
          if (!clients[source]) {
            console.log(`Initializing '${source}'`)
            clients[source] = await ArduinoIoTCloud.connect(connectionOptions)
          }
          for (let i = 0; i < variables.length; i++) {
            const variableName = variables[i]
            clients[source].onPropertyValue(thingId, variableName, (value) => {
              const data = new Array(variables.length)
              data[i] = value
              event.sender.send(source, { data })
            })
          }
        } catch (error) {
          console.error(error)
          throw error
        }
      }
      break

    case 'stop-listening':
      {
        const source = args.source

        if (clients[source]) {
          console.log(`Disconnecting '${source}'`)
          await clients[source].disconnect()
          clients[source] = null
        }
      }
      break
    case 'save-settings':
      {
        await settings.set(args.settings.key, args.settings.value)
      }
      break

    case 'get-settings': {
      return await settings.get(args.key)
    }
  }
}

export default { handleRequest }

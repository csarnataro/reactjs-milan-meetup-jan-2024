import settings from 'electron-settings'

const getThingDetails = async (source) => {
  const thingSettings = await settings.get(source)

  if (thingSettings) {
    const variables = thingSettings.variableNames
    return [thingSettings.thingId.value, [...variables.map((v) => v.label)]]
  }
}

export { getThingDetails }

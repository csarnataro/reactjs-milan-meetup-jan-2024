const on = window.electron.ipcRenderer.on
const off = window.electron.ipcRenderer.removeListener

const getVersion = async () => {
  return window.electron.ipcRenderer.invoke('iot', { op: 'version' })
}

const startListening = (source) =>
  window.electron.ipcRenderer.invoke('iot', { op: 'start-listening', source })

const stopListening = (source) =>
  window.electron.ipcRenderer.invoke('iot', { op: 'stop-listening', source })

const saveSettings = async (key, value) => {
  await window.electron.ipcRenderer.invoke('iot', {
    op: 'save-settings',
    settings: {
      key,
      value
    }
  })
}

const getSettings = async (key) => {
  return await window.electron.ipcRenderer.invoke('iot', { op: 'get-settings', key })
}


const settingsOptions = (settingName, thingId) => async () => {
  return window.electron.ipcRenderer.invoke('iot-api', {
    op: 'get-things-properties',
    settingName,
    thingId
  })
}

const getPropertiesInitialValues = ({ thingId }) => {
  return window.electron.ipcRenderer.invoke('iot-api', {
    op: 'get-properties-initial-values',
    thingId
  })
}

export {
  getVersion,
  startListening,
  stopListening,
  on,
  off,
  saveSettings,
  getSettings,
  settingsOptions,
  getPropertiesInitialValues
}

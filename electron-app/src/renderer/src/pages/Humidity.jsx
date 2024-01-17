import { useEffect, useState } from 'react'
import { Grass } from '../components/Grass'
import {
  saveSettings as ipcSaveSettings,
  startListening,
  stopListening,
  on,
  getSettings,
  settingsOptions,
  off
} from '../ipc'
import SettingsOpener from '../components/SettingsOpener'
import { Modal } from '../components/Modal'

const humidityKey = 'humidity-data'
const Humidity = () => {
  const [humidity, setHumidity] = useState(0.0)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [settings, setSettings] = useState({})

  const saveSettings = async (settings) => {
    await ipcSaveSettings(humidityKey, settings)
    getSettings(humidityKey).then(setSettings)
  }

  useEffect(() => {
    on(humidityKey, listener)
    startListening(humidityKey)
    getSettings(humidityKey).then(setSettings)

    return () => {
      off(humidityKey, listener)
      stopListening(humidityKey)
    }
  }, [])

  const listener = (_event, args) => {
    setHumidity(args.data[0])
  }

  return (
    <>
      <SettingsOpener setSettingsOpen={setSettingsOpen} settingsKey={humidityKey} />

      <div className="p-4" id="grass-sketch-container">
        <Grass parentId="grass-sketch-container" humidity={humidity} width={900} height={600} />
      </div>
      {settingsOpen && (
        <Modal
          initialSettings={settings}
          onSubmit={saveSettings}
          closeModal={() => setSettingsOpen(false)}
          loadOptions={settingsOptions}
        />
      )}
    </>
  )
}

export { Humidity }

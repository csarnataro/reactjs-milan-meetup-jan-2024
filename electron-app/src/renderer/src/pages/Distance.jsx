import { useEffect, useState } from 'react'
// import { TrafficLight } from '../components/TrafficLight'
import {
  startListening,
  stopListening,
  on,
  off,
  getSettings,
  saveSettings as ipcSaveSettings,
  settingsOptions
} from '../ipc'
import SettingsOpener from '../components/SettingsOpener'
import { Modal } from '../components/Modal'
import { RedAlert } from '../components/RedAlert'

const distanceKey = 'traffic-light'

const Distance = () => {
  const [distance, setDistance] = useState()
  const [distanceThreshold, setDistanceThreshold] = useState()
  const [soundOn, setSoundOn] = useState(false)
  const [lightOn, setLightOn] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [settings, setSettings] = useState({})

  const listener = (event, args) => {
    console.log('data', args.data)
    if (args.data[0]) setDistance(args.data[0])
    if (args.data[1]) setDistanceThreshold(args.data[1])
  }

  useEffect(() => {
    on(distanceKey, listener)
    startListening(distanceKey)

    return () => {
      off(distanceKey, listener)
      stopListening(distanceKey)
    }
  }, [])

  useEffect(() => {
    getSettings(distanceKey).then(setSettings)
  }, [])

  useEffect(() => {
    switch (distanceThreshold) {
      case 1:
        setSoundOn(true)
        setLightOn(true)
        break
      case 2:
        setSoundOn(false)
        setLightOn(true)
        break
      case 3:
        setSoundOn(false)
        setLightOn(false)
        break
      default:
        setSoundOn(false)
        setLightOn(false)
    }
  }, [distanceThreshold])

  const saveSettings = async (settings) => {
    await ipcSaveSettings(distanceKey, settings)
    getSettings(distanceKey).then(setSettings)
  }

  return (
    <>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark min-h-fit">
        <SettingsOpener setSettingsOpen={setSettingsOpen} className="m-4" />
        <div className="flex flex-wrap items-center">
          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
            <div className="w-full p-8 flex flex-row">
              <div className="my-0 mx-auto flex justify-center h-125" id="sketch-container-2">
                <RedAlert parentId="sketch-container-2" lightOn={lightOn} soundOn={soundOn} />
              </div>
            </div>
            <div className="p-4">
              Distance is: {Number.parseFloat(distance).toFixed(0)} cm. - Sound:
              {distanceThreshold && distanceThreshold === 1 ? 'ON' : 'OFF'}
            </div>
          </div>
        </div>
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

export { Distance }

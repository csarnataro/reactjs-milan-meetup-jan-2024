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
import { TrafficLight as TrafficLightComponent } from '../components/TrafficLight'

const distanceKey = 'traffic-light'

const TrafficLight = () => {
  const [distance, setDistance] = useState()
  const [distanceThreshold, setDistanceThreshold] = useState()
  const [greenLightOn, setGreenLightOn] = useState(true)
  const [orangeLightOn, setOrangeLightOn] = useState(false)
  const [redLightOn, setRedLightOn] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [settings, setSettings] = useState({})

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
    setRedLightOn(distanceThreshold === 1)
    setOrangeLightOn(distanceThreshold === 2)
    setGreenLightOn(!distanceThreshold || distanceThreshold === 3)
  }, [distanceThreshold])

  const listener = (event, args) => {
    if (args.data[0]) setDistance(args.data[0])
    if (args.data[1]) {
      console.log('data[1]', args.data[1])
      setDistanceThreshold(args.data[1])
    }
  }

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
                <TrafficLightComponent
                  parentId="sketch-container-2"
                  greenLightOn={greenLightOn}
                  orangeLightOn={orangeLightOn}
                  redLightOn={redLightOn}
                />
              </div>
            </div>
            <div className="p-4">Distance is: {Number.parseFloat(distance).toFixed(0)} cm.</div>
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

export { TrafficLight }

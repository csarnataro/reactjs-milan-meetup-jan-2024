import { useEffect, useState } from 'react'
import { Compass as CompassComponent } from '../components/Compass'
import {
  startListening,
  stopListening,
  on,
  off,
  saveSettings as ipcSaveSettings,
  getSettings,
  settingsOptions
} from '../ipc'
import { PsychoCompass } from '../components/PsychoCompass'
import { convertDegreesToDirection } from '../lib/convertDegreesToDirection'
import { Modal } from '../components/Modal'
import SettingsOpener from '../components/SettingsOpener'

const compassKey = 'compass-data'
const Compass = () => {
  // const [connectionStatus, setConnectionStatus] = useState(false)
  // const [connectionError, setConnectionError] = useState('')
  const [compass, setCompass] = useState(0.0)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [switcherToggle, setSwitcherToggle] = useState(false)
  const [settings, setSettings] = useState({})

  useEffect(() => {
    on(compassKey, listener)
    startListening(compassKey)

    return () => {
      off(compassKey, listener)
      stopListening(compassKey)
    }
  }, [])

  useEffect(() => {
    getSettings(compassKey).then(setSettings)
  }, [])

  const listener = (_event, args) => {
    console.log('data', args.data)
    setCompass(args.data[0])
  }

  const saveSettings = async (settings) => {
    await ipcSaveSettings(compassKey, settings)
    getSettings(compassKey).then(setSettings)
  }

  return (
    <>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark min-h-fit">
        <SettingsOpener setSettingsOpen={setSettingsOpen} settingsKey={compassKey} />
        <div className={`flex flex-wrap items-center psycho-${switcherToggle}`}>
          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
            <div className="w-full h-full p-8">
              {!switcherToggle && <CompassComponent degrees={compass} className="h-96 mt-4" />}
              {switcherToggle && (
                <div
                  id="psycho-background"
                  className="fixed top-0 left-0 w-full h-full bg-white"
                  style={{
                    // backgroundImage: 'url(./assets/psycho-bg-slow.gif)',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '2000px',
                    backgroundPosition: 'center'
                  }}
                >
                  <div
                    id="compass-sketch-container"
                    className="items-center h-full z-999 flex justify-center"
                  >
                    <PsychoCompass degrees={compass} parentId="compass-sketch-container" />
                  </div>
                </div>
              )}
              <div id="compass-info-container">
                <div className="m-4 flex justify-center mt-8 gradient">
                  <span>
                    {compass}° - {convertDegreesToDirection(compass)}
                  </span>
                </div>
                {/* BEGIN */}
                <div>
                  <div className="flex flex-grow text-center justify-center gradient">
                    <span className="mx-4">Regular</span>
                    <label
                      htmlFor="toggle4"
                      className="flex cursor-pointer select-none items-center"
                    >
                      <div className="relative">
                        <input
                          type="checkbox"
                          id="toggle4"
                          className="sr-only"
                          onChange={() => setSwitcherToggle(!switcherToggle)}
                        />
                        <div
                          className={`${
                            switcherToggle && '!bg-primary'
                          } block h-8 w-14 rounded-full bg-primary`}
                        ></div>
                        <div
                          className={`${
                            switcherToggle && '!right-1 !translate-x-full'
                          } absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white transition`}
                        ></div>
                      </div>
                    </label>
                    <span className="mx-4">Psycho</span>
                  </div>
                </div>
              </div>

              {/* END */}
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

export { Compass }

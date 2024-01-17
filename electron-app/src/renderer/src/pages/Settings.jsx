import { useEffect, useState } from 'react'
import { getSettings } from '../ipc'

const apiKeySettings = 'api-key'

const Settings = ({ clientId: propsClientId, clientSecret: propsClientSecret }) => {
  const [clientId, setClientId] = useState(propsClientId)
  const [clientSecret, setClientSecret] = useState(propsClientSecret)
  useEffect(() => {
    getSettings(apiKeySettings).then((s) => {
      setClientId(s.clientId)
      setClientSecret(s.clientSecret)
    })
  }, [])
  return (
    <>
      <div className="mx-auto max-w-270">
        {/* {modalOpen && <Modal closeModal={() => setModalOpen(false)} />} */}
        {/* <Breadcrumb pageName="Settings" /> */}

        <div className="grid grid-cols-5 gap-8">
          <div className="col-span-5 xl:col-span-3">
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                <h3 className="font-medium text-black dark:text-white">
                  Arduino Cloud Configuration
                </h3>
              </div>
              <div className="p-7">
                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                  <div className="w-full">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="fullName"
                    >
                      Client ID
                    </label>
                    <div className="relative">
                      <input
                        className="w-full rounded border border-stroke bg-gray py-3 pl-4.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                        type="text"
                        name="clientId"
                        id="clientId"
                        value={clientId}
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-5.5 flex flex-col gap-5.5 sm:flex-row">
                  <div className="w-full">
                    <label
                      className="mb-3 block text-sm font-medium text-black dark:text-white"
                      htmlFor="clientSecret"
                    >
                      Client Secret
                    </label>
                    <input
                      className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                      type="password"
                      name="clientSecret"
                      id="clientSecret"
                      value={clientSecret}
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-4.5">
                  <button
                    className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1"
                    type="submit"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Settings

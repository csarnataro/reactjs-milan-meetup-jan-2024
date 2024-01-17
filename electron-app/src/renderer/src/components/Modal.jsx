import { useState } from 'react'
import { SettingsSelect } from './SettingsSelect'

export const Modal = ({ closeModal, onSubmit, initialSettings, loadOptions }) => {
  // const fields = []
  const [formState, setFormState] = useState(initialSettings || {})
  // const [errors /*, setErrors */] = useState([])
  // const [selectedValue, setSelectedValue] = useState(null)
  const [options, setOptions] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  async function getOptionsAsync() {
    setIsLoading(true)
    const optionsFunction = loadOptions('variableNames', formState.thingId)
    const options = await optionsFunction()
    try {
      setOptions(options)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }
  const validateForm = () => {
    // not needed in this prototype
    return true
  }

  const handleChangeThingId = (value, { name }) => {
    const newFormState = { ...formState, [name]: value }
    setFormState(newFormState)
  }

  const handleChangeVariables = (value, { name, action }) => {
    switch (action) {
      case 'select-option':
      case 'input-change':
        if (value) {
          const newFormState = { ...formState, [name]: value }
          setFormState(newFormState)
        }
        return
      case 'remove-value':
      case 'clear': {
        const newFormState = { ...formState, [name]: undefined }
        setFormState(newFormState)
        return
      }
      default:
        return
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validateForm()) return
    onSubmit(formState)
    closeModal()
  }

  return (
    <div
      className="modal-container bottom-5 fixed top-0 left-0 z-50 flex h-full min-h-screen w-full items-center justify-end pr-10 px-4 py-5"
      onClick={(e) => {
        if (e.target.className.includes && e.target.className.includes('modal-container'))
          closeModal()
      }}
    >
      <div
        style={{ width: 500, height: 500 }}
        className="modal fixed top-24 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark overflow-auto"
      >
        <div className="py-4 px-7">
          <div className="w-full flex justify-end">
            <strong className="text-xl align-center cursor-pointer " onClick={closeModal}>
              &times;
            </strong>
          </div>
          <form>
            <div className="grid grid-cols-3 gap-5 justify-normal">
              <div className="flex flex-col gap-5.5 form-group w-full col-span-3">
                <div>
                  <label className="mb-3 block text-sm font-medium text-black " htmlFor="thingId">
                    Thing ID
                  </label>
                  <div className="relative bg-white">
                    <SettingsSelect.Single
                      name="thingId"
                      onChange={handleChangeThingId}
                      defaultValue={formState.thingId}
                      loadOptions={loadOptions('thingId')}
                    />
                  </div>
                </div>
              </div>

              <div className="form-group w-full col-span-3">
                <label className="mb-3 block text-black ">Variables</label>
                <div className="relative bg-white">
                  <SettingsSelect.Multi
                    name="variableNames"
                    isDisabled={!formState.thingId}
                    defaultValue={formState.variableNames}
                    value={formState.variableNames}
                    options={options}
                    onFocus={getOptionsAsync}
                    onChange={handleChangeVariables}
                    isLoading={isLoading}
                  />
                </div>
              </div>
            </div>
            <div className="w-full mt-8 flex justify-end">
              <button
                className="btn rounded bg-primary py-2 px-6 font-medium text-gray hover:shadow-1 "
                type="submit"
                onClick={handleSubmit}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

import clsx from 'clsx'
import AsyncSelect from 'react-select/async'
import Select, { components } from 'react-select'
import ChevronDownIcon from './icons/ChevronDownIcon'
import CloseIcon from './icons/CloseIcon'

const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <ChevronDownIcon />
    </components.DropdownIndicator>
  )
}

const ClearIndicator = (props) => {
  return (
    <components.ClearIndicator {...props}>
      <CloseIcon />
    </components.ClearIndicator>
  )
}

const MultiValueRemove = (props) => {
  return (
    <components.MultiValueRemove {...props}>
      <CloseIcon />
    </components.MultiValueRemove>
  )
}

const controlStyles = {
  base: 'border border-stroke rounded bg-white hover:cursor-pointer',
  focus: 'border-primary-600 ring-2 ring-secondary-300',
  nonFocus: 'border-gray-300 hover:border-gray-400'
}
const placeholderStyles = 'text-gray-500 pl-1 py-0.5'
const selectInputStyles = 'pl-1 py-0.5'
const valueContainerStyles = 'p-1 gap-1'
const singleValueStyles = 'leading-7 ml-1'
const multiValueStyles = 'bg-bodydark1 bg-gray-100 rounded items-center py-0.5 pl-2 pr-1 gap-1.5'
const multiValueLabelStyles = 'leading-6 py-0.5'
const multiValueRemoveStyles =
  'mx-2 h-2 w-2 hover:text-meta-1 h-full hover:bg-red-50 hover:text-red-800 text-gray-500 hover:border-red-300 rounded-md'
const indicatorsContainerStyles = 'p-1 gap-1'
const clearIndicatorStyles = 'text-gray-500 p-1 rounded-md hover:bg-red-50 hover:text-red-800'
const indicatorSeparatorStyles = 'bg-bodydark1'
const dropdownIndicatorStyles = 'p-1 hover:bg-gray-100 text-gray-500 rounded-md hover:text-black'
const menuStyles = 'p-1 border border-bodydark2 bg-white rounded'
const groupHeadingStyles = 'ml-3 mt-2 mb-1 text-gray-500 text-sm'
const optionStyles = {
  base: 'hover:cursor-pointer hover:bg-bodydark1 px-3 py-2 rounded',
  focus: 'bg-gray-100 active:bg-gray-200',
  selected: "after:content-['✔'] after:ml-2 after:text-green-500 text-gray-500"
}
const noOptionsMessageStyles =
  'text-gray-500 p-2 bg-gray-50 border border-dashed border-gray-200 rounded-sm'

const TailwindReactSelect = (props) => {
  const SelectComponent = props.async ? AsyncSelect : Select
  return (
    <SelectComponent
      name={props.name}
      isMulti={props.isMulti}
      closeMenuOnSelect={true}
      onChange={props.onChange}
      hideSelectedOptions={true}
      unstyled
      styles={{
        input: (base) => ({
          ...base,
          'input:focus': {
            boxShadow: 'none'
          }
        }),
        // On mobile, the label will truncate automatically, so we want to
        // override that behaviour.
        multiValueLabel: (base) => ({
          ...base,
          whiteSpace: 'normal',
          overflow: 'visible'
        }),
        control: (base) => ({
          ...base,
          transition: 'none'
        })
      }}
      components={{ DropdownIndicator, ClearIndicator, MultiValueRemove }}
      classNames={{
        control: ({ isFocused, isDisabled }) =>
          clsx(
            isDisabled ? '!bg-gray' : isFocused ? controlStyles.focus : controlStyles.nonFocus,
            controlStyles.base
          ),
        placeholder: () => placeholderStyles,
        input: () => selectInputStyles,
        valueContainer: () => valueContainerStyles,
        singleValue: () => singleValueStyles,
        multiValue: () => multiValueStyles,
        multiValueLabel: () => multiValueLabelStyles,
        multiValueRemove: () => multiValueRemoveStyles,
        indicatorsContainer: () => indicatorsContainerStyles,
        clearIndicator: () => clearIndicatorStyles,
        indicatorSeparator: () => indicatorSeparatorStyles,
        dropdownIndicator: () => dropdownIndicatorStyles,
        menu: () => menuStyles,
        groupHeading: () => groupHeadingStyles,
        option: ({ isFocused, isSelected }) =>
          clsx(
            isFocused && optionStyles.focus,
            isSelected && optionStyles.selected,
            optionStyles.base
          ),
        noOptionsMessage: () => noOptionsMessageStyles
      }}
      {...props}
    />
  )
}

const Single = (props) => {
  return <TailwindReactSelect async defaultOptions {...props} />
}
const Multi = (props) => {
  return <TailwindReactSelect isMulti defaultOptions {...props} />
}
export const SettingsSelect = { Single, Multi }

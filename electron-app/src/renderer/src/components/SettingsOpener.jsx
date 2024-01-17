import SettingsIcon from './icons/SettingsIcon'

const SettingsOpener = ({ className = '', setSettingsOpen }) => {
  return (
    <div className="w-full text-right fixed right-4">
      <button
        className={`bg-grey-light hover:bg-grey text-grey-darkest font-bold py-2 px-4 rounded inline-flex items-center ${className}`}
        onClick={() => {
          setSettingsOpen(true)
        }}
      >
        <SettingsIcon />
      </button>
    </div>
  )
}

export default SettingsOpener

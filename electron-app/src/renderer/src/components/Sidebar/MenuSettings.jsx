import { NavLink } from 'react-router-dom'
import SettingsIcon from '../icons/SettingsIcon'

const MenuSettings = ({ pathname }) => {
  return (
    <li>
      <NavLink
        to="/settings"
        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
          pathname.includes('settings') && 'bg-graydark dark:bg-meta-4'
        }`}
      >
        <SettingsIcon />
        Settings
      </NavLink>
    </li>
  )
}

export { MenuSettings }

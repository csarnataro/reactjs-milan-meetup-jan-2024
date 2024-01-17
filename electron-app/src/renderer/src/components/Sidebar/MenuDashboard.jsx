import { NavLink } from 'react-router-dom'
import SidebarLinkGroup from '../SidebarLinkGroup'
import DashboardIcon from '../icons/DashboardIcon'
import SubmenuExpandIcon from '../icons/SubmenuExpandIcon'

const MenuDashboard = ({ pathname, sidebarExpanded, setSidebarExpanded }) => {
  return (
    <SidebarLinkGroup activeCondition={pathname === '/' || pathname.includes('dashboard')}>
      {(handleClick, open) => {
        return (
          <>
            <NavLink
              to="#"
              className={`
                group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium
                text-bodydark1 duration-300 ease-in-out hover:bg-graydark
                ${(pathname === '/' || pathname.includes('dashboard')) && 'bg-graydark'}`}
              onClick={(e) => {
                e.preventDefault()
                sidebarExpanded ? handleClick() : setSidebarExpanded(true)
              }}
            >
              <DashboardIcon />
              Dashboard
              <SubmenuExpandIcon open={open} />
            </NavLink>
            {/* <!-- Dropdown Menu Start --> */}
            <div className={`translate transform overflow-hidden ${!open && 'hidden'}`}>
              <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6">
                <li>
                  <NavLink
                    role="menuitem"
                    to="/"
                    className={({ isActive }) =>
                      'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                      (isActive && '!text-white')
                    }
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    role="menuitem"
                    to="/traffic-light"
                    className={({ isActive }) =>
                      'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                      (isActive && '!text-white')
                    }
                  >
                    <div className="flex flex-col">
                      <span>Traffic light</span>
                    </div>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    role="menuitem"
                    to="/distance"
                    className={({ isActive }) =>
                      'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                      (isActive && '!text-white')
                    }
                  >
                    <div className="flex flex-col">
                      <span>Distance</span>
                    </div>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    role="menuitem"
                    to="/compass"
                    className={({ isActive }) =>
                      'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                      (isActive && '!text-white')
                    }
                  >
                    Compass
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    role="menuitem"
                    to="/greenhouse"
                    className={({ isActive }) =>
                      'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                      (isActive && '!text-white')
                    }
                  >
                    Greenhouse
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    role="menuitem"
                    to="/eyes"
                    className={({ isActive }) =>
                      'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                      (isActive && '!text-white')
                    }
                  >
                    <div className="flex flex-col">
                      <span>Gyroscope</span>
                    </div>
                  </NavLink>
                </li>

                <li>
                  <NavLink
                    role="menuitem"
                    to="/js-vs-ts"
                    className={({ isActive }) =>
                      'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                      (isActive && '!text-white')
                    }
                  >
                    JS/TS Survey
                  </NavLink>
                </li>
              </ul>
            </div>
            {/* <!-- Dropdown Menu End --> */}
          </>
        )
      }}
    </SidebarLinkGroup>
  )
}

export { MenuDashboard }

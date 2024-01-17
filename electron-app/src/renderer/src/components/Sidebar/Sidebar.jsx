import { useEffect, useRef, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { SidebarHeader } from './SidebarHeader'
import { MenuDashboard } from './MenuDashboard'
import { MenuSettings } from './MenuSettings'
import CloudIcon from '../icons/CloudIcon'
import ExternalResourceIcon from '../icons/ExternalResourceIcon'

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation()
  const { pathname } = location

  const trigger = useRef(null)
  const sidebar = useRef(null)

  const storedSidebarExpanded = localStorage.getItem('sidebar-expanded')
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === 'true'
  )

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return
      if (!sidebarOpen || sidebar.current.contains(target) || trigger.current.contains(target))
        return
      setSidebarOpen(false)
    }
    document.addEventListener('click', clickHandler)
    return () => document.removeEventListener('click', clickHandler)
  })

  // close when clickking on a menu item, identified by its role attribute
  useEffect(() => {
    const clickHandler = (ev) => {
      if (!sidebar.current || !trigger.current) return
      if (ev.target.role === 'menuitem') {
        setSidebarOpen(false)
      }
    }
    document.addEventListener('click', clickHandler)
    return () => document.removeEventListener('click', clickHandler)
  })

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return
      setSidebarOpen(false)
    }
    document.addEventListener('keydown', keyHandler)
    return () => document.removeEventListener('keydown', keyHandler)
  })

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString())
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded')
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded')
    }
  }, [sidebarExpanded])

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 lg:z-auto z-40 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear lg:static lg:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
    >
      <SidebarHeader
        triggerRef={trigger}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-1 py-4 px-4 lg:mt-1 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">MENU</h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              <MenuDashboard
                pathname={pathname}
                sidebarExpanded={sidebarExpanded}
                setSidebarExpanded={setSidebarExpanded}
              />
              <MenuSettings pathname={pathname} />
            </ul>
          </div>

          {/* <!-- Others Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2 uppercase">Resources</h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item Chart --> */}
              <li className="flex flex-wrap content-between">
                <NavLink
                  target="_blank"
                  to="https://docs.arduino.cc/arduino-cloud/"
                  className={`w-full group relative flex items-center gap-2.5 rounded-sm py-2 px-4 pl-3 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark `}
                >
                  <CloudIcon />
                  IoT Cloud docs
                  <ExternalResourceIcon />
                </NavLink>
              </li>
              {/* <!-- Menu Item Chart --> */}
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  )
}

export { Sidebar }

import { useEffect, useState } from 'react'

import { getVersion } from '../ipc'

const Versions = () => {
  const [versions] = useState(window.electron.process.versions)
  const [iotVersion, setIotVersion] = useState('0.0.0')
  const [iotJsVersion, setIotJsVersion] = useState('0.0.0')

  useEffect(() => {
    getVersion().then(([iotVersion, iotJsVersion]) => {
      setIotVersion(iotVersion)
      setIotJsVersion(iotJsVersion)
    })
  }, [])

  return (
    <ul className="mx-4">
      <VersionItem>Electron v{versions.electron}</VersionItem> |
      <VersionItem>Chromium v{versions.chrome}</VersionItem> |
      <VersionItem>Node v{versions.node}</VersionItem> |
      <VersionItem>IoT client (things){iotVersion}</VersionItem> |
      <VersionItem>IoT JS (mqtt) {iotJsVersion}</VersionItem>
    </ul>
  )
}

const VersionItem = ({ children }) => <li className="m-1 inline text-xs">{children}</li>

export default Versions

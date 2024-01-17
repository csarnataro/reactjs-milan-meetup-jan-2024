import { useEffect, useState } from 'react'
import { startListening, stopListening, on, off } from '../ipc'
import { Eye } from '../components/Eye'

const eyesCoordsKeys = 'eyes-coords'
const Eyes = () => {
  const [coords, setCoords] = useState([0.0, 0.0])

  const listener = (event, args) => {
    const newCoords = new Array(2)
    if (args.data[0]) {
      newCoords[0] = args.data[0] || 0
      newCoords[1] = coords[1] || 0
      setCoords(newCoords)
    } else if (args.data.length > 0 && args.data[1]) {
      newCoords[0] = coords[0] || 0
      newCoords[1] = args.data[1] || 0
      setCoords(newCoords)
    }
  }

  useEffect(() => {
    on(eyesCoordsKeys, listener)

    return () => off(eyesCoordsKeys, listener)
  }, [])

  useEffect(() => {
    startListening(eyesCoordsKeys)
    return () => stopListening(eyesCoordsKeys)
  }, [])

  return (
    <>
      <div className="p-4 flex flex-row gap-2" id="sketch-container">
        <Eye coords={coords} size={200} pupilSize={50} />
        <Eye coords={coords} size={200} pupilSize={50} />
      </div>
      <div>{JSON.stringify(coords)}</div>
    </>
  )
}

export { Eyes }

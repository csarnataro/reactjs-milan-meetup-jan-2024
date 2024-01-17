import { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'

import Home from './pages/Home'
import { Compass } from './pages/Compass'
import { Distance } from './pages/Distance'
import { Humidity } from './pages/Humidity'
import NotFound from './pages/NotFound'
import Settings from './pages/Settings'
import { Eyes } from './pages/Eyes'
import { JsVsTs } from './pages/JS_vs_TS'
import { TrafficLight } from './pages/TrafficLight'

const DefaultLayout = lazy(() => import('./layout/DefaultLayout'))

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route key={`router-${0}`} path="/compass" element={<Compass />} />
          <Route key={`router-${1}`} path="/settings" element={<Settings />} />
          <Route key={`router-${2}`} path="/" element={<Home />} />
          <Route key={`router-${3}`} path="/eyes" element={<Eyes />} />
          <Route key={`router-${4}`} path="/greenhouse" element={<Humidity />} />
          <Route key={`router-${5}`} path="/traffic-light" element={<TrafficLight />} />
          <Route key={`router-${5}`} path="/distance" element={<Distance />} />
          <Route key={`router-${6}`} path="/js-vs-ts" element={<JsVsTs />} />
          <Route key={`router-${7}`} path="/volume" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  )
}

export default App

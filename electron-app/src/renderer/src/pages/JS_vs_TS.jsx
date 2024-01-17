import { useEffect, useState } from 'react'
import * as qx from '../../vendor/qx82/qx.js'
import * as qxa from '../../vendor/qx82/qxa.js'

import {
  startListening,
  stopListening,
  on,
  off,
  getSettings,
  settingsOptions,
  saveSettings as ipcSaveSettings,
  getPropertiesInitialValues
} from '../ipc'
import { Modal } from '../components/Modal'
import SettingsOpener from '../components/SettingsOpener'
// import { Ring } from '../components/Ring'

let ATTACK_LENGTH = 7 // 5 frames
let prevJsVotes = 0
let prevTsVotes = 0

let jsVotes = 0
let tsVotes = 0
let jsPercentage = 0
let tsPercentage = 0
let attackInterval1 = 0
let attackInterval2 = 0
let attackInProgress1 = false
let attackInProgress2 = false

async function main() {
  // Clear screen using white foreground (7) over blue background (1).
  // qx.color(7, 1);
  // qx.cls();
  qx.redefineColors([
    '#000',
    '#f8c89a', // 1, white skin
    '#6a3314', // 2, brown hair
    '#a86948', // 3,
    '#0A0',
    '#0AA',
    '#AA0',
    '#DDD',
    '#666',
    '#00F',
    '#F00',
    '#F0F',
    '#0F0',
    '#0FF',
    '#FF0',
    '#FFF'
  ])

  backgroundImg = await qxa.loadImage('assets/ring-audience.png')
  sfxHit = await qxa.loadSound('assets/hit.wav')

  qx.frame(doTimedFrame)
}

const listener = (event, args) => {
  console.log('data', args.data)
  if (args.data[0]) jsPercentage = args.data[0].toFixed(2)
  if (args.data[1]) tsPercentage = args.data[1].toFixed(2)
  if (args.data[2]) jsVotes = args.data[2]
  if (args.data[3]) tsVotes = args.data[3]
}

function doTimedFrame() {
  qx.drawImage(0, 0, backgroundImg)
  qx.locate(0, 0)
  qx.color(15, 0)
  qx.printBox(32, 5, true, 0x80)

  qx.locate(2, 1)
  qx.color(15, 9)
  qx.print('TS')

  qx.color(9, -1)

  for (let i = 0; i < tsPercentage; i++) {
    qx.spr(0x84, 13 + i, 25)
  }

  qx.color(14, -1)
  for (let i = 0; i < jsPercentage; i++) {
    qx.spr(0x84, 148 + i, 25)
  }

  qx.locate(5, 1)
  qx.color(15, -1)
  qx.print('Player 1')

  qx.locate(2, 2)
  qx.print(`${tsVotes} - ${tsPercentage}%`)

  qx.locate(19, 1)
  qx.color(0, 14)
  qx.print('JS')

  qx.locate(22, 1)
  qx.color(15, -1)
  qx.print('Player 2')

  qx.locate(19, 2)
  qx.color(15, -1)
  qx.print(`${jsVotes} - ${jsPercentage}%`)

  attackTime--
  if (attackTime == randomJumpFrameP1 || attackTime == randomJumpFrameP1 + 1) {
    coordP1x--
  }

  if (attackTime == randomJumpFrameP2 || attackTime == randomJumpFrameP2) {
    coordP2x--
  }

  if (attackTime == 0) {
    randomJumpFrameP1 = Math.floor(Math.random() * 30)
    randomJumpFrameP2 = Math.floor(Math.random() * 30)

    coordP1x = INITIAL_P1_X
    coordP2x = INITIAL_P2_X
    attackTime = INITIAL_ATTACK_TIME
  }

  if (prevTsVotes !== tsVotes || qx.keyp('A')) {
    prevTsVotes = tsVotes
    attackInProgress1 = true
    attackInterval1 = ATTACK_LENGTH
  }

  if (attackInProgress1) {
    drawPlayer1Attack(coordP1x, coordP1y)
    if (attackInterval1 > 0) {
      attackInterval1 -= 1
      if (!playerPunching1) {
        qx.playSound(sfxHit)
        playerPunching1 = true
      }
    } else {
      playerPunching1 = false
      attackInProgress1 = false
    }
  } else {
    drawPlayer1Rest(coordP1x, coordP1y)
  }

  if (prevJsVotes !== jsVotes || qx.keyp('ArrowLeft')) {
    prevJsVotes = jsVotes
    attackInProgress2 = true
    attackInterval2 = ATTACK_LENGTH
  }

  if (attackInProgress2) {
    drawPlayer2Attack(coordP2x, coordP2y)
    if (attackInterval2 > 0) {
      attackInterval2 -= 1
      if (!playerPunching2) {
        qx.playSound(sfxHit)
        playerPunching2 = true
      }
    } else {
      playerPunching2 = false
      attackInProgress2 = false
    }
  } else {
    drawPlayer2Rest(coordP2x, coordP2y)
  }
}

function drawPlayer1Rest(x, y) {
  qx.color(1, -1)

  // body
  qx.spr(0xbc, x, y)
  qx.spr(0xac, x, y - 8)
  qx.spr(0x9c, x, y - 16)
  qx.spr(0xbd, x + 8, y)
  qx.spr(0xad, x + 8, y - 8)
  qx.spr(0x9d, x + 8, y - 16)

  // trunks
  qx.color(9, -1)
  qx.spr(0x90, x + 3, y - 5)

  // hair
  qx.color(2, -1)
  qx.spr(0x92, x + 4, y - 16)

  // gloves
  qx.color(9, -1)
  qx.spr(0x91, x + 5, y - 9)

  // shoes
  qx.color(0, -1)
  qx.spr(0x97, x + 2, y)
  qx.spr(0x97, x + 10, y)
}

function drawPlayer2Rest(x, y) {
  qx.color(3, -1)

  // body
  qx.spr(0xf7, x, y)
  qx.spr(0xe7, x, y - 8)
  qx.spr(0xd7, x, y - 16)
  qx.spr(0xf8, x + 8, y)
  qx.spr(0xe8, x + 8, y - 8)
  qx.spr(0xd8, x + 8, y - 16)

  // trunks
  qx.color(14, -1)
  qx.spr(0x90, x + 6, y - 5)

  // hair
  qx.color(0, -1)
  qx.spr(0x95, x + 4, y - 16)

  // gloves
  qx.color(14, -1)
  qx.spr(0x96, x + 3, y - 9)

  // shoes
  qx.color(0, -1)
  qx.spr(0x97, x + 4, y)
  qx.spr(0x97, x + 12, y)
}

function drawPlayer1Attack(x, y) {
  qx.color(1, -1)
  qx.spr(0xbe, x, y)
  qx.spr(0xae, x, y - 8)
  qx.spr(0x9e, x, y - 16)
  qx.spr(0xbf, x + 8, y)
  qx.spr(0xaf, x + 8, y - 8)
  qx.spr(0x9f, x + 8, y - 16)

  // trunks
  qx.color(9, -1)
  qx.spr(0x90, x + 4, y - 5)

  // hair
  qx.color(2, -1)
  qx.spr(0x92, x + 5, y - 16)

  // gloves
  qx.color(9, -1)
  qx.spr(0x93, x + 9, y - 9)

  // shoes
  qx.color(0, -1)
  qx.spr(0x98, x + 2, y)
  qx.spr(0x97, x + 12, y)
}

function drawPlayer2Attack(x, y) {
  qx.color(3, -1)

  // body
  qx.spr(0xf9, x, y)
  qx.spr(0xe9, x, y - 8)
  qx.spr(0xd9, x, y - 16)
  qx.spr(0xfa, x + 8, y)
  qx.spr(0xea, x + 8, y - 8)
  qx.spr(0xda, x + 8, y - 16)

  // trunks
  qx.color(14, -1)
  qx.spr(0x90, x + 5, y - 5)

  // hair
  qx.color(0, -1)
  qx.spr(0x95, x + 3, y - 16)

  // gloves
  qx.color(14, -1)
  qx.spr(0x94, x, y - 9)

  // shoes
  qx.color(0, -1)
  qx.spr(0x97, x + 3, y)
  qx.spr(0x98, x + 13, y)
}

const INITIAL_ATTACK_TIME = 60
let attackTime = INITIAL_ATTACK_TIME
let backgroundImg = null
let sfxHit = null
// let sfxBlast = null
let playerPunching1 = false
let playerPunching2 = false

const INITIAL_P1_X = 100 + 10
const INITIAL_P1_Y = 160
const INITIAL_P2_X = 115 + 10
const INITIAL_P2_Y = 160

let randomJumpFrameP1 = Math.floor(Math.random() * 30)
let randomJumpFrameP2 = Math.floor(Math.random() * 30)

let coordP1x = INITIAL_P1_X
let coordP1y = INITIAL_P1_Y

let coordP2x = INITIAL_P2_X
let coordP2y = INITIAL_P2_Y

const JsVsTs = () => {
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [settings, setSettings] = useState({})

  const jsVsTsKey = 'js-vs-ts'

  useEffect(() => {
    on(jsVsTsKey, listener)
    startListening(jsVsTsKey)

    return () => {
      off(jsVsTsKey, listener)
      stopListening(jsVsTsKey)
    }
  }, [])

  useEffect(() => {
    getSettings(jsVsTsKey).then(setSettings)
  }, [])

  useEffect(() => {
    if (settings && settings.thingId) {
      getPropertiesInitialValues({ thingId: settings.thingId.value }).then((initialValues) => {
        jsPercentage = initialValues.jsPercentage.toFixed(2)
        tsPercentage = initialValues.tsPercentage.toFixed(2)
        jsVotes = initialValues.buttonPushCounterJS
        tsVotes = initialValues.buttonPushCounterTS
      })
    }
  }, [settings])

  const saveSettings = async (settings) => {
    await ipcSaveSettings(jsVsTsKey, settings)
    getSettings(jsVsTsKey).then(setSettings)
  }

  useEffect(() => {
    qx.init(main)

    return () => qx.frame(null)
  }, [])

  return (
    <>
      <SettingsOpener
        className="fixed top-2 right-20 w-12 h-12 z-9999"
        setSettingsOpen={setSettingsOpen}
        settingsKey={jsVsTsKey}
      />
      <div>JS vs TS, who will win?</div>
      <div
        id="ring-container"
        className="absolute inset-y-20 flex flex-col items-center justify-center"
      ></div>
      {settingsOpen && (
        <Modal
          initialSettings={settings}
          onSubmit={saveSettings}
          closeModal={() => setSettingsOpen(false)}
          loadOptions={settingsOptions}
        />
      )}
    </>
  )
}

export { JsVsTs }

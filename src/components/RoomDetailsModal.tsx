"use client"

import type React from "react"
import { useState } from "react"
import {
  X,
  CloudSun,
  Thermometer,
  Bell,
  User2,
  Bed,
  CheckCircle2,
  Sun,
  Phone,
  Mail,
  Wrench,
  Lightbulb,
  DoorOpen,
} from "lucide-react"
import { Button } from "./ui/button"
import { useNavigate } from "react-router-dom"

interface RoomDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  room: {
    id: string
    number: string
    type: string
    floor: number
    status: "available" | "occupied" | "maintenance" | "cleaning"
    guestName?: string
    guestEmail?: string
    guestPhone?: string
    checkIn?: string
    checkOut?: string
    specialRequests?: string
  }
}
const statusColors: Record<string, string> = {
  available: "text-blue-600 dark:text-blue-400",
  occupied: "text-blue-600 dark:text-blue-400",
  maintenance: "text-blue-600 dark:text-blue-400",
  cleaning: "text-blue-600 dark:text-blue-400",
}




function ThermostatDial({ value = 25 }: { value: number }) {
  const radius = 66
  const stroke = 10
  const c = 2 * Math.PI * radius
  const min = 16
  const max = 32
  const pct = Math.min(1, Math.max(0, (value - min) / (max - min)))
  const dash = c * pct
  const remainder = c - dash

  return (
    <div className="relative flex items-center justify-center">
      <svg width="180" height="180" viewBox="0 0 180 180" className="rotate-135">
        <circle
          cx="90"
          cy="90"
          r={radius}
          fill="none"
          stroke="#E5E7EB"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${c}`}
          strokeDashoffset={c * 0.25}
        />
        <circle
          cx="90"
          cy="90"
          r={radius}
          fill="none"
          stroke="#3B82F6"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${dash} ${remainder}`}
          strokeDashoffset={c * 0.25}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <Thermometer className="h-5 w-5 text-gray-500 dark:text-gray-300 mb-1" />
        <div className="text-4xl font-bold text-gray-900 dark:text-white">{value}</div>
        <div className="text-gray-500 dark:text-gray-300">{"\u00B0"}C</div>
      </div>
    </div>
  )
}


const Tile: React.FC<React.PropsWithChildren<{ title?: string; className?: string }>> = ({
  children,
  title,
  className,
}) => (
  <div className={`rounded-2xl border bg-white dark:bg-slate-800 p-4 shadow-sm h-full ${className || ""}`}>
    {title ? <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 mb-2">{title}</div> : null}
    {children}
  </div>
)

const TogglePill = ({
  label,
  checked,
  onChange,
}: {
  label: string
  checked: boolean
  onChange: (v: boolean) => void
}) => {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm border transition-colors ${
        checked ? "bg-blue-600 text-white border-blue-600" : "bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600"
      }`}
      aria-pressed={checked}
    >
      <span className={`h-2.5 w-2.5 rounded-full ${checked ? "bg-white" : "bg-gray-300 dark:bg-gray-500"}`} />
      {label}
    </button>
  )
}

const QuickAction = ({
  icon,
  label,
}: {
  icon: React.ReactNode
  label: string
}) => (
  <button className="flex h-12 w-12 items-center justify-center rounded-xl border bg-white dark:bg-slate-700 text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-600">
    <span className="sr-only">{label}</span>
    {icon}
  </button>
)

const RoomDetailsModal: React.FC<RoomDetailsModalProps> = ({ isOpen, onClose, room }) => {
  const [dnd, setDnd] = useState(false)
  const [masterLight, setMasterLight] = useState(true)
  const [readingLight, setReadingLight] = useState(false)
  const [curtain, setCurtain] = useState(true)
  const [windowBlind, setWindowBlind] = useState(false)
  const [temp, setTemp] = useState(25)
  const navigate = useNavigate()

  if (!isOpen) return null

  // Dummy data to mimic the screenshot content
  const weather = { temp: 21, summary: "Partly Cloudy" }
  const time = "16:58"
  const language = "Romana"
  const guests = 1
  const rooms = 2

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-5xl rounded-3xl bg-white dark:bg-slate-900 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-700 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Bed className="h-5 w-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Room {room.number}</h2>
            </div>
            <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusColors[room.status]}`}>
              {room.status[0].toUpperCase() + room.status.slice(1)}
            </span>
          </div>
          <button onClick={onClose} className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" aria-label="Close">
            <X className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-5">
          {/* Top bar: weather, time, welcome, small icons */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 items-center">
            {/* Left: Weather + Time */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <CloudSun className="h-8 w-8 text-blue-600" />
                <div>
                  <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {weather.temp}
                    {"\u00B0"}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{weather.summary}</div>
                </div>
              </div>
              <div>
                <div className="text-2xl font-semibold text-gray-900 dark:text-white">{time}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{language}</div>
              </div>
            </div>

            {/* Center: Welcome */}
            <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left">
              <div className="text-2xl font-semibold text-gray-900 dark:text-white">Welcome Guest</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Room {room.number}. Have a nice day</div>
            </div>

            {/* Right: small stats row */}
            <div className="flex items-center justify-start gap-6 md:justify-end">
              {/* <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Bell className="h-5 w-5" />
                <span className="text-sm font-medium">01</span>
              </div> */}
              {/* <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <User2 className="h-5 w-5" />
                <span className="text-sm font-medium">{guests.toString().padStart(2, "0")}</span>
              </div> */}
              {/* <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                <Bed className="h-5 w-5" />
                <span className="text-sm font-medium">{rooms.toString().padStart(2, "0")}</span>
              </div> */}
            </div>
          </div>

          {/* Middle controls */}
          <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3 items-stretch">
            {/* Action tiles */}
            <div className="lg:col-span-2 grid grid-cols-1 gap-4 sm:grid-cols-3 items-stretch">
              <Tile>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">Check In</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">12:14 PM, 16 Jul</div>
                    </div>
                  </div>
                </div>
              </Tile>

              <Tile>
                <div className="flex items-center gap-3">
                  <DoorOpen className="h-5 w-5 text-blue-600" />
                  <div className="font-medium text-gray-900 dark:text-white">Clean Room</div>
                </div>
              </Tile>

              <Tile>
                <div className="flex items-center justify-between">
                  <div className="font-medium text-gray-900 dark:text-white">Do Not Disturb</div>
                  <TogglePill label={dnd ? "On" : "Off"} checked={dnd} onChange={setDnd} />
                </div>
              </Tile>

              {/* Lighting Control */}
              <Tile title="Lighting Control" className="sm:col-span-2">
                <div className="mb-4 flex items-center justify-between">
                  {/* <div className="flex items-center gap-2">
                    <Lightbulb className="h-4 w-4 text-amber-500" />
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Warm Lighting</span>
                  </div> */}
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center justify-between rounded-xl border border-gray-200 dark:border-gray-600 p-3">
                    <span className="text-sm text-gray-700 dark:text-gray-300">Master Light</span>
                    <TogglePill label={masterLight ? "On" : "Off"} checked={masterLight} onChange={setMasterLight} />
                  </div>
                  <div className="flex items-center justify-between rounded-xl border border-gray-200 dark:border-gray-600 p-3">
                    <span className="text-sm text-gray-700 dark:text-gray-300">Master Curtain</span>
                    <TogglePill label={curtain ? "Open" : "Close"} checked={curtain} onChange={setCurtain} />
                  </div>
                  <div className="flex items-center justify-between rounded-xl border border-gray-200 dark:border-gray-600 p-3">
                    <span className="text-sm text-gray-700 dark:text-gray-300">Reading Light</span>
                    <TogglePill label={readingLight ? "On" : "Off"} checked={readingLight} onChange={setReadingLight} />
                  </div>
                  <div className="flex items-center justify-between rounded-xl border border-gray-200 dark:border-gray-600 p-3">
                    <span className="text-sm text-gray-700 dark:text-gray-300">Master Window</span>
                    <TogglePill
                      label={windowBlind ? "Open" : "Close"}
                      checked={windowBlind}
                      onChange={setWindowBlind}
                    />
                  </div>
                </div>
              </Tile>

             

              <Tile className="sm:col-span-3">
                <div className="flex items-center gap-3 text-gray-900 dark:text-white">
                  <Wrench className="h-5 w-5 text-blue-600" />
                  <button className="font-medium" onClick={() => {
                    onClose()
                    navigate(`/technical-issues`, { state: { room: room.number } })
                    const event = new CustomEvent('showToast', { detail: { type: 'info', title: 'Report Issue', message: `Navigated to Technical Issues for Room ${room.number}` }})
                    window.dispatchEvent(event)
                  }}>Report Technical Issue</button>
                </div>
              </Tile>
            </div>

            {/* Thermostat */}
            <div className="rounded-2xl border bg-white dark:bg-slate-800 p-4 shadow-sm h-full">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300">Temperature Control</div>
                {/* <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                  <Sun className="h-4 w-4 text-amber-500" />
                  <span className="font-medium">Warm</span>
                </div> */}
              </div>
              <div className="flex flex-col items-center">
                <ThermostatDial value={temp} />
                <div className="mt-6 flex items-center gap-3">
                  <button
                    className="rounded-full border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
                    onClick={() => setTemp((t) => Math.max(16, t - 1))}
                    aria-label="Decrease temperature"
                  >
                    −
                  </button>
                  <button
                    className="rounded-full border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
                    onClick={() => setTemp((t) => Math.min(32, t + 1))}
                    aria-label="Increase temperature"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Footer buttons */}
          <div className="mt-8 flex justify-end gap-3 border-t border-gray-200 dark:border-gray-700 pt-6">
            <button 
              onClick={onClose} 
              className="rounded-lg border border-gray-300 dark:border-gray-600 px-6 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Close
            </button>
            <button 
              className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors" 
              onClick={() => {
                const event = new CustomEvent('showToast', { detail: { type: 'success', title: 'Saved', message: `Room ${room.number} settings saved` }})
                window.dispatchEvent(event)
                onClose()
              }}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RoomDetailsModal

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
    capacity: number
    guestName?: string
    guestEmail?: string
    guestPhone?: string
    checkIn?: string
    checkOut?: string
    specialRequests?: string
  }
}

const statusColors: Record<RoomDetailsModalProps["room"]["status"], string> = {
  available: "bg-green-100 text-green-700",
  occupied: "bg-red-100 text-red-700",
  maintenance: "bg-yellow-100 text-yellow-800",
  cleaning: "bg-blue-100 text-blue-700",
}

function ThermostatDial({ value = 25 }: { value: number }) {
  // Simple SVG arc gauge to mimic the dial on the right
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
        <Thermometer className="h-5 w-5 text-gray-500 mb-1" />
        <div className="text-4xl font-bold text-gray-900">{value}</div>
        <div className="text-gray-500">{"\u00B0"}C</div>
      </div>
    </div>
  )
}

const Tile: React.FC<React.PropsWithChildren<{ title?: string; className?: string }>> = ({
  children,
  title,
  className,
}) => (
  <div className={`rounded-2xl border bg-white p-4 shadow-sm h-full ${className || ""}`}>
    {title ? <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">{title}</div> : null}
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
        checked ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-700 border-gray-300"
      }`}
      aria-pressed={checked}
    >
      <span className={`h-2.5 w-2.5 rounded-full ${checked ? "bg-white" : "bg-gray-300"}`} />
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
  <button className="flex h-12 w-12 items-center justify-center rounded-xl border bg-white text-blue-600 hover:bg-blue-50">
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
      <div className="relative w-full max-w-5xl rounded-3xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b px-6 py-4">
          <div className="flex items-center gap-2">
            <Bed className="h-5 w-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-gray-900">Room {room.number}</h2>
            <span className={`ml-3 rounded-full px-2.5 py-1 text-xs ${statusColors[room.status]}`}>{room.status[0].toUpperCase() + room.status.slice(1)}</span>
          </div>
          <button onClick={onClose} className="rounded-full p-2 hover:bg-gray-100" aria-label="Close">
            <X className="h-5 w-5" />
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
                  <div className="text-2xl font-semibold text-gray-900">
                    {weather.temp}
                    {"\u00B0"}
                  </div>
                  <div className="text-sm text-gray-500">{weather.summary}</div>
                </div>
              </div>
              <div>
                <div className="text-2xl font-semibold text-gray-900">{time}</div>
                <div className="text-sm text-gray-500">{language}</div>
              </div>
            </div>

            {/* Center: Welcome */}
            <div className="flex flex-col justify-center items-center md:items-start text-center md:text-left">
              <div className="text-2xl font-semibold text-gray-900">Welcome Guest</div>
              <div className="text-sm text-gray-500">Room {room.number}. Have a nice day</div>
            </div>

            {/* Right: small stats row */}
            <div className="flex items-center justify-start gap-6 md:justify-end">
              <div className="flex items-center gap-2 text-gray-600">
                <Bell className="h-5 w-5" />
                <span className="text-sm">01</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <User2 className="h-5 w-5" />
                <span className="text-sm">{guests.toString().padStart(2, "0")}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Bed className="h-5 w-5" />
                <span className="text-sm">{rooms.toString().padStart(2, "0")}</span>
              </div>
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
                      <div className="font-medium text-gray-900">Check In</div>
                      <div className="text-xs text-gray-500">12:14 PM, 16 Jul</div>
                    </div>
                  </div>
                </div>
              </Tile>

              <Tile>
                <div className="flex items-center gap-3">
                  <DoorOpen className="h-5 w-5 text-blue-600" />
                  <div className="font-medium text-gray-900">Clean Room</div>
                </div>
              </Tile>

              <Tile>
                <div className="flex items-center justify-between">
                  <div className="font-medium text-gray-900">Do Not Disturb</div>
                  <TogglePill label={dnd ? "On" : "Off"} checked={dnd} onChange={setDnd} />
                </div>
              </Tile>

              {/* Lighting Control */}
              <Tile title="Lighting Control" className="sm:col-span-2">
                <div className="mb-3 flex items-center justify-between">
                  <div className="italic text-sm text-gray-500">Warm</div>
                  <Lightbulb className="h-5 w-5 text-amber-500" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center justify-between rounded-xl border p-3">
                    <span className="text-sm text-gray-700">Master Light</span>
                    <TogglePill label={masterLight ? "On" : "Off"} checked={masterLight} onChange={setMasterLight} />
                  </div>
                  <div className="flex items-center justify-between rounded-xl border p-3">
                    <span className="text-sm text-gray-700">Master Curtain</span>
                    <TogglePill label={curtain ? "Open" : "Close"} checked={curtain} onChange={setCurtain} />
                  </div>
                  <div className="flex items-center justify-between rounded-xl border p-3">
                    <span className="text-sm text-gray-700">Reading Light</span>
                    <TogglePill label={readingLight ? "On" : "Off"} checked={readingLight} onChange={setReadingLight} />
                  </div>
                  <div className="flex items-center justify-between rounded-xl border p-3">
                    <span className="text-sm text-gray-700">Master Window</span>
                    <TogglePill
                      label={windowBlind ? "Open" : "Close"}
                      checked={windowBlind}
                      onChange={setWindowBlind}
                    />
                  </div>
                </div>
              </Tile>

             

              <Tile className="sm:col-span-3">
                <div className="flex items-center gap-3 text-gray-900">
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
            <div className="rounded-2xl border bg-white p-4 shadow-sm h-full">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-gray-700">Temperature</div>
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Sun className="h-4 w-4 text-amber-500" />
                  <span>Warm</span>
                </div>
              </div>
              <div className="mt-4 flex flex-col items-center">
                <ThermostatDial value={temp} />
                <div className="mt-4 flex items-center gap-2">
                  <button
                    className="rounded-full border px-3 py-1 text-gray-700 hover:bg-gray-50"
                    onClick={() => setTemp((t) => Math.max(16, t - 1))}
                    aria-label="Decrease temperature"
                  >
                    -
                  </button>
                  <button
                    className="rounded-full border px-3 py-1 text-gray-700 hover:bg-gray-50"
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
          <div className="mt-6 flex justify-end gap-2 border-t pt-4">
            <button onClick={onClose} className="rounded-lg border px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
              Close
            </button>
            <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700" onClick={() => {
              const event = new CustomEvent('showToast', { detail: { type: 'success', title: 'Saved', message: `Room ${room.number} settings saved` }})
              window.dispatchEvent(event)
              onClose()
            }}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RoomDetailsModal

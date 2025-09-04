"use client"

import type React from "react"
import { useState, useMemo } from "react"
import {
  Bed,
  Users,
  Heart,
  Calendar,
  CreditCard,
  Search,
  Filter,
  Plus,
  ArrowUpDown,
  Home,
  Wifi,
  Tv,
  Snowflake,
  Droplets,
  Utensils,
  Dumbbell,
  Bath,
  Car,
  WashingMachine,
  Shirt,
  PhoneCall,
  BellRing,
  CheckCircle2,
  Wrench,
  User2,
} from "lucide-react"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import RoomDetailsModalComponent from "./RoomDetailsModal"

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

const statusColors: Record<string, string> = {
  available: "text-blue-600 dark:text-blue-400",
  occupied: "text-blue-600 dark:text-blue-400",
  maintenance: "text-blue-600 dark:text-blue-400",
  cleaning: "text-blue-600 dark:text-blue-400",
}

type RoomType = "standard" | "deluxe" | "suite" | "family" | "executive"
type RoomStatus = "available" | "occupied" | "maintenance" | "cleaning"

const roomTypeIcons = {
  standard: <Home className="h-4 w-4" />,
  deluxe: <Bed className="h-4 w-4" />,
  suite: <Heart className="h-4 w-4" />,
  family: <Users className="h-4 w-4" />,
  executive: <CreditCard className="h-4 w-4" />,
}

const roomAmenities = [
  { icon: <Wifi className="h-4 w-4" />, label: "WiFi" },
  { icon: <Tv className="h-4 w-4" />, label: "TV" },
  { icon: <Snowflake className="h-4 w-4" />, label: "AC" },
  { icon: <Bath className="h-4 w-4" />, label: "Bathtub" },
  { icon: <Droplets className="h-4 w-4" />, label: "Shower" },
  { icon: <Utensils className="h-4 w-4" />, label: "Breakfast" },
  { icon: <Dumbbell className="h-4 w-4" />, label: "Gym" },
  { icon: <Car className="h-4 w-4" />, label: "Parking" },
  { icon: <WashingMachine className="h-4 w-4" />, label: "Laundry" },
  { icon: <Shirt className="h-4 w-4" />, label: "Iron" },
  { icon: <PhoneCall className="h-4 w-4" />, label: "Phone" },
  { icon: <BellRing className="h-4 w-4" />, label: "Wake-up" },
]

const sampleRooms: RoomDetailsModalProps["room"][] = [
  {
    id: "1",
    number: "101",
    type: "standard",
    floor: 1,
    status: "available" as const,
    capacity: 2,
  },
  {
    id: "2",
    number: "102",
    type: "deluxe",
    floor: 1,
    status: "occupied" as const,
    capacity: 4,
    guestName: "John Doe",
    guestEmail: "john.doe@example.com",
    guestPhone: "123-456-7890",
    checkIn: "2023-10-01",
    checkOut: "2023-10-05",
  },
  // Add more sample rooms as needed
  {
    id: "3",
    number: "103",
    type: "suite",
    floor: 2,
    status: "maintenance" as const,
    capacity: 3,
  },
  {
    id: "4",
    number: "104",
    type: "family",
    floor: 2,
    status: "cleaning" as const,
    capacity: 4,
    guestName: "Jane Smith",
    guestEmail: "jane.smith@example.com",
    guestPhone: "987-654-3210",
    checkIn: "2023-10-06",
    checkOut: "2023-10-10",
  },
]


const RoomsManagement: React.FC = () => {
  const [selectedRoom, setSelectedRoom] = useState<RoomDetailsModalProps["room"] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<RoomStatus | "all">("all")
  const [floorFilter, setFloorFilter] = useState<number | "all">("all")
  const [sortBy, setSortBy] = useState<"number" | "capacity">("number")
  const [activeRoomId, setActiveRoomId] = useState<string | null>(null);

  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")
  const [rooms, setRooms] = useState<RoomDetailsModalProps["room"][]>(sampleRooms)
  const [showAddRoomModal, setShowAddRoomModal] = useState(false)
  const [newRoom, setNewRoom] = useState<RoomDetailsModalProps["room"]>({
    id: (Date.now()).toString(),
    number: "",
    type: "standard",
    floor: 1,
    status: "available",
    capacity: 2,
  })

  const filteredRooms = useMemo(() => {
    return rooms
      .filter((room) => {
        const matchesSearch =
          room.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
          room.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (room.guestName?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false)

        const matchesStatus = statusFilter === "all" || room.status === statusFilter
        const matchesFloor = floorFilter === "all" || room.floor === floorFilter

        return matchesSearch && matchesStatus && matchesFloor
      })
      .sort((a, b) => {
        if (sortBy === "number") {
          return sortOrder === "asc"
            ? Number.parseInt(a.number) - Number.parseInt(b.number)
            : Number.parseInt(b.number) - Number.parseInt(a.number)
        } else {
          return sortOrder === "asc" ? a.capacity - b.capacity : b.capacity - a.capacity
        }
      })
  }, [rooms, searchTerm, statusFilter, floorFilter, sortBy, sortOrder])

  const handleRoomClick = (room: RoomDetailsModalProps["room"]) => {
    setSelectedRoom(room)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedRoom(null)
  }

  const toggleSortOrder = (field: typeof sortBy) => {
    if (sortBy === field) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
    } else {
      setSortBy(field)
      setSortOrder("asc")
    }
  }

  const getSortIcon = (field: typeof sortBy) => {
    if (sortBy !== field) return <ArrowUpDown className="ml-1 h-3 w-3 opacity-50" />
    return sortOrder === "asc" ? (
      <ArrowUpDown className="ml-1 h-3 w-3 rotate-180" />
    ) : (
      <ArrowUpDown className="ml-1 h-3 w-3" />
    )
  }

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

        <div className="flex flex-col sm:flex-row gap-3">
          {/* <Button

            className="gap-2 h-11 px-5 border bg-blue-500 text-white "
            onClick={() => {
              setSearchTerm("")
              setStatusFilter("all")
              setFloorFilter("all")
            }}
          >
            Clear Filters
          </Button> */}

          <Button

            className="gap-2 h-11 px-5 text-white bg-blue-500 "
            onClick={() => setShowAddRoomModal(true)}
          >
            Add New Room
          </Button>
        </div>

      </div>
      {/* Stats Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700  transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Rooms</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{rooms.length}</p>
            </div>
            <div className="h-12 w-12  flex items-center justify-center">
              <Bed className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700  transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Occupied</p>
              <p className="text-2xl font-bold text-black-600 ">{rooms.filter(r => r.status === 'occupied').length}</p>
            </div>
            <div className="h-12 w-12  rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700  transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Available</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {rooms.filter(r => r.status === 'available').length}
              </p>
            </div>
            <div className="h-12 w-12   rounded-lg flex items-center justify-center">
              <CheckCircle2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700  transition-all duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Maintenance</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {rooms.filter(r => r.status === 'maintenance').length}
              </p>
            </div>
            <div className="h-12 w-12  rounded-lg flex items-center justify-center">
              <Wrench className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-4 sm:p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
              <Input
                type="text"
                placeholder="Search by room number"
                className="pl-10 h-12 text-base border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:border-blue-500 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="min-w-[160px]">
              <select
                className="w-full h-12 px-4 rounded-lg border border-gray-300 dark:border-gray-600 
             bg-white dark:bg-gray-700 text-gray-700 dark:text-white 
             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
             transition-all duration-200"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as RoomStatus | "all")}
              >
                <option value="all">All Status</option>
                <option value="available">Available</option>
                <option value="occupied">Occupied</option>
                <option value="maintenance">Maintenance</option>
                <option value="cleaning">Cleaning</option>
              </select>



            </div>

            <div className="min-w-[140px]">
              <select
                className="w-full h-12 px-4 rounded-lg border border-gray-300 dark:border-gray-600
               bg-white dark:bg-gray-700 text-gray-700 dark:text-white
               focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
               transition-all duration-200"
                value={floorFilter}
                onChange={(e) => setFloorFilter(e.target.value === "all" ? "all" : Number(e.target.value))}
              >
                <option value="all">All Floors</option>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((floor) => (
                  <option key={floor} value={floor}>
                    Floor {floor}
                  </option>
                ))}
              </select>
            </div>


            <Button
  variant="pill"
  className="h-12 px-6 bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
  onClick={() => {
    setSearchTerm("")
    setStatusFilter("all")
    setFloorFilter("all")
  }}
>
  Clear
</Button>

          </div>
        </div>
      </div>

      {/* Room Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
        {filteredRooms.map((room) => (
          <div
            key={room.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-300 cursor-pointer group flex flex-col h-full"
            onClick={() => handleRoomClick(room)}
          >
            {/* Room Header */}
            <div className="p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Room {room.number}</h3>
                  <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <span className="flex items-center bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full px-2 py-1">
                      {roomTypeIcons[room.type as RoomType]}
                      <span className="ml-1 capitalize font-medium">{room.type}</span>
                    </span>

                    <span className="bg-gray-100 dark:bg-gray-700 rounded-full px-2 py-1 font-medium">Floor {room.floor}</span>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-bold ${statusColors[room.status]}`}>
                  {room.status.charAt(0).toUpperCase() + room.status.slice(1)}
                </div>
              </div>

              {/* Room Details */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center text-blue-700 dark:text-blue-400 mb-1">
                    <Users className="h-4 w-4 mr-1" />
                    <span className="text-xs font-semibold uppercase">Capacity</span>
                  </div>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    {room.capacity} {room.capacity === 1 ? "Guest" : "Guests"}
                  </p>
                </div>
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3 border border-blue-200 dark:border-blue-800">
                  <div className="flex items-center text-blue-700 dark:text-blue-400 mb-1">
                    <Bed className="h-4 w-4 mr-1" />
                    <span className="text-xs font-semibold uppercase">Type</span>
                  </div>
                  <p className="text-lg font-bold text-gray-900 dark:text-white capitalize">{room.type}</p>
                </div>

              </div>

              {/* Guest Information */}
              {room.guestName && (
                <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-4 border border-indigo-200 dark:border-indigo-800 mb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <p className="text-xs font-bold text-indigo-700 dark:text-indigo-400 uppercase tracking-wide mb-1">Current Guest</p>
                      <p className="font-bold text-gray-900 dark:text-white">{room.guestName}</p>
                      <div className="flex items-center text-sm text-indigo-600 dark:text-indigo-400 mt-1">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span className="font-medium">{room.checkIn} - {room.checkOut}</span>
                      </div>
                    </div>
                    <div className="h-10 w-10 bg-indigo-500 dark:bg-indigo-600 rounded-full flex items-center justify-center ml-3">
                      <User2 className="h-5 w-5 text-white" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Action Footer */}

            <div className="px-5 py-4 border-t border-gray-200 dark:border-gray-700 mt-auto">
              <Button
                variant="pill"
                size="sm"
                className={`w-full font-semibold transition-all duration-200
    border
    border-blue-300 dark:border-blue-400
    bg-transparent
    text-blue-600
  `}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveRoomId(room.id);
                  handleRoomClick(room);
                }}
              >
                View Details
              </Button>


            </div>



          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredRooms.length === 0 && (
        <div className="text-center py-16">
          <div className="mx-auto h-24 w-24 text-gray-300 dark:text-gray-600 mb-6">
            <Bed className="h-full w-full opacity-20" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No rooms found</h3>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
            No rooms match your current search criteria. Try adjusting your filters or search terms.
          </p>
          <Button
            variant="pill"
            className="px-6 py-2"
            onClick={() => {
              setSearchTerm("")
              setStatusFilter("all")
              setFloorFilter("all")
            }}
          >
            Clear all filters
          </Button>
        </div>
      )}

      {/* Room Details Modal */}
      {selectedRoom && (
        <RoomDetailsModalComponent isOpen={isModalOpen} onClose={handleCloseModal} room={selectedRoom} />
      )}

      {/* Add Room Modal */}
      {showAddRoomModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-xl p-6 w-full max-w-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold">Add New Room</h3>
              <button className="text-2xl text-gray-400 " onClick={() => setShowAddRoomModal(false)}>&times;</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Room Number</label>
                <input className="w-full mt-1 px-3 py-2 border rounded-md bg-background" value={newRoom.number} onChange={e => setNewRoom({ ...newRoom, number: e.target.value })} />
              </div>
              <div>
                <label className="text-sm font-medium">Type</label>
                <select className="w-full mt-1 px-3 py-2 border rounded-md bg-background" value={newRoom.type} onChange={e => setNewRoom({ ...newRoom, type: e.target.value as RoomType })}>
                  <option value="standard">Standard</option>
                  <option value="deluxe">Deluxe</option>
                  <option value="suite">Suite</option>
                  <option value="family">Family</option>
                  <option value="executive">Executive</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium">Floor</label>
                <input type="number" className="w-full mt-1 px-3 py-2 border rounded-md bg-background" value={newRoom.floor} onChange={e => setNewRoom({ ...newRoom, floor: Number(e.target.value) })} />
              </div>
              <div>
                <label className="text-sm font-medium ">Status</label>
                <select className="w-full mt-1 px-3 py-2 border rounded-md " value={newRoom.status} onChange={e => setNewRoom({ ...newRoom, status: e.target.value as RoomStatus })}>
                  <option value="available">Available</option>
                  <option value="occupied">Occupied</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="cleaning">Cleaning</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="text-sm font-medium">Capacity</label>
                <input type="number" className="w-full mt-1 px-3 py-2 border rounded-md bg-background" value={newRoom.capacity} onChange={e => setNewRoom({ ...newRoom, capacity: Number(e.target.value) })} />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="pill" onClick={() => setShowAddRoomModal(false)}>Cancel</Button>
              <Button onClick={() => {
                if (!newRoom.number) return;
                setRooms(prev => [...prev, { ...newRoom, id: Date.now().toString() }]);
                setShowAddRoomModal(false);
                setNewRoom({ id: (Date.now()).toString(), number: "", type: "standard", floor: 1, status: "available", capacity: 2 });
              }}>Add Room</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default RoomsManagement

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import {
  Search,
  MoreHorizontal,
  ArrowUpDown,
  LogOut,
  Plus,
  X,
} from 'lucide-react';
import { formatDate } from '../lib/utils';

interface Guest {
  id: string;
  name: string;
  email: string;
  phone: string;
  roomNumber: string;
  checkIn: string;
  checkOut: string;
  status: 'checked-in' | 'checked-out' | 'pending';
  address: string;
  specialRequests: string[];
  lastActivity: string;
}

interface NewGuestForm {
  name: string;
  email: string;
  phone: string;
  address: string;
  roomNumber: string;
  checkIn: string;
  checkOut: string;
  specialRequests: string;
}

const GuestManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<keyof Guest>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);
  const [showGuestModal, setShowGuestModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [newGuestForm, setNewGuestForm] = useState<NewGuestForm>({
    name: '',
    email: '',
    phone: '',
    address: '',
    roomNumber: '',
    checkIn: '',
    checkOut: '',
    specialRequests: '',
  });

  const [guestList, setGuestList] = useState<Guest[]>([
    {
      id: '1',
      name: 'John Smith',
      email: 'john.smith@email.com',
      phone: '+1 (555) 123-4567',
      roomNumber: '101',
      checkIn: '2024-01-15',
      checkOut: '2024-01-18',
      status: 'checked-in',
      address: '123 Main St, New York, NY 10001',
      specialRequests: ['Late check-out', 'Extra towels'],
      lastActivity: '2 hours ago',
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      phone: '+1 (555) 987-6543',
      roomNumber: '205',
      checkIn: '2024-01-14',
      checkOut: '2024-01-20',
      status: 'checked-in',
      address: '456 Oak Ave, Los Angeles, CA 90210',
      specialRequests: ['Room service', 'Wake-up call'],
      lastActivity: '1 hour ago',
    },
    {
      id: '3',
      name: 'Michael Brown',
      email: 'michael.brown@email.com',
      phone: '+1 (555) 456-7890',
      roomNumber: '312',
      checkIn: '2024-01-16',
      checkOut: '2024-01-19',
      status: 'pending',
      address: '789 Pine Rd, Chicago, IL 60601',
      specialRequests: [],
      lastActivity: '30 minutes ago',
    },
    {
      id: '4',
      name: 'Emily Davis',
      email: 'emily.davis@email.com',
      phone: '+1 (555) 321-0987',
      roomNumber: '108',
      checkIn: '2024-01-10',
      checkOut: '2024-01-17',
      status: 'checked-out',
      address: '321 Elm St, Miami, FL 33101',
      specialRequests: ['Early check-in'],
      lastActivity: '1 day ago',
    },
  ]);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'checked-in':
        return <Badge variant="success">Checked In</Badge>;
      case 'checked-out':
        return <Badge variant="secondary">Checked Out</Badge>;
      case 'pending':
        return <Badge variant="warning">Pending</Badge>;
      default:
        return <Badge variant="default">{status}</Badge>;
    }
  };

  // Sorting
  const handleSort = (column: keyof Guest) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  // Add Guest
  const handleAddGuest = () => {
    // Validate required fields
    if (!newGuestForm.name || !newGuestForm.email || !newGuestForm.roomNumber) {
      alert('Please fill in all required fields (Name, Email, Room Number)');
      return;
    }

    const newGuest: Guest = {
      id: Date.now().toString(),
      name: newGuestForm.name,
      email: newGuestForm.email,
      phone: newGuestForm.phone,
      address: newGuestForm.address,
      roomNumber: newGuestForm.roomNumber,
      checkIn: newGuestForm.checkIn,
      checkOut: newGuestForm.checkOut,
      specialRequests: newGuestForm.specialRequests
        ? newGuestForm.specialRequests.split(',').map((s) => s.trim())
        : [],
      status: 'pending',
      lastActivity: 'Just now',
    };

    setGuestList([newGuest, ...guestList]);
    resetForm();
    
    // Show success message
    alert(`Guest ${newGuestForm.name} has been added successfully!`);
  };

  // Update Guest
  const handleUpdateGuest = () => {
    if (!selectedGuest) return;

    // Validate required fields
    if (!newGuestForm.name || !newGuestForm.email || !newGuestForm.roomNumber) {
      alert('Please fill in all required fields (Name, Email, Room Number)');
      return;
    }

    const updatedGuests = guestList.map((g) =>
      g.id === selectedGuest.id
        ? {
            ...g,
            name: newGuestForm.name,
            email: newGuestForm.email,
            phone: newGuestForm.phone,
            address: newGuestForm.address,
            roomNumber: newGuestForm.roomNumber,
            checkIn: newGuestForm.checkIn,
            checkOut: newGuestForm.checkOut,
            specialRequests: newGuestForm.specialRequests
              ? newGuestForm.specialRequests.split(',').map((s) => s.trim())
              : [],
            lastActivity: 'Just now',
          }
        : g
    );

    setGuestList(updatedGuests);
    setSelectedGuest(null);
    setShowUpdateModal(false);
    resetForm();
    
    // Show success message
    alert(`Guest ${newGuestForm.name} has been updated successfully!`);
  };

  const resetForm = () => {
    setNewGuestForm({
      name: '',
      email: '',
      phone: '',
      address: '',
      roomNumber: '',
      checkIn: '',
      checkOut: '',
      specialRequests: '',
    });
    setSelectedGuest(null);
    setShowGuestModal(false);
    setShowUpdateModal(false);
  };

  const handleOpenModal = (guest?: Guest) => {
    if (guest) {
      setSelectedGuest(guest);
      setNewGuestForm({
        name: guest.name,
        email: guest.email,
        phone: guest.phone,
        address: guest.address,
        roomNumber: guest.roomNumber,
        checkIn: guest.checkIn,
        checkOut: guest.checkOut,
        specialRequests: guest.specialRequests.join(', '),
      });
      setShowUpdateModal(true);
    } else {
      setShowGuestModal(true);
    }
  };

  // Filter & sort
  const filteredAndSortedGuests = guestList
    .filter(
      (guest) =>
        guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        guest.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        guest.roomNumber.includes(searchTerm)
    )
    .sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOrder === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      return 0;
    });

  // Pagination
  const totalGuests = filteredAndSortedGuests.length;
  const totalPages = Math.ceil(totalGuests / itemsPerPage);
  const paginatedGuests = filteredAndSortedGuests.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="space-y-6 p-4 bg-background min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center">
        {/* <h1 className="text-2xl font-bold">Guest Management</h1> */}
        <Button
          size="sm"
          variant="default"
          className="bg-blue-500 hover:bg-blue-600 text-white"
          onClick={() => handleOpenModal()}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Guest
        </Button>
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4 flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search guests"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 border rounded-md"
            />
          </div>
          <span className="text-sm">{totalGuests} guests found</span>
        </CardContent>
      </Card>

      {/* Guest Table */}
      <Card>
        <CardHeader>
          <CardTitle>Guest List</CardTitle>
          <CardDescription>
            All registered guests and their current status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="p-3 text-left">
                    <button
                      onClick={() => handleSort('name')}
                      className="flex items-center gap-1"
                    >
                      Name <ArrowUpDown className="h-4 w-4" />
                    </button>
                  </th>
                  <th className="p-3 text-left">Room</th>
                  <th className="p-3 text-left">Check-in</th>
                  <th className="p-3 text-left">Check-out</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedGuests.map((guest) => (
                  <tr
                    key={guest.id}
                    className="border-t hover:bg-muted/5 dark:hover:bg-muted/10 transition-colors"
                  >
                    <td className="p-3">
                      <div className="font-medium">{guest.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {guest.email}
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge variant="outline">Room {guest.roomNumber}</Badge>
                    </td>
                    <td className="p-3 text-sm">{formatDate(guest.checkIn)}</td>
                    <td className="p-3 text-sm">{formatDate(guest.checkOut)}</td>
                    <td className="p-3">{getStatusBadge(guest.status)}</td>
                    <td className="p-3 flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleOpenModal(guest)}
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                      {guest.status === 'checked-in' && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => alert(`Checking out ${guest.name}`)}
                        >
                          <LogOut className="h-4 w-4 mr-1" />
                          Check-out
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-2">
              <span className="text-sm">Rows per page:</span>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="border rounded p-1 text-sm"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
              >
                Prev
              </Button>
              <span className="text-sm">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                size="sm"
                variant="outline"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add Guest Modal */}
     {showGuestModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 overflow-auto">
    <Card className="w-full max-w-lg p-6 relative">
      <CardHeader className="flex justify-center items-center relative">
        <CardTitle>Add Guest</CardTitle>
        {/* Absolute positioned X button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={resetForm}
          className="absolute top-2 right-2"
        >
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-3 max-h-[80vh] overflow-y-auto">
        <input
          type="text"
          placeholder="Name *"
          value={newGuestForm.name}
          onChange={(e) =>
            setNewGuestForm({ ...newGuestForm, name: e.target.value })
          }
          className="w-full p-2 border rounded"
          required
        />
        {/* <input
          type="email"
          placeholder="Email *"
          value={newGuestForm.email}
          onChange={(e) =>
            setNewGuestForm({ ...newGuestForm, email: e.target.value })
          }
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Phone"
          value={newGuestForm.phone}
          onChange={(e) =>
            setNewGuestForm({ ...newGuestForm, phone: e.target.value })
          }
          className="w-full p-2 border rounded"
        /> */}
        <input
          type="text"
          placeholder="Room Number *"
          value={newGuestForm.roomNumber}
          onChange={(e) =>
            setNewGuestForm({ ...newGuestForm, roomNumber: e.target.value })
          }
          className="w-full p-2 border rounded"
          required
        />
        <label className="block text-sm">Check-in</label>
        <input
          type="date"
          value={newGuestForm.checkIn}
          onChange={(e) =>
            setNewGuestForm({ ...newGuestForm, checkIn: e.target.value })
          }
          className="w-full p-2 border rounded"
        />
        <label className="block text-sm">Check-out</label>
        <input
          type="date"
          value={newGuestForm.checkOut}
          onChange={(e) =>
            setNewGuestForm({ ...newGuestForm, checkOut: e.target.value })
          }
          className="w-full p-2 border rounded"
        />
        {/* <textarea
          placeholder="Address"
          value={newGuestForm.address}
          onChange={(e) =>
            setNewGuestForm({ ...newGuestForm, address: e.target.value })
          }
          className="w-full p-2 border rounded"
        />
        <textarea
          placeholder="Special Requests (comma separated)"
          value={newGuestForm.specialRequests}
          onChange={(e) =>
            setNewGuestForm({
              ...newGuestForm,
              specialRequests: e.target.value,
            })
          }
          className="w-full p-2 border rounded"
        /> */}

        {/* Buttons */}
        <div className="flex justify-end gap-2 mt-2 sticky bottom-0 bg-background p-2">
          <Button
            variant="outline"
            onClick={resetForm}
            className="mr-2"
          >
            Cancel
          </Button>
          <Button
            variant="default"
            className="bg-blue-500 hover:bg-blue-600 text-white"
            onClick={handleAddGuest}
          >
            Add Guest
          </Button>
        </div>
      </CardContent>
    </Card>
  </div>
)}

      {/* Update Guest Modal */}
      {showUpdateModal && selectedGuest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 overflow-auto">
          <Card className="w-full max-w-lg p-6 relative">
            <CardHeader className="flex justify-center items-center relative">
              <CardTitle>Update Guest - {selectedGuest.name}</CardTitle>
              {/* Absolute positioned X button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={resetForm}
                className="absolute top-2 right-2"
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="space-y-3 max-h-[80vh] overflow-y-auto">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name *</label>
                  <input
                    type="text"
                    value={newGuestForm.name}
                    onChange={(e) =>
                      setNewGuestForm({ ...newGuestForm, name: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email *</label>
                  <input
                    type="email"
                    value={newGuestForm.email}
                    onChange={(e) =>
                      setNewGuestForm({ ...newGuestForm, email: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Phone</label>
                  <input
                    type="text"
                    value={newGuestForm.phone}
                    onChange={(e) =>
                      setNewGuestForm({ ...newGuestForm, phone: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Room Number *</label>
                  <input
                    type="text"
                    value={newGuestForm.roomNumber}
                    onChange={(e) =>
                      setNewGuestForm({ ...newGuestForm, roomNumber: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Check-in</label>
                  <input
                    type="date"
                    value={newGuestForm.checkIn}
                    onChange={(e) =>
                      setNewGuestForm({ ...newGuestForm, checkIn: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Check-out</label>
                  <input
                    type="date"
                    value={newGuestForm.checkOut}
                    onChange={(e) =>
                      setNewGuestForm({ ...newGuestForm, checkOut: e.target.value })
                    }
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Address</label>
                <textarea
                  value={newGuestForm.address}
                  onChange={(e) =>
                    setNewGuestForm({ ...newGuestForm, address: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Special Requests</label>
                <textarea
                  placeholder="Enter special requests separated by commas"
                  value={newGuestForm.specialRequests}
                  onChange={(e) =>
                    setNewGuestForm({
                      ...newGuestForm,
                      specialRequests: e.target.value,
                    })
                  }
                  className="w-full p-2 border rounded"
                  rows={3}
                />
              </div>

              {/* Current Status Display */}
              <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                <label className="block text-sm font-medium mb-1">Current Status</label>
                <div className="flex items-center gap-2">
                  {getStatusBadge(selectedGuest.status)}
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Last activity: {selectedGuest.lastActivity}
                  </span>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-2 mt-4 sticky bottom-0 bg-background p-2">
                <Button
                  variant="outline"
                  onClick={resetForm}
                  className="mr-2"
                >
                  Cancel
                </Button>
                <Button
                  variant="default"
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                  onClick={handleUpdateGuest}
                >
                  Update Guest
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

    </div>
  );
};

export default GuestManagement;

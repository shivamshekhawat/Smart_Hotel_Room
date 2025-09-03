import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  Search, 
  Filter, 
  MoreHorizontal, 
  ArrowUpDown,
  Phone,
  Mail,
  MapPin,
  LogOut,
  Plus,
  X
} from 'lucide-react';
import { formatDate, formatCurrency } from '../lib/utils';

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
  const [showAddGuestModal, setShowAddGuestModal] = useState(false);
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

  const guests: Guest[] = [
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
      lastActivity: '2 hours ago'
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
      lastActivity: '1 hour ago'
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
      lastActivity: '30 minutes ago'
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
      lastActivity: '1 day ago'
    }
  ];

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

  const handleSort = (column: keyof Guest) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const filteredAndSortedGuests = guests
    .filter(guest => 
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
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      return 0;
    });

  const GuestProfilePopover = ({ guest }: { guest: Guest }) => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle className="text-lg">{guest.name}</CardTitle>
        <CardDescription>Guest Details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{guest.email}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{guest.phone}</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{guest.address}</span>
          </div>
        </div>
        
        <div className="border-t pt-4">
          <h4 className="font-medium mb-2">Special Requests</h4>
          {guest.specialRequests.length > 0 ? (
            <div className="space-y-1">
              {guest.specialRequests.map((request, index) => (
                <Badge key={index} variant="outline" className="mr-1">
                  {request}
                </Badge>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No special requests</p>
          )}
        </div>
        
        <div className="border-t pt-4">
          <h4 className="font-medium mb-2">Payment Status</h4>
          <div className="space-y-1">
           
           
            <div className="flex justify-between text-sm">
              
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const handleAddGuest = () => {
    // Validate form
    if (!newGuestForm.name || !newGuestForm.email || !newGuestForm.phone || !newGuestForm.roomNumber) {
      const event = new CustomEvent('showToast', {
        detail: { type: 'error', title: 'Validation Error', message: 'Please fill in all required fields' }
      });
      window.dispatchEvent(event);
      return;
    }

    // Add new guest to the list (in a real app, this would be an API call)
    const newGuest: Guest = {
      id: Date.now().toString(),
      name: newGuestForm.name,
      email: newGuestForm.email,
      phone: newGuestForm.phone,
      address: newGuestForm.address,
      roomNumber: newGuestForm.roomNumber,
      checkIn: newGuestForm.checkIn,
      checkOut: newGuestForm.checkOut,
      status: 'pending',
      
      specialRequests: newGuestForm.specialRequests ? [newGuestForm.specialRequests] : [],
      lastActivity: 'Just now'
    };

    // In a real app, you would add this to your state or send to API
    console.log('New guest added:', newGuest);

    // Show success message
    const event = new CustomEvent('showToast', {
      detail: { type: 'success', title: 'Guest Added', message: `${newGuestForm.name} has been successfully added` }
    });
    window.dispatchEvent(event);

    // Reset form and close modal
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
    setShowAddGuestModal(false);
  };

  const handleFormChange = (field: keyof NewGuestForm, value: string | number) => {
    setNewGuestForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="space-y-6 sm:space-y-8 p-4 sm:p-6 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 min-h-screen">
      {/* Page Header */}
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Guest Management</h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-1">Manage all guests and reservations</p>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => {
                const event = new CustomEvent('showToast', {
                  detail: { type: 'info', title: 'Filter Guests', message: 'Filter options coming soon!' }
                });
                window.dispatchEvent(event);
              }}
              className="hidden sm:inline-flex"
            >
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
            <Button size="sm" onClick={() => setShowAddGuestModal(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Guest
            </Button>
          </div>
        </div>
      </div>
      {/* <div className="flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Guest Management
          </h2>
          <p className="text-muted-foreground mt-2 text-lg">Manage all hotel guests and their information</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => {
              const event = new CustomEvent('showToast', {
                detail: { type: 'info', title: 'Filter Guests', message: 'Filter options coming soon!' }
              });
              window.dispatchEvent(event);
            }}
            className="hover:bg-blue-50 hover:border-blue-200 transition-all duration-200"
          >
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button 
            size="sm"
            onClick={() => setShowAddGuestModal(true)}
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 transition-all duration-200"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Guest
          </Button>
        </div>
      </div> */}

      {/* Search and Filters */}
      <div className="mx-auto w-full max-w-7xl">
      <Card className="border border-gray-100 dark:border-gray-700/60 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search guests "
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 dark:border-gray-700 rounded-xl bg-background focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            <div className="text-sm text-muted-foreground font-medium whitespace-nowrap">
              {filteredAndSortedGuests.length} guests found
            </div>
          </div>
        </CardContent>
      </Card>
      </div>

      {/* Guests Table */}
      <div className="mx-auto w-full max-w-7xl">
      <Card className="border border-gray-100 dark:border-gray-700/60 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl font-bold">Guest List</CardTitle>
          <CardDescription className="text-base">All registered guests and their current status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead className="bg-gray-50/70 dark:bg-slate-700/50">
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left p-4 font-medium">
                    <button
                      onClick={() => handleSort('name')}
                      className="flex items-center space-x-1 hover:text-primary"
                    >
                      <span>Name</span>
                      <ArrowUpDown className="h-4 w-4" />
                    </button>
                  </th>
                  <th className="text-left p-4 font-medium">
                    <button
                      onClick={() => handleSort('roomNumber')}
                      className="flex items-center space-x-1 hover:text-primary"
                    >
                      <span>Room</span>
                      <ArrowUpDown className="h-4 w-4" />
                    </button>
                  </th>
                  <th className="text-left p-4 font-medium">
                    <button
                      onClick={() => handleSort('checkIn')}
                      className="flex items-center space-x-1 hover:text-primary"
                    >
                      <span>Check-in</span>
                      <ArrowUpDown className="h-4 w-4" />
                    </button>
                  </th>
                  <th className="text-left p-4 font-medium">
                    <button
                      onClick={() => handleSort('checkOut')}
                      className="flex items-center space-x-1 hover:text-primary"
                    >
                      <span>Check-out</span>
                      <ArrowUpDown className="h-4 w-4" />
                    </button>
                  </th>
                  <th className="text-left p-4 font-medium">Status</th>
                  
                  <th className="text-left p-4 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredAndSortedGuests.map((guest) => (
                  <tr key={guest.id} className="hover:bg-muted/50">
                    <td className="p-4">
                      <div>
                        <div className="font-medium">{guest.name}</div>
                        <div className="text-sm text-muted-foreground">{guest.email}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge variant="outline">Room {guest.roomNumber}</Badge>
                    </td>
                    <td className="p-4 text-sm">{formatDate(guest.checkIn)}</td>
                    <td className="p-4 text-sm">{formatDate(guest.checkOut)}</td>
                    <td className="p-4">{getStatusBadge(guest.status)}</td>
                    <td className="p-4">
                      <div className="text-sm">
                       
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedGuest(guest)}
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                        {guest.status === 'checked-in' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const event = new CustomEvent('showToast', {
                                detail: { type: 'success', title: 'Check-out', message: `Processing check-out for ${guest.name}` }
                              });
                              window.dispatchEvent(event);
                            }}
                          >
                            <LogOut className="h-4 w-4 mr-1" />
                            Check-out
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      </div>

      {/* Guest Profile Popover */}
      {selectedGuest && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background rounded-lg shadow-lg">
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="text-lg font-semibold">Guest Profile</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedGuest(null)}
              >
                ×
              </Button>
            </div>
            <GuestProfilePopover guest={selectedGuest} />
          </div>
        </div>
      )}

      {/* Add Guest Modal */}
      {showAddGuestModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b flex items-center justify-between">
              <h3 className="text-xl font-semibold">Add New Guest</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAddGuestModal(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name *</label>
                  <input
                    type="text"
                    value={newGuestForm.name}
                    onChange={(e) => handleFormChange('name', e.target.value)}
                    className="w-full p-3 border rounded-md bg-background"
                    placeholder="Enter full name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Email *</label>
                  <input
                    type="email"
                    value={newGuestForm.email}
                    onChange={(e) => handleFormChange('email', e.target.value)}
                    className="w-full p-3 border rounded-md bg-background"
                    placeholder="Enter email address"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Phone *</label>
                  <input
                    type="tel"
                    value={newGuestForm.phone}
                    onChange={(e) => handleFormChange('phone', e.target.value)}
                    className="w-full p-3 border rounded-md bg-background"
                    placeholder="Enter phone number"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Room Number *</label>
                  <input
                    type="text"
                    value={newGuestForm.roomNumber}
                    onChange={(e) => handleFormChange('roomNumber', e.target.value)}
                    className="w-full p-3 border rounded-md bg-background"
                    placeholder="Enter room number"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Check-in Date</label>
                  <input
                    type="date"
                    value={newGuestForm.checkIn}
                    onChange={(e) => handleFormChange('checkIn', e.target.value)}
                    className="w-full p-3 border rounded-md bg-background"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Check-out Date</label>
                  <input
                    type="date"
                    value={newGuestForm.checkOut}
                    onChange={(e) => handleFormChange('checkOut', e.target.value)}
                    className="w-full p-3 border rounded-md bg-background"
                  />
                </div>
                
                <div>
                 
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Address</label>
                <input
                  type="text"
                  value={newGuestForm.address}
                  onChange={(e) => handleFormChange('address', e.target.value)}
                  className="w-full p-3 border rounded-md bg-background"
                  placeholder="Enter address"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Special Requests</label>
                <textarea
                  value={newGuestForm.specialRequests}
                  onChange={(e) => handleFormChange('specialRequests', e.target.value)}
                  className="w-full p-3 border rounded-md bg-background"
                  placeholder="Enter any special requests or notes"
                  rows={3}
                />
              </div>
            </div>
            
            <div className="p-6 border-t flex items-center justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowAddGuestModal(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddGuest}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Guest
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GuestManagement;

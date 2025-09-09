import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  Bell, 
  Send, 
  Clock, 
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'urgent' | 'success';
  target: 'all' | 'room' | 'guest' | 'floor' | 'multipleRooms';
  targetId?: string | string[];
  priority: 'low' | 'medium' | 'high';
  status: 'sent' | 'delivered' | 'read' | 'failed';
  sentAt: string;
  deliveredAt?: string;
  readAt?: string;
}

const Notifications = () => {
  const [notificationForm, setNotificationForm] = useState({
    message: '',
    target: 'all' as 'all' | 'room' | 'guest' | 'floor' | 'multipleRooms',
    targetId: '' as string | string[],
    priority: 'medium' as 'low' | 'medium' | 'high'
  });

  const notifications: Notification[] = [
    {
      id: '1',
      title: 'Welcome Message',
      message: 'Welcome to our hotel! We hope you enjoy your stay.',
      type: 'info',
      target: 'all',
      priority: 'low',
      status: 'delivered',
      sentAt: '2024-01-15T10:00:00Z',
      deliveredAt: '2024-01-15T10:01:00Z'
    },
    {
      id: '2',
      title: 'Maintenance Notice',
      message: 'Scheduled maintenance in Room 312. Completed by 2 PM.',
      type: 'warning',
      target: 'room',
      targetId: '312',
      priority: 'medium',
      status: 'read',
      sentAt: '2024-01-15T09:00:00Z',
      deliveredAt: '2024-01-15T09:01:00Z',
      readAt: '2024-01-15T09:15:00Z'
    }
  ];

  const rooms = [
    { id: '101', number: '101', guest: 'John Smith' },
    { id: '102', number: '102', guest: 'Sarah Johnson' },
    { id: '201', number: '201', guest: 'Michael Brown' },
    { id: '202', number: '202', guest: 'Emily Davis' },
  ];

  const floors = [
    { id: '1', name: '1st Floor', rooms: ['101', '102'] },
    { id: '2', name: '2nd Floor', rooms: ['201', '202'] },
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'info': return <Bell className="h-4 w-4" />;
      case 'warning': return <AlertTriangle className="h-4 w-4" />;
      case 'urgent': return <AlertTriangle className="h-4 w-4" />;
      case 'success': return <CheckCircle className="h-4 w-4" />;
      default: return <Bell className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'info': return 'text-blue-500';
      case 'warning': return 'text-yellow-500';
      case 'urgent': return 'text-red-500';
      case 'success': return 'text-green-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'sent':
        return <Badge variant="default">Sent</Badge>;
      case 'delivered':
        return <Badge variant="info">Delivered</Badge>;
      case 'read':
        return <Badge variant="success">Read</Badge>;
      case 'failed':
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge variant="default">{status}</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'low':
        return <Badge variant="outline">Low</Badge>;
      case 'medium':
        return <Badge variant="warning">Medium</Badge>;
      case 'high':
        return <Badge variant="destructive">High</Badge>;
      default:
        return <Badge variant="default">{priority}</Badge>;
    }
  };

  const formatTarget = (target: Notification['target'], targetId?: string | string[]) => {
    if (target === 'all') return 'All Guests';
    if (target === 'room') return `Room ${targetId}`;
    if (target === 'guest') return `Guest: ${targetId}`;
    if (target === 'floor') {
      const floor = floors.find(f => f.id === targetId);
      return `Floor: ${floor?.name || targetId}`;
    }
    if (target === 'multipleRooms') {
      return `Rooms: ${(targetId as string[]).join(', ')}`;
    }
    return '';
  };

  const handleSendNotification = () => {
    console.log('Sending notification:', notificationForm);

    if (notificationForm.target === 'multipleRooms' && Array.isArray(notificationForm.targetId)) {
      console.log("Send to multiple rooms:", notificationForm.targetId);
    } else if (notificationForm.target === 'floor') {
      console.log("Send to floor:", notificationForm.targetId);
    }

    // Reset
    setNotificationForm({
      message: '',
      target: 'all',
      targetId: '',
      priority: 'medium'
    });

    const event = new CustomEvent('showToast', {
      detail: { type: 'success', title: 'Notification Sent', message: 'Notification sent successfully!' }
    });
    window.dispatchEvent(event);
  };

  return (
    <div className="space-y-6 dark:bg-gradient-to-b dark:from-slate-900 dark:to-slate-800">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-gray-50 dark:bg-gray-800">
        {/* Send Notification Form */}
        <Card>
          <CardContent className="space-y-4 bg-gray-50 dark:bg-gray-800">
            <div>
              <label className="text-sm font-medium">Message</label>
              <textarea
                value={notificationForm.message}
                onChange={(e) => setNotificationForm({...notificationForm, message: e.target.value})}
                placeholder="Enter notification message"
                rows={4}
                className="w-full mt-1 px-3 py-2 border dark:border-gray-600 rounded-md bg-background dark:bg-gray-800 text-gray-900 dark:text-gray-200"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Priority</label>
                <select
                  value={notificationForm.priority}
                  onChange={(e) => setNotificationForm({...notificationForm, priority: e.target.value as any})}
                  className="w-full mt-1 px-3 py-2 border dark:border-gray-600 rounded-md bg-background dark:bg-gray-800 text-gray-900 dark:text-gray-200"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium dark:text-gray-200">Target</label>
              <select
                value={notificationForm.target}
                onChange={(e) => setNotificationForm({...notificationForm, target: e.target.value as any, targetId: ''})}
                className="w-full mt-1 px-3 py-2 border dark:border-gray-600 rounded-md bg-background dark:bg-gray-800 text-gray-900 dark:text-gray-200"
              >
                <option value="all">All Guests</option>
                <option value="room">Specific Room</option>
                <option value="guest">Specific Guest</option>
                <option value="floor">By Floor</option>
                <option value="multipleRooms">Multiple Rooms</option>
              </select>
            </div>

            {notificationForm.target === 'room' && (
              <div>
                <label className="text-sm font-medium">Room Number</label>
                <select
                  value={notificationForm.targetId as string}
                  onChange={(e) => setNotificationForm({...notificationForm, targetId: e.target.value})}
                  className="w-full mt-1 px-3 py-2 border dark:border-gray-600 rounded-md bg-background"
                >
                  <option value="">Select Room</option>
                  {rooms.map(room => (
                    <option key={room.id} value={room.number}>
                      Room {room.number} - {room.guest}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {notificationForm.target === 'guest' && (
              <div>
                <label className="text-sm font-medium">Guest Name</label>
                <select
                  value={notificationForm.targetId as string}
                  onChange={(e) => setNotificationForm({...notificationForm, targetId: e.target.value})}
                  className="w-full mt-1 px-3 py-2 border dark:border-gray-600 rounded-md bg-background"
                >
                  <option value="">Select Guest</option>
                  {rooms.map(room => (
                    <option key={room.id} value={room.guest}>
                      {room.guest} - Room {room.number}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {notificationForm.target === 'floor' && (
              <div>
                <label className="text-sm font-medium">Select Floor</label>
                <select
                  value={notificationForm.targetId as string}
                  onChange={(e) => setNotificationForm({...notificationForm, targetId: e.target.value})}
                  className="w-full mt-1 px-3 py-2 border dark:border-gray-600 rounded-md bg-background"
                >
                  <option value="">Select Floor</option>
                  {floors.map(floor => (
                    <option key={floor.id} value={floor.id}>
                      {floor.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {notificationForm.target === 'multipleRooms' && (
              <div>
                <label className="text-sm font-medium">Select Rooms</label>
                <select
                  multiple
                  value={notificationForm.targetId as string[]}
                  onChange={(e) => {
                    const selected = Array.from(e.target.selectedOptions, option => option.value);
                    setNotificationForm({...notificationForm, targetId: selected});
                  }}
                  className="w-full mt-1 px-3 py-2 border dark:border-gray-600 rounded-md bg-background h-32"
                >
                  {rooms.map(room => (
                    <option key={room.id} value={room.number}>
                      Room {room.number} - {room.guest}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-muted-foreground mt-1">
                  Hold CTRL (Windows) or CMD (Mac) to select multiple rooms.
                </p>
              </div>
            )}

<div className="flex space-x-2 bg-gray-50  dark:bg-gray-800">
  <Button
    type="button"
    onClick={handleSendNotification}
    className="flex-1"
    disabled={!notificationForm.message.trim()}
  >
    <Send className="mr-2 h-4 w-4 text-white" />
    Send Notification
  </Button>
</div>

          </CardContent>
        </Card>
      </div>

      {/* Sent Notifications Timeline */}
      <Card className="bg-gray-50 dark:bg-gray-800">
        <CardHeader>
          <CardTitle>Sent Notifications</CardTitle>
          <CardDescription>History of all sent notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div key={notification.id} className="flex items-start space-x-4 p-4 border dark:border-gray-700 rounded-lg hover:bg-muted/50">
                <div className={`p-2 rounded-full ${getTypeColor(notification.type)} bg-opacity-10`}>
                  {getTypeIcon(notification.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">{notification.title}</h4>
                    <div className="flex items-center space-x-2">
                      {getStatusBadge(notification.status)}
                      {getPriorityBadge(notification.priority)}
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mt-1">
                    {notification.message}
                  </p>

                  <p className="text-xs mt-1 text-gray-500 dark:text-gray-400">
                    Target: {formatTarget(notification.target, notification.targetId)}
                  </p>
                  
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>Sent {new Date(notification.sentAt).toLocaleString()}</span>
                      </div>
                      {notification.deliveredAt && (
                        <div className="flex items-center space-x-1">
                          <CheckCircle className="h-3 w-3" />
                          <span>Delivered {new Date(notification.deliveredAt).toLocaleString()}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Notifications;

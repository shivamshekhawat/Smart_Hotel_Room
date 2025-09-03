import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  Bell, 
  Send, 
  Clock, 
  AlertTriangle,
  CheckCircle,
  Eye,
  Trash2
} from 'lucide-react';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'urgent' | 'success';
  target: 'all' | 'room' | 'guest';
  targetId?: string;
  priority: 'low' | 'medium' | 'high';
  status: 'sent' | 'delivered' | 'read' | 'failed';
  sentAt: string;
  deliveredAt?: string;
  readAt?: string;
}

const Notifications = () => {
  const [notificationForm, setNotificationForm] = useState({
    title: '',
    message: '',
    type: 'info' as const,
    target: 'all' as const,
    targetId: '',
    priority: 'medium' as const
  });
  const [showPreview, setShowPreview] = useState(false);

  const notifications: Notification[] = [
    {
      id: '1',
      title: 'Welcome Message',
      message: 'Welcome to our hotel! We hope you enjoy your stay. If you need anything, please don\'t hesitate to contact the front desk.',
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
      message: 'Scheduled maintenance in Room 312. We apologize for any inconvenience. Maintenance will be completed by 2 PM.',
      type: 'warning',
      target: 'room',
      targetId: '312',
      priority: 'medium',
      status: 'read',
      sentAt: '2024-01-15T09:00:00Z',
      deliveredAt: '2024-01-15T09:01:00Z',
      readAt: '2024-01-15T09:15:00Z'
    },
    {
      id: '3',
      title: 'Emergency Alert',
      message: 'Fire alarm test scheduled for tomorrow at 10 AM. Please do not be alarmed.',
      type: 'urgent',
      target: 'all',
      priority: 'high',
      status: 'sent',
      sentAt: '2024-01-15T08:30:00Z'
    },
    {
      id: '4',
      title: 'Room Service Available',
      message: 'Room service is now available until 11 PM. Call extension 1234 to place your order.',
      type: 'success',
      target: 'all',
      priority: 'low',
      status: 'failed',
      sentAt: '2024-01-15T07:00:00Z'
    }
  ];

  const rooms = [
    { id: '101', number: '101', guest: 'John Smith' },
    { id: '102', number: '102', guest: 'Sarah Johnson' },
    { id: '201', number: '201', guest: 'Michael Brown' },
    { id: '202', number: '202', guest: 'Emily Davis' },
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

  const handleSendNotification = () => {
    // Handle sending notification
    console.log('Sending notification:', notificationForm);
    setNotificationForm({
      title: '',
      message: '',
      type: 'info',
      target: 'all',
      targetId: '',
      priority: 'medium'
    });
    setShowPreview(false);
  };

  const NotificationPreview = () => (
    <Card className="border-2 border-dashed border-primary/20">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          {getTypeIcon(notificationForm.type)}
          <span>Preview</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-semibold">{notificationForm.title || 'Notification Title'}</h4>
          <p className="text-sm text-muted-foreground mt-1">
            {notificationForm.message || 'Notification message will appear here...'}
          </p>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {getPriorityBadge(notificationForm.priority)}
            <Badge variant="outline">
              {notificationForm.target === 'all' ? 'All Guests' : 
               notificationForm.target === 'room' ? `Room ${notificationForm.targetId}` : 
               `Guest ${notificationForm.targetId}`}
            </Badge>
          </div>
          <div className={`${getTypeColor(notificationForm.type)}`}>
            {getTypeIcon(notificationForm.type)}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          {/* <h2 className="text-3xl font-bold text-foreground">Notifications</h2> */}
          <p className="text-muted-foreground">Send and manage notifications to guests</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Send Notification Form */}
        <Card>
          <CardHeader>
            <CardTitle>Send Notification</CardTitle>
            <CardDescription>Create and send notifications to guests</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Title</label>
              <input
                type="text"
                value={notificationForm.title}
                onChange={(e) => setNotificationForm({...notificationForm, title: e.target.value})}
                placeholder="Enter notification title"
                className="w-full mt-1 px-3 py-2 border rounded-md bg-background"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Message</label>
              <textarea
                value={notificationForm.message}
                onChange={(e) => setNotificationForm({...notificationForm, message: e.target.value})}
                placeholder="Enter notification message"
                rows={4}
                className="w-full mt-1 px-3 py-2 border rounded-md bg-background"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium">Type</label>
                <select
                  value={notificationForm.type}
                  onChange={(e) => setNotificationForm({...notificationForm, type: e.target.value as any})}
                  className="w-full mt-1 px-3 py-2 border rounded-md bg-background"
                >
                  <option value="info">Info</option>
                  <option value="warning">Warning</option>
                  <option value="urgent">Urgent</option>
                  <option value="success">Success</option>
                </select>
              </div>

              <div>
                <label className="text-sm font-medium">Priority</label>
                <select
                  value={notificationForm.priority}
                  onChange={(e) => setNotificationForm({...notificationForm, priority: e.target.value as any})}
                  className="w-full mt-1 px-3 py-2 border rounded-md bg-background"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium">Target</label>
              <select
                value={notificationForm.target}
                onChange={(e) => setNotificationForm({...notificationForm, target: e.target.value as any, targetId: ''})}
                className="w-full mt-1 px-3 py-2 border rounded-md bg-background"
              >
                <option value="all">All Guests</option>
                <option value="room">Specific Room</option>
                <option value="guest">Specific Guest</option>
              </select>
            </div>

            {notificationForm.target !== 'all' && (
              <div>
                <label className="text-sm font-medium">
                  {notificationForm.target === 'room' ? 'Room Number' : 'Guest Name'}
                </label>
                <select
                  value={notificationForm.targetId}
                  onChange={(e) => setNotificationForm({...notificationForm, targetId: e.target.value})}
                  className="w-full mt-1 px-3 py-2 border rounded-md bg-background"
                >
                  <option value="">Select {notificationForm.target === 'room' ? 'Room' : 'Guest'}</option>
                  {notificationForm.target === 'room' 
                    ? rooms.map(room => (
                        <option key={room.id} value={room.number}>
                          Room {room.number} - {room.guest}
                        </option>
                      ))
                    : rooms.map(room => (
                        <option key={room.id} value={room.guest}>
                          {room.guest} - Room {room.number}
                        </option>
                      ))
                  }
                </select>
              </div>
            )}

            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={() => setShowPreview(!showPreview)}
                className="flex-1"
              >
                <Eye className="mr-2 h-4 w-4" />
                Preview
              </Button>
                             <Button
                 onClick={() => {
                   handleSendNotification();
                   const event = new CustomEvent('showToast', {
                     detail: { type: 'success', title: 'Notification Sent', message: 'Notification sent successfully!' }
                   });
                   window.dispatchEvent(event);
                 }}
                 className="flex-1"
                 disabled={!notificationForm.title || !notificationForm.message}
               >
                 <Send className="mr-2 h-4 w-4" />
                 Send Notification
               </Button>
            </div>
          </CardContent>
        </Card>

        {/* Preview */}
        {showPreview && (
          <div>
            <NotificationPreview />
          </div>
        )}
      </div>

      {/* Sent Notifications Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Sent Notifications</CardTitle>
          <CardDescription>History of all sent notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div key={notification.id} className="flex items-start space-x-4 p-4 border rounded-lg hover:bg-muted/50">
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
                    
                    <div className="flex space-x-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
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

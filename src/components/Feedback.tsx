import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { 
  Star, 
  Download, 
  MessageSquare, 
  TrendingUp,
  TrendingDown,
  Smile,
  Frown,
  Meh,
  User
} from 'lucide-react';
import { formatDate } from '../lib/utils';

interface FeedbackItem {
  id: string;
  guestName: string;
  roomNumber: string;
  rating: number;
  comment: string;
  category: 'service' | 'cleanliness' | 'amenities' | 'location' | 'value';
  sentiment: 'positive' | 'negative' | 'neutral';
  timestamp: string;
  response?: string;
  status: 'new' | 'reviewed' | 'responded';
}

const Feedback = () => {
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterRating, setFilterRating] = useState<string>('all');

  const feedbackData: FeedbackItem[] = [
    {
      id: '1',
      guestName: 'John Smith',
      roomNumber: '101',
      rating: 5,
      comment: 'Excellent service! The staff was very friendly and the room was spotless. Will definitely recommend to friends.',
      category: 'service',
      sentiment: 'positive',
      timestamp: '2024-01-15T10:30:00Z',
      status: 'responded'
    },
    {
      id: '2',
      guestName: 'Sarah Johnson',
      roomNumber: '205',
      rating: 3,
      comment: 'Room was clean but the WiFi was very slow. Breakfast could be better.',
      category: 'amenities',
      sentiment: 'neutral',
      timestamp: '2024-01-15T09:15:00Z',
      status: 'reviewed'
    },
    {
      id: '3',
      guestName: 'Michael Brown',
      roomNumber: '312',
      rating: 1,
      comment: 'Terrible experience. Room was dirty, staff was rude, and the food was cold. Never coming back.',
      category: 'cleanliness',
      sentiment: 'negative',
      timestamp: '2024-01-15T08:45:00Z',
      status: 'new'
    },
    {
      id: '4',
      guestName: 'Emily Davis',
      roomNumber: '108',
      rating: 4,
      comment: 'Great location, easy access to downtown. Room was comfortable and clean.',
      category: 'location',
      sentiment: 'positive',
      timestamp: '2024-01-14T16:20:00Z',
      status: 'responded'
    },
    {
      id: '5',
      guestName: 'David Wilson',
      roomNumber: '401',
      rating: 5,
      comment: 'Amazing value for money! The room was spacious and the amenities were top-notch.',
      category: 'value',
      sentiment: 'positive',
      timestamp: '2024-01-14T14:10:00Z',
      status: 'reviewed'
    }
  ];

  const averageRating = feedbackData.reduce((acc, item) => acc + item.rating, 0) / feedbackData.length;
  const totalReviews = feedbackData.length;
  const positiveReviews = feedbackData.filter(item => item.sentiment === 'positive').length;
  const negativeReviews = feedbackData.filter(item => item.sentiment === 'negative').length;
  const neutralReviews = feedbackData.filter(item => item.sentiment === 'neutral').length;

  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: feedbackData.filter(item => item.rating === rating).length,
    percentage: (feedbackData.filter(item => item.rating === rating).length / totalReviews) * 100
  }));

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return <Smile className="h-4 w-4 text-green-500" />;
      case 'negative': return <Frown className="h-4 w-4 text-red-500" />;
      case 'neutral': return <Meh className="h-4 w-4 text-yellow-500" />;
      default: return <Meh className="h-4 w-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <Badge variant="destructive">New</Badge>;
      case 'reviewed':
        return <Badge variant="warning">Reviewed</Badge>;
      case 'responded':
        return <Badge variant="success">Responded</Badge>;
      default:
        return <Badge variant="default">{status}</Badge>;
    }
  };

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'service': return <Badge variant="info">Service</Badge>;
      case 'cleanliness': return <Badge variant="success">Cleanliness</Badge>;
      case 'amenities': return <Badge variant="warning">Amenities</Badge>;
      case 'location': return <Badge variant="outline">Location</Badge>;
      case 'value': return <Badge variant="secondary">Value</Badge>;
      default: return <Badge variant="default">{category}</Badge>;
    }
  };

  const filteredFeedback = feedbackData.filter(item => {
    const categoryMatch = filterCategory === 'all' || item.category === filterCategory;
    const ratingMatch = filterRating === 'all' || item.rating.toString() === filterRating;
    return categoryMatch && ratingMatch;
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const handleExport = (format: 'pdf' | 'excel') => {
    console.log(`Exporting feedback as ${format}`);
    // Handle export logic
  };

  return (
    <div className="space-y-6 sm:space-y-8 p-4 sm:p-6 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 min-h-screen">
      {/* Page Header */}
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">Feedback & Reviews</h1>
            <p className="text-sm sm:text-base text-muted-foreground mt-1">Monitor guest satisfaction and respond quickly</p>
          </div>
          <div className="flex items-center space-x-2">
            {/* Placeholder for export actions */}
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="mx-auto w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border border-gray-100 dark:border-gray-700/60 bg-white/80 dark:bg-slate-800/80">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Average Rating
            </CardTitle>
            <Star className="h-4 w-4 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{averageRating.toFixed(1)}</div>
            <div className="flex items-center space-x-1 mt-1">
              {renderStars(Math.round(averageRating))}
            </div>
          </CardContent>
        </Card>

        <Card className="border border-gray-100 dark:border-gray-700/60 bg-white/80 dark:bg-slate-800/80">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Reviews
            </CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{totalReviews}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card className="border border-gray-100 dark:border-gray-700/60 bg-white/80 dark:bg-slate-800/80">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Positive Reviews
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{positiveReviews}</div>
            <p className="text-xs text-muted-foreground">
              {((positiveReviews / totalReviews) * 100).toFixed(1)}% of total
            </p>
          </CardContent>
        </Card>

        <Card className="border border-gray-100 dark:border-gray-700/60 bg-white/80 dark:bg-slate-800/80">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Negative Reviews
            </CardTitle>
            <TrendingDown className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{negativeReviews}</div>
            <p className="text-xs text-muted-foreground">
              {((negativeReviews / totalReviews) * 100).toFixed(1)}% of total
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mx-auto w-full max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Rating Distribution */}
        <Card className="lg:col-span-1 border border-gray-100 dark:border-gray-700/60 bg-white/80 dark:bg-slate-800/80">
          <CardHeader>
            <CardTitle>Rating Distribution</CardTitle>
            <CardDescription>Breakdown of guest ratings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {ratingDistribution.map((item) => (
                <div key={item.rating} className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1 w-16">
                    <span className="text-sm font-medium">{item.rating}</span>
                    <Star className="h-3 w-3 text-yellow-400" />
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-yellow-400 h-2 rounded-full"
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground w-12">
                    {item.count}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Sentiment Analysis */}
        <Card className="lg:col-span-2 border border-gray-100 dark:border-gray-700/60 bg-white/80 dark:bg-slate-800/80">
          <CardHeader>
            <CardTitle>Sentiment Analysis</CardTitle>
            <CardDescription>Guest sentiment breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <Smile className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-600">{positiveReviews}</div>
                <div className="text-sm text-green-600">Positive</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <Meh className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-yellow-600">{neutralReviews}</div>
                <div className="text-sm text-yellow-600">Neutral</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <Frown className="h-8 w-8 text-red-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-red-600">{negativeReviews}</div>
                <div className="text-sm text-red-600">Negative</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="mx-auto w-full max-w-7xl">
      <Card className="border border-gray-100 dark:border-gray-700/60 bg-white/80 dark:bg-slate-800/80">
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div>
              <label className="text-sm font-medium">Category</label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="ml-2 px-3 py-1 border rounded-md bg-background"
              >
                <option value="all">All Categories</option>
                <option value="service">Service</option>
                <option value="cleanliness">Cleanliness</option>
                <option value="amenities">Amenities</option>
                <option value="location">Location</option>
                <option value="value">Value</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium">Rating</label>
              <select
                value={filterRating}
                onChange={(e) => setFilterRating(e.target.value)}
                className="ml-2 px-3 py-1 border rounded-md bg-background"
              >
                <option value="all">All Ratings</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>
            </div>
            <div className="text-sm text-muted-foreground">
              {filteredFeedback.length} reviews found
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Feedback List */}
      <Card className="mx-auto w-full max-w-7xl border border-gray-100 dark:border-gray-700/60 bg-white/80 dark:bg-slate-800/80">
        <CardHeader>
          <CardTitle>Recent Reviews</CardTitle>
          <CardDescription>Latest guest feedback and reviews</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredFeedback.map((feedback) => (
              <div key={feedback.id} className="border rounded-lg p-4 hover:bg-muted/50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{feedback.guestName}</span>
                      <Badge variant="outline">Room {feedback.roomNumber}</Badge>
                      {getCategoryBadge(feedback.category)}
                      {getStatusBadge(feedback.status)}
                    </div>
                    
                    <div className="flex items-center space-x-2 mb-2">
                      <div className="flex items-center space-x-1">
                        {renderStars(feedback.rating)}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {formatDate(feedback.timestamp)}
                      </span>
                      {getSentimentIcon(feedback.sentiment)}
                    </div>
                    
                    <p className="text-sm text-foreground mb-2">{feedback.comment}</p>
                    
                    {feedback.response && (
                      <div className="bg-muted/50 p-3 rounded-md">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-xs font-medium text-muted-foreground">Response:</span>
                        </div>
                        <p className="text-sm">{feedback.response}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="sm">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      </div>
    </div>
  );
};

export default Feedback;

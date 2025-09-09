import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Star,
  Download,
  MessageSquare,
  User,
} from "lucide-react";
import { formatDate } from "../lib/utils";

// PDF export
import jsPDF from "jspdf";
import "jspdf-autotable";

interface FeedbackItem {
  id: string;
  guestName: string;
  roomNumber: string;
  rating: number;
  comment: string;
  sentiment: "positive" | "negative" | "neutral";
  timestamp: string;
  response?: string;
  status: "new" | "reviewed" | "responded";
}

const Feedback = () => {
  const [filterRating, setFilterRating] = useState<string>("all");
  const [filterDate, setFilterDate] = useState<string>("");
  const [filterRoom, setFilterRoom] = useState<string>("");

  const feedbackData: FeedbackItem[] = [
    {
      id: "1",
      guestName: "John Smith",
      roomNumber: "101",
      rating: 5,
      comment: "Excellent service! The staff was very friendly.",
      sentiment: "positive",
      timestamp: "2024-01-15T10:30:00Z",
      status: "responded",
    },
    {
      id: "2",
      guestName: "Sarah Johnson",
      roomNumber: "205",
      rating: 3,
      comment: "Room was clean but WiFi was slow.",
      sentiment: "neutral",
      timestamp: "2024-01-15T09:15:00Z",
      status: "reviewed",
    },
    {
      id: "3",
      guestName: "Michael Brown",
      roomNumber: "312",
      rating: 1,
      comment: "Terrible experience. Room was dirty.",
      sentiment: "negative",
      timestamp: "2024-01-15T08:45:00Z",
      status: "new",
    },
  ];

  const averageRating =
    feedbackData.reduce((acc, item) => acc + item.rating, 0) /
    feedbackData.length;
  const totalReviews = feedbackData.length;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  // Filter logic
  const filteredFeedback = feedbackData.filter((item) => {
    const ratingMatch =
      filterRating === "all" || item.rating.toString() === filterRating;
    const roomMatch = filterRoom
      ? item.roomNumber.toString() === filterRoom
      : true;
    const dateMatch = filterDate
      ? formatDate(item.timestamp) === formatDate(filterDate)
      : true;
    return ratingMatch && roomMatch && dateMatch;
  });

  // Export filtered data as PDF
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text("Guest Feedback Report", 14, 16);

    const tableData = filteredFeedback.map((f) => [
      f.guestName,
      f.roomNumber,
      f.rating,
      f.comment,
      formatDate(f.timestamp),
      f.status,
    ]);

    (doc as any).autoTable({
      head: [["Guest", "Room", "Rating", "Comment", "Date", "Status"]],
      body: tableData,
      startY: 25,
    });

    doc.save("feedback-report.pdf");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return <Badge variant="destructive">New</Badge>;
      case "reviewed":
        return <Badge variant="warning">Reviewed</Badge>;
      case "responded":
        return <Badge variant="success">Responded</Badge>;
      default:
        return <Badge variant="default">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6 p-4 sm:p-6 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 min-h-screen">
      {/* Top Stats */}
      <div className="mx-auto w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageRating.toFixed(1)}</div>
            <div className="flex items-center space-x-1 mt-1">
              {renderStars(Math.round(averageRating))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
            <MessageSquare className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalReviews}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters + Export */}
      <Card className="mx-auto w-full max-w-7xl">
        <CardContent className="p-4 flex flex-wrap gap-4 items-center">
          <div>
            <label className="text-sm font-medium">Rating</label>
            <select
              value={filterRating}
              onChange={(e) => setFilterRating(e.target.value)}
              className="ml-2 px-3 py-1 border rounded-md"
            >
              <option value="all">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
          </div>

          <div>
            <label className="text-sm font-medium">Room</label>
            <input
              type="text"
              placeholder="Enter room no."
              value={filterRoom}
              onChange={(e) => setFilterRoom(e.target.value)}
              className="ml-2 px-3 py-1 border rounded-md"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Date</label>
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="ml-2 px-3 py-1 border rounded-md"
            />
          </div>

          <Button
            className="ml-auto flex items-center"
            onClick={handleExportPDF}
          >
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
        </CardContent>
      </Card>

      {/* Feedback List */}
      <Card className="mx-auto w-full max-w-7xl">
        <CardHeader>
          <CardTitle>Recent Reviews</CardTitle>
          <CardDescription>Filtered guest feedback</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredFeedback.map((feedback) => (
              <div
                key={feedback.id}
                className="border rounded-lg p-4 hover:bg-muted/50"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{feedback.guestName}</span>
                      <Badge variant="outline">
                        Room {feedback.roomNumber}
                      </Badge>
                      {getStatusBadge(feedback.status)}
                    </div>

                    <div className="flex items-center space-x-2 mb-2">
                      {renderStars(feedback.rating)}
                      <span className="text-sm text-muted-foreground">
                        {formatDate(feedback.timestamp)}
                      </span>
                    </div>

                    <p className="text-sm text-foreground mb-2">
                      {feedback.comment}
                    </p>
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
  );
};

export default Feedback;

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
  X,
  ThumbsUp,
  ThumbsDown,
  Minus,
} from "lucide-react";
import { formatDate } from "../lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import { Textarea } from "./ui/textarea";

// PDF export
import jsPDF from "jspdf";
import "jspdf-autotable";

interface FeedbackItem {
  id: string;
  guestName: string;
  roomNumber: string;
  rating: number;
  comment: string;
  sentiment: "positive" | "neutral" | "negative";
  timestamp: string;
  response?: string;
  status: "new" | "reviewed" | "responded";
}

const Feedback = () => {
  const [filterRating, setFilterRating] = useState<string>("all");
  const [filterDate, setFilterDate] = useState<string>("");
  const [filterRoom, setFilterRoom] = useState<string>("");

  // Modal state
  const [openModal, setOpenModal] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState<FeedbackItem | null>(
    null
  );
  const [responseText, setResponseText] = useState("");

  // Mock data
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
      response: "Thank you John, we look forward to seeing you again!",
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

  // Render stars
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating
            ? "text-yellow-400 fill-current"
            : "text-gray-300 dark:text-gray-600"
        }`}
      />
    ));
  };

  // Filters
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

  // Metrics based on filtered data
  const averageRating =
    filteredFeedback.length > 0
      ? filteredFeedback.reduce((acc, item) => acc + item.rating, 0) /
        filteredFeedback.length
      : 0;
  const totalReviews = filteredFeedback.length;

  const ratingDistribution = [5, 4, 3, 2, 1].map(
    (star) => filteredFeedback.filter((f) => f.rating === star).length
  );

  const sentimentCounts = {
    positive: filteredFeedback.filter((f) => f.sentiment === "positive").length,
    neutral: filteredFeedback.filter((f) => f.sentiment === "neutral").length,
    negative: filteredFeedback.filter((f) => f.sentiment === "negative").length,
  };

  // PDF Export
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

  // Handle respond
  const handleRespond = (feedback: FeedbackItem) => {
    setSelectedFeedback(feedback);
    setResponseText(feedback.response || "");
    setOpenModal(true);
  };

  const handleSaveResponse = () => {
    if (selectedFeedback) {
      console.log("Saving response:", {
        id: selectedFeedback.id,
        response: responseText,
      });
      // TODO: send to API
    }
    setOpenModal(false);
  };

  return (
    <div className="p-6 min-h-screen dark:bg-gradient-to-b dark:from-slate-900 dark:to-slate-800 space-y-6">
      {/* TOP ROW */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Average Rating */}
        <Card className="p-4 bg-white dark:bg-slate-800 border dark:border-gray-700">
          <div className="text-sm text-gray-500 dark:text-gray-300">
            Average Rating
          </div>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              {averageRating.toFixed(1)}
            </span>
            <div className="flex">{renderStars(Math.round(averageRating))}</div>
          </div>
        </Card>

        {/* Rating Distribution */}
        <Card className="p-4 bg-white dark:bg-slate-800 border dark:border-gray-700">
          <div className="text-sm text-gray-500 dark:text-gray-300">
            Rating Distribution
          </div>
          <div className="mt-2 space-y-1">
            {ratingDistribution.map((count, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm">
                <span className="w-4 text-gray-700 dark:text-gray-200">{5 - idx}</span>
                <div className="flex-1 bg-gray-200 dark:bg-gray-700 h-2 rounded">
                  <div
                    className="bg-yellow-400 h-2 rounded"
                    style={{
                      width: `${totalReviews > 0 ? (count / totalReviews) * 100 : 0}%`,
                    }}
                  />
                </div>
                <span className="text-gray-700 dark:text-gray-200">{count}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Sentiment Analysis */}
        <Card className="p-4 bg-white dark:bg-slate-800 border dark:border-gray-700">
          <div className="text-sm text-gray-500 dark:text-gray-300">Sentiment Analysis</div>
          <div className="mt-3 grid grid-cols-3 gap-2 text-center">
            <div className="p-2 rounded-lg bg-green-50 dark:bg-green-900 text-green-600 dark:text-green-400">
              <ThumbsUp className="mx-auto h-5 w-5" />
              <div className="font-bold">{sentimentCounts.positive}</div>
              <div className="text-xs">Positive</div>
            </div>
            <div className="p-2 rounded-lg bg-yellow-50 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-400">
              <Minus className="mx-auto h-5 w-5" />
              <div className="font-bold">{sentimentCounts.neutral}</div>
              <div className="text-xs">Neutral</div>
            </div>
            <div className="p-2 rounded-lg bg-red-50 dark:bg-red-900 text-red-600 dark:text-red-400">
              <ThumbsDown className="mx-auto h-5 w-5" />
              <div className="font-bold">{sentimentCounts.negative}</div>
              <div className="text-xs">Negative</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters + Export */}
      <Card className="mx-auto w-full max-w-7xl border dark:border-gray-700 bg-white dark:bg-slate-800">
        <CardContent className="p-4 flex flex-wrap gap-4 items-center">
          {/* Rating Filter */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
              Rating
            </label>
            <select
              value={filterRating}
              onChange={(e) => setFilterRating(e.target.value)}
              className="px-3 py-1 border dark:border-gray-600 rounded-md bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-gray-200"
            >
              <option value="all">All</option>
              <option value="5">5 ⭐</option>
              <option value="4">4 ⭐</option>
              <option value="3">3 ⭐</option>
              <option value="2">2 ⭐</option>
              <option value="1">1 ⭐</option>
            </select>
          </div>

          {/* Room Filter */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
              Room
            </label>
            <input
              type="text"
              placeholder="Enter room no."
              value={filterRoom}
              onChange={(e) => setFilterRoom(e.target.value)}
              className="px-3 py-1 border dark:border-gray-600 rounded-md bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-gray-200"
            />
          </div>

          {/* Date Filter */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-200">
              Date
            </label>
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
              className="px-3 py-1 border dark:border-gray-600 rounded-md bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-gray-200"
            />
          </div>

          {/* Export */}
          <Button
            className="ml-auto flex items-center bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            onClick={handleExportPDF}
          >
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
        </CardContent>
      </Card>

      {/* Total Reviews */}
      <div className="flex items-center gap-2 text-gray-900 dark:text-gray-100 text-lg font-medium">
        <span className="uppercase tracking-wide text-gray-500 dark:text-gray-300">
          Total Reviews:
        </span>
        <span className="font-semibold">{totalReviews}</span>
      </div>

      {/* Feedback List */}
      <Card className="mx-auto w-full max-w-7xl border dark:border-gray-700 bg-white dark:bg-slate-800">
        <CardHeader>
          <CardTitle className="text-gray-700 dark:text-gray-200">
            Recent Reviews
          </CardTitle>
          <CardDescription className="text-gray-500 dark:text-gray-400">
            Filtered guest feedback
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {filteredFeedback.length > 0 ? (
            filteredFeedback.map((feedback) => (
              <div
                key={feedback.id}
                className="border dark:border-gray-700 rounded-lg p-4 hover:shadow-md dark:hover:shadow-gray-600 transition"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <User className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                      <span className="font-medium text-gray-900 dark:text-gray-100">
                        {feedback.guestName}
                      </span>
                      <Badge variant="outline">Room {feedback.roomNumber}</Badge>
                      <Badge variant="outline" className="capitalize">
                        {feedback.status}
                      </Badge>
                    </div>

                    <div className="flex items-center space-x-2 mb-2">
                      {renderStars(feedback.rating)}
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(feedback.timestamp)}
                      </span>
                    </div>

                    <p className="text-sm text-gray-900 dark:text-gray-100 mb-2">
                      {feedback.comment}
                    </p>

                    {feedback.response && (
                      <p className="text-sm text-green-600 dark:text-green-400 italic">
                        Response: {feedback.response}
                      </p>
                    )}
                  </div>

                  <div className="flex space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRespond(feedback)}
                    >
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400">
              No reviews match the selected filters.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Response Modal */}
      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Respond to Feedback</DialogTitle>
          </DialogHeader>
          {selectedFeedback && (
            <div className="space-y-4">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Guest: <strong>{selectedFeedback.guestName}</strong> (Room{" "}
                {selectedFeedback.roomNumber})
              </p>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Feedback: "{selectedFeedback.comment}"
              </p>
              <Textarea
                value={responseText}
                onChange={(e) => setResponseText(e.target.value)}
                placeholder="Write your response..."
                className="min-h-[100px] bg-gray-50 dark:bg-slate-700 text-gray-900 dark:text-gray-200"
              />
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setOpenModal(false)}
              className="flex items-center"
            >
              <X className="h-4 w-4 mr-1" /> Cancel
            </Button>
            <Button
              onClick={handleSaveResponse}
              className="bg-green-600 hover:bg-green-700 text-white dark:bg-green-500 dark:hover:bg-green-600"
            >
              Save Response
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Feedback;

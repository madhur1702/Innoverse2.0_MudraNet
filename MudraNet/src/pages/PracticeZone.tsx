import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, Play, Square, RotateCcw, CheckCircle2, XCircle, Sparkles } from "lucide-react";
import { toast } from "sonner";

const PracticeZone = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [currentMudra, setCurrentMudra] = useState<any>(null);
  const [feedback, setFeedback] = useState<any>(null);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const practiceMudras = [
    { name: "Pataka", difficulty: "Easy" },
    { name: "Anjali", difficulty: "Easy" },
    { name: "Tripataka", difficulty: "Medium" },
    { name: "Ardhachandra", difficulty: "Medium" },
    { name: "Kartarimukha", difficulty: "Hard" },
  ];

  const startPractice = async () => {
    try {
      setIsRecording(true);
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
        selectRandomMudra();
      }
    } catch (error) {
      setIsRecording(false);
      toast.error("Unable to access camera. Please check permissions.");
    }
  };

  const stopPractice = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      setIsRecording(false);
      setCurrentMudra(null);
      setFeedback(null);
    }
  };

  const selectRandomMudra = () => {
    const randomMudra = practiceMudras[Math.floor(Math.random() * practiceMudras.length)];
    setCurrentMudra(randomMudra);
    setFeedback(null);
  };

  const checkMudra = () => {
    setAttempts(attempts + 1);
    
    // Simulate AI feedback - replace with actual model prediction
    const accuracy = Math.random();
    const isCorrect = accuracy > 0.7;
    
    if (isCorrect) {
      setScore(score + 1);
      toast.success("Perfect! Well done!");
    } else {
      toast.error("Try again - adjust your hand position");
    }

    setFeedback({
      isCorrect,
      accuracy: (accuracy * 100).toFixed(0),
      tips: isCorrect
        ? "Excellent form! Your hand positioning is accurate."
        : "Try to keep your fingers more aligned and maintain proper spacing.",
    });

    // Auto-select next mudra after a delay if correct
    if (isCorrect) {
      setTimeout(() => {
        selectRandomMudra();
      }, 3000);
    }
  };

  const resetSession = () => {
    setScore(0);
    setAttempts(0);
    setFeedback(null);
    selectRandomMudra();
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="text-center mb-8 space-y-3">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Practice Zone
        </h1>
        <p className="text-lg text-muted-foreground">
          Perfect your mudra technique with real-time AI feedback
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Stats Card */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Sparkles className="mr-2 h-5 w-5 text-secondary" />
              Your Progress
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Score</span>
                <span className="font-bold text-primary">{score}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Attempts</span>
                <span className="font-bold">{attempts}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Accuracy</span>
                <span className="font-bold text-secondary">
                  {attempts > 0 ? ((score / attempts) * 100).toFixed(0) : 0}%
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <Button onClick={resetSession} variant="outline" className="w-full">
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset Session
              </Button>
            </div>

            {currentMudra && (
              <div className="pt-4 border-t border-border">
                <h4 className="font-semibold mb-2">Current Challenge</h4>
                <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg p-4 space-y-2">
                  <p className="font-bold text-lg text-primary">{currentMudra.name}</p>
                  <div className="inline-flex items-center px-2 py-1 rounded-full bg-background text-xs font-medium">
                    {currentMudra.difficulty}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Camera & Feedback */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Live Camera Feed</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative border-2 border-dashed border-border rounded-xl overflow-hidden bg-muted/30 min-h-[400px] flex items-center justify-center">
              {isRecording ? (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center text-muted-foreground p-8">
                  <Camera className="mx-auto h-16 w-16 mb-4 opacity-50" />
                  <p className="text-lg mb-2">Camera not active</p>
                  <p className="text-sm">Click "Start Practice" to begin</p>
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <Button
                onClick={isRecording ? stopPractice : startPractice}
                variant={isRecording ? "destructive" : "default"}
                className="flex-1"
                size="lg"
              >
                {isRecording ? (
                  <>
                    <Square className="mr-2 h-4 w-4" />
                    Stop Practice
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-4 w-4" />
                    Start Practice
                  </>
                )}
              </Button>

              {isRecording && currentMudra && (
                <Button onClick={checkMudra} className="flex-1" size="lg">
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Check My Mudra
                </Button>
              )}
            </div>

            {/* Feedback Section */}
            {feedback && (
              <div
                className={`animate-in slide-in-from-bottom duration-500 rounded-xl p-6 ${
                  feedback.isCorrect
                    ? "bg-green-50 border-2 border-green-200 dark:bg-green-950/30 dark:border-green-800"
                    : "bg-red-50 border-2 border-red-200 dark:bg-red-950/30 dark:border-red-800"
                }`}
              >
                <div className="flex items-start gap-3">
                  {feedback.isCorrect ? (
                    <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-1" />
                  ) : (
                    <XCircle className="h-6 w-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-1" />
                  )}
                  <div className="flex-1 space-y-2">
                    <h4 className="font-bold text-lg">
                      {feedback.isCorrect ? "Correct!" : "Not Quite Right"}
                    </h4>
                    <p className="text-sm opacity-90">{feedback.tips}</p>
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <span>Accuracy:</span>
                      <span className="text-lg">{feedback.accuracy}%</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Instructions */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>How to Practice</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start">
              <span className="font-bold text-primary mr-2 flex-shrink-0">1.</span>
              <span>Click "Start Practice" to activate your camera</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-primary mr-2 flex-shrink-0">2.</span>
              <span>A random mudra will be selected for you to perform</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-primary mr-2 flex-shrink-0">3.</span>
              <span>Position your hand to match the mudra and click "Check My Mudra"</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-primary mr-2 flex-shrink-0">4.</span>
              <span>Receive instant AI feedback on your accuracy and form</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold text-primary mr-2 flex-shrink-0">5.</span>
              <span>Practice consistently to improve your score and accuracy</span>
            </li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
};

export default PracticeZone;

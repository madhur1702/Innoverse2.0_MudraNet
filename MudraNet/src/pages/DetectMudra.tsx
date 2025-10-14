import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Camera, Loader2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

const DetectMudra = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [useCamera, setUseCamera] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setResult(null);
    }
  };

  const startCamera = async () => {
    try {
      setUseCamera(true);
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
    } catch (error) {
      setUseCamera(false);
      toast.error("Unable to access camera. Please check permissions.");
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
      setUseCamera(false);
    }
  };

  const captureFromCamera = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(videoRef.current, 0, 0);
      const imageData = canvas.toDataURL("image/jpeg");
      setPreview(imageData);
      stopCamera();
      setResult(null);
    }
  };

  const analyzeMudra = async () => {
    if (!preview) return;

    setIsAnalyzing(true);
    
    // Simulate API call - replace with actual endpoint
    setTimeout(() => {
      // Mock result
      const mockResults = [
        { name: "Pataka", confidence: 0.94, meaning: "Flag - represents clouds, rain, forest, bosom, night, river, horse, cutting, wind" },
        { name: "Anjali", confidence: 0.89, meaning: "Offering - represents salutation, namaste, reverence" },
        { name: "Ardhachandra", confidence: 0.87, meaning: "Half moon - represents the moon on the 8th day" },
      ];
      
      const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)];
      setResult(randomResult);
      setIsAnalyzing(false);
      toast.success("Mudra identified successfully!");
    }, 2000);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      <div className="text-center mb-8 space-y-3">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Detect Mudra
        </h1>
        <p className="text-lg text-muted-foreground">
          Upload an image or use your camera to identify Bharatanatyam hand gestures
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <Card>
          <CardHeader>
            <CardTitle>Capture or Upload</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-3">
              <Button
                onClick={() => fileInputRef.current?.click()}
                variant={!useCamera ? "default" : "outline"}
                className="flex-1"
              >
                <Upload className="mr-2 h-4 w-4" />
                Upload Image
              </Button>
              <Button
                onClick={useCamera ? stopCamera : startCamera}
                variant={useCamera ? "default" : "outline"}
                className="flex-1"
              >
                <Camera className="mr-2 h-4 w-4" />
                {useCamera ? "Stop Camera" : "Use Camera"}
              </Button>
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />

            <div className="border-2 border-dashed border-border rounded-xl p-4 min-h-[300px] flex items-center justify-center bg-muted/30">
              {useCamera ? (
                <div className="space-y-4 w-full">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full max-h-[280px] rounded-lg object-contain bg-black"
                  />
                  <Button onClick={captureFromCamera} className="w-full">
                    Capture Photo
                  </Button>
                </div>
              ) : preview ? (
                <img src={preview} alt="Preview" className="max-w-full max-h-[300px] rounded-lg object-contain" />
              ) : (
                <div className="text-center text-muted-foreground">
                  <Camera className="mx-auto h-16 w-16 mb-4 opacity-50" />
                  <p>No image selected</p>
                  <p className="text-sm">Upload an image or use camera</p>
                </div>
              )}
            </div>

            <Button
              onClick={analyzeMudra}
              disabled={!preview || isAnalyzing}
              className="w-full"
              size="lg"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Identify Mudra
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Results Section */}
        <Card>
          <CardHeader>
            <CardTitle>Recognition Results</CardTitle>
          </CardHeader>
          <CardContent>
            {!result ? (
              <div className="text-center text-muted-foreground py-12">
                <p>Results will appear here after analysis</p>
              </div>
            ) : (
              <div className="space-y-6 animate-in slide-in-from-bottom duration-500">
                <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-bold text-primary">{result.name}</h3>
                    <div className="bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm font-medium">
                      {(result.confidence * 100).toFixed(0)}% confident
                    </div>
                  </div>
                  
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${result.confidence * 100}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold text-lg">Meaning & Usage</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {result.meaning}
                  </p>
                </div>

                <div className="bg-accent/50 rounded-lg p-4 border border-accent-foreground/20">
                  <p className="text-sm text-accent-foreground">
                    <strong>Note:</strong> This is an AI prediction. For accurate learning,
                    consult with a certified Bharatanatyam instructor.
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DetectMudra;

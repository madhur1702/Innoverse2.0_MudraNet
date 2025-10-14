import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, BookOpen, Target, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-mudra.jpg";

const Home = () => {
  const features = [
    {
      icon: Camera,
      title: "Detect Mudras",
      description: "Upload images or use live camera to identify hand gestures instantly with AI.",
      link: "/detect",
      gradient: "from-primary to-primary/70",
    },
    {
      icon: BookOpen,
      title: "Learn & Explore",
      description: "Browse a comprehensive gallery of mudras with meanings and cultural context.",
      link: "/learn",
      gradient: "from-secondary to-secondary/70",
    },
    {
      icon: Target,
      title: "Practice Zone",
      description: "Test your mudra skills with real-time camera feedback and instant corrections.",
      link: "/practice",
      gradient: "from-primary to-secondary",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-accent/30 to-background">
        <div className="container mx-auto px-4 py-20 md:py-28">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-in slide-in-from-left duration-700">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Sparkles className="mr-2 h-4 w-4" />
                AI-Powered Cultural Learning
              </div>
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Discover the Art of{" "}
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Bharatanatyam Mudras
                </span>
              </h1>
              <p className="text-lg text-muted-foreground">
                MudraNet combines ancient Indian classical dance tradition with modern AI technology.
                Learn, identify, and master Bharatanatyam hand gestures with real-time feedback.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/detect">
                  <Button size="lg" className="w-full sm:w-auto group">
                    Start Detecting
                    <Camera className="ml-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                  </Button>
                </Link>
                <Link to="/learn">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Explore Mudras
                  </Button>
                </Link>
              </div>
            </div>

            <div className="relative animate-in slide-in-from-right duration-700">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-3xl blur-2xl" />
              <img
                src={heroImage}
                alt="Bharatanatyam Mudra"
                className="relative rounded-3xl shadow-2xl w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold">
            Everything You Need to Learn Mudras
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From AI-powered recognition to guided practice sessions, MudraNet offers
            comprehensive tools for dancers of all levels.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Link key={index} to={feature.link}>
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer border-2 hover:border-primary/50">
                  <CardContent className="p-6 space-y-4">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center`}>
                      <Icon className="h-7 w-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-muted/30 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Simple, intuitive, and powered by advanced AI technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "1", title: "Capture", desc: "Take a photo or use live camera" },
              { step: "2", title: "Analyze", desc: "AI identifies the mudra instantly" },
              { step: "3", title: "Learn", desc: "Discover meaning and usage" },
              { step: "4", title: "Practice", desc: "Perfect your technique with feedback" },
            ].map((item) => (
              <div key={item.step} className="text-center space-y-3">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

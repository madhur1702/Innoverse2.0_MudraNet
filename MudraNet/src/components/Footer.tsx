import { Heart, Github, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-2 text-primary">MudraNet</h3>
            <p className="text-sm text-muted-foreground">
              AI-powered Bharatanatyam mudra recognition and learning platform.
              Preserving cultural heritage through technology.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-2">About</h3>
            <p className="text-sm text-muted-foreground">
              MudraNet uses advanced AI to identify and teach traditional
              Bharatanatyam hand gestures, making classical dance education
              accessible to everyone.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-2">Connect</h3>
            <div className="flex flex-col space-y-2 text-sm">
              <a
                href="mailto:info@mudranet.ai"
                className="flex items-center text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="mr-2 h-4 w-4" />
                info@mudranet.ai
              </a>
              <a
                href="#"
                className="flex items-center text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-6 text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center">
            Made with <Heart className="mx-1 h-4 w-4 text-secondary fill-secondary" /> for
            preserving Indian classical arts
          </p>
          <p className="mt-2">© 2025 MudraNet. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

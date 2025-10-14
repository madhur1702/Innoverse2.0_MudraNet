import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

// Import all mudra images
import patakaImg from "@/assets/mudras/pataka.jpg";
import tripatakaImg from "@/assets/mudras/tripataka.jpg";
import ardhachandraImg from "@/assets/mudras/ardhachandra.jpg";
import kartarimukhaImg from "@/assets/mudras/kartarimukha.jpg";
import mayuraImg from "@/assets/mudras/mayura.jpg";
import ardhapatakaImg from "@/assets/mudras/ardhapataka.jpg";
import mukulaImg from "@/assets/mudras/mukula.jpg";
import katakamukhaImg from "@/assets/mudras/katakamukha.jpg";
import suchiImg from "@/assets/mudras/suchi.jpg";
import chandrakalaImg from "@/assets/mudras/chandrakala.jpg";
import padmakoshaImg from "@/assets/mudras/padmakosha.jpg";
import sarpaShirshaImg from "@/assets/mudras/sarpa-shirsha.jpg";
import anjaliImg from "@/assets/mudras/anjali.jpg";
import kapotaImg from "@/assets/mudras/kapota.jpg";
import karkataImg from "@/assets/mudras/karkata.jpg";

const LearnMudras = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // Sample mudra data - this would come from your knowledge base API
  const mudras = [
    {
      name: "Pataka",
      meaning: "Flag",
      description: "Represents clouds, rain, forest, bosom, night, river, horse, cutting, wind",
      category: "Asamyukta Hasta",
      image: patakaImg,
    },
    {
      name: "Tripataka",
      meaning: "Three parts of a flag",
      description: "Represents crown, tree, lamp, Brahma, arrow, thunder",
      category: "Asamyukta Hasta",
      image: tripatakaImg,
    },
    {
      name: "Ardhachandra",
      meaning: "Half moon",
      description: "Represents the moon on the 8th day, throat, rainbow, meditation",
      category: "Asamyukta Hasta",
      image: ardhachandraImg,
    },
    {
      name: "Kartarimukha",
      meaning: "Scissor face",
      description: "Represents separation, discord, lightning, disagreement",
      category: "Asamyukta Hasta",
      image: kartarimukhaImg,
    },
    {
      name: "Mayura",
      meaning: "Peacock",
      description: "Represents a peacock, applying tilak, sound of bells",
      category: "Asamyukta Hasta",
      image: mayuraImg,
    },
    {
      name: "Ardhapataka",
      meaning: "Half flag",
      description: "Represents a leaf, spear, knife, pillar, tower",
      category: "Asamyukta Hasta",
      image: ardhapatakaImg,
    },
    {
      name: "Mukula",
      meaning: "Bud",
      description: "Represents lily bud, eating, offering, sacred thread",
      category: "Asamyukta Hasta",
      image: mukulaImg,
    },
    {
      name: "Katakamukha",
      meaning: "Opening in a bracelet",
      description: "Represents picking flowers, holding garland, necklace",
      category: "Asamyukta Hasta",
      image: katakamukhaImg,
    },
    {
      name: "Suchi",
      meaning: "Needle",
      description: "Represents one, pointing, world, god, negation",
      category: "Asamyukta Hasta",
      image: suchiImg,
    },
    {
      name: "Chandrakala",
      meaning: "Phase of moon",
      description: "Represents crescent moon, shining face, nails",
      category: "Asamyukta Hasta",
      image: chandrakalaImg,
    },
    {
      name: "Padmakosha",
      meaning: "Lotus bud",
      description: "Represents an unblossomed lotus, fruit, ball, mirror",
      category: "Asamyukta Hasta",
      image: padmakoshaImg,
    },
    {
      name: "Sarpa Shirsha",
      meaning: "Serpent's head",
      description: "Represents snake, throwing objects, embrace, generosity",
      category: "Asamyukta Hasta",
      image: sarpaShirshaImg,
    },
    {
      name: "Anjali",
      meaning: "Offering",
      description: "Represents salutation, offering, prayer, namaste, reverence",
      category: "Samyukta Hasta",
      image: anjaliImg,
    },
    {
      name: "Kapota",
      meaning: "Dove",
      description: "Represents a dove, embracing, challenge",
      category: "Samyukta Hasta",
      image: kapotaImg,
    },
    {
      name: "Karkata",
      meaning: "Crab",
      description: "Represents a crab, picking up flowers, offering",
      category: "Samyukta Hasta",
      image: karkataImg,
    },
  ];

  const filteredMudras = mudras.filter(
    (mudra) =>
      mudra.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mudra.meaning.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mudra.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-8 space-y-3">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Learn Mudras
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore the complete library of Bharatanatyam hand gestures with meanings and usage
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search mudras by name, meaning, or description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Results count */}
      <div className="text-center mb-6 text-sm text-muted-foreground">
        Showing {filteredMudras.length} of {mudras.length} mudras
      </div>

      {/* Mudras Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredMudras.map((mudra, index) => (
          <Card
            key={index}
            className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group border-2 hover:border-primary/30"
          >
            <div className="relative h-64 overflow-hidden bg-gradient-to-br from-primary/5 to-secondary/5">
              <img
                src={mudra.image}
                alt={`${mudra.name} - ${mudra.meaning}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-3 right-3">
                <div className="px-3 py-1 rounded-full bg-background/90 backdrop-blur-sm border text-xs font-medium">
                  {mudra.category}
                </div>
              </div>
            </div>
            <CardHeader className="pb-3">
              <CardTitle className="text-xl mb-1 group-hover:text-primary transition-colors">
                {mudra.name}
              </CardTitle>
              <p className="text-sm text-muted-foreground italic font-medium">
                "{mudra.meaning}"
              </p>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {mudra.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredMudras.length === 0 && (
        <div className="text-center py-16">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
            <Search className="h-12 w-12 text-muted-foreground/50" />
          </div>
          <h3 className="text-xl font-semibold mb-2">No mudras found</h3>
          <p className="text-muted-foreground">Try searching with different keywords</p>
        </div>
      )}
    </div>
  );
};

export default LearnMudras;

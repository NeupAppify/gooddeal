import Image from "next/image";
import Link from "next/link";
import { MapPin, Bed, Bath, Square, CheckCircle } from "lucide-react";
import { cn } from "@/src/lib/utils";

interface PropertyCardProps {
  id: string;
  title: string;
  price: string;
  location: string;
  specs: {
    beds: number;
    baths: number;
    area: string;
  };
  image: string;
  verified?: boolean;
  agent?: {
    name: string;
    image: string;
  };
  className?: string;
}

const PropertyCard = ({
  id,
  title,
  price,
  location,
  specs,
  image,
  verified = false,
  agent = {
    name: "Mukti Nath Nepal",
    image: "/hero.png" // default placeholder
  },
  className,
}: PropertyCardProps) => {
  return (
    <Link href={`/properties/${id}`} className={cn("card-premium group overflow-hidden flex flex-col block", className)}>
      <div className="relative aspect-[4/3] overflow-hidden bg-platinum">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {verified && (
          <div className="absolute top-4 left-4 z-10">
            <span className="trust-badge shadow-md">
              <CheckCircle className="w-3 h-3" />
              Verified
            </span>
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="mb-4">
          <p className="text-xl font-semibold text-russian-purple mb-2">{price}</p>
          <h3 className="font-serif text-lg leading-tight text-charcoal group-hover:text-russian-purple transition-colors mb-2">
            {title}
          </h3>
          <div className="flex items-center text-warm-gray text-sm mb-4">
            <MapPin className="w-4 h-4 mr-1 text-russian-purple/70" />
            {location}
          </div>
          
          <div className="flex items-center gap-2 pt-2">
            <div className="w-6 h-6 rounded-full overflow-hidden bg-platinum relative">
               <Image 
                src={agent.image} 
                alt={agent.name} 
                fill 
                className="object-cover"
              />
            </div>
            <span className="text-xs text-warm-gray">Listed by <span className="text-charcoal font-medium">{agent.name}</span></span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-platinum mt-auto">
          <div className="flex items-center gap-4 text-sm text-charcoal/80">
            <div className="flex items-center gap-1.5" title={`${specs.beds} Bedrooms`}>
              <Bed className="w-4 h-4 text-warm-gray" />
              <span>{specs.beds}</span>
            </div>
            <div className="flex items-center gap-1.5" title={`${specs.baths} Bathrooms`}>
              <Bath className="w-4 h-4 text-warm-gray" />
              <span>{specs.baths}</span>
            </div>
            <div className="flex items-center gap-1.5" title="Total Area">
              <Square className="w-4 h-4 text-warm-gray" />
              <span>{specs.area}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertyCard;

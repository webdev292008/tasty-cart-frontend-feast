
import React from "react";
import { galleryImages } from "@/lib/placeholderData";

const Gallery: React.FC = () => {
  return (
    <section className="py-16 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Gallery</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Take a glimpse into our culinary world - from expertly crafted dishes to our elegant atmosphere
          </p>
        </div>
        
        <div className="gallery-grid">
          {galleryImages.map((image) => (
            <div key={image.id} className="gallery-item rounded-lg overflow-hidden shadow-md">
              <img 
                src={image.url} 
                alt={image.alt}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;

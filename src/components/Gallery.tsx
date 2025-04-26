
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Card, CardContent } from "@/components/ui/card";

interface GalleryImage {
  id: string;
  url: string;
  alt: string;
}

const Gallery = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);

  useEffect(() => {
    fetchGalleryImages();

    // Subscribe to realtime changes
    const channel = supabase
      .channel('gallery-changes')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'gallery_images' },
        () => fetchGalleryImages()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const fetchGalleryImages = async () => {
    const { data, error } = await supabase
      .from('gallery_images')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setImages(data);
    }
  };

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
          {images.map((image) => (
            <HoverCard key={image.id}>
              <HoverCardTrigger>
                <Card className="gallery-item">
                  <CardContent className="p-0">
                    <img 
                      src={image.url} 
                      alt={image.alt || 'Gallery image'}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
                  </CardContent>
                </Card>
              </HoverCardTrigger>
              <HoverCardContent>
                {image.alt && <p className="text-sm">{image.alt}</p>}
              </HoverCardContent>
            </HoverCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;

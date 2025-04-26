
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export default function GalleryPage() {
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState<any[]>([]);
  const { toast } = useToast();

  const fetchImages = async () => {
    const { data, error } = await supabase
      .from('gallery_images')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({
        title: "Error fetching images",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    setImages(data || []);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      const file = event.target.files?.[0];
      if (!file) return;

      // Upload to storage
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const { error: uploadError, data } = await supabase.storage
        .from('gallery')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('gallery')
        .getPublicUrl(fileName);

      // Save to database
      const { error: dbError } = await supabase
        .from('gallery_images')
        .insert([{ url: publicUrl, alt: file.name }]);

      if (dbError) throw dbError;

      toast({
        title: "Success",
        description: "Image uploaded successfully",
      });

      fetchImages();
    } catch (error: any) {
      toast({
        title: "Error uploading image",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string, url: string) => {
    try {
      // Delete from storage
      const fileName = url.split('/').pop();
      if (fileName) {
        await supabase.storage
          .from('gallery')
          .remove([fileName]);
      }

      // Delete from database
      const { error } = await supabase
        .from('gallery_images')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Image deleted successfully",
      });

      fetchImages();
    } catch (error: any) {
      toast({
        title: "Error deleting image",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gallery Management</h1>
        <div>
          <Input
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            disabled={uploading}
            className="max-w-xs"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((image) => (
          <Card key={image.id} className="overflow-hidden">
            <CardContent className="p-0 relative group">
              <img
                src={image.url}
                alt={image.alt || 'Gallery image'}
                className="w-full h-48 object-cover"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDelete(image.id, image.url)}
                >
                  Delete Image
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

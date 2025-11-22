import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Upload, Play, X } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { UploadDialog } from "@/components/upload-dialog";
import type { Media } from "@shared/schema";

export function GallerySection() {
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);
  const [showUpload, setShowUpload] = useState(false);

  const { data: mediaItems, isLoading } = useQuery<Media[]>({
    queryKey: ["/api/media"],
  });

  return (
    <section className="min-h-screen py-24 px-4 relative" id="gallery">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 
            className="font-display text-4xl md:text-6xl font-bold uppercase mb-4"
            style={{
              color: '#00d4ff',
              textShadow: `
                0 0 10px #00d4ff,
                0 0 20px #00d4ff,
                0 0 30px #00d4ff
              `
            }}
            data-testid="text-gallery-title"
          >
            Memories
          </h2>
          <p className="font-terminal text-muted-foreground text-lg">
            Captured moments from the <span className="text-secondary">right side up</span>
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <Button
            variant="outline"
            onClick={() => setShowUpload(true)}
            className="font-terminal"
            style={{
              borderColor: '#00d4ff',
              color: '#00d4ff'
            }}
            data-testid="button-upload"
          >
            <Upload className="w-4 h-4 mr-2" />
            Add Memories
          </Button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-80 bg-card" />
            ))}
          </div>
        ) : !mediaItems || mediaItems.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-terminal text-muted-foreground text-lg">
              No memories yet. Upload some special moments!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-auto">
            {mediaItems.map((item, index) => (
              <div
                key={item.id}
                className={`group relative cursor-pointer transition-all duration-300 hover:scale-105 hover:z-10 p-6 bg-white rounded-sm ${
                  item.type === 'photo' 
                    ? 'shadow-[0_4px_6px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_16px_rgba(0,0,0,0.4),0_0_20px_rgba(255,0,0,0.3)]' 
                    : 'shadow-[0_4px_6px_rgba(0,0,0,0.3)] hover:shadow-[0_8px_16px_rgba(0,0,0,0.4),0_0_20px_rgba(0,212,255,0.3)]'
                }`}
                style={{
                  transform: `rotate(${(index % 3 - 1) * 2}deg)`
                }}
                onClick={() => setSelectedMedia(item)}
                data-testid={`card-media-${item.id}`}
              >
                <div className="aspect-square bg-black overflow-hidden mb-3">
                  {item.type === 'video' ? (
                    <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black">
                      <Play 
                        className="w-16 h-16 text-secondary absolute z-10"
                        style={{
                          filter: 'drop-shadow(0 0 10px #00d4ff)'
                        }}
                        data-testid={`icon-play-${item.id}`}
                      />
                      <video
                        src={`/uploads/${item.filename}`}
                        className="w-full h-full object-cover opacity-40"
                      />
                      <div 
                        className="absolute top-3 left-3 px-3 py-1.5 text-xs font-terminal uppercase tracking-wider"
                        style={{
                          background: 'rgba(0, 212, 255, 0.9)',
                          color: '#000',
                          boxShadow: '0 0 10px rgba(0, 212, 255, 0.5)',
                          border: '1px solid rgba(0, 212, 255, 1)'
                        }}
                        data-testid={`badge-vhs-${item.id}`}
                      >
                        VHS
                      </div>
                    </div>
                  ) : (
                    <img
                      src={`/uploads/${item.filename}`}
                      alt={item.caption || 'Memory'}
                      className="w-full h-full object-cover"
                      data-testid={`img-thumbnail-${item.id}`}
                    />
                  )}
                </div>
                {item.caption && (
                  <p 
                    className="font-terminal text-sm text-center text-black mb-2"
                    data-testid={`text-caption-${item.id}`}
                  >
                    {item.caption}
                  </p>
                )}
                <p 
                  className="font-retro text-xs text-center text-gray-600"
                  data-testid={`text-date-${item.id}`}
                >
                  {new Date(item.uploadedAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <Dialog open={!!selectedMedia} onOpenChange={() => setSelectedMedia(null)}>
        <DialogContent 
          className="max-w-4xl bg-black/95 border-primary"
          style={{
            boxShadow: '0 0 30px #ff0000'
          }}
        >
          {selectedMedia && (
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSelectedMedia(null)}
                className="absolute top-2 right-2 z-10 text-white hover:text-primary"
                data-testid="button-close-media"
              >
                <X className="w-6 h-6" />
              </Button>
              {selectedMedia.type === 'video' ? (
                <video
                  src={`/uploads/${selectedMedia.filename}`}
                  controls
                  autoPlay
                  className="w-full rounded-md"
                  data-testid="video-player"
                />
              ) : (
                <img
                  src={`/uploads/${selectedMedia.filename}`}
                  alt={selectedMedia.caption || 'Memory'}
                  className="w-full rounded-md"
                  data-testid="img-fullsize"
                />
              )}
              {selectedMedia.caption && (
                <p className="font-terminal text-white mt-4 text-center text-lg">
                  {selectedMedia.caption}
                </p>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      <UploadDialog open={showUpload} onOpenChange={setShowUpload} />
    </section>
  );
}

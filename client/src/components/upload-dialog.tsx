import { useRef, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Upload, X, Image, Video } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const uploadFormSchema = z.object({
  file: z.instanceof(File, { message: "Please select a file" }),
  caption: z.string().optional(),
});

type UploadFormValues = z.infer<typeof uploadFormSchema>;

interface UploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function UploadDialog({ open, onOpenChange }: UploadDialogProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  const form = useForm<UploadFormValues>({
    resolver: zodResolver(uploadFormSchema),
    defaultValues: {
      caption: "",
    },
  });

  const selectedFile = form.watch("file");
  const preview = selectedFile ? URL.createObjectURL(selectedFile) : null;
  const isVideo = selectedFile?.type.startsWith("video/");

  useEffect(() => {
    if (!open) {
      form.reset();
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  }, [open, form]);

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const uploadMutation = useMutation({
    mutationFn: async (data: UploadFormValues) => {
      const formData = new FormData();
      formData.append("file", data.file);
      if (data.caption) {
        formData.append("caption", data.caption);
      }

      const response = await fetch("/api/media", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/media"] });
      toast({
        title: "Upload successful!",
        description: "Your memory has been added to the gallery.",
      });
      form.reset();
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      onOpenChange(false);
    },
    onError: () => {
      toast({
        title: "Upload failed",
        description: "There was an error uploading your file. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: UploadFormValues) => {
    uploadMutation.mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="max-w-2xl bg-card border-secondary"
        style={{
          boxShadow: "0 0 30px rgba(0, 212, 255, 0.3)"
        }}
      >
        <DialogHeader>
          <DialogTitle 
            className="font-terminal text-2xl uppercase"
            style={{
              color: "#00d4ff",
              textShadow: "0 0 10px #00d4ff"
            }}
          >
            Upload Memory
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="file"
              render={({ field: { value, onChange, ...field } }) => (
                <FormItem>
                  <FormLabel className="font-terminal">Choose Photo or Video</FormLabel>
                  <FormControl>
                    <div className="flex gap-2">
                      <Input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*,video/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            onChange(file);
                          }
                        }}
                        className="font-terminal"
                        data-testid="input-file"
                        {...field}
                      />
                      {selectedFile && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            form.setValue("file", undefined as any);
                            if (fileInputRef.current) {
                              fileInputRef.current.value = "";
                            }
                          }}
                          data-testid="button-clear-file"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {preview && (
              <div className="relative aspect-video bg-black rounded-md overflow-hidden">
                {isVideo ? (
                  <video
                    src={preview}
                    controls
                    className="w-full h-full object-contain"
                    data-testid="video-preview"
                  />
                ) : (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-full object-contain"
                    data-testid="img-preview"
                  />
                )}
                <div className="absolute top-2 left-2 bg-primary/90 px-3 py-1 text-xs font-terminal uppercase flex items-center gap-2">
                  {isVideo ? (
                    <>
                      <Video className="w-3 h-3" />
                      Video
                    </>
                  ) : (
                    <>
                      <Image className="w-3 h-3" />
                      Photo
                    </>
                  )}
                </div>
              </div>
            )}

            <FormField
              control={form.control}
              name="caption"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-terminal">Caption (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Add a memory description..."
                      className="font-terminal resize-none"
                      rows={3}
                      data-testid="input-caption"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-3 justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={uploadMutation.isPending}
                className="font-terminal"
                data-testid="button-cancel-upload"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!selectedFile || uploadMutation.isPending}
                className="font-terminal"
                style={{
                  background: selectedFile ? "#00d4ff" : undefined,
                  color: selectedFile ? "#000" : undefined,
                  boxShadow: selectedFile ? "0 0 15px rgba(0, 212, 255, 0.5)" : undefined,
                }}
                data-testid="button-submit-upload"
              >
                {uploadMutation.isPending ? (
                  "Uploading..."
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    Upload
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

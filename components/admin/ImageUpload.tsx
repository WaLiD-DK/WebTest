"use client";

import { useState, useRef, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload, X, Star, Image as ImageIcon, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageFile {
  id: string;
  file: File;
  preview: string;
  isFeatured: boolean;
}

interface ImageUploadProps {
  maxImages?: number;
  maxFileSize?: number; // in MB
  onImagesChange?: (images: ImageFile[]) => void;
  initialImages?: ImageFile[];
}

export default function ImageUpload({
  maxImages = 10,
  maxFileSize = 5,
  onImagesChange,
  initialImages = [],
}: ImageUploadProps) {
  const [images, setImages] = useState<ImageFile[]>(initialImages);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  const [errors, setErrors] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragCounter = useRef(0);

  const validateFile = (file: File): string | null => {
    // Check file type
    if (!file.type.startsWith("image/")) {
      return `${file.name}: Not an image file`;
    }

    // Check file size
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxFileSize) {
      return `${file.name}: File size exceeds ${maxFileSize}MB`;
    }

    return null;
  };

  const handleFiles = useCallback(
    async (files: FileList | null) => {
      if (!files) return;

      const newErrors: string[] = [];
      const validFiles: File[] = [];

      // Validate files
      Array.from(files).forEach((file) => {
        if (images.length + validFiles.length >= maxImages) {
          newErrors.push(`Maximum ${maxImages} images allowed`);
          return;
        }

        const error = validateFile(file);
        if (error) {
          newErrors.push(error);
        } else {
          validFiles.push(file);
        }
      });

      setErrors(newErrors);

      // Process valid files
      const newImages: ImageFile[] = await Promise.all(
        validFiles.map(async (file) => {
          const id = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

          // Simulate upload progress
          setUploadProgress((prev) => ({ ...prev, [id]: 0 }));
          
          // Create preview
          const preview = URL.createObjectURL(file);

          // Simulate upload
          for (let progress = 0; progress <= 100; progress += 20) {
            await new Promise((resolve) => setTimeout(resolve, 100));
            setUploadProgress((prev) => ({ ...prev, [id]: progress }));
          }

          // Remove progress when complete
          setTimeout(() => {
            setUploadProgress((prev) => {
              const newProgress = { ...prev };
              delete newProgress[id];
              return newProgress;
            });
          }, 500);

          return {
            id,
            file,
            preview,
            isFeatured: images.length === 0 && validFiles[0] === file,
          };
        })
      );

      const updatedImages = [...images, ...newImages];
      setImages(updatedImages);
      onImagesChange?.(updatedImages);
    },
    [images, maxImages, maxFileSize, onImagesChange]
  );

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current++;
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current--;
    if (dragCounter.current === 0) {
      setIsDragging(false);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    dragCounter.current = 0;

    const files = e.dataTransfer.files;
    handleFiles(files);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
    // Reset input value to allow selecting the same file again
    e.target.value = "";
  };

  const removeImage = (id: string) => {
    const imageToRemove = images.find((img) => img.id === id);
    if (imageToRemove) {
      URL.revokeObjectURL(imageToRemove.preview);
    }

    const updatedImages = images.filter((img) => img.id !== id);
    
    // If removed image was featured, make first image featured
    if (imageToRemove?.isFeatured && updatedImages.length > 0) {
      updatedImages[0].isFeatured = true;
    }

    setImages(updatedImages);
    onImagesChange?.(updatedImages);
  };

  const setFeaturedImage = (id: string) => {
    const updatedImages = images.map((img) => ({
      ...img,
      isFeatured: img.id === id,
    }));
    setImages(updatedImages);
    onImagesChange?.(updatedImages);
  };

  const reorderImages = (fromIndex: number, toIndex: number) => {
    const updatedImages = [...images];
    const [removed] = updatedImages.splice(fromIndex, 1);
    updatedImages.splice(toIndex, 0, removed);
    setImages(updatedImages);
    onImagesChange?.(updatedImages);
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", index.toString());
  };

  const handleImageDrop = (e: React.DragEvent, toIndex: number) => {
    e.preventDefault();
    const fromIndex = parseInt(e.dataTransfer.getData("text/plain"));
    if (fromIndex !== toIndex) {
      reorderImages(fromIndex, toIndex);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Product Images</CardTitle>
        <CardDescription>
          Upload up to {maxImages} images. Max size: {maxFileSize}MB per image.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Drop Zone */}
        <div
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          className={cn(
            "border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer",
            isDragging
              ? "border-blue-500 bg-blue-50"
              : "border-gray-300 hover:border-gray-400"
          )}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileInput}
            className="hidden"
          />
          <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <p className="text-sm font-medium text-gray-700 mb-1">
            {isDragging ? "Drop images here" : "Click to upload or drag and drop"}
          </p>
          <p className="text-xs text-gray-500">
            PNG, JPG, GIF up to {maxFileSize}MB
          </p>
        </div>

        {/* Error Messages */}
        {errors.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            {errors.map((error, index) => (
              <p key={index} className="text-sm text-red-600">
                {error}
              </p>
            ))}
          </div>
        )}

        {/* Image Previews */}
        {images.length > 0 && (
          <div>
            <Label className="mb-3 block">
              Uploaded Images ({images.length}/{maxImages})
            </Label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((image, index) => (
                <div
                  key={image.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={(e) => handleImageDrop(e, index)}
                  className="relative group aspect-square border rounded-lg overflow-hidden cursor-move hover:shadow-lg transition-shadow"
                >
                  <img
                    src={image.preview}
                    alt={`Preview ${index + 1}`}
                    className="w-full h-full object-cover"
                  />

                  {/* Loading Overlay */}
                  {uploadProgress[image.id] !== undefined && uploadProgress[image.id] < 100 && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                      <div className="text-center">
                        <Loader2 className="h-8 w-8 text-white animate-spin mx-auto mb-2" />
                        <p className="text-white text-sm">{uploadProgress[image.id]}%</p>
                      </div>
                    </div>
                  )}

                  {/* Featured Badge */}
                  {image.isFeatured && (
                    <div className="absolute top-2 left-2 bg-yellow-500 text-white px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
                      <Star className="h-3 w-3 fill-current" />
                      Featured
                    </div>
                  )}

                  {/* Overlay Controls */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity flex items-center justify-center gap-2">
                    <Button
                      type="button"
                      size="icon"
                      variant="secondary"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFeaturedImage(image.id);
                      }}
                      title="Set as featured"
                    >
                      <Star className={cn("h-4 w-4", image.isFeatured && "fill-current")} />
                    </Button>
                    <Button
                      type="button"
                      size="icon"
                      variant="destructive"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeImage(image.id);
                      }}
                      title="Remove image"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}

              {/* Add More Button */}
              {images.length < maxImages && (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="aspect-square border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors flex flex-col items-center justify-center gap-2 text-gray-400 hover:text-gray-600"
                >
                  <ImageIcon className="h-8 w-8" />
                  <span className="text-xs font-medium">Add More</span>
                </button>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-3">
              Drag images to reorder. Click star to set featured image.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

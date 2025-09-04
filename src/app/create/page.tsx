"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, X, Check } from "lucide-react";

export default function Component() {
  const [selectedChain, setSelectedChain] = useState("base");
  const [name, setName] = useState("The Pond");
  const [symbol, setSymbol] = useState("POND");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [artType, setArtType] = useState<"same" | "unique">("same");
  const [artworkFile, setArtworkFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setUploadedFile(acceptedFiles[0]);
    }
  }, []);

  const onDropArtwork = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setArtworkFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif"],
    },
    multiple: false,
  });

  const {
    getRootProps: getArtworkRootProps,
    getInputProps: getArtworkInputProps,
    isDragActive: isArtworkDragActive,
  } = useDropzone({
    onDrop: onDropArtwork,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: false,
  });

  const clearForm = () => {
    setSelectedChain("base");
    setName("");
    setSymbol("");
    setUploadedFile(null);
    setArtType("same");
    setArtworkFile(null);
  };

  const removeFile = () => {
    setUploadedFile(null);
  };

  const removeArtworkFile = () => {
    setArtworkFile(null);
  };

  return (
    <div>
      <div className="min-h-screen bg-white p-6">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="flex justify-end mb-8">
            <button
              onClick={clearForm}
              className="text-gray-500 hover:text-gray-700 text-sm flex items-center gap-1"
            >
              <X className="w-4 h-4" />
              Clear Form
            </button>
          </div>

          <div className="space-y-6">
            {/* EVM Chain */}
            <div className="space-y-2">
              <Label htmlFor="chain" className="text-black font-medium">
                EVM Chain <span className="text-red-500">*</span>
              </Label>
              <Select value={selectedChain} onValueChange={setSelectedChain}>
                <SelectTrigger className="w-full bg-white border-gray-300 text-black">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <SelectValue />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="base">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      Base
                    </div>
                  </SelectItem>
                  <SelectItem value="ethereum">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                      Ethereum
                    </div>
                  </SelectItem>
                  <SelectItem value="polygon">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                      Polygon
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Name and Symbol */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-black font-medium">
                  Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-white border-gray-300 text-black placeholder:text-gray-500"
                  placeholder="The Pond"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="symbol" className="text-black font-medium">
                  Symbol <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="symbol"
                  value={symbol}
                  onChange={(e) => setSymbol(e.target.value)}
                  className="bg-white border-gray-300 text-black placeholder:text-gray-500"
                  placeholder="POND"
                />
              </div>
            </div>

            {/* Collection Image */}
            <div className="space-y-2">
              <Label className="text-black font-medium">Collection Image</Label>
              <p className="text-sm text-gray-600">
                Image that will be shown as the main image for the collection.
                Recommended: 800×800px jpg
              </p>

              <div className="mt-4">
                {uploadedFile ? (
                  <div className="border-2 border-gray-300 border-dashed rounded-lg p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Upload className="w-6 h-6 text-gray-400" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-black">
                            {uploadedFile.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={removeFile}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div
                    {...getRootProps()}
                    className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
                      isDragActive
                        ? "border-blue-400 bg-blue-50"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <input {...getInputProps()} />
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600 mb-4">
                      {isDragActive
                        ? "Drop the files here..."
                        : "Drop your artwork here to upload"}
                    </p>
                    <Button
                      variant="outline"
                      className="bg-white border-gray-300 text-black hover:bg-gray-50"
                    >
                      Choose Image...
                    </Button>
                  </div>
                )}
              </div>
            </div>
            {/* description */}
            <div className="flex flex-col gap-3">
              <Label className="text-black font-medium">Description</Label>
              <textarea
                name="description"
                id="description-1"
                className="px-2 py-3"
                cols={30}
                rows={10}
              ></textarea>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left side - Art type selection */}
              <div className="space-y-3">
                {/* Same Artwork Option */}
                <div
                  onClick={() => setArtType("same")}
                  className={`relative p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    artType === "same"
                      ? "border-green-500 bg-green-50"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  {artType === "same" && (
                    <div className="absolute top-3 right-3">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  )}
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg flex items-center justify-center flex-shrink-0">
                      <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                        <div className="w-4 h-4 bg-purple-500 rounded-full"></div>
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-black mb-1">
                        Same Artwork
                      </h3>
                      <p className="text-sm text-gray-600">
                        An ERC-1155 collection where everyone mints the same
                        artwork
                      </p>
                    </div>
                  </div>
                </div>

                {/* Unique Artwork Option */}
                <div
                  onClick={() => setArtType("unique")}
                  className={`relative p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    artType === "unique"
                      ? "border-green-500 bg-green-50"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                >
                  {artType === "unique" && (
                    <div className="absolute top-3 right-3">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    </div>
                  )}
                  <div className="flex items-start gap-3">
                    <div className="flex gap-1 flex-shrink-0">
                      <div className="w-6 h-6 bg-gradient-to-br from-blue-400 to-purple-400 rounded"></div>
                      <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-blue-400 rounded"></div>
                      <div className="w-6 h-6 bg-gradient-to-br from-pink-400 to-red-400 rounded"></div>
                      <div className="w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-400 rounded"></div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-black mb-1">
                        Unique Artwork
                      </h3>
                      <p className="text-sm text-gray-600">
                        An ERC-721 collection where everyone mints a unique
                        artwork
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right side - Artwork upload */}
              <div className="space-y-2">
                {artworkFile ? (
                  <div className="border-2 border-gray-300 border-dashed rounded-lg p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Upload className="w-6 h-6 text-gray-400" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-black">
                            {artworkFile.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {(artworkFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={removeArtworkFile}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div
                    {...getArtworkRootProps()}
                    className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors min-h-[200px] flex flex-col items-center justify-center ${
                      isArtworkDragActive
                        ? "border-blue-400 bg-blue-50"
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <input {...getArtworkInputProps()} />
                    <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                    <p className="text-gray-600 mb-2 font-medium">
                      {isArtworkDragActive
                        ? "Drop the files here..."
                        : "Drop your artwork here to upload"}
                    </p>
                    <p className="text-xs text-gray-500 mb-4">
                      File types allowed: .jpg, .png. Max file size: 10MB
                    </p>
                    <Button
                      variant="outline"
                      className="bg-white border-gray-300 text-black hover:bg-gray-50"
                    >
                      Choose Image...
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

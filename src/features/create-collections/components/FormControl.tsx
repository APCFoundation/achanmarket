import { Button } from "@/components/ui/button";
import {
  ArtTypeSelectorProps,
  CollectionSectionProps,
  DescriptionFieldsProps,
  FieldsProps,
} from "../types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, Upload, X } from "lucide-react";
import { useDropzone } from "react-dropzone";
export const FormSection = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
  );
};

export const Fields = (props: FieldsProps) => {
  const {
    name,
    type = "text",
    placeholder = "The Pond",
    id,
    onChange,
    value,
  } = props;
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-black font-medium">
        {name} <span className="text-red-500">*</span>
      </Label>
      <Input
        id={id}
        value={value}
        type={type}
        onChange={onChange}
        className="bg-white border-gray-300 text-black placeholder:text-gray-500"
        placeholder={placeholder}
      />
    </div>
  );
};

export const DescriptionFields = (props: DescriptionFieldsProps) => {
  const { value, setForm } = props;
  return (
    <div className="flex flex-col gap-3">
      <Label className="text-black font-medium">Description</Label>
      <textarea
        name="description"
        id="description-1"
        value={value}
        onChange={(e) =>
          setForm((prev) => ({ ...prev, description: e.target.value }))
        }
        className="px-2 py-3  border-gray-300 border-2"
        cols={30}
        rows={10}
      ></textarea>
    </div>
  );
};

export const CollectionSection = (props: CollectionSectionProps) => {
  const {
    collectionFile,
    setCollectionFile,
    removeCollectionFile,
    onDropCollection,
  } = props;

  const {
    getRootProps: getCollectionRootProps,
    getInputProps: getCollectionInputProps,
    isDragActive: isCollectionDragActive,
  } = useDropzone({
    onDrop: onDropCollection,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif"],
    },
    multiple: false,
  });
  return (
    <div className="space-y-2">
      <Label className="text-black font-medium">Collection Image</Label>
      <p className="text-sm text-gray-600">
        Image that will be shown as the main image for the collection.
        Recommended: 800×800px jpg
      </p>

      <div className="mt-4">
        {collectionFile ? (
          <div className="border-2 border-gray-300 border-dashed rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Upload className="w-6 h-6 text-gray-400" />
                </div>
                <div>
                  <p className="text-sm font-medium text-black">
                    {collectionFile.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {(collectionFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={removeCollectionFile}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ) : (
          <div
            {...getCollectionRootProps()}
            className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
              isCollectionDragActive
                ? "border-blue-400 bg-blue-50"
                : "border-gray-300 hover:border-gray-400"
            }`}
          >
            <input {...getCollectionInputProps()} />
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">
              {isCollectionDragActive
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
  );
};

export const ArtTypeSelector = (props: ArtTypeSelectorProps) => {
  const { artType, setForm, onDropArtwork, removeArtworkFile, artworkFile } =
    props;

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
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Left side - Art type selection */}
      <div className="space-y-3">
        {/* Same Artwork Option */}
        <div
          onClick={() => setForm((prev) => ({ ...prev, artType: "same" }))}
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
              <h3 className="font-semibold text-black mb-1">Same Artwork</h3>
              <p className="text-sm text-gray-600">
                An ERC-1155 collection where everyone mints the same artwork
              </p>
            </div>
          </div>
        </div>

        {/* Unique Artwork Option */}
        <div
          onClick={() => setForm((prev) => ({ ...prev, artType: "unique" }))}
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
              <h3 className="font-semibold text-black mb-1">Unique Artwork</h3>
              <p className="text-sm text-gray-600">
                An ERC-721 collection where everyone mints a unique artwork
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Artwork upload */}
      <div className="space-y-2">
        {artType === "same" && (
          <>
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
          </>
        )}

        {artType == "unique" && (
          <>
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors min-h-[200px] flex flex-col items-center justify-centerborder-gray-300 hover:border-gray-400
                    `}
            >
              <p className="text-gray-600 mb-2 font-medium">Metadata URL</p>
              <p className="text-[10px] text-gray-500 mb-4">
                Check our step-by-step guide on how to generate and upload your
                collection assets and metadata.
              </p>
              <input
                className={
                  "w-full text-[10px] placeholder:text-[10px] px-2 py-2"
                }
                type="text"
                placeholder={"https://ipfs.io/<CID>"}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

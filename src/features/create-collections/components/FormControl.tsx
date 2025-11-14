import { Button } from "@/components/ui/button";
import {
  CollectionSectionProps,
  DescriptionFieldsProps,
  FieldsProps,
} from "../types";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, X } from "lucide-react";
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
  const { value, onChange } = props;
  return (
    <div className="flex flex-col gap-3">
      <Label className="text-black font-medium">Description</Label>
      <textarea
        name="description"
        id="description-1"
        value={value}
        onChange={onChange}
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

import { X } from "lucide-react";

const HeaderClearForm = ({ clearForm }: { clearForm: () => void }) => {
  return (
    <div className="flex justify-end mb-8 ">
      <button
        onClick={clearForm}
        className="text-gray-500 hover:text-gray-700 text-sm flex items-center gap-1"
      >
        <X className="w-4 h-4" />
        Clear Form
      </button>
    </div>
  );
};

export default HeaderClearForm;

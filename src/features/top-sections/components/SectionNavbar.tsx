import { Button } from "@/components/ui/button";
import { ChevronUp, ChevronDown } from "lucide-react";

export default function SectionNavbar({
  title,
  isCollapsed,
  onToggle,
  filters = ["1H", "24H", "7D", "All"],
}: {
  title: string;
  isCollapsed: boolean;
  onToggle: () => void;
  filters?: string[];
}) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="font-semibold text-white">{title}</h2>
      <div className="flex gap-2 items-center">
        {filters.map((f) => (
          <Button key={f} size="sm" variant="outline">
            {f}
          </Button>
        ))}
        <Button variant="ghost" size="icon" onClick={onToggle}>
          {isCollapsed ? <ChevronDown /> : <ChevronUp />}
        </Button>
      </div>
    </div>
  );
}

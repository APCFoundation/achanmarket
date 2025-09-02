import { useRef } from "react";

export default function useRefProduct() {
  const svgRef = useRef<SVGSVGElement>(null);
  const container = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  return { svgRef, container, containerRef };
}

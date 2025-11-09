import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useAppKitNetwork } from "@reown/appkit/react";
import { useSwitchChain } from "wagmi";
import { config } from "@/lib";
import { useEffect } from "react";

type Props = {
  value: string;
  onChange: (val: string) => void;
};

const NETWORK_IDS: Record<string, number> = {
  base: 8453, // Base mainnet
  ethereum: 1, // Ethereum mainnet
  polygon: 137, // Polygon mainnet
  arbitrum: 42161, // Arbitrum One
  optimism: 10, // Optimism mainnet
  bsc: 56, // BNB Smart Chain
  berachain: 80084, // (contoh ID, cek yg benar)
  avalanche: 43114, // Avalanche C-Chain mainnet
  sepolia: 11155111,
};
function SwitchChain({ value, onChange }: Props) {
  const { caipNetwork } = useAppKitNetwork();
  const { switchChain } = useSwitchChain({ config });

  useEffect(() => {
    if (value && value !== caipNetwork?.name) {
      const id = NETWORK_IDS[value];
      if (id) {
        switchChain({ chainId: id });
      }
    }
  }, [value, switchChain, caipNetwork]);

  return (
    <div className="space-y-2">
      <Label htmlFor="chain" className="text-black font-medium">
        EVM Chain <span className="text-red-500">*</span>
      </Label>

      <Select value={value} onValueChange={(val) => onChange(val)}>
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
          <SelectItem value="arbitrum">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Arbitrum
            </div>
          </SelectItem>
          <SelectItem value="optimism">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              Optimism
            </div>
          </SelectItem>
          <SelectItem value="bsc">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
              BSC (Binance Smart Chain)
            </div>
          </SelectItem>
          <SelectItem value="berachain">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              Berachain
            </div>
          </SelectItem>
          <SelectItem value="avalanche">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              Avalanche
            </div>
          </SelectItem>
          <SelectItem value="sepolia">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              sepolia
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export default SwitchChain;

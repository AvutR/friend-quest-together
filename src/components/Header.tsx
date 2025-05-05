
import { Shield } from "lucide-react";

const Header = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <Shield className="h-8 w-8 text-amber-400" />
        <h1 className="text-2xl font-bold text-amber-400">Friend Quest</h1>
      </div>
      <div className="flex items-center gap-2">
        <div className="px-3 py-1 bg-emerald-900/40 border border-emerald-500/30 rounded-md text-emerald-400 text-sm">
          <span className="font-medium">Level 42</span> · Mage
        </div>
        <div className="w-10 h-10 rounded-full bg-purple-700 border-2 border-amber-400 flex items-center justify-center">
          <span className="text-amber-300 text-xs font-bold">RS</span>
        </div>
      </div>
    </div>
  );
};

export default Header;

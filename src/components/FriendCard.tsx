
import { Button } from "@/components/ui/button";
import { MessageSquare, UserMinus, PartyPopper } from "lucide-react";
import { Friend } from "../types/friend";

interface FriendCardProps {
  friend: Friend;
  onMessage: () => void;
  onRemove: () => void;
  onInviteToParty?: () => void;
}

const FriendCard = ({ friend, onMessage, onRemove, onInviteToParty }: FriendCardProps) => {
  const statusColor = 
    friend.status === "online" ? "bg-emerald-500" : 
    friend.status === "in-game" ? "bg-amber-500" : 
    friend.status === "away" ? "bg-orange-500" : "bg-slate-400";

  const activityText = 
    friend.activity && friend.status !== "offline" 
      ? friend.activity 
      : friend.status === "offline" 
        ? `Last online ${friend.lastSeen}` 
        : "Online";

  return (
    <div className="flex items-center justify-between p-3 bg-slate-800/40 border border-amber-500/20 rounded-md">
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className={`w-10 h-10 rounded-full ${friend.class === "Warrior" ? "bg-red-700" : friend.class === "Mage" ? "bg-blue-700" : "bg-green-700"} border-2 border-amber-500/50 flex items-center justify-center`}>
            <span className="text-amber-300 text-xs font-bold">{friend.name.substring(0, 2).toUpperCase()}</span>
          </div>
          <span className={`absolute bottom-0 right-0 w-3 h-3 ${statusColor} rounded-full border border-slate-900`}></span>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <p className="font-medium">{friend.name}</p>
            <span className="text-xs text-slate-400">Lv.{friend.level}</span>
          </div>
          <p className="text-xs text-slate-400">
            {friend.class} • {activityText}
          </p>
        </div>
      </div>
      <div className="flex gap-2">
        {friend.status !== "offline" && onInviteToParty && (
          <Button 
            size="icon" 
            variant="outline" 
            onClick={onInviteToParty}
            className="size-8 border-amber-500/30 bg-amber-500/10 text-amber-400 hover:bg-amber-500/20"
          >
            <PartyPopper size={14} />
          </Button>
        )}
        {friend.status !== "offline" && (
          <Button 
            size="icon" 
            variant="outline" 
            onClick={onMessage}
            className="size-8 border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
          >
            <MessageSquare size={14} />
          </Button>
        )}
        <Button 
          size="icon" 
          variant="outline"
          onClick={onRemove}
          className="size-8 border-rose-500/30 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20"
        >
          <UserMinus size={14} />
        </Button>
      </div>
    </div>
  );
};

export default FriendCard;

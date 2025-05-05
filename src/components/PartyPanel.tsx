
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Users, UserPlus, PartyPopper } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import FriendCard from "./FriendCard";
import { Friend, OnlinePlayer, PartyMember } from "../types/friend";

interface PartyPanelProps {
  party: PartyMember[];
  friends: Friend[];
  onlinePlayers: OnlinePlayer[];
}

const PartyPanel = ({ party, friends, onlinePlayers }: PartyPanelProps) => {
  const { toast } = useToast();
  const [isCreatingParty, setIsCreatingParty] = useState(party.length === 0);
  
  const onlineFriends = friends.filter(friend => friend.status !== "offline");

  const handleInviteToParty = (friend: Friend) => {
    toast({
      title: "Party invitation sent",
      description: `Invitation sent to ${friend.name}`,
    });
  };
  
  const handleLeaveParty = () => {
    toast({
      title: "Left party",
      description: "You have left the party",
      variant: "destructive",
    });
  };

  const handleCreateParty = () => {
    setIsCreatingParty(false);
    toast({
      title: "Party created",
      description: "Your party has been created",
    });
  };

  return (
    <div>
      {party.length > 0 && !isCreatingParty ? (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h2 className="text-xl font-bold text-amber-400 flex items-center gap-2">
                <PartyPopper className="h-5 w-5" />
                Current Party
              </h2>
              <p className="text-sm text-slate-400">
                {party.length}/5 members
              </p>
            </div>
            <div className="flex gap-2">
              <Button 
                size="sm" 
                variant="outline"
                className="border-amber-500/30 bg-amber-500/10 text-amber-400 hover:bg-amber-500/20"
                onClick={() => setIsCreatingParty(true)}
              >
                <UserPlus size={14} className="mr-1" />
                Invite Friends
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                className="border-rose-500/30 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20"
                onClick={handleLeaveParty}
              >
                Leave Party
              </Button>
            </div>
          </div>
          
          <div className="space-y-3">
            {party.map((member) => (
              <div 
                key={member.id} 
                className={`flex items-center justify-between p-3 ${member.isLeader ? "bg-amber-500/10" : "bg-slate-800/40"} border ${member.isLeader ? "border-amber-500/30" : "border-amber-500/20"} rounded-md`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full ${member.class === "Warrior" ? "bg-red-700" : member.class === "Mage" ? "bg-blue-700" : "bg-green-700"} border-2 border-amber-500/50 flex items-center justify-center`}>
                    <span className="text-amber-300 text-xs font-bold">{member.name.substring(0, 2).toUpperCase()}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{member.name}</p>
                      {member.isLeader && (
                        <Badge variant="outline" className="bg-amber-500/20 text-amber-400 border-amber-500/30 text-xs">
                          Leader
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-slate-400">Level {member.level} {member.class} • {member.role}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 bg-emerald-500 rounded-full"></span>
                      <span className="text-xs text-emerald-400">HP: {member.health}%</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="h-2 w-2 bg-blue-500 rounded-full"></span>
                      <span className="text-xs text-blue-400">MP: {member.mana}%</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-3 bg-slate-800/40 border border-amber-500/20 rounded-md">
            <h3 className="font-medium text-amber-400 mb-2">Party Bonus</h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="text-sm p-2 bg-amber-500/5 rounded">
                <span className="font-medium text-amber-400">+15%</span> XP Gain
              </div>
              <div className="text-sm p-2 bg-amber-500/5 rounded">
                <span className="font-medium text-amber-400">+10%</span> Gold Find
              </div>
              <div className="text-sm p-2 bg-amber-500/5 rounded">
                <span className="font-medium text-amber-400">+5%</span> Critical Hit
              </div>
              <div className="text-sm p-2 bg-amber-500/5 rounded">
                <span className="font-medium text-amber-400">+8%</span> Movement Speed
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {isCreatingParty && party.length === 0 && (
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-xl font-bold text-amber-400 flex items-center gap-2">
                  <PartyPopper className="h-5 w-5" />
                  Create New Party
                </h2>
                <p className="text-sm text-slate-400">
                  Invite friends to join your party
                </p>
              </div>
              <Button 
                onClick={handleCreateParty}
                className="bg-amber-500/80 hover:bg-amber-500 text-black"
              >
                Create Party
              </Button>
            </div>
          )}
          
          {onlineFriends.length > 0 ? (
            <div>
              <h3 className="font-medium text-amber-400 mb-2">
                Online Friends {isCreatingParty && "(Select to invite)"}
              </h3>
              <div className="space-y-3">
                {onlineFriends.map((friend) => (
                  <FriendCard
                    key={friend.id}
                    friend={friend}
                    onMessage={() => toast({ description: `Opening chat with ${friend.name}` })}
                    onRemove={() => toast({ description: `${friend.name} removed from friends` })}
                    onInviteToParty={() => handleInviteToParty(friend)}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-slate-400">
              <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>None of your friends are online to invite.</p>
              <p className="text-sm mt-2">Try again later or add more friends.</p>
            </div>
          )}
          
          <div className="p-4 bg-slate-800/40 border border-amber-500/20 rounded-md">
            <h3 className="font-medium text-amber-400 mb-2">Party Benefits</h3>
            <p className="text-sm text-slate-300 mb-3">
              Form a party to gain special bonuses and tackle group content together!
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div className="text-sm p-2 bg-amber-500/5 rounded">
                <span className="font-medium text-amber-400">+15%</span> XP Gain
              </div>
              <div className="text-sm p-2 bg-amber-500/5 rounded">
                <span className="font-medium text-amber-400">+10%</span> Gold Find
              </div>
              <div className="text-sm p-2 bg-amber-500/5 rounded">
                <span className="font-medium text-amber-400">+5%</span> Critical Hit
              </div>
              <div className="text-sm p-2 bg-amber-500/5 rounded">
                <span className="font-medium text-amber-400">+8%</span> Movement Speed
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PartyPanel;

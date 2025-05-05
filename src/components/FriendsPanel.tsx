
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { User, UserPlus, UserMinus, Check, MessageSquare, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import FriendCard from "./FriendCard";
import { Friend, FriendRequest, OnlinePlayer } from "../types/friend";

interface FriendsPanelProps {
  friends: Friend[];
  friendRequests: FriendRequest[];
  onlinePlayers: OnlinePlayer[];
}

const FriendsPanel = ({ friends, friendRequests, onlinePlayers }: FriendsPanelProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<"all" | "online" | "requests">("all");

  const onlineFriends = friends.filter(friend => friend.status !== "offline");
  const filteredFriends = friends.filter(friend => 
    friend.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAcceptRequest = (request: FriendRequest) => {
    toast({
      title: "Friend request accepted",
      description: `You are now friends with ${request.name}`,
    });
  };

  const handleDeclineRequest = (request: FriendRequest) => {
    toast({
      description: `Friend request from ${request.name} declined`,
    });
  };

  const handleSendRequest = (player: OnlinePlayer) => {
    toast({
      title: "Friend request sent",
      description: `Request sent to ${player.name}`,
    });
  };

  const handleRemoveFriend = (friend: Friend) => {
    toast({
      title: "Friend removed",
      description: `${friend.name} has been removed from your friends list`,
      variant: "destructive",
    });
  };

  return (
    <div>
      <div className="mb-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 justify-between items-start sm:items-center">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-amber-500/10 text-amber-400 hover:bg-amber-500/20 border-amber-500/30">
              {friends.length} Friends
            </Badge>
            <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border-emerald-500/30">
              {onlineFriends.length} Online
            </Badge>
          </div>
          <div className="relative w-full sm:w-64">
            <Input
              className="bg-slate-800/50 border-amber-500/20 focus-visible:ring-amber-500/30"
              placeholder="Search friends..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex border-b border-amber-500/20">
          <button 
            onClick={() => setActiveTab("all")}
            className={`px-4 py-2 flex items-center gap-2 ${activeTab === "all" ? "border-b-2 border-amber-400 text-amber-400" : "text-slate-400"}`}
          >
            <User size={16} /> All Friends
          </button>
          <button 
            onClick={() => setActiveTab("online")}
            className={`px-4 py-2 flex items-center gap-2 ${activeTab === "online" ? "border-b-2 border-amber-400 text-amber-400" : "text-slate-400"}`}
          >
            <Users size={16} /> Online
          </button>
          <button 
            onClick={() => setActiveTab("requests")}
            className={`px-4 py-2 flex items-center gap-2 ${activeTab === "requests" ? "border-b-2 border-amber-400 text-amber-400" : "text-slate-400"}`}
          >
            <UserPlus size={16} /> 
            Requests
            {friendRequests.length > 0 && (
              <span className="rounded-full bg-amber-500 w-5 h-5 text-xs flex items-center justify-center text-black">
                {friendRequests.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {activeTab === "all" && (
        <div className="space-y-3">
          {filteredFriends.length === 0 ? (
            <div className="text-center py-8 text-slate-400">
              <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>No friends found matching your search.</p>
            </div>
          ) : (
            filteredFriends.map((friend) => (
              <FriendCard
                key={friend.id}
                friend={friend}
                onMessage={() => toast({ description: `Opening chat with ${friend.name}` })}
                onRemove={() => handleRemoveFriend(friend)}
              />
            ))
          )}
        </div>
      )}

      {activeTab === "online" && (
        <div className="space-y-3">
          {onlineFriends.length === 0 ? (
            <div className="text-center py-8 text-slate-400">
              <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>None of your friends are online right now.</p>
            </div>
          ) : (
            onlineFriends.map((friend) => (
              <FriendCard
                key={friend.id}
                friend={friend}
                onMessage={() => toast({ description: `Opening chat with ${friend.name}` })}
                onRemove={() => handleRemoveFriend(friend)}
              />
            ))
          )}
        </div>
      )}

      {activeTab === "requests" && (
        <div className="space-y-6">
          {friendRequests.length > 0 && (
            <div>
              <h3 className="font-medium text-amber-400 mb-2">Incoming Requests</h3>
              <div className="space-y-3">
                {friendRequests.map((request) => (
                  <div 
                    key={request.id} 
                    className="flex items-center justify-between p-3 bg-slate-800/40 border border-amber-500/20 rounded-md"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full ${request.class === "Warrior" ? "bg-red-700" : request.class === "Mage" ? "bg-blue-700" : "bg-green-700"} border-2 border-amber-500/50 flex items-center justify-center`}>
                        <span className="text-amber-300 text-xs font-bold">{request.name.substring(0, 2).toUpperCase()}</span>
                      </div>
                      <div>
                        <p className="font-medium">{request.name}</p>
                        <p className="text-xs text-slate-400">Level {request.level} {request.class}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => handleAcceptRequest(request)} 
                        className="border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                      >
                        <Check size={14} className="mr-1" />
                        Accept
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleDeclineRequest(request)}
                        className="border-rose-500/30 bg-rose-500/10 text-rose-400 hover:bg-rose-500/20"
                      >
                        <UserMinus size={14} className="mr-1" />
                        Decline
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <h3 className="font-medium text-amber-400 mb-2">Find New Friends</h3>
            <div className="space-y-3">
              {onlinePlayers.slice(0, 3).map((player) => (
                <div 
                  key={player.id} 
                  className="flex items-center justify-between p-3 bg-slate-800/40 border border-amber-500/20 rounded-md"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full ${player.class === "Warrior" ? "bg-red-700" : player.class === "Mage" ? "bg-blue-700" : "bg-green-700"} border-2 border-amber-500/50 flex items-center justify-center`}>
                      <span className="text-amber-300 text-xs font-bold">{player.name.substring(0, 2).toUpperCase()}</span>
                    </div>
                    <div>
                      <p className="font-medium">{player.name}</p>
                      <p className="text-xs text-slate-400">Level {player.level} {player.class}</p>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleSendRequest(player)}
                    className="border-amber-500/30 bg-amber-500/10 text-amber-400 hover:bg-amber-500/20"
                  >
                    <UserPlus size={14} className="mr-1" />
                    Add Friend
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FriendsPanel;

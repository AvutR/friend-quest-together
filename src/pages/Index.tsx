
import { useState } from "react";
import FriendsPanel from "../components/FriendsPanel";
import PartyPanel from "../components/PartyPanel";
import Header from "../components/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMockData } from "../hooks/use-mock-data";

const Index = () => {
  const [activeTab, setActiveTab] = useState("friends");
  const { friends, friendRequests, party, onlinePlayers } = useMockData();

  return (
    <div className="min-h-screen bg-slate-900 bg-[url('/assets/parchment-bg.png')] bg-opacity-90 bg-blend-multiply text-slate-200">
      <div className="container mx-auto px-4 py-6">
        <Header />
        
        <div className="mt-8 border border-amber-500/30 rounded-lg bg-slate-900/95 shadow-lg backdrop-blur-sm">
          <Tabs defaultValue="friends" className="w-full" onValueChange={setActiveTab}>
            <div className="border-b border-amber-500/20">
              <TabsList className="w-full bg-transparent h-14">
                <TabsTrigger 
                  value="friends" 
                  className="w-1/2 data-[state=active]:bg-amber-500/10 data-[state=active]:text-amber-400 rounded-none border-r border-amber-500/20"
                >
                  Friends
                  {friendRequests.length > 0 && (
                    <span className="ml-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-xs font-medium text-black">
                      {friendRequests.length}
                    </span>
                  )}
                </TabsTrigger>
                <TabsTrigger 
                  value="party" 
                  className="w-1/2 data-[state=active]:bg-amber-500/10 data-[state=active]:text-amber-400 rounded-none"
                >
                  Party
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="friends" className="p-4">
              <FriendsPanel 
                friends={friends}
                friendRequests={friendRequests}
                onlinePlayers={onlinePlayers}
              />
            </TabsContent>
            
            <TabsContent value="party" className="p-4">
              <PartyPanel 
                party={party} 
                friends={friends}
                onlinePlayers={onlinePlayers}
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Index;

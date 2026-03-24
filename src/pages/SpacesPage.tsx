import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import SpaceCard from "@/components/SpaceCard";
import { mockSpaces, SDKS } from "@/lib/mock-data";

export default function SpacesPage() {
  const [search, setSearch] = useState("");
  const [selectedSdk, setSelectedSdk] = useState("");
  const [sortBy, setSortBy] = useState<"likes" | "updated">("likes");

  const filtered = useMemo(() => {
    let spaces = [...mockSpaces];
    if (search) {
      const q = search.toLowerCase();
      spaces = spaces.filter(s => s.name.toLowerCase().includes(q) || s.owner.toLowerCase().includes(q) || s.description.toLowerCase().includes(q));
    }
    if (selectedSdk) spaces = spaces.filter(s => s.sdk === selectedSdk);
    spaces.sort((a, b) => sortBy === "likes" ? b.likes - a.likes : new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
    return spaces;
  }, [search, selectedSdk, sortBy]);

  return (
    <div className="hf-container py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Spaces</h1>
        <span className="text-sm text-muted-foreground">{filtered.length} spaces</span>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input type="text" placeholder="Filter by name" value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-9 pr-3 py-2 text-sm border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value as any)} className="px-3 py-2 text-sm border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring">
          <option value="likes">Most Likes</option>
          <option value="updated">Recently Updated</option>
        </select>
      </div>

      {/* SDK filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button onClick={() => setSelectedSdk("")} className={`hf-tag text-sm py-1 px-3 ${!selectedSdk ? 'bg-foreground text-background' : ''}`}>All</button>
        {SDKS.map(sdk => (
          <button key={sdk} onClick={() => setSelectedSdk(sdk === selectedSdk ? "" : sdk)} className={`hf-tag text-sm py-1 px-3 ${selectedSdk === sdk ? 'bg-foreground text-background' : ''}`}>
            {sdk}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((space) => (
          <SpaceCard key={space.id} space={space} />
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <p className="text-lg">No spaces found.</p>
        </div>
      )}
    </div>
  );
}

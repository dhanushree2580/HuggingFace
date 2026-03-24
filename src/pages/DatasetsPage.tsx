import { useState, useMemo } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import DatasetCard from "@/components/DatasetCard";
import { mockDatasets, TASKS } from "@/lib/mock-data";

export default function DatasetsPage() {
  const [search, setSearch] = useState("");
  const [selectedTask, setSelectedTask] = useState("");
  const [sortBy, setSortBy] = useState<"likes" | "downloads" | "updated">("likes");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let datasets = [...mockDatasets];
    if (search) {
      const q = search.toLowerCase();
      datasets = datasets.filter(d => d.name.toLowerCase().includes(q) || d.owner.toLowerCase().includes(q) || d.description.toLowerCase().includes(q));
    }
    if (selectedTask) datasets = datasets.filter(d => d.task === selectedTask);
    datasets.sort((a, b) => {
      if (sortBy === "likes") return b.likes - a.likes;
      if (sortBy === "downloads") return b.downloads - a.downloads;
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
    return datasets;
  }, [search, selectedTask, sortBy]);

  return (
    <div className="hf-container py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Datasets</h1>
        <span className="text-sm text-muted-foreground">{filtered.length.toLocaleString()} datasets</span>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input type="text" placeholder="Filter by name" value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-9 pr-3 py-2 text-sm border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring" />
        </div>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value as any)} className="px-3 py-2 text-sm border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring">
          <option value="likes">Most Likes</option>
          <option value="downloads">Most Downloads</option>
          <option value="updated">Recently Updated</option>
        </select>
        <button onClick={() => setShowFilters(!showFilters)} className="inline-flex items-center gap-2 px-3 py-2 text-sm border border-border rounded-lg bg-background hover:bg-secondary transition-colors">
          <SlidersHorizontal className="h-4 w-4" /> Filters
        </button>
      </div>

      {showFilters && (
        <div className="flex flex-wrap gap-6 mb-6 p-4 bg-secondary rounded-lg">
          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase mb-2 block">Task</label>
            <select value={selectedTask} onChange={(e) => setSelectedTask(e.target.value)} className="px-2 py-1 text-sm border border-border rounded bg-background">
              <option value="">All Tasks</option>
              {TASKS.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <button onClick={() => setSelectedTask("")} className="text-sm hf-link self-end">Clear filters</button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((dataset) => (
          <DatasetCard key={dataset.id} dataset={dataset} />
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <p className="text-lg">No datasets found.</p>
        </div>
      )}
    </div>
  );
}

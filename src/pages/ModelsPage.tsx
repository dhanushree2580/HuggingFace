import { useState, useMemo } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import ModelCard from "@/components/ModelCard";
import { mockModels, TASKS, FRAMEWORKS } from "@/lib/mock-data";
import { useSearchParams } from "react-router-dom";

export default function ModelsPage() {
  const [searchParams] = useSearchParams();
  const initialTask = searchParams.get("task") || "";
  const [search, setSearch] = useState("");
  const [selectedTask, setSelectedTask] = useState(initialTask);
  const [selectedFramework, setSelectedFramework] = useState("");
  const [sortBy, setSortBy] = useState<"likes" | "downloads" | "updated">("likes");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let models = [...mockModels];
    if (search) {
      const q = search.toLowerCase();
      models = models.filter(m => m.name.toLowerCase().includes(q) || m.owner.toLowerCase().includes(q) || m.description.toLowerCase().includes(q));
    }
    if (selectedTask) models = models.filter(m => m.task === selectedTask);
    if (selectedFramework) models = models.filter(m => m.framework === selectedFramework);
    models.sort((a, b) => {
      if (sortBy === "likes") return b.likes - a.likes;
      if (sortBy === "downloads") return b.downloads - a.downloads;
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
    return models;
  }, [search, selectedTask, selectedFramework, sortBy]);

  return (
    <div className="hf-container py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">Models</h1>
        <span className="text-sm text-muted-foreground">{filtered.length.toLocaleString()} models</span>
      </div>

      {/* Search & Sort */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Filter by name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
          className="px-3 py-2 text-sm border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
        >
          <option value="likes">Most Likes</option>
          <option value="downloads">Most Downloads</option>
          <option value="updated">Recently Updated</option>
        </select>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="inline-flex items-center gap-2 px-3 py-2 text-sm border border-border rounded-lg bg-background hover:bg-secondary transition-colors"
        >
          <SlidersHorizontal className="h-4 w-4" /> Filters
        </button>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="flex flex-wrap gap-6 mb-6 p-4 bg-secondary rounded-lg">
          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase mb-2 block">Task</label>
            <select value={selectedTask} onChange={(e) => setSelectedTask(e.target.value)} className="px-2 py-1 text-sm border border-border rounded bg-background">
              <option value="">All Tasks</option>
              {TASKS.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground uppercase mb-2 block">Framework</label>
            <select value={selectedFramework} onChange={(e) => setSelectedFramework(e.target.value)} className="px-2 py-1 text-sm border border-border rounded bg-background">
              <option value="">All Frameworks</option>
              {FRAMEWORKS.map(f => <option key={f} value={f}>{f}</option>)}
            </select>
          </div>
          <button onClick={() => { setSelectedTask(""); setSelectedFramework(""); }} className="text-sm hf-link self-end">Clear filters</button>
        </div>
      )}

      {/* Active filters */}
      {(selectedTask || selectedFramework) && (
        <div className="flex flex-wrap gap-2 mb-4">
          {selectedTask && (
            <button onClick={() => setSelectedTask("")} className="hf-tag gap-1">
              {selectedTask} ×
            </button>
          )}
          {selectedFramework && (
            <button onClick={() => setSelectedFramework("")} className="hf-tag gap-1">
              {selectedFramework} ×
            </button>
          )}
        </div>
      )}

      {/* Results */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((model) => (
          <ModelCard key={model.id} model={model} />
        ))}
      </div>
      {filtered.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
          <p className="text-lg">No models found.</p>
          <p className="text-sm mt-1">Try adjusting your filters or search query.</p>
        </div>
      )}
    </div>
  );
}

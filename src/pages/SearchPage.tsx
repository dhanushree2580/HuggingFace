import { useState, useMemo } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Search } from "lucide-react";
import ModelCard from "@/components/ModelCard";
import DatasetCard from "@/components/DatasetCard";
import SpaceCard from "@/components/SpaceCard";
import { mockModels, mockDatasets, mockSpaces } from "@/lib/mock-data";

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [tab, setTab] = useState<"models" | "datasets" | "spaces">("models");

  const q = query.toLowerCase();

  const results = useMemo(() => ({
    models: mockModels.filter(m => m.name.includes(q) || m.owner.includes(q) || m.description.toLowerCase().includes(q)),
    datasets: mockDatasets.filter(d => d.name.includes(q) || d.owner.includes(q) || d.description.toLowerCase().includes(q)),
    spaces: mockSpaces.filter(s => s.name.includes(q) || s.owner.includes(q) || s.description.toLowerCase().includes(q)),
  }), [q]);

  const tabs = [
    { key: "models" as const, label: "Models", count: results.models.length },
    { key: "datasets" as const, label: "Datasets", count: results.datasets.length },
    { key: "spaces" as const, label: "Spaces", count: results.spaces.length },
  ];

  return (
    <div className="hf-container py-6">
      <h1 className="text-2xl font-bold text-foreground mb-2">
        Search results for "{query}"
      </h1>

      <div className="flex gap-1 mb-6 border-b border-border">
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors -mb-px ${tab === t.key ? 'border-primary text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
          >
            {t.label} ({t.count})
          </button>
        ))}
      </div>

      {tab === "models" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.models.map(m => <ModelCard key={m.id} model={m} />)}
        </div>
      )}
      {tab === "datasets" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.datasets.map(d => <DatasetCard key={d.id} dataset={d} />)}
        </div>
      )}
      {tab === "spaces" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.spaces.map(s => <SpaceCard key={s.id} space={s} />)}
        </div>
      )}

      {((tab === "models" && !results.models.length) || (tab === "datasets" && !results.datasets.length) || (tab === "spaces" && !results.spaces.length)) && (
        <div className="text-center py-16 text-muted-foreground">
          <Search className="h-12 w-12 mx-auto mb-3 opacity-50" />
          <p>No {tab} found matching "{query}"</p>
        </div>
      )}
    </div>
  );
}

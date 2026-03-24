import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Database, Layout } from "lucide-react";
import ModelCard from "@/components/ModelCard";
import DatasetCard from "@/components/DatasetCard";
import SpaceCard from "@/components/SpaceCard";
import { mockModels, mockDatasets, mockSpaces, TASKS } from "@/lib/mock-data";

export default function HomePage() {
  const trendingModels = [...mockModels].sort((a, b) => b.likes - a.likes).slice(0, 6);
  const trendingDatasets = [...mockDatasets].sort((a, b) => b.likes - a.likes).slice(0, 3);
  const trendingSpaces = [...mockSpaces].sort((a, b) => b.likes - a.likes).slice(0, 6);

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-b from-[hsl(var(--hf-yellow-light))] to-background py-16 md:py-24">
        <div className="hf-container text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
            The AI community building the future.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            The platform where the machine learning community collaborates on models, datasets, and applications.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link to="/models" className="hf-btn-primary inline-flex items-center gap-2">
              <Sparkles className="h-4 w-4" /> Explore Models
            </Link>
            <Link to="/datasets" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card font-semibold text-foreground hover:bg-secondary transition-colors">
              <Database className="h-4 w-4" /> Browse Datasets
            </Link>
            <Link to="/spaces" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border bg-card font-semibold text-foreground hover:bg-secondary transition-colors">
              <Layout className="h-4 w-4" /> Discover Spaces
            </Link>
          </div>
        </div>
      </section>

      {/* Filter by Task */}
      <section className="hf-container py-10">
        <h2 className="text-xl font-bold text-foreground mb-4">Browse by Task</h2>
        <div className="flex flex-wrap gap-2">
          {TASKS.map((task) => (
            <Link key={task} to={`/models?task=${encodeURIComponent(task)}`} className="hf-tag text-sm py-1 px-3">
              {task}
            </Link>
          ))}
        </div>
      </section>

      {/* Trending Models */}
      <section className="hf-container py-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-foreground">Trending Models</h2>
          <Link to="/models" className="hf-link text-sm inline-flex items-center gap-1">
            View all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {trendingModels.map((model) => (
            <ModelCard key={model.id} model={model} />
          ))}
        </div>
      </section>

      {/* Trending Spaces */}
      <section className="hf-container py-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-foreground">Trending Spaces</h2>
          <Link to="/spaces" className="hf-link text-sm inline-flex items-center gap-1">
            View all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {trendingSpaces.map((space) => (
            <SpaceCard key={space.id} space={space} />
          ))}
        </div>
      </section>

      {/* Trending Datasets */}
      <section className="hf-container py-8 pb-16">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-foreground">Trending Datasets</h2>
          <Link to="/datasets" className="hf-link text-sm inline-flex items-center gap-1">
            View all <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {trendingDatasets.map((dataset) => (
            <DatasetCard key={dataset.id} dataset={dataset} />
          ))}
        </div>
      </section>
    </div>
  );
}

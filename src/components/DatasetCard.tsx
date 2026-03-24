import { Link } from "react-router-dom";
import { Heart, Download, Clock } from "lucide-react";
import { Dataset, formatNumber, timeAgo } from "@/lib/mock-data";

export default function DatasetCard({ dataset }: { dataset: Dataset }) {
  return (
    <Link to={`/datasets/${dataset.owner}/${dataset.name}`} className="hf-card p-4 block">
      <div className="min-w-0">
        <h3 className="font-semibold text-foreground truncate">
          <span className="text-muted-foreground">{dataset.owner}/</span>
          {dataset.name}
        </h3>
        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{dataset.description}</p>
      </div>
      <div className="flex items-center gap-3 mt-3 flex-wrap">
        <span className="hf-tag">{dataset.task}</span>
      </div>
      <div className="flex items-center gap-4 mt-3 text-muted-foreground">
        <span className="hf-stat"><Heart className="h-3.5 w-3.5" /> {formatNumber(dataset.likes)}</span>
        <span className="hf-stat"><Download className="h-3.5 w-3.5" /> {formatNumber(dataset.downloads)}</span>
        <span className="hf-stat ml-auto"><Clock className="h-3.5 w-3.5" /> Updated {timeAgo(dataset.updatedAt)}</span>
      </div>
    </Link>
  );
}

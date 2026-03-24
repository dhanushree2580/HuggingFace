import { Link } from "react-router-dom";
import { Heart, Download, Clock } from "lucide-react";
import { Model, formatNumber, timeAgo } from "@/lib/mock-data";

export default function ModelCard({ model }: { model: Model }) {
  return (
    <Link to={`/models/${model.owner}/${model.name}`} className="hf-card p-4 block">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-foreground truncate">
            <span className="text-muted-foreground">{model.owner}/</span>
            {model.name}
          </h3>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{model.description}</p>
        </div>
      </div>
      <div className="flex items-center gap-3 mt-3 flex-wrap">
        <span className="hf-tag">{model.task}</span>
        <span className="hf-tag">{model.framework}</span>
      </div>
      <div className="flex items-center gap-4 mt-3 text-muted-foreground">
        <span className="hf-stat"><Heart className="h-3.5 w-3.5" /> {formatNumber(model.likes)}</span>
        <span className="hf-stat"><Download className="h-3.5 w-3.5" /> {formatNumber(model.downloads)}</span>
        <span className="hf-stat ml-auto"><Clock className="h-3.5 w-3.5" /> Updated {timeAgo(model.updatedAt)}</span>
      </div>
    </Link>
  );
}

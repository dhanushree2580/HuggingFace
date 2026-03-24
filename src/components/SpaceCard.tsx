import { Link } from "react-router-dom";
import { Heart, Circle } from "lucide-react";
import { Space, formatNumber } from "@/lib/mock-data";

const statusColors: Record<string, string> = {
  running: "text-hf-green",
  building: "text-primary",
  stopped: "text-muted-foreground",
};

export default function SpaceCard({ space }: { space: Space }) {
  return (
    <Link to={`/spaces/${space.owner}/${space.name}`} className="hf-card p-4 block">
      <div className="flex items-start justify-between">
        <div className="min-w-0 flex-1">
          <h3 className="font-semibold text-foreground truncate">
            <span className="text-muted-foreground">{space.owner}/</span>
            {space.name}
          </h3>
          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{space.description}</p>
        </div>
        <Circle className={`h-3 w-3 fill-current shrink-0 mt-1 ${statusColors[space.status]}`} />
      </div>
      <div className="flex items-center gap-3 mt-3 flex-wrap">
        <span className="hf-tag">{space.sdk}</span>
        {space.tags.slice(0, 2).map((tag) => (
          <span key={tag} className="hf-tag">{tag}</span>
        ))}
      </div>
      <div className="flex items-center gap-4 mt-3 text-muted-foreground">
        <span className="hf-stat"><Heart className="h-3.5 w-3.5" /> {formatNumber(space.likes)}</span>
      </div>
    </Link>
  );
}

import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { SiYoutube, SiTiktok } from "react-icons/si";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  platform: "youtube" | "tiktok";
  onClick?: () => void;
}

export function FeatureCard({ icon: Icon, title, description, platform, onClick }: FeatureCardProps) {
  return (
    <Card 
      className="border-primary/20 bg-card/80 hover-elevate cursor-pointer transition-all duration-300 group overflow-visible"
      onClick={onClick}
      data-testid={`card-feature-${title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="p-2 bg-primary/10 rounded-md border border-primary/20 group-hover:border-primary/40 transition-colors">
            <Icon className="w-5 h-5 text-primary" />
          </div>
          {platform === "youtube" ? (
            <SiYoutube className="w-4 h-4 text-muted-foreground group-hover:text-red-500 transition-colors" />
          ) : (
            <SiTiktok className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
          )}
        </div>
        <h3 className="font-mono text-sm uppercase tracking-wider text-foreground mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="font-mono text-xs text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
    </Card>
  );
}

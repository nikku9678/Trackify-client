import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ExternalLink, Bookmark, StickyNote, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Problem = {
  problem_id: number;
  title: string;
  link: string;
  platform: string;
  difficulty?: string;
  created_at: string;
};

export default function ProblemItem({
  problem,
  onOpenNotes,
  onRemove,
}: {
  problem: Problem;
  onOpenNotes: (title: string, id: number) => void;
  onRemove?: () => void;
}) {
  return (
    <Card className="p-4 space-y-3">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Checkbox defaultChecked={false} />
          <Link href={problem.link} target="_blank" className="hover:text-primary font-medium flex items-center gap-2">
            View Problem <ExternalLink size={14} />
          </Link>
          <div className="ml-2 opacity-80">
            <Image
              src={
                problem.platform === "LeetCode"
                  ? "/leetcode.svg"
                  : problem.platform === "Codeforces"
                  ? "/codeforces.svg"
                  : "/default.svg"
              }
              alt="logo"
              width={20}
              height={20}
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" title="Bookmark">
            <Bookmark className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            title="Notes"
            onClick={() => onOpenNotes(problem.title, problem.problem_id)}
          >
            <StickyNote className="w-5 h-5" />
          </Button>
          {onRemove && (
            <Button variant="ghost" size="icon" title="Remove" onClick={() => onRemove()}>
              <Trash2 className="w-5 h-5 text-destructive" />
            </Button>
          )}
        </div>
      </div>

      <div className="text-sm text-muted-foreground">
        <p><strong>Difficulty:</strong> {problem.difficulty || "N/A"}</p>
        <p><strong>Platform:</strong> {problem.platform || "N/A"}</p>
        <p><strong>Added on:</strong> {new Date(problem.created_at).toLocaleDateString()}</p>
      </div>
    </Card>
  );
}

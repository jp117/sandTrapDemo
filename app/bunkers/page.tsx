import { bunkers } from "@/data/bunkers";
import { BunkerCard } from "@/components/BunkerCard";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Page() {
  const active = bunkers.filter((b) => b.isActive);
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl md:text-3xl font-bold">Bunkers</h1>
        <Link href="/">
          <Button variant="secondary">Back to Dashboard</Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {active.map((b) => (
          <BunkerCard key={b.id} bunker={b} />
        ))}
      </div>
    </div>
  );
}


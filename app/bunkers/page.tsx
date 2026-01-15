import { bunkers } from "@/data/bunkers";
import { BunkerCard } from "@/components/BunkerCard";

export default function Page() {
  const active = bunkers.filter((b) => b.isActive);
  return (
    <div className="space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold">Bunkers</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {active.map((b) => (
          <BunkerCard key={b.id} bunker={b} />
        ))}
      </div>
    </div>
  );
}


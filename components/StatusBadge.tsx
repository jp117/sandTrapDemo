import { Badge } from "@/components/ui/badge";
import { InspectionStatus } from "@/lib/types";

export function StatusBadge({ status }: { status: InspectionStatus }) {
  if (status === "OK") return <Badge variant="success">OK</Badge>;
  if (status === "WATCH") return <Badge variant="warning">WATCH</Badge>;
  return <Badge variant="destructive">NEEDS_SAND</Badge>;
}


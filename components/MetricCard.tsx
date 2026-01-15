import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function MetricCard({
  title,
  value,
  subtitle
}: {
  title: string;
  value: string | number;
  subtitle?: string;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-gray-700">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-3xl md:text-4xl font-bold">{value}</div>
        {subtitle ? <div className="text-sm text-gray-500 mt-1">{subtitle}</div> : null}
      </CardContent>
    </Card>
  );
}


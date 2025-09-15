import { Card } from "@/components/ui/card";

export default function CareerInsights() {
    return (
        <Card className="p-6 rounded-xl shadow-md">
            <h2 className="text-lg font-semibold mb-2">Career Insights</h2>
            <p className="text-sm text-gray-600">
                🚀 UI/UX Designers are in demand (+20% growth this year).
                Average salary benchmark: <span className="font-semibold">$85,000</span>
            </p>
        </Card>
    );
}

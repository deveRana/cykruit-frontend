import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Briefcase } from "lucide-react";

const jobs = [
    { title: "React Developer", company: "Techify", location: "Remote" },
    { title: "Product Designer", company: "DesignHub", location: "New York" },
];

export default function RecommendedJobs() {
    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold text-gray-800">
                    Recommended Jobs
                </h2>
                <Button variant="outline" size="sm">View All</Button>
            </div>

            {/* Job List */}
            <div className="space-y-4">
                {jobs.map((job, idx) => (
                    <Card
                        key={idx}
                        className="p-5 rounded-xl border shadow-sm hover:shadow-md transition flex items-center justify-between"
                    >
                        {/* Left Side */}
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
                                <Briefcase className="w-6 h-6 text-indigo-600" />
                            </div>
                            <div>
                                <h3 className="text-md font-semibold text-gray-800">
                                    {job.title}
                                </h3>
                                <p className="text-sm text-gray-600">
                                    {job.company}
                                </p>
                                <div className="flex items-center text-xs text-gray-500 mt-1">
                                    <MapPin className="w-4 h-4 mr-1" />
                                    {job.location}
                                </div>
                            </div>
                        </div>

                        {/* Right Side */}
                        <Button size="sm">Apply</Button>
                    </Card>
                ))}
            </div>
        </div>
    );
}

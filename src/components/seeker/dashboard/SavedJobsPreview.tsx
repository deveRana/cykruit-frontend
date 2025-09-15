import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase } from "lucide-react";

const savedJobs = [
    { title: "Data Scientist", company: "DataCorp" },
    { title: "Mobile Developer", company: "Appify" },
];

export default function SavedJobsPreview() {
    return (
        <div className="space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold text-gray-800">
                    Saved Jobs
                </h2>
                <Button variant="outline" size="sm">View All</Button>
            </div>

            {/* Job List */}
            <div className="space-y-4">
                {savedJobs.map((job, idx) => (
                    <Card
                        key={idx}
                        className="p-5 rounded-xl border shadow-sm hover:shadow-md transition flex items-center justify-between"
                    >
                        {/* Left Side */}
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center">
                                <Briefcase className="w-6 h-6 text-pink-500" />
                            </div>
                            <div>
                                <h3 className="text-md font-semibold text-gray-800">
                                    {job.title}
                                </h3>
                                <p className="text-sm text-gray-600">{job.company}</p>
                            </div>
                        </div>

                        {/* Right Side */}
                        <Button size="sm" variant="outline">
                            Remove
                        </Button>
                    </Card>
                ))}
            </div>
        </div>
    );
}

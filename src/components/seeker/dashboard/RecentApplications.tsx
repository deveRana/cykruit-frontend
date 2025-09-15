import { Button } from "@/components/ui/button";

const recentApplications = [
    { jobTitle: "Frontend Developer", company: "Acme Corp", status: "Pending" },
    { jobTitle: "Backend Developer", company: "Globex Inc.", status: "Reviewed" },
    { jobTitle: "UI/UX Designer", company: "Initech", status: "Interview" },
];

const statusColors: Record<string, string> = {
    Pending: "bg-yellow-100 text-yellow-700",
    Reviewed: "bg-blue-100 text-blue-700",
    Interview: "bg-green-100 text-green-700",
};

export default function RecentApplications() {
    const maxRows = 6; // total rows to display (filled + empty)
    const emptyRows = maxRows - recentApplications.length;

    return (
        <div className="bg-white shadow-sm rounded-xl border overflow-hidden h-full flex flex-col">
            {/* Header */}
            <div className="p-4 border-b bg-gray-50 flex items-center justify-between">
                <h2 className="text-base font-semibold text-gray-800">
                    Recent Applications
                </h2>
                <Button variant="outline" size="sm">
                    View All
                </Button>
            </div>

            {/* Table */}
            <div className="flex-1 overflow-x-auto">
                <table className="w-full h-full text-sm table-fixed">
                    <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
                        <tr>
                            <th className="px-6 py-3 text-left font-medium w-1/3">
                                Job Title
                            </th>
                            <th className="px-6 py-3 text-left font-medium w-1/3">
                                Company
                            </th>
                            <th className="px-6 py-3 text-left font-medium w-1/3">
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {/* Filled Rows */}
                        {recentApplications.map((app, idx) => (
                            <tr
                                key={idx}
                                className="hover:bg-gray-50 transition-colors"
                            >
                                <td className="px-6 py-3 font-medium text-gray-800">
                                    {app.jobTitle}
                                </td>
                                <td className="px-6 py-3 text-gray-600">
                                    {app.company}
                                </td>
                                <td className="px-6 py-3">
                                    <span
                                        className={`px-2 py-1 text-xs font-medium rounded-full ${statusColors[app.status]}`}
                                    >
                                        {app.status}
                                    </span>
                                </td>
                            </tr>
                        ))}

                        {/* Empty Rows */}
                        {Array.from({ length: emptyRows }).map((_, idx) => (
                            <tr key={`empty-${idx}`} className="h-12">
                                <td colSpan={3}></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

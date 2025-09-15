import { Card } from "@/components/ui/card";

export default function ProfileCompletion({ progress }: { progress: number }) {
    return (
        <Card className="p-6 rounded-xl shadow-sm border flex flex-col items-center justify-center space-y-5 bg-white">
            {/* Title */}
            <h3 className="text-base font-semibold text-gray-700 tracking-wide">
                Profile Completion
            </h3>

            {/* Circular Progress */}
            <div className="relative w-28 h-28 flex items-center justify-center">
                {/* Progress Ring */}
                <div
                    className="absolute w-full h-full rounded-full"
                    style={{
                        background: `conic-gradient(#4f46e5 ${progress * 3.6}deg, #e5e7eb ${progress * 3.6}deg)`,
                    }}
                />
                {/* Inner Circle */}
                <div className="absolute w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-inner">
                    <span className="text-xl font-bold text-gray-800">
                        {progress}%
                    </span>
                </div>
            </div>
        </Card>
    );
}

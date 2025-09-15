import { Card } from "@/components/ui/card";

export default function WelcomeCard() {
    return (
        <Card className="p-6 bg-gradient-to-r from-indigo-500 to-indigo-700 text-white shadow-lg rounded-xl">
            <h2 className="text-2xl font-bold">Welcome back, John 👋</h2>
            <p className="mt-2 text-sm text-indigo-100">
                Let’s find your dream job today!
            </p>
        </Card>
    );
}

"use client";

import { useEffect, useState } from "react";
import { RoommateCard } from "@/components/RoommateCard";
import { Search, Filter, Loader2, LogOut } from "lucide-react";
import { FollowBanner } from "@/components/FollowBanner";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useRouter } from "next/navigation";
import { roommates, auth } from "@/lib/api";

export default function Dashboard() {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<{
        myRoom: any;
        roommates: any[];
    } | null>(null);
    const [error, setError] = useState("");
    const router = useRouter();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await roommates.getAll();
            if (res.data.success) {
                setData(res.data);
            } else {
                setError(res.data.message || "Failed to fetch data");
            }
        } catch (err: any) {
            console.error("My Room error", err);
            if (err.response?.status === 401) {
                router.push("/");
            } else {
                setError(err.response?.data?.error || "Failed to load roommates.");
            }
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        auth.logout();
        router.push("/");
    };


    if (loading) {
        return (
            <div className="flex h-[calc(100vh-4rem)] items-center justify-center bg-gray-50">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8 md:px-6 min-h-[calc(100vh-4rem)]">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-1">
                        {data?.myRoom ? `Room ${data.myRoom.roomNo} - ${data.myRoom.hostelName}` : "Explore Roommates"}
                    </h1>
                    <p className="text-gray-500">
                        {data?.myRoom ? `Academic Year: ${data.myRoom.academicYear}` : "Discover students who match your preferences."}
                    </p>
                </div>

            </div>

            {error ? (
                <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg shadow-sm">
                    {error}
                </div>
            ) : (
                <>
                    <div className="flex justify-center mb-8">
                        <FollowBanner />
                    </div>
                    {data?.roommates && data.roommates.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {data.roommates.map((student, index) => (
                                <RoommateCard
                                    key={index}
                                    name={student.studentName}
                                    department="Student"
                                    year="N/A"
                                    hostel={data.myRoom?.hostelName || "SRM Hostel"}
                                    bio={`Contact: ${student.email} | ${student.phone}`}
                                    interests={[]}
                                    imageUrl={`https://api.dicebear.com/7.x/initials/svg?seed=${student.registerNo}`}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300 shadow-sm">
                            <div className="flex flex-col items-center gap-2">
                                <p className="text-lg font-medium text-gray-700">No roommates found yet.</p>
                                <p className="text-gray-500 max-w-sm mx-auto">
                                    They will appear here once they login to the portal.
                                </p>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

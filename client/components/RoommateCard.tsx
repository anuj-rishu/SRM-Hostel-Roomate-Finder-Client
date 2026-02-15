import { MapPin, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface RoommateProps {
    name: string;
    department: string;
    year: string;
    hostel: string;
    bio: string; // Will store contact details
    interests: string[];
    imageUrl: string;
}

export function RoommateCard({ name, department, year, hostel, bio, interests, imageUrl }: RoommateProps) {
    const contactParts = bio.replace("Contact: ", "").split(" | ");
    const email = contactParts[0] || "";
    const phone = contactParts[1] || "";

    return (
        <div className="group relative overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm transition-all hover:shadow-xl hover:-translate-y-1">
            <div className="p-6">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                        <div className="h-14 w-14 rounded-full bg-blue-50 border-2 border-white shadow-sm overflow-hidden flex-shrink-0">
                            <img src={imageUrl} alt={name} className="h-full w-full object-cover" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{name}</h3>
                            <div className="flex items-center gap-1.5 text-xs font-medium text-gray-500 mt-0.5">
                                <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full border border-blue-100">
                                    Student
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 space-y-3">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 border border-gray-100 group-hover:border-blue-100 transition-colors">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm text-blue-600">
                            <MapPin className="h-4 w-4" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Hostel</span>
                            <span className="text-sm font-semibold text-gray-900">{hostel}</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-2">
                        {email && (
                            <a href={`mailto:${email}`} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors group/item">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-blue-600 group-hover/item:bg-blue-600 group-hover/item:text-white transition-colors">
                                    <Mail className="h-4 w-4" />
                                </div>
                                <div className="flex flex-col overflow-hidden">
                                    <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Email</span>
                                    <span className="text-sm font-medium text-gray-700 truncate w-full" title={email}>{email}</span>
                                </div>
                            </a>
                        )}

                        {phone && (
                            <a href={`tel:${phone}`} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors group/item">
                                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-50 text-green-600 group-hover/item:bg-green-600 group-hover/item:text-white transition-colors">
                                    <Phone className="h-4 w-4" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Phone</span>
                                    <span className="text-sm font-medium text-gray-700">{phone}</span>
                                </div>
                            </a>
                        )}
                    </div>
                </div>
            </div>
            <div className="bg-gray-50 px-6 py-3 border-t border-gray-100 flex justify-between items-center">
                <span className="text-xs font-medium text-gray-500">
                    SRM Institute of Science and Technology
                </span>
            </div>
        </div>
    );
}

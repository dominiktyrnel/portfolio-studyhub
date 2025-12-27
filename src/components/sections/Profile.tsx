import { profile } from "../../data/cv";
import { Section } from "../Section";

export function Profile() {
    return (
        <div className="md:hidden mb-8">
            {/* Mobile-only profile summary at top of content, 
           since Sidebar header is small. */}
            <Section id="profile" className="pt-4">
                <h1 className="text-2xl font-bold text-navy-900 leading-tight">
                    {profile.name}
                </h1>
                <div className="text-gray-500 mb-2">{profile.nameKr}</div>
                <div className="text-sm font-bold text-navy-600">
                    {profile.title}
                </div>
                <div className="mt-4 flex flex-wrap gap-2 text-xs font-medium text-gray-500">
                    <span className="bg-gray-100 px-2 py-1 rounded">정시 (Punctuality)</span>
                    <span className="bg-gray-100 px-2 py-1 rounded">청결 (Cleanliness)</span>
                    <span className="bg-gray-100 px-2 py-1 rounded">안전 (Safety)</span>
                    <span className="bg-gray-100 px-2 py-1 rounded">팀워크 (Teamwork)</span>
                </div>
            </Section>
        </div>
    );
}

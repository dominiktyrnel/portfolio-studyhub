import { useAdminContent } from "../../hooks/useAdminContent";
import { StickySaveBar } from "../../components/admin/StickySaveBar";
import { ImageUploader } from "../../components/admin/ImageUploader";
import { AdminLayout } from "../../layouts/AdminLayout";

const Spinner = () => <div className="animate-spin h-5 w-5 border-2 border-indigo-500 rounded-full border-t-transparent"></div>;

export function GlobalEditor() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Global editor content has dynamic nested structure
    const { data, loading, error, isDirty, saving, saveResult, handleNestedChange, handleSave, lastSaved } = useAdminContent<any>("content/global");

    if (loading) return <div className="p-8 flex justify-center"><Spinner /></div>;
    if (error) return <div className="p-8 text-red-500">Error: {error}</div>;

    const bind = (path: string[]) => ({
        value: path.reduce((obj, key) => obj?.[key], data) || "",
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => handleNestedChange(path, e.target.value)
    });

    const handleImageUpload = (url: string, field: string) => {
        handleNestedChange(['profile', field], url);
    };

    return (
        <AdminLayout title="Globální nastavení" maxWidth="max-w-4xl">
            <div className="space-y-6 pb-24">

                {/* Contact Info */}
                <div className="bg-admin-card rounded border border-admin-border p-6 space-y-6">
                    <h3 className="text-lg font-bold border-b border-admin-border pb-2 text-admin-text">Kontaktní informace</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-admin-sub mb-1">Email</label>
                            <input className="w-full p-2 border border-admin-border bg-admin-wash rounded text-admin-text" {...bind(['contact', 'email'])} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-admin-sub mb-1">Telefon (CZ)</label>
                            <input className="w-full p-2 border border-admin-border bg-admin-wash rounded text-admin-text" {...bind(['contact', 'phoneCz'])} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-admin-sub mb-1">Telefon (KR)</label>
                            <input className="w-full p-2 border border-admin-border bg-admin-wash rounded text-admin-text" {...bind(['contact', 'phoneKr'])} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-admin-sub mb-1">Kakao ID</label>
                            <input className="w-full p-2 border border-admin-border bg-admin-wash rounded text-admin-text" {...bind(['contact', 'kakaoId'])} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-admin-sub mb-1">Kakao Link</label>
                            <input className="w-full p-2 border border-admin-border bg-admin-wash rounded text-admin-text" {...bind(['contact', 'kakaoLink'])} />
                        </div>
                    </div>
                </div>

                {/* Profile Images */}
                <div className="bg-admin-card rounded border border-admin-border p-6 space-y-6">
                    <h3 className="text-lg font-bold border-b border-admin-border pb-2 text-admin-text">Profilové fotky</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <ImageUploader
                            label="Malá fotka (Avatar)"
                            storagePath="global/profile/profile.jpg"
                            currentUrl={data?.profile?.image}
                            onUploadComplete={(url) => handleImageUpload(url, 'image')}
                            width="w-32" height="h-32"
                        />
                        <ImageUploader
                            label="Velká fotka (Full)"
                            storagePath="global/profile/profile_full.jpg"
                            currentUrl={data?.profile?.imageFull}
                            onUploadComplete={(url) => handleImageUpload(url, 'imageFull')}
                            width="w-48" height="h-48"
                        />
                    </div>
                </div>

                <StickySaveBar
                    status={saving ? 'saving' : (saveResult === 'success' ? 'saved' : (saveResult === 'error' ? 'error' : 'idle'))}
                    isDirty={isDirty}
                    onSave={handleSave}
                    lastSaved={lastSaved?.toLocaleString()}
                />
            </div>
        </AdminLayout>
    );
}

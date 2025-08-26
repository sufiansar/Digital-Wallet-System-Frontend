import { ProfileForm } from "@/components/modules/AddProfileForm/ProfileForm";

export default function ProfilePage() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Manage Your Profile</h1>
      <ProfileForm />
    </div>
  );
}

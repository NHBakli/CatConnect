"use client";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

const LogoutPage = () => {
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error logging out:", error);
    } else {
      router.push("/");
    }
  };

  const handleCancel = () => {
    router.push("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-5 bg-gray-100">
      <h1 className="text-2xl font-bold text-gray-700 mb-6">
        Are you sure you want to logout?
      </h1>
      <div className="flex space-x-4">
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Logout
        </button>
        <button
          onClick={handleCancel}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default LogoutPage;

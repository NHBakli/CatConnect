"use client";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { useState, useEffect } from "react";
import Link from "next/link";
import Loader from "@/components/Loader";

const LogoutPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [loader, setLoader] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLoader(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  const handleLogout = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error logging out:", error);
    } else {
      router.push("/");
    }
    setLoading(false);
  };

  return (
    <>
      {loader && <Loader />}
      <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-lg">
          <div className="mt-48 space-y-4 rounded-lg p-4 shadow-lg sm:p-6 bg-navbarBg">
            <h1 className="text-center text-2xl font-bold sm:text-4xl text-white">
              Logout
            </h1>

            <div className="flex gap-10">
              <button
                type="submit"
                className="block w-full rounded-lg px-5 py-3 text-sm font-medium bg-customBlue text-white hover:bg-hoverCustomBlue"
                onClick={handleLogout}
                disabled={loading}
              >
                {loading ? "Loading..." : "Confirm"}
              </button>
              <Link
                href="/"
                passHref
                className="block w-full rounded-lg px-5 py-3 text-sm font-medium bg-customBlue text-white hover:bg-hoverCustomBlue text-center"
              >
                Cancel
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogoutPage;

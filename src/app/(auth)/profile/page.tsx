"use client";
import { supabase } from "@/lib/supabase";
import Loader from "@/components/Loader";
import { useState, useEffect } from "react";
import AccountUpdate from "@/components/profile/AccountUpdate";
import PasswordUpdate from "@/components/profile/PasswordUpdate";
import AlertNotification from "@/components/alertNotification";

type userData = {
  email?: string;
  user_metadata?: {
    name?: string;
  };
} | null;

const ProfilePage = () => {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<userData>(null);
  const [selectedSection, setSelectedSection] = useState<string | null>(
    "account"
  );
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUserData(user);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdateInfo = async (name: string, newEmail: string) => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        email: newEmail,
        data: { name },
      });

      if (error) {
        throw error;
      }

      setUserData((prevData) => ({
        ...prevData,
        email: newEmail,
        user_metadata: { ...prevData?.user_metadata, name },
      }));
      setSuccessMessage("Information updated successfully!");
    } catch (error) {
      console.error("Error updating information:", error);
      setError("Failed to update information.");
      throw error;
    } finally {
      setLoading(false);
    }
  };
  const handleUpdatePassword = async (newPassword: string) => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        throw error;
      }

      setSuccessMessage("Password updated successfully!");
    } catch (error) {
      console.error("Error updating password:", error);
      setError("Failed to update password.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleCloseAlert = () => {
    setError(null);
    setSuccessMessage(null);
  };

  return (
    <div className="my-12">
      {loading && <Loader />}
      {error && (
        <AlertNotification
          title="Error"
          content={error}
          color="text-red-500"
          onClose={handleCloseAlert}
        />
      )}
      {successMessage && (
        <AlertNotification
          title="Success"
          content={successMessage}
          color="text-green-500"
          onClose={handleCloseAlert}
        />
      )}
      <h1 className="text-center text-white font-bold text-2xl mt-8">
        Hi {userData?.user_metadata?.name},
      </h1>
      <p className="text-center text-white">
        Welcome to your profile page, here you can modify your account
        information.
      </p>
      <div className="mt-4 bg-customBlue w-1/2 mx-auto rounded-2xl h-auto p-6">
        <div className="flex items-center space-x-4">
          <div
            className={`cursor-pointer rounded-lg h-12 w-32 text-center flex items-center justify-center ${
              selectedSection === "account"
                ? "bg-customIndigo text-white hover:bg-hoverCustomIndigo"
                : "bg-gray-600 text-gray-200 hover:bg-gray-700"
            }`}
            onClick={() => setSelectedSection("account")}
          >
            <h2 className="text-sm">Email</h2>
          </div>
          <div
            className={`cursor-pointer rounded-lg h-12 w-32 text-center flex items-center justify-center ${
              selectedSection === "password"
                ? "bg-customIndigo text-white hover:bg-hoverCustomIndigo"
                : "bg-gray-600 text-gray-200 hover:bg-gray-700"
            }`}
            onClick={() => setSelectedSection("password")}
          >
            <h2 className="text-sm">Password</h2>
          </div>
        </div>

        {selectedSection === "account" && userData && (
          <AccountUpdate
            initialName={userData.user_metadata?.name || ""}
            initialEmail={userData.email || ""}
            onUpdate={handleUpdateInfo}
            setError={setError}
            setSuccessMessage={setSuccessMessage}
          />
        )}
        {selectedSection === "password" && (
          <PasswordUpdate
            onUpdate={handleUpdatePassword}
            setError={setError}
            setSuccessMessage={setSuccessMessage}
          />
        )}
      </div>
    </div>
  );
};

export default ProfilePage;

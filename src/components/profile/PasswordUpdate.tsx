"use client";

import React, { useState, useEffect } from "react";

interface PasswordUpdateProps {
  onUpdate: (newPassword: string) => Promise<void>;
  setError: (error: string | null) => void;
  setSuccessMessage: (message: string | null) => void;
}

const PasswordUpdate: React.FC<PasswordUpdateProps> = ({
  onUpdate,
  setError,
  setSuccessMessage,
}) => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModified, setIsModified] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  useEffect(() => {
    setPasswordsMatch(newPassword === confirmPassword);
    setIsModified(newPassword !== "" || confirmPassword !== "");
  }, [newPassword, confirmPassword]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!passwordsMatch || loading) return;

    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      await onUpdate(newPassword);
      setSuccessMessage("Password updated successfully!");
      setNewPassword("");
      setConfirmPassword("");
      setIsModified(false);
    } catch (error) {
      console.error("Error updating password:", error);
      setError("Failed to update password, try again later!");
    } finally {
      setLoading(false);
    }
  };

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  return (
    <div>
      <h2 className="text-center text-white font-bold text-lg mb-6">
        Update Account Password
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <div className="flex flex-col">
          {!passwordsMatch && isModified && (
            <p className="text-red-500 mt-2">Passwords do not match.</p>
          )}
          <label htmlFor="newPassword" className="text-white mb-2">
            New Password:
          </label>
          <input
            id="newPassword"
            type="password"
            value={newPassword}
            onChange={handleNewPasswordChange}
            placeholder="Enter new password"
            required
            className="rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm text-black w-1/3"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="confirmPassword" className="text-white mb-2">
            Confirm New Password:
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            placeholder="Confirm new password"
            required
            className="rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm text-black w-1/3"
          />
        </div>
        <button
          type="submit"
          className={`rounded-lg text-sm px-5 py-3 font-medium w-1/6 transition duration-300 ${
            loading || !isModified || !passwordsMatch
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white`}
          disabled={loading || !isModified || !passwordsMatch}
        >
          {loading ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
};

export default PasswordUpdate;

import React, { useState, useEffect } from "react";

interface AccountUpdateProps {
  initialName: string;
  initialEmail: string;
  onUpdate: (name: string, newEmail: string) => Promise<void>;
  setError: (error: string | null) => void;
  setSuccessMessage: (message: string | null) => void;
}

const AccountUpdate: React.FC<AccountUpdateProps> = ({
  initialName,
  initialEmail,
  onUpdate,
  setError,
  setSuccessMessage,
}) => {
  const [name, setName] = useState(initialName);
  const [newEmail, setNewEmail] = useState(initialEmail);
  const [loading, setLoading] = useState(false);
  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    setIsModified(name !== initialName || newEmail !== initialEmail);
  }, [name, newEmail, initialName, initialEmail]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      await onUpdate(name, newEmail);
      setSuccessMessage(
        "Information updated successfully! Please check your new email and old email to confirm the change."
      );
      setIsModified(false);
    } catch (error) {
      console.error("Error updating information:", error);
      setError("Failed to update information, try again later!");
    } finally {
      setLoading(false);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEmail(e.target.value);
  };

  return (
    <div>
      <h2 className="text-center text-white font-bold text-lg mb-6">
        Update Account Informations
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <div className="flex flex-col">
          <label htmlFor="name" className="text-white mb-2">
            Username:
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder="Enter your name"
            required
            className="rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm text-black w-1/3"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="newEmail" className="text-white mb-2">
            Email:
          </label>
          <input
            id="newEmail"
            type="email"
            value={newEmail}
            onChange={handleEmailChange}
            placeholder="Enter new email"
            required
            className="rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm text-black w-1/3"
          />
        </div>
        <button
          type="submit"
          className={`rounded-lg text-sm px-5 py-3 font-medium w-1/6 transition duration-300 ${
            loading || !isModified
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          } text-white`}
          disabled={loading || !isModified}
        >
          {loading ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
};

export default AccountUpdate;

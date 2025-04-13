"use client";
import { useState, useEffect, useRef } from "react";

export default function SettingsPage() {
  const [name, setName] = useState("Nishita Singh");
  const [email, setEmail] = useState("nishitasingbtp@gmail.com");
  const [darkMode, setDarkMode] = useState(false);
  const [emailUpdates, setEmailUpdates] = useState(true);
  const [betaFeatures, setBetaFeatures] = useState(false);
  const [updateMessage, setUpdateMessage] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null); // Store the photo URL or file
  const fileInputRef = useRef(null); // Reference to the file input

  useEffect(() => {
    // Load settings from localStorage on component mount
    const storedDarkMode = localStorage.getItem("darkMode") === "true";
    const storedEmailUpdates = localStorage.getItem("emailUpdates") === "true";
    const storedBetaFeatures = localStorage.getItem("betaFeatures") === "true";
    const storedProfilePhoto = localStorage.getItem("profilePhoto");

    if (storedDarkMode !== null) setDarkMode(storedDarkMode);
    if (storedEmailUpdates !== null) setEmailUpdates(storedEmailUpdates);
    if (storedBetaFeatures !== null) setBetaFeatures(storedBetaFeatures);
    if (storedProfilePhoto !== null) setProfilePhoto(storedProfilePhoto);
  }, []);

  useEffect(() => {
    // Save settings to localStorage whenever they change
    localStorage.setItem("darkMode", darkMode);
    localStorage.setItem("emailUpdates", emailUpdates);
    localStorage.setItem("betaFeatures", betaFeatures);
    if (profilePhoto) {
      localStorage.setItem("profilePhoto", profilePhoto);
    }
  }, [darkMode, emailUpdates, betaFeatures, profilePhoto]);

  // Apply dark mode styles based on the state
  const bodyClasses = darkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-800";
  const sectionBgClasses = darkMode ? "bg-gray-800" : "bg-gray-100";
  const inputBorderClasses = darkMode
    ? "border-gray-700 focus:ring-blue-500 focus:border-blue-500 bg-gray-700 text-gray-200"
    : "border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400";
  const buttonClasses = "px-4 py-2 rounded-lg transition";
  const primaryButtonClasses = darkMode
    ? `bg-blue-500 text-white hover:bg-blue-600 ${buttonClasses}`
    : `bg-blue-600 text-white hover:bg-blue-700 ${buttonClasses}`;
  const dangerButtonClasses = darkMode
    ? `bg-red-500 text-white hover:bg-red-600 ${buttonClasses}`
    : `bg-red-600 text-white hover:bg-red-700 ${buttonClasses}`;
  const sectionShadow = "shadow-md"; // Add shadow for better contrast in dark mode

  const handleProfileUpdate = async () => {
    setIsUpdating(true);
    setUpdateMessage("Updating profile...");
    // Simulate an API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setUpdateMessage("Profile updated successfully!");
    setIsUpdating(false);
    // In a real application, you would make an API call here
    console.log("Updated profile:", { name, email, profilePhoto });
  };

  const handleDeleteAccount = () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action is irreversible."
      )
    ) {
      // In a real application, you would make an API call to delete the account
      console.log("Account deletion initiated");
      alert("Account deleted (simulated)");
    }
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result); // Store as base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className={`min-h-screen px-4 py-8 font-sans ${bodyClasses}`}>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Settings</h1>

        {/* Profile Section */}
        <section className={`mb-8 ${sectionBgClasses} rounded-lg p-6 ${sectionShadow}`}>
          <h2 className="text-xl font-semibold mb-4">Profile Settings</h2>

          {/* Profile Photo */}
          <div className="mb-4 flex items-center">
            <div className="mr-4">
              {profilePhoto ? (
                <img
                  src={profilePhoto}
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center">
                  <span className="text-gray-600">No Photo</span>
                </div>
              )}
            </div>
            <div>
              <button
                onClick={handleUploadClick}
                className={`text-blue-600 font-medium hover:underline`}
              >
                Change Photo
              </button>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
                ref={fileInputRef}
              />
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg ${inputBorderClasses}`}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-2 border rounded-lg ${inputBorderClasses}`}
            />
          </div>
          <button
            onClick={handleProfileUpdate}
            className={`mt-2 ${primaryButtonClasses} ${
              isUpdating ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isUpdating}
          >
            {isUpdating ? "Updating..." : "Update Profile"}
          </button>
          {updateMessage && <p className="mt-2 text-sm text-green-500">{updateMessage}</p>}
        </section>

        {/* Security */}
        <section
          className={`mb-8 ${sectionBgClasses} rounded-lg p-6 ${sectionShadow} space-y-4`}
        >
          <h2 className="text-xl font-semibold mb-4">Security</h2>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Change Password</span>
            <button className="text-blue-600 font-medium hover:underline">
              Change
            </button>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Two-Factor Authentication</span>
            {/* You could add a toggle or status display here */}
            <button className="text-blue-600 font-medium hover:underline">
              Enable/Disable
            </button>
          </div>
          {/* Add more security options here */}
        </section>

        {/* Notifications */}
        <section
          className={`mb-8 ${sectionBgClasses} rounded-lg p-6 ${sectionShadow} flex items-center justify-between`}
        >
          <span className="text-sm font-medium">Email Updates</span>
          <label className="inline-flex relative items-center cursor-pointer">
            <input
              type="checkbox"
              checked={emailUpdates}
              onChange={() => setEmailUpdates(!emailUpdates)}
              className="sr-only peer"
              id="emailUpdates"
            />
            <div
              className={`w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-blue-600 transition-all ${
                darkMode ? "peer-checked:bg-blue-500" : ""
              }`}
            ></div>
          </label>
        </section>

        {/* Preferences */}
        <section
          className={`mb-8 ${sectionBgClasses} rounded-lg p-6 ${sectionShadow} space-y-4`}
        >
          <h2 className="text-xl font-semibold mb-4">Preferences</h2>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Dark Mode</span>
            <label className="inline-flex relative items-center cursor-pointer">
              <input
                type="checkbox"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
                className="sr-only peer"
                id="darkMode"
              />
              <div
                className={`w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-blue-600 transition-all ${
                  darkMode ? "peer-checked:bg-blue-500" : ""
                }`}
              ></div>
            </label>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Enable Beta Features</span>
            <label className="inline-flex relative items-center cursor-pointer">
              <input
                type="checkbox"
                checked={betaFeatures}
                onChange={() => setBetaFeatures(!betaFeatures)}
                className="sr-only peer"
                id="betaFeatures"
              />
              <div
                className={`w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:bg-blue-600 transition-all ${
                  darkMode ? "peer-checked:bg-blue-500" : ""
                }`}
              ></div>
            </label>
          </div>
        </section>

        {/* Danger Zone */}
        <section
          className={`${
            darkMode ? "bg-gray-800 border-red-400" : "bg-red-50 border-red-200"
          } rounded-lg p-6 ${sectionShadow}`}
        >
          <h2 className="text-xl font-semibold mb-4 text-red-600">Danger Zone</h2>
          <p className={`text-sm ${darkMode ? "text-red-400" : "text-red-700"} mb-4`}>
            Deleting your account is irreversible. Please proceed with caution.
          </p>
          <button onClick={handleDeleteAccount} className={`${dangerButtonClasses}`}>
            Delete Account
          </button>
        </section>
      </div>
    </div>
  );
}

"use client";

import { Card, CardBody, CardHeader, Divider } from "@nextui-org/react";
import { title } from "@/components/primitives";
import { useRouter } from "next/navigation";
import { getUserFromCookies, logoutUser } from "@/lib/services/auth.service";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const router = useRouter();
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    // Get user data from cookies
    const user = getUserFromCookies();
    setUserData(user);
  }, []);

  const handleLogout = () => {
    logoutUser();
    router.push("/login");
  };

  if (!userData) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className={title({ className: "mb-6 text-gray-900 dark:text-white" })}>
        Profile
      </h1>

      <Card className="mb-6">
        <CardHeader className="flex gap-3">
          <div className="flex flex-col">
            <p className="text-md">User Profile</p>
            <p className="text-small text-default-500">Account Information</p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-small text-default-500">Name</p>
              <p>{userData.name}</p>
            </div>
            <div>
              <p className="text-small text-default-500">Email</p>
              <p>{userData.email}</p>
            </div>
            <div>
              <p className="text-small text-default-500">Role</p>
              <p className="capitalize">{userData.role}</p>
            </div>
            <div>
              <p className="text-small text-default-500">Member Since</p>
              <p>{new Date(userData.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </CardBody>
      </Card>

      {userData.role === "admin" && (
        <div className="mb-6">
          <button
            onClick={() => router.push("/dashboard")}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 mr-4"
          >
            Go to Dashboard
          </button>
        </div>
      )}

      <div>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
} 
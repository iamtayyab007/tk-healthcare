// components/LogoutButton.tsx
"use client";

import Image from "next/image";

export default function LogoutButton() {
  const handleLogout = async () => {
    await fetch("/api/logout", { method: "POST" });
    window.location.href = "/?admin=true";
  };

  return (
    <div
      className="bg-white p-2 rounded-sm cursor-pointer"
      onClick={handleLogout}
    >
      <Image
        src="/assets/icons/logout.svg"
        alt="Logout"
        width={30}
        height={30}
      />
    </div>
  );
}

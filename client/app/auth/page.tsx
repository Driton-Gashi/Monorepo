"use client";
import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useUser } from "@/app/context/UserContext";
const AuthPage = () => {
  const searchParams = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";
  const { setLoggedInUserData } = useUser();
  
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const url = isLogin ? `${process.env.NEXT_PUBLIC_API_URL}/api/login` : `${process.env.NEXT_PUBLIC_API_URL}/api/register`;
  
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
  
    const result = await response.json();

    if (response.ok) {
      setLoggedInUserData({
        ...result.userData
      })
      redirect("/dashboard")
    } else {
      console.log("Authentication failed:", result.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isLogin ? "Login" : "Register"}
        </h2>
        <form autoComplete={"off"} onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="flex gap-4">
              <div className="mb-4">
                <label
                  className="block text-sm font-medium mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full p-2 border border-gray-300 rounded-lg text-xs"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium mb-2"
                  htmlFor="lastname"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  className="w-full p-2 border border-gray-300 rounded-lg text-xs"
                  placeholder="Enter your last name"
                  value={formData.lastname}
                  onChange={handleChange}
                />
              </div>
            </div>
          )}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full p-2 border border-gray-300 rounded-lg text-xs"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full p-2 border border-gray-300 rounded-lg text-xs"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition duration-200"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>
        <p className="mt-4 text-center">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <Link
            onClick={() => {
              setFormData({
                name: "",
                lastname: "",
                email: "",
                password: "",
              });
            }}
            href={`?mode=${isLogin ? "signup" : "login"}`}
            className="text-blue-500 hover:underline focus:outline-none"
          >
            {isLogin ? "Register" : "Login"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default function AuthPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthPage />
    </Suspense>
  );
}
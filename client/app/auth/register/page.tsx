"use client"
import RegisterForm from "@/app/components/auth/RegisterForm";
import Link from "next/link";
import { useUser } from "@/app/context/UserContext";
import { redirect } from "next/navigation";

const RegisterPage = () => {
  const { loggedInUserData } = useUser();
    if(loggedInUserData) redirect("/dashboard")
  return (
    <div className="w-[400px] mx-auto h-screen-without-header flex justify-center items-center">
        <div>
        <RegisterForm/>
        <p className="text-center mt-4">Already have an account? <Link href="/auth/login" className="text-primary-red hover:underline focus:outline-none">Login</Link></p>
        </div>
    </div>
  )
}

export default RegisterPage
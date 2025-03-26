import LoginForm from "../../components/auth/LoginForm"
import Link from "next/link";

const LoginPage = () => {

  return (
    <div className="w-[400px] mx-auto h-screen-without-header flex justify-center items-center flex-col">
        <LoginForm/>
        <p className="text-center mt-4">Don&apos;t have an account? <Link href="/auth/register" className="text-primary-red hover:underline focus:outline-none">Register</Link></p>
    </div>
  )
}

export default LoginPage
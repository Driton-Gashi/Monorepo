"use client"; 
 import { useRouter } from "next/navigation";
 import { useEffect } from "react";
 
 const EditPage = () => {
   const router = useRouter();
 
   useEffect(() => {
     router.push("/dashboard/food/all");
   }, [router]);
 
   return <p className="pt-2">Redirecting...</p>;
 };
 
 export default EditPage;
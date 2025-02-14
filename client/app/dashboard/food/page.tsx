"use client"
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const DashboardFood = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/dashboard/food/all");
  }, []);

  return <img width={100} src="/loader.gif"/>;
};

export default DashboardFood;

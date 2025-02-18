"use client"
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const DashboardFood = () => {
  const router = useRouter();

  useEffect(() => {
    router.push("/dashboard/food/all");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Image width={100} height={100} alt="" src="/loader.gif"/>;
};

export default DashboardFood;

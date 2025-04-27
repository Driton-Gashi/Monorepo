"use client"
import { redirect } from "next/navigation";
import Image from "next/image";

const DashboardFood = () => {
  redirect("/dashboard/food/all")

  return <Image width={100} height={100} alt="" src="/loader.gif"/>;
};

export default DashboardFood;

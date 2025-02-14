import NavLink from "@/app/components/global/NavLink";

export default function DashboardFoodLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const baseClass =
    "rounded [&.active]:after:bg-white after:content-['_'] after:absolute  after:h-[3px] after:bottom-[-3px] after:left-0 after:right-0 relative [&.active]:border [&.active]:shadow [&.active]:border-b-white py-1 px-4";

  return (
    <>
      <div className="flex mt-6">
        <NavLink className={baseClass} href="/dashboard/food/all">
          All
        </NavLink>
        <NavLink className={baseClass} href="/dashboard/food/create">
          Create
        </NavLink>
        <NavLink className={baseClass} href="/dashboard/food/edit">
          Edit
        </NavLink>
      </div>
      {children}
    </>
  );
}

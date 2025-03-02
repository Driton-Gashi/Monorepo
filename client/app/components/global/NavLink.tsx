"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface P {
  children: React.ReactNode;
  href: string;
  activeClassName?: string;
  className?: string;
}

const NavLink = ({
  children,
  href,
  activeClassName = "active",
  className = "",
  ...rest
}: P) => {
  const pathname = usePathname();
  const isActive = pathname.startsWith(href);

  const newClassName = `${isActive ? activeClassName : ""} ${className}`.trim();
  return (
    <Link href={href} className={newClassName} {...rest}>
      {children}
    </Link>
  );
};

export default NavLink;

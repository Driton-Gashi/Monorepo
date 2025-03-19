"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface P {
  children: React.ReactNode;
  href: string;
  activeClassName?: string;
  className?: string;
  title?: string;
  hasNoHref?: boolean
}

const NavLink = ({
  children,
  href,
  activeClassName = "active",
  className = "",
  hasNoHref = false,
  ...rest
}: P) => {
  const pathname = usePathname();
  const isActive = pathname.startsWith(href);

  const newClassName = `${isActive ? activeClassName : ""} ${className}`.trim();
  return (
    <Link href={hasNoHref? "#": href} className={newClassName} {...rest}>
      {children}
    </Link>
  );
};

export default NavLink;

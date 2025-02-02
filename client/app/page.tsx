import Link from "next/link";

export default function Home() {
  return (
    <Link href="/auth?mode=register">Register</Link>
  );
}

import Image from "next/image";
import Link from "next/link"; 

export default function Home() {
  return (
    <div>
      <div>
        <Link href="/applicable_candidates">Applicable Candidates</Link>
      </div>
      <div>
        <Link href="/non_applicable_candidate">Non-Applicable Candidates</Link>
      </div>
    </div>
  );
}

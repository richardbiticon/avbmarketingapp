import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-[color:var(--line)] bg-surface">
      <div className="shell py-16">
        <div className="grid gap-10 md:grid-cols-[1.6fr_1fr_1fr]">
          <div>
            <div className="text-2xl font-semibold tracking-tight">
              All Volleyball
            </div>
            <p className="mt-4 max-w-[34ch] text-[15px] text-bone-soft">
              Volleyball only. That is the whole business. The team and club
              partner for programs where average is not good enough.
            </p>
          </div>
          <div>
            <h5 className="label mb-4 text-bone-faint">The order</h5>
            <ul className="space-y-2.5 text-[15px] text-bone-soft">
              <li>
                <Link href="/order" className="hover:text-red">
                  Start your order
                </Link>
              </li>
              <li>
                <Link href="/#process" className="hover:text-red">
                  How it works
                </Link>
              </li>
              <li>
                <Link href="/#package" className="hover:text-red">
                  The package
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h5 className="label mb-4 text-bone-faint">Talk to us</h5>
            <ul className="space-y-2.5 text-[15px] text-bone-soft">
              <li>
                <Link href="/order" className="hover:text-red">
                  Request a quote
                </Link>
              </li>
              <li>
                <a href="mailto:teams@allvolleyball.com" className="hover:text-red">
                  teams@allvolleyball.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-14 flex flex-col gap-3 border-t border-[color:var(--line)] pt-7 text-[13px] text-bone-faint md:flex-row md:items-center md:justify-between">
          <span>All Volleyball. Team and club orders.</span>
          <span className="accent text-base">
            If you are serious about your program, we are your partner.
          </span>
        </div>
      </div>
    </footer>
  );
}

import { ArrowRight, Check, Diamond, LineChart, ShieldCheck } from "lucide-react";
import { Link } from "react-router";

export default function LandingPage() {
    return (
        <main className="min-h-screen bg-[#F7F7FA] text-[#171A2B]">
            <nav className="flex items-center justify-between border-b border-[#E8E8F0] bg-white px-6 py-5 lg:px-12">
                <div className="flex items-center gap-2 font-semibold"><Diamond className="text-[#7255D8]" size={20} /><span>SubLedger</span></div>
                <div className="flex items-center gap-5 text-sm"><Link className="font-medium text-[#6B7088] hover:text-[#171A2B]" to="/login">Sign in</Link><Link className="rounded-lg bg-[#7255D8] px-4 py-2.5 font-semibold text-white hover:bg-[#5B40B8]" to="/register">Get started</Link></div>
            </nav>
            <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 lg:grid-cols-[1fr_0.85fr] lg:px-12 lg:py-28">
                <div><p className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#EEEAFB] px-3 py-1.5 text-xs font-semibold text-[#7255D8]"><span className="h-1.5 w-1.5 rounded-full bg-[#7255D8]" />Subscription clarity, at a glance</p><h1 className="max-w-xl text-5xl font-semibold leading-[1.1] tracking-tight sm:text-6xl">Less guessing.<br /><span className="text-[#7255D8]">More knowing.</span></h1><p className="mt-6 max-w-lg text-lg leading-8 text-[#6B7088]">One calm place for every recurring service, every renewal, and every dollar. Stay ahead of your subscriptions without the spreadsheet.</p><div className="mt-8 flex flex-wrap gap-3"><Link className="flex items-center gap-2 rounded-lg bg-[#7255D8] px-5 py-3 text-sm font-semibold text-white hover:bg-[#5B40B8]" to="/register">Create your free account <ArrowRight size={16} /></Link><Link className="rounded-lg border border-[#DAD9E5] bg-white px-5 py-3 text-sm font-semibold hover:bg-[#F0EFF6]" to="/login">Sign in</Link></div><div className="mt-7 flex flex-wrap gap-5 text-xs text-[#6B7088]"><span className="flex items-center gap-1.5"><Check size={14} className="text-[#7255D8]" />Free to get started</span><span className="flex items-center gap-1.5"><Check size={14} className="text-[#7255D8]" />No credit card required</span></div></div>
                <div className="rounded-2xl bg-[#171A2B] p-5 shadow-2xl shadow-[#171A2B]/15"><div className="rounded-xl bg-[#F7F7FA] p-5"><div className="flex items-center justify-between"><span className="text-sm font-semibold">Your subscriptions</span><span className="rounded bg-[#EEEAFB] px-2 py-1 text-[10px] font-semibold text-[#7255D8]">Overview</span></div><div className="mt-5 grid grid-cols-2 gap-3"><Metric label="Monthly spending" value="$118.45" /><Metric label="Active services" value="7" /></div><div className="mt-4 rounded-lg border border-[#E8E8F0] bg-white p-4"><div className="flex items-center gap-2 text-xs font-semibold"><LineChart className="text-[#7255D8]" size={16} />Billing forecast</div><div className="mt-5 flex h-24 items-end gap-2">{[40, 62, 48, 80, 55, 66, 45].map((height, index) => <span key={index} className={`flex-1 rounded-t ${index === 3 ? "bg-[#7255D8]" : "bg-[#DDD7F4]"}`} style={{ height: `${height}%` }} />)}</div></div><div className="mt-3 flex items-center gap-2 rounded-lg bg-[#EEEAFB] p-3 text-xs text-[#5B40B8]"><ShieldCheck size={15} />All renewals are accounted for.</div></div></div>
            </section>
        </main>
    );
}

function Metric({ label, value }: { label: string; value: string }) {
    return <div className="rounded-lg border border-[#E8E8F0] bg-white p-3"><p className="text-[10px] text-[#8A8FA8]">{label}</p><p className="mt-2 text-lg font-semibold">{value}</p></div>;
}

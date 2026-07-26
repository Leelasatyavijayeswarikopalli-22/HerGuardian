import {
  X,
  Sparkles,
  GraduationCap,
  ShieldCheck,
  HeartHandshake,
  Users,
  Mail,
} from "lucide-react";
import { useEffect } from "react";

export default function AboutUsModal({ isOpen, onClose }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 md:p-6">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-[28px] border border-white/10 bg-[#12071c] shadow-[0_40px_120px_rgba(0,0,0,0.8)]">
        <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-pink-500/15 blur-[100px]" />
        <div className="pointer-events-none absolute -right-24 -bottom-24 h-72 w-72 rounded-full bg-purple-500/15 blur-[100px]" />

        {/* Header */}
        <div className="relative z-30 flex shrink-0 items-center justify-between border-b border-white/10 bg-[#12071c] px-6 py-4 md:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-pink-500/30 bg-gradient-to-br from-pink-500/20 to-purple-500/20">
              <Sparkles size={18} className="text-pink-300" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white md:text-xl">
                About HerGuardian
              </h2>
              <p className="text-xs text-white/50 md:text-sm">
                Meet the founders and our mission
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-all hover:scale-105 hover:border-pink-400/40 hover:bg-pink-500/20 hover:text-white"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="custom-scrollbar relative z-20 flex-1 overflow-y-auto px-6 py-8 md:px-10 md:py-10">
          {/* Hero */}
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-pink-500/20 bg-pink-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-pink-200">
              <Sparkles size={14} className="text-pink-300" />
              Building Safer Futures
            </div>

            <h1 className="text-3xl font-extrabold leading-tight text-white md:text-5xl">
              Empowering Women Through{" "}
              <span className="bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                Safer Technology
              </span>
            </h1>

            <p className="mt-5 text-sm leading-7 text-white/70 md:text-base">
              HerGuardian is an AI-powered women safety platform designed to
              make everyday travel safer, smarter, and more empowering. We
              combine real-time risk awareness, secure route intelligence,
              emergency responsiveness, and community-focused reporting into
              one mission-driven ecosystem.
            </p>
          </div>

          {/* Mission cards */}
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <InfoCard
              icon={<ShieldCheck size={20} className="text-pink-300" />}
              title="Safer Mobility"
              text="Helping users identify safer routes and travel with confidence using intelligent decision support."
            />
            <InfoCard
              icon={<HeartHandshake size={20} className="text-fuchsia-300" />}
              title="Human-Centered Vision"
              text="Built with empathy and purpose to address real-world challenges in women’s safety and mobility."
            />
            <InfoCard
              icon={<GraduationCap size={20} className="text-purple-300" />}
              title="Student-Led Innovation"
              text="Driven by young innovators who believe technology should create meaningful social impact."
            />
          </div>

          {/* Founders */}
          <div className="mt-14">
            <div className="mb-6 text-center">
              <h3 className="text-2xl font-bold text-white md:text-3xl">
                Meet the Founders
              </h3>
              <p className="mt-2 text-sm text-white/50">
                Two builders. One mission. A safer future.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <FounderCard
                name="Ajnabh Koushik"
                role="Co-Founder"
                image="/founders/ajnabh.jpg"
                fallback="AK"
                bio="Ajnabh Koushik is a Co-Founder of HerGuardian and a B.Tech student at NIT Patna, graduating in 2028."
                instagram="https://www.instagram.com/ajnabh_koushik/"
                linkedin="https://www.linkedin.com/in/ajnabh-koushik-baruah-0ba92a336/"
                email="ajnabhkoushikbaruah@gmail.com"
              />

              <FounderCard
                name="Kopalli Vijayeswari"
                role="Co-Founder"
                image="/founders/vijayeswari.jpg"
                fallback="KV"
                bio="Kopalli Vijayeswari is a Co-Founder of HerGuardian and a B.Tech student at NIT Patna, graduating in 2028."
                instagram="https://www.instagram.com/vijji__22/"
                linkedin="https://www.linkedin.com/in/vijayeswari-kopalli-5a2949325/"
                email="leelasatyavijayeswari1022@gmail.com"
              />
            </div>
          </div>

          {/* Vision */}
          <div className="mt-12 rounded-[24px] border border-pink-500/20 bg-white/[0.03] p-6 md:p-8">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
                <Users size={24} className="text-pink-300" />
              </div>
              <h4 className="text-xl font-bold text-white">
                Our Shared Vision
              </h4>
              <p className="max-w-3xl text-sm leading-7 text-white/75 md:text-base">
                Founded by two aspiring engineers from{" "}
                <span className="font-semibold text-white">NIT Patna</span>,
                HerGuardian reflects a shared commitment to using technology
                for real social good — helping women move more safely, feel
                more confident, and stay better protected in everyday life.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(236, 72, 153, 0.4);
          border-radius: 9999px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(236, 72, 153, 0.7);
        }
      `}</style>
    </div>
  );
}

function InfoCard({ icon, title, text }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all duration-300 hover:border-pink-400/30 hover:bg-white/[0.06]">
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
        {icon}
      </div>
      <h4 className="text-lg font-semibold text-white">{title}</h4>
      <p className="mt-2 text-sm leading-6 text-white/60">{text}</p>
    </div>
  );
}

function FounderCard({
  name,
  role,
  image,
  bio,
  fallback,
  instagram,
  linkedin,
  email,
}) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-white/[0.03] p-6 transition-all duration-300 hover:border-pink-400/30 hover:bg-white/[0.06]">
      <div className="flex flex-col items-center gap-5 text-center sm:flex-row sm:items-start sm:text-left">
        <div className="relative shrink-0">
  <img
    src={image}
    alt={name}
    onError={() => console.log("Image load failed:", image)}
    className="!h-20 !w-20 rounded-full border-2 border-white/15 object-cover object-top shadow-lg flex-shrink-0"
  />
</div>

        <div className="flex-1">
          <h3 className="text-xl font-bold text-white">{name}</h3>
          <p className="mt-1 text-sm font-medium text-pink-300">{role}</p>
          <p className="mt-0.5 text-xs text-white/40">
            B.Tech, NIT Patna • Class of 2028
          </p>
          <p className="mt-3 text-sm leading-6 text-white/70">{bio}</p>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 sm:justify-start">
            <a
  href={instagram}
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center gap-2 rounded-full border border-pink-500/20 bg-pink-500/10 px-3 py-2 text-xs text-pink-200 transition-all hover:scale-105 hover:bg-pink-500/20"
>
  <span className="text-sm">📸</span>
  Instagram
</a>

            <a
  href={linkedin}
  target="_blank"
  rel="noopener noreferrer"
  className="flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-2 text-xs text-blue-200 transition-all hover:scale-105 hover:bg-blue-500/20"
>
  <span className="text-sm">💼</span>
  LinkedIn
</a>

            <a
              href={`mailto:${email}`}
              className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-2 text-xs text-white/80 transition-all hover:scale-105 hover:bg-white/10"
            >
              <Mail size={14} />
              Mail
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
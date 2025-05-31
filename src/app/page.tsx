"use client";
import Link from "next/link";
import { Card } from "~/components/ui/card";

export default function HomePage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden font-sans" style={{background: 'linear-gradient(120deg, #101737 0%, #3a2e6e 60%, #a370f0 100%)'}}>
      {/* Floating Circles & Glow Effects */}
      <div className="pointer-events-none select-none absolute inset-0 z-0">
        <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] bg-purple-500 opacity-30 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute bottom-[-80px] right-[-80px] w-[220px] h-[220px] bg-blue-400 opacity-20 rounded-full blur-2xl animate-float-medium" />
        <div className="absolute top-[20%] right-[10%] w-[120px] h-[120px] bg-indigo-400 opacity-25 rounded-full blur-2xl animate-float-fast" />
        <div className="absolute bottom-[15%] left-[15%] w-[100px] h-[100px] bg-pink-500 opacity-15 rounded-full blur-2xl animate-float-medium" />
      </div>
      {/* Navigation Bar */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-400 to-purple-600 flex items-center justify-center font-bold text-white text-xl shadow-lg">F</div>
          <span className="font-bold text-white text-lg tracking-wide">Friday</span>
        </div>
        <div className="hidden md:flex gap-8 text-white/80 font-medium text-base">
          <a href="#why" className="hover:text-white transition">Why</a>
          <a href="#how" className="hover:text-white transition">How</a>
          <a href="#about" className="hover:text-white transition">About</a>
        </div>
        <div className="flex gap-3">
          <Link href="/login" className="px-5 py-2 rounded-full bg-transparent border border-white/20 text-white/80 font-bold uppercase tracking-wide hover:bg-white/10 transition">Log In</Link>
          <Link href="/signup/traveller" className="cta-pill">Join Now</Link>
        </div>
      </nav>
      {/* Hero Section */}
      <main className="relative z-10 flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto px-6 pt-24 pb-12 md:pb-24 gap-12">
        <div className="flex-1 flex flex-col items-start justify-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-white drop-shadow-xl mb-6">
            Unlock <span className="text-indigo-300">Travel Content</span><br />
            For Every Place<br />
            <span className="text-purple-200">Just One Click Away!</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/80 mb-10 max-w-xl">
            Discover and share short travel videos tagged to exact locations. <span className="text-indigo-200 font-semibold">Travelers</span> find inspiration, <span className="text-purple-300 font-semibold">Creators</span> share their journeys. All in one futuristic platform.
          </p>
          <div className="flex gap-4 mt-2">
            <Link
  href="/signup/traveller"
  className="px-8 py-3 rounded-full font-extrabold uppercase tracking-wider text-base text-white bg-gradient-to-r from-[#232846] to-[#3d3d8a] shadow-lg transition-all duration-200 outline-none border-none focus:ring-2 focus:ring-white focus:ring-offset-2"
  style={{
    boxShadow: '0 0 16px 2px rgba(255,255,255,0.18)',
  }}
  onMouseOver={e => e.currentTarget.style.boxShadow = '0 0 28px 6px rgba(255,255,255,0.25)'}
  onMouseOut={e => e.currentTarget.style.boxShadow = '0 0 16px 2px rgba(255,255,255,0.18)'}
>
  BE A TRAVELLER
</Link>
<Link
  href="/signup/creator"
  className="px-8 py-3 rounded-full font-extrabold uppercase tracking-wider text-base text-white bg-gradient-to-r from-[#3d3d8a] to-[#232846] shadow-lg transition-all duration-200 outline-none border-none focus:ring-2 focus:ring-white focus:ring-offset-2"
  style={{
    boxShadow: '0 0 16px 2px rgba(255,255,255,0.18)',
  }}
  onMouseOver={e => e.currentTarget.style.boxShadow = '0 0 28px 6px rgba(255,255,255,0.25)'}
  onMouseOut={e => e.currentTarget.style.boxShadow = '0 0 16px 2px rgba(255,255,255,0.18)'}
>
  BE A CREATOR
</Link>
          </div>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center relative">
          {/* Animated Circle with Avatars/Icons (placeholder) */}
          <div className="relative w-[340px] h-[340px] md:w-[400px] md:h-[400px]">
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500/30 to-purple-400/10 blur-2xl animate-pulse-slow" />
            <div className="absolute inset-0 border-2 border-indigo-400/30 rounded-full animate-spin-slow" />
            <div className="absolute inset-8 border border-purple-300/20 rounded-full animate-spin-reverse" />
            <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/10 border-2 border-indigo-300 flex items-center justify-center shadow-xl animate-float-fast">
              <span role="img" aria-label="traveler" className="text-3xl">🧑‍🦱</span>
            </div>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/10 border-2 border-purple-300 flex items-center justify-center shadow-xl animate-float-medium">
              <span role="img" aria-label="creator" className="text-2xl">🎥</span>
            </div>
            <div className="absolute left-0 bottom-8 w-12 h-12 rounded-full bg-white/10 border-2 border-blue-300 flex items-center justify-center shadow-xl animate-float-slow">
              <span role="img" aria-label="location" className="text-2xl">📍</span>
            </div>
            <div className="absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 w-14 h-14 rounded-full bg-white/10 border-2 border-pink-300 flex items-center justify-center shadow-xl animate-float-medium">
              <span role="img" aria-label="ai" className="text-2xl">🤖</span>
            </div>
            <div className="absolute left-8 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 border-2 border-indigo-200 flex items-center justify-center shadow-xl animate-float-fast">
              <span role="img" aria-label="explore" className="text-xl">🌎</span>
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-4xl font-bold text-white mb-1">20k+</div>
              <div className="text-base text-indigo-200 tracking-wide">Videos & Stories</div>
            </div>
          </div>
        </div>
      </main>
      {/* Why Choose Us Section */}
      <section id="why" className="relative z-10 max-w-6xl mx-auto px-6 py-24 flex flex-col items-center">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-12 w-full text-left">Why Choose <span className="text-[#7f5fff]">Us?</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
          {/* Feature Card 1 */}
          <Card className="bg-[#181a2c]/85 border border-white/10 rounded-2xl shadow-xl min-w-[230px] min-h-[150px] flex flex-col p-8">
            <div className="flex items-center gap-4 mb-2">
              <span className="text-2xl font-extrabold text-pink-500 drop-shadow">01</span>
              <span className="text-lg font-bold text-white">Curated Creators</span>
            </div>
            <div className="text-base text-indigo-100 pl-10">Invite-only, authentic travel creators who know their locations.</div>
          </Card>
          {/* Feature Card 2 */}
          <Card className="bg-[#181a2c]/85 border border-white/10 rounded-2xl shadow-xl min-w-[230px] min-h-[150px] flex flex-col p-8">
            <div className="flex items-center gap-4 mb-2">
              <span className="text-2xl font-extrabold text-pink-500 drop-shadow">02</span>
              <span className="text-lg font-bold text-white">AI-Powered Search</span>
            </div>
            <div className="text-base text-indigo-100 pl-10">Semantic, natural language search for travel inspiration.</div>
          </Card>
          {/* Feature Card 3 */}
          <Card className="bg-[#181a2c]/85 border border-white/10 rounded-2xl shadow-xl min-w-[230px] min-h-[150px] flex flex-col p-8">
            <div className="flex items-center gap-4 mb-2">
              <span className="text-2xl font-extrabold text-pink-500 drop-shadow">03</span>
              <span className="text-lg font-bold text-white">Location-First Discovery</span>
            </div>
            <div className="text-base text-indigo-100 pl-10">Search videos by exact places, not just hashtags or trends.</div>
          </Card>
          {/* Feature Card 4 */}
          <Card className="bg-[#181a2c]/85 border border-white/10 rounded-2xl shadow-xl min-w-[230px] min-h-[150px] flex flex-col p-8">
            <div className="flex items-center gap-4 mb-2">
              <span className="text-2xl font-extrabold text-pink-500 drop-shadow">04</span>
              <span className="text-lg font-bold text-white">Personalized Feeds</span>
            </div>
            <div className="text-base text-indigo-100 pl-10">Tailored content for both travelers and creators.</div>
          </Card>
        </div>
      </section>
      {/* Consolidated Custom CSS for Feature Cards, Animations, and CTA Styles */}
      <style jsx>{`
        .why-card-clean {
          background: rgba(24, 26, 44, 0.85);
          border-radius: 1.25rem;
          border: 1.5px solid #fff2;
          padding: 2.2rem 1.8rem 1.8rem 1.8rem;
          display: flex;
          flex-direction: column;
          min-width: 230px;
          min-height: 150px;
        }
        .why-number-clean {
          font-size: 1.5rem;
          font-weight: 800;
          color: #ff3c8c;
          text-shadow: 0 0 6px #ff3c8c55;
          flex-shrink: 0;
        }
        .why-title-clean {
          font-size: 1.1rem;
          font-weight: 700;
          color: #fff;
        }
        .why-desc-clean {
          color: #bcbcf5;
          font-size: 1rem;
          margin-left: 2.2rem;
          margin-top: 0.2rem;
        }
        .cta-neon {
  @apply px-8 py-3 rounded-full font-bold uppercase tracking-wider text-base outline-none transition-all duration-200 shadow-xl;
  background: linear-gradient(90deg, rgba(20,20,40,0.90) 60%, rgba(120,60,255,0.90) 100%);
  color: #fff;
  border: none;
  position: relative;
  box-shadow: 0 2px 24px 4px #7f5fffcc, 0 0 12px 2px #00f0ff55;
}
.cta-neon:hover {
  filter: brightness(1.3) drop-shadow(0 0 18px #00f0ff) drop-shadow(0 0 24px #7f5fff);
  transform: scale(1.09);
  background: linear-gradient(90deg, rgba(120,60,255,1) 60%, rgba(20,20,40,1) 100%);
}
.cta-alt {
  background: linear-gradient(90deg, rgba(20,20,40,0.90) 60%, rgba(58,46,110,0.90) 100%);
  box-shadow: 0 2px 24px 4px #a370f0cc, 0 0 12px 2px #7f5fff55;
}

  @apply px-8 py-3 rounded-full font-bold uppercase tracking-wider text-base outline-none transition-all duration-200 shadow-xl;
  background: linear-gradient(90deg, rgba(30,30,40,0.85) 60%, rgba(120,60,255,0.85) 100%);
  color: #fff;
  border: none;
  position: relative;
  box-shadow: 0 2px 16px 2px #a370f0aa, 0 0 8px 1px #fff3b088;
}
.cta-neon:hover {
  filter: brightness(1.2) drop-shadow(0 0 12px #fff3b0);
  transform: scale(1.07);
  background: linear-gradient(90deg, rgba(120,60,255,0.95) 60%, rgba(30,30,40,0.95) 100%);
}
.cta-alt {
  background: linear-gradient(90deg, rgba(30,30,40,0.85) 60%, rgba(255,169,159,0.85) 100%);
  box-shadow: 0 2px 16px 2px #ffa99faa, 0 0 8px 1px #fff3b088;
}

          @apply px-8 py-3 rounded-full bg-gradient-to-r from-[#23213a] to-[#4f3cc9] text-white font-bold uppercase tracking-wider shadow-lg transition-all duration-200 text-base outline-none;
          box-shadow: 0 0 16px 2px #a78bfa55, 0 0 8px 1px #6366f155;
          border: none;
          position: relative;
        }
        .cta-pill:hover {
          filter: brightness(1.15) drop-shadow(0 0 8px #a78bfa);
          transform: scale(1.05);
        }
        .cta-alt {
          @apply bg-gradient-to-r from-[#4f3cc9] to-[#23213a] border border-indigo-400;
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-24px); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-16px); }
        }
        @keyframes float-fast {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        .animate-float-slow { animation: float-slow 7s ease-in-out infinite; }
        .animate-float-medium { animation: float-medium 4s ease-in-out infinite; }
        .animate-float-fast { animation: float-fast 2.5s ease-in-out infinite; }
        @keyframes spin-slow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        .animate-spin-slow { animation: spin-slow 18s linear infinite; }
        @keyframes spin-reverse {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(-360deg); }
        }
        .animate-spin-reverse { animation: spin-reverse 28s linear infinite; }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.7; }
        }
        .animate-pulse-slow { animation: pulse-slow 4.5s ease-in-out infinite; }
      `}</style>
    </div>
  );
}

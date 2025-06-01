"use client";
import Link from "next/link";
import { Card } from "~/components/ui/card";

export default function HomePage() {
  return (
    <div
      className="relative min-h-screen w-full overflow-hidden font-sans"
      style={{
        background:
          "linear-gradient(120deg, #101737 0%, #3a2e6e 60%, #a370f0 100%)",
      }}
    >
      {/* Floating Circles & Glow Effects */}
      <div className="pointer-events-none absolute inset-0 z-0 select-none">
        <div className="animate-float-slow absolute top-[-100px] left-[-100px] h-[300px] w-[300px] rounded-full bg-purple-500 opacity-30 blur-3xl" />
        <div className="animate-float-medium absolute right-[-80px] bottom-[-80px] h-[220px] w-[220px] rounded-full bg-blue-400 opacity-20 blur-2xl" />
        <div className="animate-float-fast absolute top-[20%] right-[10%] h-[120px] w-[120px] rounded-full bg-indigo-400 opacity-25 blur-2xl" />
        <div className="animate-float-medium absolute bottom-[15%] left-[15%] h-[100px] w-[100px] rounded-full bg-pink-500 opacity-15 blur-2xl" />
      </div>
      {/* Navigation Bar */}
      <nav className="relative z-10 flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-400 to-purple-600 text-xl font-bold text-white shadow-lg">
            F
          </div>
          <span className="text-lg font-bold tracking-wide text-white">
            Friday
          </span>
        </div>
        <div className="flex gap-3">
          <Link
            href="/sign-in"
            className="rounded-full border border-white/20 bg-transparent px-5 py-2 font-bold tracking-wide text-white/80 uppercase transition hover:bg-white/10"
          >
            Log In
          </Link>
        </div>
      </nav>
      {/* Hero Section */}
      <main className="relative z-10 mx-auto flex max-w-7xl flex-col items-center justify-between gap-12 px-6 pt-24 pb-12 md:flex-row md:pb-24">
        <div className="flex flex-1 flex-col items-start justify-center">
          <h1 className="mb-6 text-4xl leading-tight font-extrabold text-white drop-shadow-xl sm:text-5xl md:text-6xl">
            Unlock <span className="text-indigo-300">Travel Content</span>
            <br />
            For Every Place
            <br />
            <span className="text-purple-200">Just One Click Away!</span>
          </h1>
          <p className="mb-10 max-w-xl text-lg text-white/80 sm:text-xl">
            Discover and share short travel videos tagged to exact locations.{" "}
            <span className="font-semibold text-indigo-200">Travelers</span>{" "}
            find inspiration,{" "}
            <span className="font-semibold text-purple-300">Creators</span>{" "}
            share their journeys. All in one futuristic platform.
          </p>
          <div className="mt-2 flex gap-4">
            <Link
              href="/sign-in"
              className="rounded-full border-none bg-gradient-to-r from-[#232846] to-[#3d3d8a] px-8 py-3 text-base font-extrabold tracking-wider text-white uppercase shadow-lg transition-all duration-200 outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
              style={{
                boxShadow: "0 0 16px 2px rgba(255,255,255,0.18)",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.boxShadow =
                  "0 0 28px 6px rgba(255,255,255,0.25)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.boxShadow =
                  "0 0 16px 2px rgba(255,255,255,0.18)")
              }
            >
              BE A TRAVELLER
            </Link>
            <Link
              href="/sign-in"
              className="rounded-full border-none bg-gradient-to-r from-[#3d3d8a] to-[#232846] px-8 py-3 text-base font-extrabold tracking-wider text-white uppercase shadow-lg transition-all duration-200 outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
              style={{
                boxShadow: "0 0 16px 2px rgba(255,255,255,0.18)",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.boxShadow =
                  "0 0 28px 6px rgba(255,255,255,0.25)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.boxShadow =
                  "0 0 16px 2px rgba(255,255,255,0.18)")
              }
            >
              BE A CREATOR
            </Link>
          </div>
        </div>
        <div className="relative flex flex-1 flex-col items-center justify-center">
          {/* Animated Circle with Avatars/Icons (placeholder) */}
          <div className="relative h-[340px] w-[340px] md:h-[400px] md:w-[400px]">
            <div className="animate-pulse-slow absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500/30 to-purple-400/10 blur-2xl" />
            <div className="animate-spin-slow absolute inset-0 rounded-full border-2 border-indigo-400/30" />
            <div className="animate-spin-reverse absolute inset-8 rounded-full border border-purple-300/20" />
            <div className="animate-float-fast absolute top-0 left-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-indigo-300 bg-white/10 shadow-xl">
              <span role="img" aria-label="traveler" className="text-3xl">
                🧑‍🦱
              </span>
            </div>
            <div className="animate-float-medium absolute top-1/2 right-0 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border-2 border-purple-300 bg-white/10 shadow-xl">
              <span role="img" aria-label="creator" className="text-2xl">
                🎥
              </span>
            </div>
            <div className="animate-float-slow absolute bottom-8 left-0 flex h-12 w-12 items-center justify-center rounded-full border-2 border-blue-300 bg-white/10 shadow-xl">
              <span role="img" aria-label="location" className="text-2xl">
                📍
              </span>
            </div>
            <div className="animate-float-medium absolute bottom-0 left-1/2 flex h-14 w-14 -translate-x-1/2 translate-y-1/2 items-center justify-center rounded-full border-2 border-pink-300 bg-white/10 shadow-xl">
              <span role="img" aria-label="ai" className="text-2xl">
                🤖
              </span>
            </div>
            <div className="animate-float-fast absolute top-1/2 left-8 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border-2 border-indigo-200 bg-white/10 shadow-xl">
              <span role="img" aria-label="explore" className="text-xl">
                🌎
              </span>
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="mb-1 text-4xl font-bold text-white">20k+</div>
              <div className="text-base tracking-wide text-indigo-200">
                Videos & Stories
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Why Choose Us Section */}
      <section
        id="why"
        className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-6 py-24"
      >
        <h2 className="mb-12 w-full text-left text-4xl font-extrabold text-white sm:text-5xl">
          Why Choose <span className="text-[#7f5fff]">Us?</span>
        </h2>
        <div className="grid w-full grid-cols-1 gap-10 md:grid-cols-2">
          {/* Feature Card 1 */}
          <Card className="flex min-h-[150px] min-w-[230px] flex-col rounded-2xl border border-white/10 bg-[#181a2c]/85 p-8 shadow-xl">
            <div className="mb-2 flex items-center gap-4">
              <span className="text-2xl font-extrabold text-pink-500 drop-shadow">
                01
              </span>
              <span className="text-lg font-bold text-white">
                Curated Creators
              </span>
            </div>
            <div className="pl-10 text-base text-indigo-100">
              Invite-only, authentic travel creators who know their locations.
            </div>
          </Card>
          {/* Feature Card 2 */}
          <Card className="flex min-h-[150px] min-w-[230px] flex-col rounded-2xl border border-white/10 bg-[#181a2c]/85 p-8 shadow-xl">
            <div className="mb-2 flex items-center gap-4">
              <span className="text-2xl font-extrabold text-pink-500 drop-shadow">
                02
              </span>
              <span className="text-lg font-bold text-white">
                AI-Powered Search
              </span>
            </div>
            <div className="pl-10 text-base text-indigo-100">
              Semantic, natural language search for travel inspiration.
            </div>
          </Card>
          {/* Feature Card 3 */}
          <Card className="flex min-h-[150px] min-w-[230px] flex-col rounded-2xl border border-white/10 bg-[#181a2c]/85 p-8 shadow-xl">
            <div className="mb-2 flex items-center gap-4">
              <span className="text-2xl font-extrabold text-pink-500 drop-shadow">
                03
              </span>
              <span className="text-lg font-bold text-white">
                Location-First Discovery
              </span>
            </div>
            <div className="pl-10 text-base text-indigo-100">
              Search videos by exact places, not just hashtags or trends.
            </div>
          </Card>
          {/* Feature Card 4 */}
          <Card className="flex min-h-[150px] min-w-[230px] flex-col rounded-2xl border border-white/10 bg-[#181a2c]/85 p-8 shadow-xl">
            <div className="mb-2 flex items-center gap-4">
              <span className="text-2xl font-extrabold text-pink-500 drop-shadow">
                04
              </span>
              <span className="text-lg font-bold text-white">
                Personalized Feeds
              </span>
            </div>
            <div className="pl-10 text-base text-indigo-100">
              Tailored content for both travelers and creators.
            </div>
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

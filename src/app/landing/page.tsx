"use client";

import {
  IconBed,
  IconCompass,
  IconMapPin,
  IconRoute,
  IconShoppingBag,
} from "@tabler/icons-react";
import { LazyMotion, domAnimation, motion } from "framer-motion";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { Button } from "~/components/ui/button";

// Spline is for 3D animations

const ICONS = [
  IconCompass,
  IconMapPin,
  IconBed,
  IconShoppingBag,
  IconRoute,
] as const;

// 1. Create consistent random values using seeded positions
const FLOATING_POSITIONS = [
  { x: -150, y: -100 },
  { x: 100, y: -150 },
  { x: -100, y: 150 },
  { x: 150, y: 100 },
  { x: 0, y: -120 },
] as const;

// 2. Create consistent animation durations
const ANIMATION_DURATIONS = [5, 6, 7, 8, 9] as const;

export default function LandingPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  // Parallax effect on mouse move
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const { left, top, width, height } =
          heroRef.current.getBoundingClientRect();
        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      <div className="relative min-h-screen w-full overflow-hidden bg-[#0A0118]">
        {/* Gradient Background */}
        <div
          className="fixed inset-0 z-0"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.15) 0%, rgba(139, 92, 246, 0.15) 25%, rgba(67, 56, 202, 0.05) 50%, transparent 80%)",
          }}
        />

        {/* Navigation */}
        <nav className="fixed top-0 z-50 w-full backdrop-blur-sm">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
            <div className="flex items-center gap-2">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600"
              >
                <span className="text-xl font-bold text-white">F</span>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Button
                asChild
                className="relative overflow-hidden rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-2 font-semibold text-white transition-all hover:shadow-[0_0_30px_rgba(139,92,246,0.5)]"
              >
                <Link href="/sign-in">Get Started</Link>
              </Button>
            </motion.div>
          </div>
        </nav>

        {/* Hero Section */}
        <section ref={heroRef} className="relative min-h-screen pt-32">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-12 lg:grid-cols-2">
              {/* Left Column - Text Content */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="flex flex-col justify-center"
              >
                <h1 className="mb-6 text-5xl leading-tight font-bold tracking-tight text-white md:text-6xl lg:text-7xl">
                  Travel
                  <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                    {" "}
                    Smarter
                  </span>
                  <br />
                  Through Video
                </h1>
                <p className="mb-8 max-w-xl text-lg text-gray-300">
                  Discover curated travel content from verified creators. Search
                  destinations, find hidden gems, and plan your next adventure
                  with AI-powered recommendations.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button
                    asChild
                    className="group relative overflow-hidden rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6 text-lg font-semibold text-white transition-all hover:shadow-[0_0_30px_rgba(139,92,246,0.5)]"
                  >
                    <Link href="/sign-in">
                      Start Exploring
                      <motion.span
                        className="absolute inset-0 z-0"
                        style={
                          {
                            background:
                              "radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(255,255,255,0.15) 0%, transparent 50%)",
                            "--mouse-x": `${mousePosition.x * 100}%`,
                            "--mouse-y": `${mousePosition.y * 100}%`,
                          } as React.CSSProperties
                        }
                      />
                    </Link>
                  </Button>
                </div>
              </motion.div>

              {/* Right Column - Interactive Animation */}
              <motion.div
                className="relative h-[600px] overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600/10 to-purple-600/10 backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
              >
                {/* Floating Elements */}
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    background: [
                      "radial-gradient(circle at 0% 0%, rgba(99, 102, 241, 0.15) 0%, transparent 50%)",
                      "radial-gradient(circle at 100% 100%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)",
                      "radial-gradient(circle at 0% 100%, rgba(99, 102, 241, 0.15) 0%, transparent 50%)",
                      "radial-gradient(circle at 100% 0%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)",
                    ],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />

                {/* Phone Frame */}
                <motion.div
                  className="absolute top-1/2 left-1/2 h-[800px] w-[380px] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[3rem] border-8 border-white/10 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm"
                  whileHover={{ rotateY: 10, rotateX: -10 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                >
                  {/* Video Reel Mockup */}
                  <div className="absolute inset-0 overflow-hidden">
                    <motion.div
                      className="flex flex-col gap-4 p-4"
                      animate={{
                        y: [0, "-50%"],
                      }}
                      transition={{
                        y: {
                          duration: 15,
                          repeat: Infinity,
                          repeatType: "reverse",
                          ease: "linear",
                        },
                      }}
                    >
                      {Array.from({ length: 6 }).map((_, i) => (
                        <motion.div
                          key={i}
                          className="relative aspect-[9/16] w-full overflow-hidden rounded-xl"
                          whileHover={{ scale: 1.05 }}
                        >
                          <img
                            src={`/images/${i + 1}.jpg`}
                            alt={`Travel destination ${i + 1}`}
                            className="h-full w-full object-cover"
                          />
                          <div className="absolute right-4 bottom-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                            <IconMapPin className="h-4 w-4 text-white/70" />
                          </div>
                        </motion.div>
                      ))}
                    </motion.div>
                  </div>
                </motion.div>

                {/* Floating Icons */}
                {Array.from({ length: 5 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    initial={{
                      x: FLOATING_POSITIONS[i]?.x,
                      y: FLOATING_POSITIONS[i]?.y,
                      opacity: 0,
                    }}
                    animate={{
                      x: FLOATING_POSITIONS[i]?.x,
                      y: FLOATING_POSITIONS[i]?.y,
                      opacity: [0, 1, 0],
                      scale: [0.5, 1.2, 0.5],
                    }}
                    transition={{
                      duration: ANIMATION_DURATIONS[i],
                      repeat: Infinity,
                      repeatType: "loop",
                      ease: "easeInOut",
                    }}
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm">
                      {React.createElement(ICONS[i % ICONS.length]!, {
                        className: "h-6 w-6 text-white/40",
                      })}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="relative py-32">
          <div className="mx-auto max-w-7xl px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-16 text-center"
            >
              <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">
                Discover What&apos;s Possible
              </h2>
              <p className="text-lg text-gray-300">
                Everything you need for your next adventure, all in one place
              </p>
            </motion.div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group rounded-3xl bg-gradient-to-b from-white/[0.07] to-transparent p-8 transition-all hover:shadow-[0_0_30px_rgba(139,92,246,0.2)]"
                >
                  <div className="mb-4 inline-block rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 p-3">
                    {feature.icon}
                  </div>
                  <h3 className="mb-3 text-xl font-semibold text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Creator Section */}
        <section className="relative py-32">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-12 lg:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="flex flex-col justify-center"
              >
                <h2 className="mb-6 text-4xl font-bold text-white md:text-5xl">
                  For Creators,
                  <br />
                  <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                    By Creators
                  </span>
                </h2>
                <p className="mb-8 max-w-xl text-lg text-gray-300">
                  Join our exclusive community of travel content creators.
                  Monetize your content, engage with your audience, and grow
                  your influence.
                </p>
                <ul className="space-y-4">
                  {creatorBenefits.map((benefit, index) => (
                    <motion.li
                      key={benefit}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center gap-3 text-gray-300"
                    >
                      <span className="rounded-full bg-indigo-600/20 p-1">
                        <IconCompass className="h-5 w-5 text-indigo-400" />
                      </span>
                      {benefit}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              {/* Right side animation/image */}
              <motion.div
                className="relative h-[600px] overflow-hidden rounded-3xl bg-gradient-to-br from-purple-600/10 to-indigo-600/10 backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4 }}
              >
                {/* Grid Background */}
                <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 gap-4 p-8">
                  {Array.from({ length: 64 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="rounded-lg bg-white/5"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: [0, 0.1, 0] }}
                      transition={{
                        duration: 2,
                        delay: (i % 8) * 0.1, // More consistent delay pattern
                        repeat: Infinity,
                        repeatType: "reverse",
                      }}
                    />
                  ))}
                </div>

                {/* Analytics Visualization */}
                <motion.div
                  className="absolute top-1/2 left-1/2 h-[60%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 p-6 backdrop-blur-sm"
                  whileHover={{ rotateX: 10, rotateY: -10 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                >
                  <div className="relative h-full">
                    {/* Bar Chart Animation */}
                    <div className="absolute right-0 bottom-0 left-0 flex h-[70%] items-end justify-around gap-3">
                      {[0.6, 0.8, 0.4, 0.9, 0.5, 0.7].map((height, i) => (
                        <motion.div
                          key={i}
                          className="w-8 rounded-t-lg bg-gradient-to-t from-indigo-500/40 to-purple-500/40"
                          initial={{ height: 0 }}
                          animate={{ height: `${height * 100}%` }}
                          transition={{
                            duration: 2,
                            delay: i * 0.2,
                            repeat: Infinity,
                            repeatType: "reverse",
                            ease: "easeInOut",
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Floating Stats */}
                {Array.from({ length: 4 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute"
                    initial={{
                      x: FLOATING_POSITIONS[i]?.x,
                      y: FLOATING_POSITIONS[i]?.y,
                      opacity: 0,
                    }}
                    animate={{
                      x: FLOATING_POSITIONS[i]?.x,
                      y: FLOATING_POSITIONS[i]?.y,
                      opacity: [0, 1, 0],
                      scale: [0.8, 1, 0.8],
                    }}
                    transition={{
                      duration: ANIMATION_DURATIONS[i],
                      repeat: Infinity,
                      repeatType: "loop",
                    }}
                  >
                    <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm">
                      <p className="text-sm text-white/70">
                        {
                          [
                            "1.2K Views",
                            "↑ 23% Growth",
                            "89% Engagement",
                            "4.8★ Rating",
                          ][i]
                        }
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </LazyMotion>
  );
}

const features = [
  {
    title: "AI-Powered Discovery",
    description:
      "Find exactly what you're looking for with our semantic search engine that understands natural language queries.",
    icon: <IconCompass className="h-6 w-6 text-white" />,
  },
  {
    title: "Precise Locations",
    description:
      "Every video is tagged with exact GPS coordinates. Never wonder 'where was this filmed?' again.",
    icon: <IconMapPin className="h-6 w-6 text-white" />,
  },
  {
    title: "Smart Bookings",
    description:
      "Book hotels, restaurants, and experiences directly from the videos you love.",
    icon: <IconBed className="h-6 w-6 text-white" />,
  },
  {
    title: "Shop The Look",
    description:
      "Love what the creator is wearing? Shop their outfits and travel gear directly.",
    icon: <IconShoppingBag className="h-6 w-6 text-white" />,
  },
  {
    title: "AI Itinerary Planning",
    description:
      "Create perfect travel itineraries based on the content you save.",
    icon: <IconRoute className="h-6 w-6 text-white" />,
  },
];

const creatorBenefits = [
  "Direct monetization through content and bookings",
  "Organize exclusive trips with your community",
  "Analytics and insights about your audience",
  "Affiliate revenue from hotel and product recommendations",
  "Early access to new platform features",
];

import { motion } from "framer-motion";
import { ArrowRight, MapPin, Users, Clock, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-naivas-team.jpg";

const ease = [0.25, 0.1, 0.25, 1] as const;

const stats = [
  { value: "11", label: "Open Positions", icon: MapPin },
  { value: "KSh 17K-34K", label: "Salary Range", icon: Users },
  { value: "100+", label: "Locations", icon: Clock },
];

export function HeroSection() {
  const scrollToJobs = () => {
    document.getElementById('job-listings')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Full-bleed Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Naivas team members — proud Kenyan retail professionals"
          className="w-full h-full object-cover"
          loading="eager"
        />
        {/* Forest green gradient overlay for text readability */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, hsla(158, 100%, 5%, 0.85) 0%, hsla(158, 100%, 18%, 0.7) 50%, hsla(158, 100%, 5%, 0.6) 100%)`
          }}
        />
        {/* Bottom fade for smooth transition */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, transparent 0%, transparent 60%, hsla(158, 100%, 5%, 0.9) 100%)`
          }}
        />
      </div>

      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03] z-[1]" style={{
        backgroundImage: `radial-gradient(hsl(var(--accent)) 1px, transparent 1px)`,
        backgroundSize: '40px 40px',
      }} />

      {/* Gold accent line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, ease }}
        className="absolute top-0 left-0 right-0 h-1 bg-accent origin-left z-10"
      />

      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 py-20 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[90vh]">

          {/* Left Content — Centered on mobile, left on desktop */}
          <div className="lg:col-span-8 pt-8 lg:pt-0">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease }}
            >
              {/* Badge */}
              <motion.span
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 backdrop-blur-sm text-accent border border-accent/30 text-xs font-bold tracking-widest uppercase mb-8"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Now Hiring Across Kenya
              </motion.span>

              {/* Headline */}
              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-white leading-[0.9] tracking-tighter mb-8 text-balance drop-shadow-lg">
                Start Your Career at{" "}
                <span className="text-accent relative inline-block">
                  Naivas
                  <motion.svg
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 0.8, duration: 1, ease }}
                    className="absolute -bottom-2 left-0 w-full"
                    viewBox="0 0 300 12"
                    fill="none"
                  >
                    <motion.path
                      d="M2 8 C50 2, 100 2, 150 6 S250 10, 298 4"
                      stroke="hsl(var(--accent))"
                      strokeWidth="4"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </motion.svg>
                </span>
              </h1>

              {/* Subheadline */}
              <p className="max-w-[580px] text-lg sm:text-xl text-white/80 mb-10 leading-relaxed text-pretty font-body drop-shadow-md">
                Kenya's leading supermarket chain is hiring! Join thousands of Kenyans building
                their careers with competitive salaries, medical benefits, and growth opportunities.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4">
                <motion.button
                  whileHover={{ y: -2, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={scrollToJobs}
                  className="group inline-flex items-center gap-3 px-8 py-4 bg-accent text-accent-foreground rounded-xl font-display font-semibold text-base shadow-lg shadow-accent/20 transition-all hover:shadow-xl hover:bg-accent/90"
                >
                  View Openings
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </motion.button>

                <motion.button
                  whileHover={{ y: -2, backgroundColor: "rgba(255,255,255,0.15)" }}
                  whileTap={{ scale: 0.98 }}
                  onClick={scrollToJobs}
                  className="inline-flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-display font-semibold text-base border border-white/20 transition-all"
                >
                  Explore Opportunities
                </motion.button>
              </div>
            </motion.div>

            {/* Trust Markers */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8, ease }}
              className="mt-16 flex gap-8 sm:gap-12 border-t border-white/20 pt-8"
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.15, duration: 0.5 }}
                  className="flex items-center gap-3"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-accent/20 backdrop-blur-sm border border-accent/30">
                    <stat.icon className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <p className="text-2xl font-display font-bold text-white drop-shadow-sm">{stat.value}</p>
                    <p className="text-xs text-white/60 uppercase tracking-wider font-body">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Floating Testimonial Card — Right side */}
          <div className="lg:col-span-4 hidden lg:block">
            <motion.div
              initial={{ opacity: 0, x: 30, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ delay: 0.9, duration: 0.6, ease }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="p-6 bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 ml-auto max-w-sm"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent flex items-center justify-center">
                  <span className="text-accent-foreground font-display font-bold text-sm">SM</span>
                </div>
                <div>
                  <p className="text-sm font-body text-white leading-relaxed">
                    "Naivas gave me the platform to lead. I started as a cashier, now I manage a region."
                  </p>
                  <p className="mt-3 text-xs font-display font-bold text-accent uppercase tracking-widest">
                    — Sarah M., Regional Manager
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-white/50 uppercase tracking-widest font-body">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2"
        >
          <motion.div className="w-1 h-2 bg-accent rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
'use client';

import { Heart, Sparkles } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative py-16 overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gapA-8 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mb-4">
              <Sparkles className="h-4 w-4 text-blue-600 mr-2" />
              <span className="text-sm font-medium text-blue-800">AI-Powered Giving Platform</span>
            </div>

            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4 leading-tight">
              Decentralized Giving
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-500 bg-clip-text text-transparent">
                Powered by AI
              </span>
            </h2>

            <p className="text-lg text-slate-600 mb-6 max-w-xl">
              TrustBridge connects donors directly to verified children's trusts through transparent blockchain technology.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <a
                href="#trust-grid"
                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
              >
                Start Giving Today
              </a>
              <button className="px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-lg font-semibold hover:border-blue-400 hover:text-blue-600 transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>

          {/* Right: Larger 3D Visual Element */}
          <div className="flex items-center justify-end">
            <div className="relative scale-125">
              <div className="w-96 h-56 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-3xl p-8 shadow-2xl flex flex-col justify-between transition-transform duration-300 hover:rotate-3 hover:shadow-3xl">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <Heart className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-white text-xl font-semibold">TrustBridge</span>
                </div>
                <div>
                  <div className="text-white text-xl font-bold">2.47 ETH</div>
                  <div className="text-white/80 text-sm">Available for Impact</div>
                </div>
                <div className="flex items-center gap-x-4 mt-6">
                  <div className="flex -space-x-2">
                    <div className="w-9 h-9 bg-white/30 rounded-full border-2 border-white"></div>
                    <div className="w-9 h-9 bg-white/30 rounded-full border-2 border-white"></div>
                    <div className="w-9 h-9 bg-white/30 rounded-full border-2 border-white"></div>
                    <div className="w-9 h-9 bg-white/30 rounded-full border-2 border-white flex items-center justify-center text-base text-white">+</div>
                  </div>
                  <div className="text-white/80 text-lg whitespace-nowrap">
                    150 children helped
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* End Right */}
        </div>
      </div>
    </section>
  );
}
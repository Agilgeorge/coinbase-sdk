'use client';

import { Brain, Heart, Shield, TrendingUp, Sparkles, Globe, Users } from 'lucide-react';
import { Card } from '@/components/ui/card';

export function HeroSection() {
  return (
    <section className="relative py-16 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-br from-emerald-400/20 to-blue-400/20 rounded-full blur-lg animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-gradient-to-br from-amber-400/20 to-orange-400/20 rounded-full blur-lg animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 right-1/3 w-16 h-16 bg-gradient-to-br from-pink-400/20 to-purple-400/20 rounded-full blur-md animate-bounce delay-500"></div>
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mb-6">
              <Sparkles className="h-4 w-4 text-blue-600 mr-2" />
              <span className="text-sm font-medium text-blue-800">AI-Powered Giving Platform</span>
            </div>

            <h2 className="text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              Decentralized Giving
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-500 bg-clip-text text-transparent">
                Powered by AI
              </span>
            </h2>

            <p className="text-xl text-slate-600 mb-8 leading-relaxed max-w-2xl">
              TrustBridge connects donors directly to verified children's trusts through transparent blockchain technology. 
              Our AI analyzes real-time data to recommend the most impactful donations.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="#trust-grid"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
              >
                Start Giving Today
              </a>
              <button className="px-8 py-4 border-2 border-slate-300 text-slate-700 rounded-xl font-semibold hover:border-blue-400 hover:text-blue-600 transition-all duration-300">
                Learn More
              </button>
            </div>
          </div>

          {/* Right 3D Visual Elements */}
          <div className="relative">
            <div className="relative">
              <div className="absolute top-8 left-8 w-72 h-48 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl transform rotate-12 opacity-20 blur-sm"></div>
              <div className="absolute top-4 left-4 w-72 h-48 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl transform rotate-6 opacity-30 blur-sm"></div>

              <div className="relative w-72 h-48 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-2xl p-6 shadow-2xl transform hover:rotate-3 transition-transform duration-500">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                      <Heart className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-white font-semibold">TrustBridge</span>
                  </div>
                  <div className="text-white text-sm opacity-80">AI Powered</div>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="text-white text-2xl font-bold">2.47 ETH</div>
                  <div className="text-white/80 text-sm">Available for Impact</div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex -space-x-2">
                    <div className="w-6 h-6 bg-white/30 rounded-full border-2 border-white"></div>
                    <div className="w-6 h-6 bg-white/30 rounded-full border-2 border-white"></div>
                    <div className="w-6 h-6 bg-white/30 rounded-full border-2 border-white"></div>
                    <div className="w-6 h-6 bg-white/30 rounded-full border-2 border-white flex items-center justify-center text-xs text-white">+</div>
                  </div>
                  <div className="text-white/80 text-xs">150 children helped</div>
                </div>
              </div>
            </div>

            <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg animate-bounce">
              <Globe className="h-8 w-8 text-white" />
            </div>

            <div className="absolute -bottom-4 -left-4 w-14 h-14 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center shadow-lg animate-pulse">
              <Users className="h-6 w-6 text-white" />
            </div>

            <div className="absolute top-1/2 -right-8 w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg animate-spin" style={{ animationDuration: '8s' }}>
              <Brain className="h-6 w-6 text-white" />
            </div>

            <div className="absolute top-20 right-20">
              <div className="flex items-center space-x-2 animate-pulse">
                <div className="w-3 h-3 bg-emerald-400 rounded-full animate-ping"></div>
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-ping delay-100"></div>
                <div className="w-1 h-1 bg-emerald-400 rounded-full animate-ping delay-200"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

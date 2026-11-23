import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Award, 
  Sparkles, 
  Brain, 
  Heart, 
  ShieldCheck, 
  Calendar, 
  Phone, 
  Mail, 
  CheckCircle2, 
  ArrowRight 
} from 'lucide-react';
import { doctorData } from '../data/doctor';
import BackButton from '../components/BackButton';
import CTASection from '../components/CTASection';

export default function MeetDrAnna() {
  const navigate = useNavigate();

  return (
    <div className="space-y-4 px-4 pt-2.5 pb-6 md:px-5">
      <div>
        <BackButton label="Back to Home" to="/" />
      </div>

      {/* Profile Header Card */}
      <div className="bg-white rounded-3xl p-6 border border-neutral-100 shadow-sm relative overflow-hidden">
        <div className="flex flex-col items-center text-center">
          <div className="relative mb-4">
            <img 
              src={doctorData.photo} 
              alt={doctorData.fullName}
              className="w-28 h-28 rounded-full object-cover ring-4 ring-brand-primaryLight shadow-md"
            />
            <div className="absolute -bottom-1 right-1 bg-brand-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs flex items-center space-x-1">
              <Award className="w-3 h-3" />
              <span>Psy.D.</span>
            </div>
          </div>

          <h1 className="font-serif text-2xl font-bold text-brand-dark tracking-tight">
            Dr. Anna
          </h1>
          <p className="text-xs font-semibold text-brand-primary mt-0.5 uppercase tracking-wider">
            Licensed Psychologist
          </p>

          <div className="inline-flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full bg-brand-primarySoft text-brand-dark text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5 text-brand-accentDark" />
            <span>Over 13 Years of Clinical Experience</span>
          </div>

          <p className="mt-4 text-xs text-neutral-600 leading-relaxed font-sans max-w-sm">
            {doctorData.intro}
          </p>
        </div>

        {/* Quick Contact Action Bar */}
        <div className="mt-5 pt-4 border-t border-neutral-100 grid grid-cols-2 gap-2">
          <a
            href={`tel:${doctorData.phone}`}
            className="py-2.5 px-3 rounded-xl bg-neutral-50 hover:bg-neutral-100 text-neutral-800 text-xs font-semibold flex items-center justify-center space-x-1.5 transition-colors border border-neutral-200"
          >
            <Phone className="w-3.5 h-3.5 text-brand-primary" />
            <span>Call {doctorData.phone}</span>
          </a>

          <a
            href={doctorData.almaBookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="py-2.5 px-3 rounded-xl bg-brand-primary hover:bg-brand-primaryDark text-white text-xs font-semibold flex items-center justify-center space-x-1.5 transition-colors shadow-xs"
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Book on Alma</span>
          </a>
        </div>
      </div>

      {/* Clinical Experience & Specializations */}
      <div className="bg-white rounded-3xl p-5 border border-neutral-100 shadow-sm space-y-4">
        <h2 className="font-serif font-bold text-lg text-brand-dark">
          Training & Clinical Specializations
        </h2>

        <div className="space-y-3 text-xs text-neutral-700 leading-relaxed">
          <p>
            My training spans behavioral pediatrics, developmental disabilities, and clinical psychology. Today, my work is highly specialized.
          </p>
          <p>
            I focus primarily on supporting teen girls and women navigating ADHD and other forms of neurodivergence, along with related challenges like emotional regulation, relationship dynamics, and life transitions.
          </p>
          <p>
            My background in neuropsychological evaluations shapes how I understand behavior: as the interaction between brain function, environment, and individual experience.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
          <div className="p-3.5 rounded-2xl bg-brand-primarySoft/60 border border-brand-primary/10">
            <div className="flex items-center space-x-2 text-brand-primary font-semibold text-xs mb-1">
              <Brain className="w-4 h-4" />
              <span>Neurodivergence Focus</span>
            </div>
            <p className="text-[11px] text-neutral-600 leading-snug">
              ADHD, executive functioning hurdles, masking, and sensory overwhelm.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-brand-accentLight/60 border border-brand-accent/20">
            <div className="flex items-center space-x-2 text-brand-dark font-semibold text-xs mb-1">
              <Heart className="w-4 h-4 text-brand-accentDark" />
              <span>Emotional Regulation</span>
            </div>
            <p className="text-[11px] text-neutral-600 leading-snug">
              Anxiety, relational dynamics, burnout, and life transition navigation.
            </p>
          </div>
        </div>
      </div>

      {/* Holistic & Integrative Philosophy */}
      <div className="bg-white rounded-3xl p-5 border border-neutral-100 shadow-sm space-y-3">
        <h2 className="font-serif font-bold text-lg text-brand-dark">
          Holistic & Integrative Care
        </h2>

        <p className="text-xs text-neutral-700 leading-relaxed">
          My approach is holistic and integrative. I consider the full context of each individual’s life, including physical health, nervous system regulation, sleep, nutrition, relationships, and movement.
        </p>

        <p className="text-xs text-neutral-700 leading-relaxed">
          While symptom reduction is important, my deeper goal is to help clients understand themselves, advocate for their needs, and build lives that feel sustainable and authentic.
        </p>

        <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-neutral-200/80 mt-3 space-y-2">
          <h3 className="font-serif font-semibold text-xs text-brand-dark">
            What We Address Together:
          </h3>
          <ul className="space-y-1.5 text-[11px] text-neutral-700">
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-brand-primary shrink-0" />
              <span>Nervous system regulation and somatic grounding</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-brand-primary shrink-0" />
              <span>Customized executive functioning and organizational systems</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-brand-primary shrink-0" />
              <span>Self-advocacy and neurodivergence identity clarity</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-brand-primary shrink-0" />
              <span>Restoring healthy sleep, nutrition, and daily rhythm</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Therapy Philosophy Section */}
      <div className="bg-[#FAF8F5] rounded-3xl p-5 border border-brand-accent/30 shadow-xs space-y-3">
        <span className="text-[10px] font-bold tracking-wider uppercase text-brand-accentDark">
          Philosophy
        </span>
        <h2 className="font-serif font-bold text-lg text-brand-dark">
          {doctorData.philosophy.heading}
        </h2>
        {doctorData.philosophy.body.map((p, idx) => (
          <p key={idx} className="text-xs text-neutral-700 leading-relaxed">
            {p}
          </p>
        ))}

        <div className="pt-2">
          <button
            onClick={() => navigate('/contact')}
            className="w-full py-3 px-4 rounded-xl bg-brand-primary hover:bg-brand-primaryDark text-white text-xs font-semibold shadow-xs flex items-center justify-center space-x-1.5 transition-all"
          >
            <span>Schedule a Free 15-Minute Consultation</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Final CTA */}
      <CTASection />
    </div>
  );
}

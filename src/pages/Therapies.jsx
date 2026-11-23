import React, { useState } from 'react';
import { Search, Sparkles, Filter } from 'lucide-react';
import { servicesData } from '../data/services';
import ServiceCard from '../components/ServiceCard';
import SectionHeader from '../components/SectionHeader';
import CTASection from '../components/CTASection';
import FilterPills from '../components/FilterPills';

export default function Therapies() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Adults', 'Teens & Parents', 'ADHD & Focus', 'Emotional Wellness'];

  const filterService = (service) => {
    const matchesSearch = 
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    if (selectedCategory === 'All') return true;
    if (selectedCategory === 'Adults') {
      return ['individual-therapy-for-adults', 'burnout-life-transitions', 'relationship-interpersonal-therapy', 'self-esteem-difficulties'].includes(service.slug);
    }
    if (selectedCategory === 'Teens & Parents') {
      return ['therapy-for-teenagers-adolescents', 'parent-support'].includes(service.slug);
    }
    if (selectedCategory === 'ADHD & Focus') {
      return ['adhd-therapy-executive-functioning-coaching', 'mindfulness-based-therapy', 'sleep-insomnia-support'].includes(service.slug);
    }
    if (selectedCategory === 'Emotional Wellness') {
      return ['anxiety-stress', 'trauma-informed-therapy', 'anger-management', 'mindfulness-based-therapy'].includes(service.slug);
    }
    return true;
  };

  const filteredServices = servicesData.filter(filterService);

  return (
    <div className="space-y-5 px-4 pt-3 pb-6 md:px-5">
      {/* Page Header */}
      <div>
        <span className="text-[10px] font-bold tracking-wider uppercase text-brand-primary">
          Guiding Light Psychology
        </span>
        <h1 className="font-serif text-2xl font-bold text-brand-dark tracking-tight mt-0.5">
          Therapy Services (12)
        </h1>
        <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
          Explore all evidence-based therapeutic services tailored to adult professionals, teenagers, and families.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by topic, symptom, or service..."
          className="w-full pl-10 pr-4 py-2.5 bg-white text-xs rounded-2xl border border-neutral-200 focus:outline-hidden focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-2xs"
        />
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery('')}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-neutral-600"
          >
            Clear
          </button>
        )}
      </div>

      {/* Filter Tabs with Cursor Drag, Wheel & Arrow Scrolling */}
      <FilterPills
        categories={categories}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />

      {/* Services List (All 12 detailed cards) */}
      <div className="space-y-4">
        {filteredServices.length > 0 ? (
          filteredServices.map((service) => (
            <ServiceCard 
              key={service.id} 
              service={service} 
              variant="full" 
            />
          ))
        ) : (
          <div className="text-center py-10 bg-white rounded-3xl p-6 border border-neutral-100">
            <p className="text-xs text-neutral-500 mb-2">No therapy services matched your search.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="text-xs font-semibold text-brand-primary hover:underline"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Bottom CTA */}
      <CTASection />
    </div>
  );
}

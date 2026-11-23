import React, { useState } from 'react';
import { 
  Search, 
  ExternalLink, 
  BookOpen, 
  ShieldAlert, 
  HeartHandshake, 
  Brain, 
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { resourcesData } from '../data/resources';
import BackButton from '../components/BackButton';
import CTASection from '../components/CTASection';
import FilterPills from '../components/FilterPills';

export default function Resources() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...resourcesData.map(c => c.category)];

  // Flatten items for search
  const allItems = resourcesData.flatMap(c => 
    c.items.map(item => ({ ...item, category: c.category }))
  );

  const filteredItems = allItems.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-4 px-4 pt-2.5 pb-6 md:px-5">
      {/* Header with Back Button and Title (tight spacing) */}
      <div>
        <BackButton label="Back to Home" to="/" />
        <div className="mt-1">
          <span className="text-[10px] font-bold tracking-wider uppercase text-brand-primary">
            Guiding Light Psychology
          </span>
          <h1 className="font-serif text-2xl font-bold text-brand-dark tracking-tight mt-0.5">
            Mental Health Links ({allItems.length})
          </h1>
          <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
            Curated clinical databases, crisis helplines, professional associations, and research literature from the website.
          </p>
        </div>
      </div>

      {/* Crisis Warning Banner */}
      <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200/80 flex items-start space-x-2.5">
        <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <p className="text-[11px] text-amber-900 leading-snug">
          <strong>Immediate Crisis Support:</strong> If you or someone you know is in acute danger or experiencing suicidal ideation, call or text <strong>988</strong> (Suicide & Crisis Lifeline) or call 911 immediately.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search resources, topics, or organizations..."
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

      {/* Category Pills with Cursor Drag, Wheel & Arrow Scrolling */}
      <FilterPills
        categories={categories}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />

      {/* Resources Cards Grid */}
      <div className="space-y-3">
        {filteredItems.length > 0 ? (
          filteredItems.map((item, idx) => (
            <a
              key={idx}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-4 bg-white rounded-2xl border border-neutral-200/70 shadow-2xs hover:shadow-card hover:border-brand-primary/40 transition-all active:scale-[0.99]"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <span className="text-[10px] font-semibold tracking-wider uppercase text-brand-primary block">
                    {item.category}
                  </span>
                  <h3 className="font-serif font-semibold text-sm text-brand-dark group-hover:text-brand-primary transition-colors leading-snug">
                    {item.name}
                  </h3>
                  <p className="text-xs text-neutral-600 leading-relaxed pt-0.5">
                    {item.description}
                  </p>
                </div>
                <div className="w-8 h-8 rounded-xl bg-neutral-50 group-hover:bg-brand-primaryLight/50 flex items-center justify-center shrink-0 text-neutral-400 group-hover:text-brand-primary transition-colors">
                  <ExternalLink className="w-4 h-4" />
                </div>
              </div>
            </a>
          ))
        ) : (
          <div className="text-center py-10 bg-white rounded-3xl p-6 border border-neutral-100">
            <p className="text-xs text-neutral-500 mb-2">No resources matched your search criteria.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
              className="text-xs font-semibold text-brand-primary hover:underline"
            >
              Show all resources
            </button>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <CTASection />
    </div>
  );
}

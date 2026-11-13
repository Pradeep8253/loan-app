"use client";
/**
 * FaSearch — client-side search across every FAQ with live filtering, an empty
 * state and a keyboard-friendly clear action.
 */
import { useMemo, useState } from "react";
import { Search, X, ArrowUpRight } from "lucide-react";
import Accordion from "@/components/ui/Accordion/Accordion";
import Button from "@/components/ui/Button/Button";
import { allFaqs, faqHaystacks } from "@/lib/data/faqs";
import "./FaSearch.css";

export default function FaSearch() {
  const [query, setQuery] = useState("");
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return allFaqs.filter((_, i) => faqHaystacks[i].includes(q));
  }, [query]);

  return (
    <section className="fa-search section section--white" aria-labelledby="fa-search-title">
      <div className="container fa-search__inner">
        <h2 className="sr-only" id="fa-search-title">Search FAQs</h2>
        <div className="fa-search__bar">
          <Search aria-hidden="true" size={20} className="fa-search__icon" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search — e.g. foreclosure, credit score, GST"
            aria-label="Search frequently asked questions"
            className="fa-search__input"
            enterKeyHint="search"
          />
          {query ? (
            <button type="button" className="fa-search__clear" onClick={() => setQuery("")} aria-label="Clear search">
              <X aria-hidden="true" size={18} />
            </button>
          ) : null}
        </div>
        {query ? (
          results.length ? (
            <div className="fa-search__results">
              <p className="fa-search__count" role="status">{results.length} result{results.length === 1 ? "" : "s"} for “{query}”</p>
              <Accordion items={results} defaultOpen={0} allowMultiple />
            </div>
          ) : (
            <div className="fa-search__empty">
              <p className="fa-search__empty-title">No match for “{query}”.</p>
              <p className="fa-search__empty-body">Try a shorter word, or ask the desk directly — a real person replies in about 30 minutes during business hours.</p>
              <Button href="/contact" variant="dark" size="md" icon={<ArrowUpRight aria-hidden="true" size={16} />} rightIcon={false}>Ask the desk</Button>
            </div>
          )
        ) : null}
      </div>
    </section>
  );
}

"use client";
/**
 * TeamShell — the dashboard frame: header with demo notice, KPI ribbon, and a
 * tab switch between pipeline and detail. Sticky on mobile, sidebar-free so it
 * works at 390px without collapsing anything.
 */
import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, LayoutList, Search, RotateCcw } from "lucide-react";
import useApplications from "./useApplications";
import TeamOverview from "../TeamOverview/TeamOverview";
import TeamPipeline from "../TeamPipeline/TeamPipeline";
import TeamDetail from "../TeamDetail/TeamDetail";
import { SkeletonCard } from "@/components/ui/Skeleton/Skeleton";
import "./TeamShell.css";

export default function TeamShell({ initialRef }) {
  const { applications, ready, setStatus, addNote, reset } = useApplications();
  const [selected, setSelected] = useState(initialRef || null);
  const [query, setQuery] = useState("");

  const current = useMemo(() => applications.find((a) => a.reference === selected) || null, [applications, selected]);

  return (
    <div className="ts">
      <header className="ts__head">
        <div className="ts__head-left">
          <Link href="/" className="ts__back"><ArrowLeft aria-hidden="true" size={18} /> Site</Link>
          <div>
            <p className="ts__eyebrow">Team dashboard</p>
            <h1 className="ts__title">Pipeline</h1>
          </div>
        </div>
        <div className="ts__head-right">
          <span className="ts__demo">Demo data · {applications.length} files</span>
          <button type="button" className="ts__reset" onClick={reset}><RotateCcw aria-hidden="true" size={15} /> Reset</button>
        </div>
      </header>

      <div className="ts__notice">
        No login. Every edit stays in this browser. <Link href="/demo-scope">What is simulated?</Link>
      </div>

      {!ready ? (
        <div className="ts__loading" aria-busy="true" aria-live="polite">
          <SkeletonCard /><SkeletonCard /><SkeletonCard />
        </div>
      ) : current ? (
        <TeamDetail
          app={current}
          onBack={() => setSelected(null)}
          onStatus={(s) => setStatus(current.reference, s)}
          onNote={(t) => addNote(current.reference, t)}
        />
      ) : (
        <>
          <TeamOverview apps={applications} onPick={(ref) => setSelected(ref)} />
          <div className="ts__toolbar">
            <div className="ts__search">
              <Search aria-hidden="true" size={17} />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search name, reference or city"
                aria-label="Search applications"
                enterKeyHint="search"
              />
            </div>
            <span className="ts__view"><LayoutList aria-hidden="true" size={16} /> All applications</span>
          </div>
          <TeamPipeline apps={applications} query={query} onPick={(ref) => setSelected(ref)} />
        </>
      )}
    </div>
  );
}

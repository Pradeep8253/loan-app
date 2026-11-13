/**
 * Root loading state — shown while a route segment streams in.
 */
export default function Loading() {
  return (
    <main className="page-loading">
      <div className="container page-loading__inner">
        <div className="skel skel--title" aria-hidden="true" />
        <div className="skel skel--text" aria-hidden="true" />
        <div className="page-loading__grid">
          <div className="skel skel--card" aria-hidden="true" />
          <div className="skel skel--card" aria-hidden="true" />
          <div className="skel skel--card" aria-hidden="true" />
        </div>
        <p className="sr-only" role="status">Loading page</p>
      </div>
    </main>
  );
}

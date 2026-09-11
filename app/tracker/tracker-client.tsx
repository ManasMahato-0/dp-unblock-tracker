'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PLAN, allProbs, TOTAL, lcUrl, ncUrl } from '@/lib/plan';
import type { Entries } from '@/types';

type SaveState = 'idle' | 'saving' | 'saved' | 'error';

function probState(e: Entries[string] | undefined): 'none' | 'one' | 'done' {
  if (!e) return 'none';
  if (e.td && e.bu) return 'done';
  if (e.td || e.bu) return 'one';
  return 'none';
}

export default function TrackerClient({ email }: { email: string }) {
  const router = useRouter();
  const [entries, setEntries] = useState<Entries>({});
  const [loaded, setLoaded] = useState(false);
  const [save, setSave] = useState<SaveState>('idle');
  const [openNotes, setOpenNotes] = useState<Record<string, boolean>>({});

  const timer = useRef<ReturnType<typeof setTimeout>>();
  const pending = useRef<Entries | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const r = await fetch('/api/progress');
        if (r.status === 401) {
          router.push('/login');
          return;
        }
        const j = await r.json();
        if (j.ok) setEntries(j.data.entries || {});
      } catch {
        /* offline start — treat as empty */
      }
      setLoaded(true);
    })();
  }, [router]);

  const flush = useCallback(async () => {
    if (!pending.current) return;
    const body = pending.current;
    pending.current = null;
    setSave('saving');
    try {
      const r = await fetch('/api/progress', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ entries: body }),
      });
      setSave(r.ok ? 'saved' : 'error');
    } catch {
      setSave('error');
    }
  }, []);

  const mutate = useCallback(
    (fn: (e: Entries) => Entries) => {
      setEntries((prev) => {
        const next = fn(prev);
        pending.current = next;
        setSave('saving');
        clearTimeout(timer.current);
        timer.current = setTimeout(flush, 600);
        return next;
      });
    },
    [flush]
  );

  // Save on unmount / tab close if anything is still pending.
  useEffect(() => {
    const handler = () => {
      if (pending.current) {
        navigator.sendBeacon?.(
          '/api/progress',
          new Blob([JSON.stringify({ entries: pending.current })], { type: 'application/json' })
        );
      }
    };
    window.addEventListener('beforeunload', handler);
    return () => {
      window.removeEventListener('beforeunload', handler);
      clearTimeout(timer.current);
    };
  }, []);

  const toggle = (id: string, kind: 'td' | 'bu') =>
    mutate((e) => ({ ...e, [id]: { ...e[id], [kind]: !e[id]?.[kind] } }));

  const setNote = (id: string, note: string) =>
    mutate((e) => ({ ...e, [id]: { ...e[id], note } }));

  const retry = () => flush();

  const reset = () => {
    if (confirm('Reset all progress? This clears every checkmark and note.')) {
      mutate(() => ({}));
      setOpenNotes({});
    }
  };

  async function logout() {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
    router.refresh();
  }

  const { tdCount, buCount, bothCount } = useMemo(() => {
    let td = 0,
      bu = 0,
      both = 0;
    for (const id of allProbs) {
      const s = entries[id];
      if (s?.td) td++;
      if (s?.bu) bu++;
      if (s?.td && s?.bu) both++;
    }
    return { tdCount: td, buCount: bu, bothCount: both };
  }, [entries]);

  const done = tdCount + buCount;
  const pct = done / (2 * TOTAL);
  const N = 30;
  const filled = Math.round(pct * N);

  const saveLabel: Record<SaveState, string> = {
    idle: '',
    saving: 'Saving…',
    saved: 'Saved',
    error: 'Save failed',
  };

  if (!loaded) {
    return (
      <div className="wrap">
        <p className="loading">Loading your progress…</p>
      </div>
    );
  }

  return (
    <div className="wrap">
      <div className="topbar">
        <span className="who">{email}</span>
        <div className="right">
          <span className={`savestate${save === 'error' ? ' err' : ''}`}>
            {saveLabel[save]}
            {save === 'error' && (
              <>
                {' — '}
                <button className="linkbtn" onClick={retry}>
                  retry
                </button>
              </>
            )}
          </span>
          <button className="linkbtn" onClick={logout}>
            Log out
          </button>
        </div>
      </div>

      <header>
        <h1>DP Unblock</h1>
        <p>
          6-week plan to stop freezing on unseen problems. Solve each one both ways — that&apos;s the
          point.
        </p>
      </header>

      <div className="table-strip">
        <div className="strip-labels">
          <span className="mono">dp[0] · base case</span>
          <span className="mono">dp[n] · solved</span>
        </div>
        <div className="cells">
          {Array.from({ length: N }, (_, i) => (
            <div key={i} className={`cell${i < filled ? ' on' : ''}`} />
          ))}
        </div>
        <div className="pct">
          <b>{Math.round(pct * 100)}%</b> of the table filled — {done} of {2 * TOTAL} approaches
          solved
        </div>
      </div>

      <div className="stats">
        <div className="stat both">
          <div className="num">
            {bothCount}/{TOTAL}
          </div>
          <div className="lbl">fully solved</div>
        </div>
        <div className="stat td">
          <div className="num">{tdCount}</div>
          <div className="lbl">top-down done</div>
        </div>
        <div className="stat bu">
          <div className="num">{buCount}</div>
          <div className="lbl">bottom-up done</div>
        </div>
        <div className="stat">
          <div className="num">{PLAN.length}</div>
          <div className="lbl">phases</div>
        </div>
      </div>

      <div className="legend">
        <span>
          <span className="dot" style={{ background: 'var(--td)' }} />
          Top-down (memoized recursion)
        </span>
        <span>
          <span className="dot" style={{ background: 'var(--bu)' }} />
          Bottom-up (tabulation)
        </span>
        <span>
          <span className="dot" style={{ background: 'var(--gold)' }} />
          Both done — locked in
        </span>
      </div>

      {PLAN.map((w) => (
        <section className="week" key={w.title}>
          <div className="week-head">
            <h2>{w.title}</h2>
            <span className="tag">{w.tag}</span>
          </div>
          <p className="week-goal">{w.goal}</p>
          {w.probs.map((p) => {
            const { code, name, pattern } = p;
            const s = entries[code];
            const st = probState(s);
            const codeLabel = /^\d+$/.test(code) ? `LC ${code}` : code;
            const noteOpen = !!openNotes[code];
            const nc = ncUrl(p);
            return (
              <div className="prob" data-state={st} key={code}>
                <a
                  className="code mono"
                  href={lcUrl(p)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {codeLabel}
                </a>
                <span className="name">
                  {name}
                  {s?.note ? <span className="has-note">NOTE</span> : null}
                  <span className="pat">
                    {nc ? (
                      <a href={nc} target="_blank" rel="noopener noreferrer">
                        {pattern}
                      </a>
                    ) : (
                      pattern
                    )}
                  </span>
                </span>
                <span className="toggles">
                  <button
                    className={`tog td${s?.td ? ' on' : ''}`}
                    onClick={() => toggle(code, 'td')}
                    aria-pressed={!!s?.td}
                  >
                    TD
                  </button>
                  <button
                    className={`tog bu${s?.bu ? ' on' : ''}`}
                    onClick={() => toggle(code, 'bu')}
                    aria-pressed={!!s?.bu}
                  >
                    BU
                  </button>
                  <button
                    className={`tog note${noteOpen ? ' on' : ''}`}
                    onClick={() => setOpenNotes((o) => ({ ...o, [code]: !o[code] }))}
                    aria-expanded={noteOpen}
                  >
                    ✎
                  </button>
                </span>
                {noteOpen && (
                  <div className="note-row">
                    <textarea
                      placeholder="State definition, recurrence, what blocked you…"
                      value={s?.note ?? ''}
                      onChange={(e) => setNote(code, e.target.value)}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </section>
      ))}

      <div className="footer-actions">
        <p className="note">
          Progress saves to your account automatically. Redo any problem you failed after ~3 days,
          then again after ~10 — that spacing is what makes the pattern stick.
        </p>
        <button className="reset" onClick={reset}>
          Reset all progress
        </button>
      </div>
    </div>
  );
}

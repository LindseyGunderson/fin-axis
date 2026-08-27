function App() {
  return (
    <main className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-4xl space-y-8">
        <header>
          <p className="text-sm font-medium text-text-secondary">
            Financial management
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-text-primary">
            Fin Axis
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-text-secondary">
            A clearer way to understand your business finances.
          </p>
        </header>

        <section className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-border bg-surface p-5 shadow-card">
            <p className="text-sm text-text-secondary">Revenue</p>
            <p className="mt-2 text-2xl font-semibold">$42,840</p>
          </div>

          <div className="rounded-lg border border-border bg-surface p-5 shadow-card">
            <p className="text-sm text-text-secondary">Expenses</p>
            <p className="mt-2 text-2xl font-semibold">$18,240</p>
          </div>

          <div className="rounded-lg border border-border bg-surface p-5 shadow-card">
            <p className="text-sm text-text-secondary">Outstanding</p>
            <p className="mt-2 text-2xl font-semibold">$8,420</p>
          </div>
        </section>
      </div>
    </main>
  );
}

export default App;

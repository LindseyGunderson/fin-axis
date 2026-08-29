import Skeleton from "../ui/Skeleton";

function DashboardSkeleton() {
  return (
    <div className="max-w-5xl">
      {/* Financial summary */}
      <div className="grid gap-4 md:grid-cols-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="rounded-lg border border-border/70 bg-surface p-6"
          >
            <Skeleton className="h-3 w-24" />
            <Skeleton className="mt-5 h-9 w-32" />
            <Skeleton className="mt-3 h-3 w-20" />
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="mt-6 rounded-lg border border-border/70 bg-surface p-6">
        <Skeleton className="h-5 w-40" />
        <Skeleton className="mt-2 h-3 w-56" />
        <Skeleton className="mt-8 h-64 w-full" />
      </div>

      {/* Dashboard lists */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-border/70 bg-surface p-6">
          <Skeleton className="h-5 w-40" />

          <div className="mt-8 space-y-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="flex items-center gap-3">
                <Skeleton className="size-8 shrink-0" />

                <div className="flex-1">
                  <Skeleton className="h-3 w-32" />
                  <Skeleton className="mt-2 h-3 w-20" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-border/70 bg-surface p-6">
          <Skeleton className="h-5 w-40" />

          <div className="mt-8 space-y-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex items-center gap-3">
                <Skeleton className="size-8 shrink-0" />

                <div className="flex-1">
                  <Skeleton className="h-3 w-32" />
                  <Skeleton className="mt-2 h-3 w-24" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardSkeleton;

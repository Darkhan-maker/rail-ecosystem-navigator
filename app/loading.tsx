const C = { bg: '#080d1a', card: '#0c1424', border: '#1a2535' };

function Skeleton({ h, w, radius = 8 }: { h: number; w?: string | number; radius?: number }) {
  return (
    <div
      className="animate-pulse"
      style={{
        height:       h,
        width:        w ?? '100%',
        background:   C.card,
        borderRadius: radius,
      }}
    />
  );
}

export default function Loading() {
  return (
    <div className="min-h-screen" style={{ background: C.bg }}>
      {/* Hero skeleton */}
      <div className="py-14 md:py-20 border-b" style={{ borderColor: C.border }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <Skeleton h={12} w={72} radius={4} />
          <Skeleton h={40} w="55%" />
          <Skeleton h={18} w="80%" />
          <Skeleton h={18} w="62%" />
          <div className="flex gap-3 pt-1">
            <Skeleton h={30} w={110} radius={999} />
            <Skeleton h={30} w={90}  radius={999} />
            <Skeleton h={30} w={120} radius={999} />
          </div>
        </div>
      </div>

      {/* Cards skeleton */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-4">
        <Skeleton h={140} radius={12} />
        <Skeleton h={200} radius={12} />
        <Skeleton h={140} radius={12} />
      </div>
    </div>
  );
}

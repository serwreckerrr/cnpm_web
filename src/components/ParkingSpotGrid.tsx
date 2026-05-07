import { Car } from 'lucide-react';

interface ParkingSpot {
  id: string;
  occupied: boolean;
}

interface ParkingSpotGridProps {
  spots: ParkingSpot[];
  columns?: number;
}

export function ParkingSpotGrid({ spots, columns = 10 }: ParkingSpotGridProps) {
  return (
    <div
      className="grid gap-2"
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
    >
      {spots.map((spot) => (
        <div
          key={spot.id}
          className={`aspect-square rounded border-2 flex items-center justify-center transition-all hover:scale-105 ${
            spot.occupied
              ? 'bg-[#fee2e2] border-[#dc2626] text-[#dc2626]'
              : 'bg-[#d1fae5] border-[#10b981] text-[#10b981]'
          }`}
          title={`Spot ${spot.id} - ${spot.occupied ? 'Occupied' : 'Available'}`}
        >
          {spot.occupied && <Car className="w-4 h-4" />}
        </div>
      ))}
    </div>
  );
}

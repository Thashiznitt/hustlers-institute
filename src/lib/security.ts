/**
 * Haversine formula to calculate the great-circle distance between two points
 * on the Earth's surface, specified in decimal degrees of latitude and longitude.
 */
export function getDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Earth's radius in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
      
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in km
}

/**
 * Validates if the travel velocity between two geo points in a given time interval
 * is humanly possible via commercial flight (threshold speed ~850 km/h).
 * Returns true if travel is impossible, indicating session/account sharing.
 */
export function isTravelImpossible(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
  timeDifferenceHours: number,
  speedLimitKmh = 850
): { impossible: boolean; speedKmh: number; distanceKm: number } {
  if (timeDifferenceHours <= 0) {
    // Instantaneous jumps are always impossible if the distance is greater than zero
    const dist = getDistanceKm(lat1, lon1, lat2, lon2);
    return {
      impossible: dist > 1, // Allow 1km threshold for minor geo-ip jumps
      speedKmh: dist > 1 ? Infinity : 0,
      distanceKm: dist
    };
  }

  const distance = getDistanceKm(lat1, lon1, lat2, lon2);
  const speedKmh = distance / timeDifferenceHours;
  
  return {
    impossible: speedKmh > speedLimitKmh,
    speedKmh,
    distanceKm: distance
  };
}

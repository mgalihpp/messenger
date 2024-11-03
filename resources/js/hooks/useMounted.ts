import { useEffect, useState } from "react";

/**
 * Custom hook that returns a boolean indicating if the component is mounted.
 *
 * @returns {boolean} - True if the component is mounted, false otherwise.
 */
function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

export default useMounted;

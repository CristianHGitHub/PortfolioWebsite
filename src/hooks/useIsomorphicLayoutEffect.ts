import { useEffect, useState } from "react";

export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useEffect : () => {};

export const useIsClient = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
};

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { apiClient } from "../api/client";

const SubscriptionContext = createContext(null);

export function SubscriptionProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [subscription, setSubscription] = useState(null);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiClient.getSubscription();
      setSubscription(res);
    } catch (e) {
      setError(e?.message || "Failed to load subscription.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const changePlan = useCallback(async (planId) => {
    const res = await apiClient.changePlan(planId);
    setSubscription(res);
    return res;
  }, []);

  const value = useMemo(
    () => ({
      loading,
      error,
      subscription,
      refresh,
      changePlan
    }),
    [loading, error, subscription, refresh, changePlan]
  );

  return <SubscriptionContext.Provider value={value}>{children}</SubscriptionContext.Provider>;
}

export function useSubscription() {
  const ctx = useContext(SubscriptionContext);
  if (!ctx) throw new Error("useSubscription must be used within SubscriptionProvider");
  return ctx;
}

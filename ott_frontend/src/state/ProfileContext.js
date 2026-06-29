import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { apiClient } from "../api/client";

const ProfileContext = createContext(null);

export function ProfileProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [profiles, setProfiles] = useState([]);
  const [activeProfileId, setActiveProfileId] = useState(null);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await apiClient.getProfiles();
      setProfiles(res.profiles || []);
      setActiveProfileId(res.activeProfileId || res.profiles?.[0]?.id || null);
    } catch (e) {
      setError(e?.message || "Failed to load profiles.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const saveProfile = useCallback(async (profile) => {
    const res = await apiClient.saveProfile(profile);
    setProfiles(res.profiles || []);
    setActiveProfileId(res.activeProfileId || null);
    return res;
  }, []);

  const value = useMemo(
    () => ({
      loading,
      error,
      profiles,
      activeProfileId,
      activeProfile: profiles.find((p) => p.id === activeProfileId) || null,
      setActiveProfileId,
      refresh,
      saveProfile
    }),
    [loading, error, profiles, activeProfileId, refresh, saveProfile]
  );

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
}

export function useProfiles() {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error("useProfiles must be used within ProfileProvider");
  return ctx;
}

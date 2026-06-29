import { env } from "../config/env";

/**
 * Lightweight API wrapper.
 * For now, this supports a mock mode so the UI is functional without a backend.
 */
const DEFAULT_TIMEOUT_MS = 15000;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchJson(path, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS);

  try {
    const res = await fetch(`${env.apiBase}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {})
      },
      signal: controller.signal
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`API ${res.status}: ${text || res.statusText}`);
    }
    return await res.json();
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * UI mock mode: set REACT_APP_NODE_ENV=development to use mocks by default.
 * If you later implement a backend, flip this to false or add a REACT_APP_USE_MOCKS flag.
 */
export const useMocks = true;

export const apiClient = {
  async getHome() {
    if (useMocks) {
      const { getMockHome } = await import("./mockData");
      await sleep(250);
      return getMockHome();
    }
    return fetchJson("/home");
  },

  async search(query) {
    if (useMocks) {
      const { searchMock } = await import("./mockData");
      await sleep(200);
      return searchMock(query);
    }
    return fetchJson(`/search?q=${encodeURIComponent(query)}`);
  },

  async getCatalog() {
    if (useMocks) {
      const { getMockCatalog } = await import("./mockData");
      await sleep(200);
      return getMockCatalog();
    }
    return fetchJson("/catalog");
  },

  async getTitle(id) {
    if (useMocks) {
      const { getMockTitle } = await import("./mockData");
      await sleep(200);
      return getMockTitle(id);
    }
    return fetchJson(`/titles/${encodeURIComponent(id)}`);
  },

  async getProfiles() {
    if (useMocks) {
      const { getMockProfiles } = await import("./mockData");
      await sleep(150);
      return getMockProfiles();
    }
    return fetchJson("/profiles");
  },

  async saveProfile(profile) {
    if (useMocks) {
      const { saveMockProfile } = await import("./mockData");
      await sleep(200);
      return saveMockProfile(profile);
    }
    return fetchJson("/profiles", {
      method: "POST",
      body: JSON.stringify(profile)
    });
  },

  async getSubscription() {
    if (useMocks) {
      const { getMockSubscription } = await import("./mockData");
      await sleep(200);
      return getMockSubscription();
    }
    return fetchJson("/subscription");
  },

  async changePlan(planId) {
    if (useMocks) {
      const { changeMockPlan } = await import("./mockData");
      await sleep(400);
      return changeMockPlan(planId);
    }
    return fetchJson("/subscription/plan", {
      method: "POST",
      body: JSON.stringify({ planId })
    });
  }
};

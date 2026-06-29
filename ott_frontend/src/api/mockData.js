const titles = [
  {
    id: "t1",
    name: "Ocean Heist",
    year: 2026,
    rating: "PG-13",
    duration: "2h 8m",
    genres: ["Action", "Thriller"],
    description:
      "A slick crew races against time to recover a stolen prototype hidden in the depths of a floating city.",
    heroGradient: "linear-gradient(135deg, rgba(37,99,235,0.18), rgba(245,158,11,0.12))",
    bannerText: "Top 1 in Action Today",
    posterTone: "blue",
    videoUrl:
      "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
  },
  {
    id: "t2",
    name: "Amber Skies",
    year: 2025,
    rating: "TV-MA",
    duration: "8 eps",
    genres: ["Drama", "Sci‑Fi"],
    description:
      "After a solar flare rewrites the rules of navigation, a pilot and an engineer lead a fragile expedition across the new skyways.",
    heroGradient: "linear-gradient(135deg, rgba(245,158,11,0.18), rgba(37,99,235,0.10))",
    bannerText: "New Season Available",
    posterTone: "amber",
    videoUrl:
      "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
  },
  {
    id: "t3",
    name: "Night Byte",
    year: 2024,
    rating: "TV-14",
    duration: "1h 45m",
    genres: ["Mystery", "Tech"],
    description:
      "A forensic analyst traces an anonymous livestream that seems to predict crimes before they happen.",
    heroGradient: "linear-gradient(135deg, rgba(17,24,39,0.20), rgba(37,99,235,0.12))",
    bannerText: "Trending for You",
    posterTone: "slate",
    videoUrl:
      "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
  }
];

const rails = [
  { id: "r1", title: "Featured", items: ["t1", "t2", "t3"] },
  { id: "r2", title: "Because you watched Action", items: ["t1", "t3", "t2"] },
  { id: "r3", title: "New & Noteworthy", items: ["t2", "t3", "t1"] }
];

let profiles = [
  { id: "p1", name: "Alex", maturity: "All", color: "#2563EB" },
  { id: "p2", name: "Sam", maturity: "Teen", color: "#F59E0B" }
];

let activeProfileId = profiles[0]?.id;

const plans = [
  {
    id: "basic",
    name: "Basic",
    price: "$7.99/mo",
    quality: "HD",
    screens: 1
  },
  {
    id: "standard",
    name: "Standard",
    price: "$11.99/mo",
    quality: "Full HD",
    screens: 2
  },
  {
    id: "premium",
    name: "Premium",
    price: "$15.99/mo",
    quality: "Ultra HD",
    screens: 4
  }
];

let subscription = {
  status: "active",
  currentPlanId: "standard",
  renewalDate: "2026-07-15",
  paymentMethod: "Visa •••• 4242",
  plans
};

export function getMockHome() {
  const featured = titles[0];
  return {
    featured,
    rails: rails.map((r) => ({
      id: r.id,
      title: r.title,
      items: r.items.map((id) => titles.find((t) => t.id === id)).filter(Boolean)
    }))
  };
}

export function getMockCatalog() {
  return {
    categories: [
      { id: "c1", name: "All Titles", items: titles },
      { id: "c2", name: "Action & Thriller", items: titles.filter((t) => t.genres.includes("Action")) },
      { id: "c3", name: "Drama & Sci‑Fi", items: titles.filter((t) => t.genres.includes("Sci‑Fi")) }
    ]
  };
}

export function getMockTitle(id) {
  return titles.find((t) => t.id === id) || null;
}

export function searchMock(query) {
  const q = (query || "").trim().toLowerCase();
  if (!q) return { results: [] };
  const results = titles.filter((t) => t.name.toLowerCase().includes(q));
  return { results };
}

export function getMockProfiles() {
  return { profiles, activeProfileId };
}

export function saveMockProfile(profile) {
  if (!profile?.name?.trim()) {
    throw new Error("Profile name is required.");
  }
  const trimmed = profile.name.trim();
  if (profile.id) {
    profiles = profiles.map((p) => (p.id === profile.id ? { ...p, ...profile, name: trimmed } : p));
  } else {
    const newProfile = {
      id: `p${Math.floor(Math.random() * 100000)}`,
      name: trimmed,
      maturity: profile.maturity || "All",
      color: profile.color || "#2563EB"
    };
    profiles = [...profiles, newProfile];
    activeProfileId = newProfile.id;
  }
  return { profiles, activeProfileId };
}

export function getMockSubscription() {
  return subscription;
}

export function changeMockPlan(planId) {
  const exists = subscription.plans.some((p) => p.id === planId);
  if (!exists) throw new Error("Unknown plan.");
  subscription = { ...subscription, currentPlanId: planId, status: "active" };
  return subscription;
}

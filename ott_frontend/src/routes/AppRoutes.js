import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "../screens/HomePage";
import CatalogPage from "../screens/CatalogPage";
import TitleDetailsPage from "../screens/TitleDetailsPage";
import PlaybackPage from "../screens/PlaybackPage";
import SearchPage from "../screens/SearchPage";
import ProfilesPage from "../screens/ProfilesPage";
import SubscriptionsPage from "../screens/SubscriptionsPage";
import NotFoundPage from "../screens/NotFoundPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/catalog" element={<CatalogPage />} />
      <Route path="/title/:id" element={<TitleDetailsPage />} />
      <Route path="/watch/:id" element={<PlaybackPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/profiles" element={<ProfilesPage />} />
      <Route path="/subscriptions" element={<SubscriptionsPage />} />
      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}

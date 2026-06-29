import React from "react";
import { ProfileProvider } from "./ProfileContext";
import { SubscriptionProvider } from "./SubscriptionContext";
import { ToastProvider } from "./ToastContext";

export function AppProviders({ children }) {
  return (
    <ToastProvider>
      <ProfileProvider>
        <SubscriptionProvider>{children}</SubscriptionProvider>
      </ProfileProvider>
    </ToastProvider>
  );
}

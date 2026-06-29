import React from "react";
import { useSubscription } from "../state/SubscriptionContext";
import Button from "../components/ui/Button";
import { ErrorBlock, LoadingBlock } from "../components/ui/StateBlocks";
import { useToast } from "../state/ToastContext";

function PlanCard({ plan, active, onSelect }) {
  return (
    <div className={active ? "planCard planCard--active" : "planCard"}>
      <div className="planCard__top">
        <div>
          <div className="planCard__name">{plan.name}</div>
          <div className="planCard__price">{plan.price}</div>
        </div>
        {active ? <div className="pill pill--active">Current</div> : <div className="pill">Available</div>}
      </div>
      <div className="planCard__details">
        <div className="kv">
          <div className="kv__k">Quality</div>
          <div className="kv__v">{plan.quality}</div>
        </div>
        <div className="kv">
          <div className="kv__k">Screens</div>
          <div className="kv__v">{plan.screens}</div>
        </div>
      </div>
      <div className="planCard__actions">
        <Button variant={active ? "secondary" : "primary"} disabled={active} onClick={onSelect}>
          {active ? "Selected" : "Choose plan"}
        </Button>
      </div>
    </div>
  );
}

export default function SubscriptionsPage() {
  const toast = useToast();
  const { loading, error, subscription, changePlan } = useSubscription();

  if (loading) return <LoadingBlock title="Loading subscription…" />;
  if (error) return <ErrorBlock title="Subscription unavailable" message={error} />;
  if (!subscription) return <ErrorBlock title="No subscription data" message="No subscription returned." />;

  const activePlanId = subscription.currentPlanId;

  const choose = async (planId) => {
    try {
      await changePlan(planId);
      toast.push({ type: "success", title: "Plan updated", message: "Your subscription plan has been changed." });
    } catch (e) {
      toast.push({ type: "error", title: "Could not change plan", message: e?.message || "Unknown error" });
    }
  };

  return (
    <div className="page">
      <div className="page__header">
        <h1 className="page__title">Subscription</h1>
        <div className="page__subtitle">Manage your plan and billing status.</div>
      </div>

      <div className="subSummary">
        <div className="panel">
          <div className="panel__title">Status</div>
          <div className="panel__body">
            <div className="kv">
              <div className="kv__k">Status</div>
              <div className="kv__v">
                <span className={subscription.status === "active" ? "pill pill--active" : "pill"}>{subscription.status}</span>
              </div>
            </div>
            <div className="kv">
              <div className="kv__k">Renewal</div>
              <div className="kv__v">{subscription.renewalDate}</div>
            </div>
            <div className="kv">
              <div className="kv__k">Payment</div>
              <div className="kv__v">{subscription.paymentMethod}</div>
            </div>
          </div>
        </div>

        <div className="panel">
          <div className="panel__title">Plans</div>
          <div className="panel__body">
            <div className="plansGrid">
              {(subscription.plans || []).map((p) => (
                <PlanCard key={p.id} plan={p} active={p.id === activePlanId} onSelect={() => choose(p.id)} />
              ))}
            </div>
            <div className="muted">
              Payments are UI-only in mock mode. Connect a billing provider (e.g. Stripe) when backend endpoints are available.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

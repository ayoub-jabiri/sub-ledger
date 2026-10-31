import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
    addSubscription,
    deleteSubscription,
    getSubscriptions,
    updateSubscription,
} from "../../store/slices/subscription.slice";
import type {
    Subscription,
    SubscriptionPayload,
} from "../../types/subscription.types";
import PageError from "../../components/global/PageError";
import AppHeader from "../../components/layout/AppHeader";
import SubscriptionsSummary from "../../components/subscriptions/SubscriptionsSummary";
import SubscriptionsToolbar from "../../components/subscriptions/SubscriptionsToolbar";
import SubscriptionsTable from "../../components/subscriptions/SubscriptionsTable";
import SubscriptionFormModal from "../../components/subscriptions/SubscriptionFormModal";

const emptyFormData: SubscriptionPayload = {
    name: "",
    price: 0,
    billingCycle: "monthly",
};

export default function SubscriptionsPage() {
    const { subscriptions, loading, error } = useAppSelector(
        (state) => state.subscription
    );
    const dispatch = useAppDispatch();

    const [search, setSearch] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSubscription, setEditingSubscription] =
        useState<Subscription | null>(null);
    const [formData, setFormData] =
        useState<SubscriptionPayload>(emptyFormData);

    useEffect(() => {
        dispatch(getSubscriptions());
    }, [dispatch]);

    const filteredSubscriptions = useMemo(
        () =>
            subscriptions.filter((subscription) =>
                subscription.name.toLowerCase().includes(search.toLowerCase())
            ),
        [subscriptions, search]
    );

    const monthlyTotal = useMemo(
        () =>
            subscriptions.reduce(
                (total, subscription) =>
                    total +
                    (subscription.billingCycle === "yearly"
                        ? subscription.price / 12
                        : subscription.price),
                0
            ),
        [subscriptions]
    );

    function openAddModal() {
        setEditingSubscription(null);
        setFormData(emptyFormData);
        setIsModalOpen(true);
    }

    function openEditModal(subscription: Subscription) {
        setEditingSubscription(subscription);
        setFormData({
            name: subscription.name,
            price: subscription.price,
            billingCycle: subscription.billingCycle,
        });
        setIsModalOpen(true);
    }

    function closeModal() {
        setIsModalOpen(false);
        setEditingSubscription(null);
        setFormData(emptyFormData);
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (editingSubscription) {
            await dispatch(
                updateSubscription({
                    id: editingSubscription._id,
                    subscriptionData: formData,
                })
            );
        } else {
            await dispatch(addSubscription(formData));
        }

        closeModal();
    }

    function handleDelete(id: string) {
        dispatch(deleteSubscription(id));
    }

    if (error) {
        return (
            <PageError message={error.message} statusCode={error.statusCode} />
        );
    }

    return (
        <div className="min-h-screen bg-[#F7F7FA] text-[#171A2B]">
            <AppHeader
                eyebrow="Workspace / Subscriptions"
                title="Subscriptions"
                action={{ label: "Add subscription", onClick: openAddModal }}
            />

            <div className="space-y-5 p-6 lg:p-8">
                <SubscriptionsSummary
                    subscriptionCount={subscriptions.length}
                    monthlyTotal={monthlyTotal}
                />

                <div className="rounded-xl border border-[#E8E8F0] bg-white">
                    <SubscriptionsToolbar
                        search={search}
                        onSearchChange={setSearch}
                        onAddClick={openAddModal}
                    />
                    <SubscriptionsTable
                        subscriptions={filteredSubscriptions}
                        totalCount={subscriptions.length}
                        monthlyTotal={monthlyTotal}
                        loading={loading}
                        onEdit={openEditModal}
                        onDelete={handleDelete}
                    />
                </div>
            </div>

            {isModalOpen && (
                <SubscriptionFormModal
                    isEditing={Boolean(editingSubscription)}
                    loading={loading}
                    formData={formData}
                    onChange={setFormData}
                    onSubmit={handleSubmit}
                    onClose={closeModal}
                />
            )}
        </div>
    );
}

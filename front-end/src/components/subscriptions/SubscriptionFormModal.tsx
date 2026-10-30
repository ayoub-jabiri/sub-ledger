import { X } from "lucide-react";
import SubmitButton from "../global/SubmitButton";
import type {
    BillingCycle,
    SubscriptionPayload,
} from "../../types/subscription.types";

const inputClass =
    "block h-10 w-full rounded-lg border border-[#E4E7EF] bg-white px-3.5 text-sm text-[#171A2B] " +
    "focus:outline-none focus:border-[#7255D8] focus:ring-[3px] focus:ring-[#7255D8]/25";

interface SubscriptionFormModalProps {
    isEditing: boolean;
    loading: boolean;
    formData: SubscriptionPayload;
    onChange: (formData: SubscriptionPayload) => void;
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
    onClose: () => void;
}

export default function SubscriptionFormModal({
    isEditing,
    loading,
    formData,
    onChange,
    onSubmit,
    onClose,
}: SubscriptionFormModalProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 px-4">
            <div className="w-full max-w-md rounded-xl bg-white p-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold">
                        {isEditing ? "Edit subscription" : "Add subscription"}
                    </h2>
                    <button onClick={onClose} className="text-[#8A8FA8]">
                        <X size={18} />
                    </button>
                </div>
                <form className="mt-5 space-y-4" onSubmit={onSubmit}>
                    <div>
                        <label className="mb-1.5 block text-sm font-semibold">Service name</label>
                        <input
                            className={inputClass}
                            placeholder="e.g. Netflix"
                            value={formData.name}
                            onChange={(e) =>
                                onChange({ ...formData, name: e.target.value })
                            }
                            required
                        />
                    </div>
                    <div>
                        <label className="mb-1.5 block text-sm font-semibold">Price</label>
                        <input
                            type="number"
                            min={1}
                            step="0.01"
                            className={inputClass}
                            placeholder="e.g. 14.99"
                            value={formData.price}
                            onChange={(e) =>
                                onChange({
                                    ...formData,
                                    price: Number(e.target.value),
                                })
                            }
                            required
                        />
                    </div>
                    <div>
                        <label className="mb-1.5 block text-sm font-semibold">Billing cycle</label>
                        <select
                            className={inputClass}
                            value={formData.billingCycle}
                            onChange={(e) =>
                                onChange({
                                    ...formData,
                                    billingCycle: e.target.value as BillingCycle,
                                })
                            }
                        >
                            <option value="monthly">Monthly</option>
                            <option value="yearly">Yearly</option>
                        </select>
                    </div>
                    <SubmitButton
                        loading={loading}
                        formError={false}
                        label={isEditing ? "Save changes" : "Add subscription"}
                        loadingLabel={isEditing ? "Saving" : "Adding"}
                    />
                </form>
            </div>
        </div>
    );
}

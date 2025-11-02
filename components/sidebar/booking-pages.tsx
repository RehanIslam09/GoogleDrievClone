import { Plus } from "lucide-react";

export default function BookingPages() {
  return (
    <div className="mb-4 px-2">
      <button className="flex w-full items-center justify-between rounded px-3 py-2 text-[14px] font-medium text-[#3c4043] transition-colors hover:bg-[#f1f3f4]">
        <span>Booking pages</span>
        <Plus className="h-4 w-4 text-[#5f6368]" />
      </button>
    </div>
  );
}

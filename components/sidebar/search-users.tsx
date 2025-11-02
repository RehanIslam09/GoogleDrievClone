import { HiOutlineUsers } from "react-icons/hi";
import { Input } from "../ui/input";

export default function SearchUsers() {
  return (
    <div className="mb-5 px-2">
      <h3 className="mb-2 px-1 text-[14px] font-medium text-[#3c4043]">Meet with...</h3>
      <div className="relative">
        <HiOutlineUsers className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#5f6368]" />
        <Input
          type="search"
          placeholder="Search for people"
          className="h-12 w-full rounded-lg border-0 bg-[#f1f3f4] pl-10 text-[14px] text-[#5f6368] placeholder:text-[#5f6368] transition-colors hover:bg-[#e8eaed] focus-visible:bg-white focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#1a73e8] focus-visible:ring-offset-0"
        />
      </div>
    </div>
  );
}

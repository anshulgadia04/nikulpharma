import * as Select from "@radix-ui/react-select";
import { ChevronDown } from "lucide-react";

export default function FilterSelect({ value, onChange, options }) {
  return (
    <Select.Root value={value} onValueChange={onChange}>
      <Select.Trigger
        className="
          w-full
          flex items-center justify-between
          px-3 sm:px-4 py-2.5 sm:py-3
          text-sm sm:text-base
          bg-white
          border border-gray-200
          rounded-xl
          focus:outline-none
          focus:ring-2 focus:ring-gray-300
          hover:border-gray-300
          transition-colors
        "
      >
        <Select.Value />
        <Select.Icon>
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          className="
            z-50
            w-[var(--radix-select-trigger-width)]
            max-w-[95vw]
            bg-white
            border border-gray-200
            rounded-xl
            shadow-lg
            overflow-hidden
          "
          position="popper"
          sideOffset={5}
        >
          <Select.Viewport className="p-1 max-h-64 overflow-y-auto">
            {options.map(opt => (
              <Select.Item
                key={opt.value}
                value={opt.value}
                className="
                  px-3 py-2
                  text-sm sm:text-base
                  rounded-lg
                  cursor-pointer
                  truncate
                  outline-none
                  hover:bg-gray-100
                  focus:bg-gray-100
                  data-[state=checked]:bg-gray-100
                  data-[state=checked]:font-medium
                  transition-colors
                "
              >
                <Select.ItemText>{opt.label}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}

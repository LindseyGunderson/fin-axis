import { ArrowRight } from "lucide-react";

type ViewAllButtonProps = {
  onClick?: () => void;
};

function ViewAllButton({ onClick }: ViewAllButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        group
        inline-flex
        shrink-0
        items-center
        gap-1.5
        rounded-md
        border
        border-brand-900
        bg-brand-900
        px-3
        py-1.5
        text-sm
        font-medium
        text-white
        transition-colors
        hover:bg-transparent
        hover:text-brand-900
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-brand-900/30
        focus-visible:ring-offset-2
      "
    >
      View all
      <ArrowRight
        className="
          size-4
          transition-transform
          group-hover:translate-x-0.5
        "
      />
    </button>
  );
}

export default ViewAllButton;

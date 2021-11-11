import { useEffect } from "react";
import { useScroller } from "../utils/scroller";

export default function useOnEntryChagneEffect(onEntryChange: (entryName: string) => void) {
    const scroller = useScroller();

    useEffect(
        function updateActiveTargetOnScroll() {
            scroller.addSelectedEntryListener(onEntryChange);
            return () => scroller.removeSelecttedEntryListener(onEntryChange);
        },
        [scroller, onEntryChange]
    );
}

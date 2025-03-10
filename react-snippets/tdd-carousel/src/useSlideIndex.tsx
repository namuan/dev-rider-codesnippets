import {useCallback, useRef, useState} from "react";
import {useTimeout} from "./useTimeout.tsx";

const decrement =
    (numberOfSlides: number) => (i: number) => (i + numberOfSlides - 1) % numberOfSlides;

const increment =
    (numberOfSlides: number) => (i: number) => (i + 1) % numberOfSlides;

export const useSlideIndex = (
    slides?: unknown[], slideIndexProp?: number, onSlideIndexChange?: (newSlideNumber: number) => void, autoAdvanceInterval?: number) => {
    const [slideIndexState, setSlideIndexState] = useState(0);

    const slideIndex = slideIndexProp ?? slideIndexState;

    const decrementSlideIndex = () => {
        if (!slides) return;
        setSlideIndexState(decrement(slides.length));
        onSlideIndexChange?.(decrement(slides.length)(slideIndex));
    }

    const onSlideIndexChangeRef = useRef(onSlideIndexChange);
    onSlideIndexChangeRef.current = onSlideIndexChange;

    const incrementSlideIndex = useCallback(() => {
        if (!slides?.length) return;
        setSlideIndexState(increment(slides.length));
        onSlideIndexChangeRef.current?.(increment(slides.length)(slideIndex))
    }, [slides?.length, slideIndex])

    useTimeout(autoAdvanceInterval, incrementSlideIndex);

    return [slideIndex, decrementSlideIndex, incrementSlideIndex] as const;
}

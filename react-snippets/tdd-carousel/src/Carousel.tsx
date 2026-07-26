import {ReactNode} from "react";
import CarouselSlide, {CarouselStyleProp} from "./CarouselSlide.tsx";
import CarouselButton from "./CarouselButton.tsx";
import {useSlideIndex} from "./useSlideIndex.tsx";
import styled from "styled-components";

type Slide = {
    imgUrl?: string,
    description?: ReactNode,
    attribution?: ReactNode
}

type CarouselProps = {
    slides?: Slide[],
    slideIndexProp?: number,
    onSlideIndexChange?: (newSlideNumber: number) => void,
    autoAdvanceInterval?: number,
    defaultImgHeight?: CarouselStyleProp["imgHeight"]
};

const Carousel = (
    {
        slides,
        slideIndexProp,
        onSlideIndexChange,
        autoAdvanceInterval,
        defaultImgHeight,
    }: CarouselProps
) => {
    const [slideIndex, decrementSlideIndex, incrementSlideIndex] = useSlideIndex(
        slides, slideIndexProp, onSlideIndexChange, autoAdvanceInterval);

    return (
        <div data-testid="carousel">
            <CarouselSlide imgHeight={defaultImgHeight} {...slides?.[slideIndex]} />
            <CarouselButton
                data-testid={"prev-button"}
                onClick={decrementSlideIndex}
            >Previous</CarouselButton>

            <CarouselButton
                data-testid={"next-button"}
                onClick={incrementSlideIndex}
            >Next</CarouselButton>
            <FixedFooter>Blah</FixedFooter>
        </div>
    );
};

const FixedFooter = styled.div `
    
`

export default Carousel;

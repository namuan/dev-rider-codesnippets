import {ComponentPropsWithRef, ReactNode} from "react";
import styled from "styled-components";

const DEFAULT_IMAGE_HEIGHT = 500;

export type CarouselStyleProp = {
    imgUrl?: string,
    imgHeight?: string | number,
    description?: ReactNode,
    attribution?: ReactNode
} & ComponentPropsWithRef<"figure">;

type ImageComponentProps = {
    $height?: CarouselStyleProp["imgHeight"]
}

const ScaledImg = styled.img<ImageComponentProps>`
    object-fit: cover;
    width: 100%;
    height: ${(props) => {
        return typeof props.$height === "number" ? `${props.$height}px` : props.$height;
    }};
`;

const CarouselSlide = (
    {
        imgUrl,
        imgHeight = DEFAULT_IMAGE_HEIGHT,
        description,
        attribution,
        ...rest
    }: CarouselStyleProp
) => (
    <figure {...rest}>
        <ScaledImg src={imgUrl} alt={"something"} height={imgHeight}/>
        <figcaption data-testid="caption">
            <strong>{description}</strong> {attribution}
        </figcaption>
    </figure>
);

export default CarouselSlide;

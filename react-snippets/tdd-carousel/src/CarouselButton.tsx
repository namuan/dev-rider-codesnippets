import {ComponentPropsWithRef} from "react";

const CarouselButton = (props: ComponentPropsWithRef<"button">) => (
    <button {...props} />
);

export default CarouselButton;

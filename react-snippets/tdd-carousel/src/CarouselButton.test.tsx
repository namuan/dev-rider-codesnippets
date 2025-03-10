import {render, screen} from "@testing-library/react";
import CarouselButton from "./CarouselButton";
import {describe, expect, it} from "vitest";

describe('CarouselButton', () => {
    it('should render a button', () => {
        render(<CarouselButton/>);
        expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it('should render button with text', () => {
        const text = "Hello";
        render(<CarouselButton>{text}</CarouselButton>)
        expect(screen.getByRole("button")).toHaveTextContent("Hello");
    });

    it('should pass other properties to the button', () => {
        const className = "my-carousel-button";
        const dataAction = "prev";

        render(<CarouselButton className={className} data-action={dataAction} >Button Text</CarouselButton>)

        expect(screen.getByRole("button")).toHaveClass(className)
        expect(screen.getByRole("button")).toHaveAttribute("data-action", dataAction)
    });
});

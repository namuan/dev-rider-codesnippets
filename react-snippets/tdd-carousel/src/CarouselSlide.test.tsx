import {render, screen} from "@testing-library/react";
import {describe, it, expect} from "vitest";
import CarouselSlide from "./CarouselSlide.tsx";

describe('CarouselSlide', () => {
    it('should render', () => {
        render(<CarouselSlide />)
        expect(screen.getByRole("figure")).toBeInTheDocument();
    });

    it('should render an img and figcaption', () => {
        render(<CarouselSlide />)
        const figure = screen.getByRole("figure");
        const img = screen.getByRole("img");
        const figcaption = screen.getByTestId("caption");

        expect(figure).toContainElement(img);
        expect(figure).toContainElement(figcaption);
    });

    it('should pass imgUrl to img', () => {
        const imgUrl = "https://example.com/image.png";
        render(<CarouselSlide imgUrl={imgUrl} />)
        const img = screen.getByRole("img");
        expect(img).toHaveAttribute("src", imgUrl);
    });

    it('should use description and attribution for figure caption', () => {
        const description = "Some image";
        const attribution = "John Doe";
        const props = {description, attribution};

        render(<CarouselSlide {...props} />);
        const figCaption = screen.getByTestId("caption");
        expect(figCaption).toHaveTextContent(
            `${props.description} ${props.attribution}`
        );
    });

    it('should pass other properties to figure', () => {
        const props = {
            className: "my-slides",
            "data-test-name": "my-slides"
        }
        render(<CarouselSlide {...props} />)
        const figure = screen.getByRole("figure");
        expect(figure).toHaveClass(props.className);
        expect(figure).toHaveAttribute("data-test-name", props["data-test-name"])
    });

    it('should match snapshot', () => {
        render(<CarouselSlide />)
        expect(screen.getByRole("figure")).toMatchSnapshot()
    });
});

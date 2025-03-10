import {act, render, screen} from "@testing-library/react";
import {beforeEach, describe, expect, it, vi} from "vitest";
import Carousel from "./Carousel.tsx";
import {userEvent} from "@testing-library/user-event";

describe('Carousel', () => {
    const slides = [
        {
            imgUrl: "https://example.com/image1.png",
            description: "Image 1 Description",
            attribution: "Image1"
        },
        {
            imgUrl: "https://example.com/image2.png",
            description: "Image 2 Description",
            attribution: "Image2"
        }
    ];

    it('should render', () => {
        render(<Carousel/>)
        expect(screen.getByTestId("carousel")).toBeInTheDocument();
    });

    it('should display the first slide', () => {
        render(<Carousel slides={slides}/>)
        const slideImage = screen.getByRole("img");
        expect(slideImage).toHaveAttribute(
            "src",
            slides[0].imgUrl
        )
    });

    it('should advance the slide when the Next button is clicked', async () => {
        render(<Carousel slides={slides}/>);
        const img = screen.getByRole("img");
        const user = userEvent.setup();

        const nextButton = screen.getByTestId("next-button");
        await user.click(nextButton);
        expect(img).toHaveAttribute("src", slides[1].imgUrl);

        // Recycle slides (Back to first slide)
        await user.click(nextButton);
        expect(img).toHaveAttribute("src", slides[0].imgUrl);
    });

    it('should reverse the slides when previous button is clicked', async () => {
        render(<Carousel slides={slides}/>);
        const img = screen.getByRole("img");
        const user = userEvent.setup();

        const prevButton = screen.getByTestId("prev-button");
        await user.click(prevButton);
        expect(img).toHaveAttribute("src", slides[1].imgUrl);

        await user.click(prevButton);
        expect(img).toHaveAttribute("src", slides[0].imgUrl);

        // Recycle slides (Back to last slide)
        await user.click(prevButton);
        expect(img).toHaveAttribute("src", slides[1].imgUrl);
    });

    describe('with controlled slide index', () => {
        const onSlideIndexChange = vi.fn();

        const renderWithSlideIndex = () => render(<Carousel
            slides={slides}
            slideIndexProp={1}
            onSlideIndexChange={onSlideIndexChange}/>);

        beforeEach(() => {
            onSlideIndexChange.mockReset();
        })

        it('should show the correct slide', () => {
            renderWithSlideIndex()

            expect(screen.getByRole("img")).toHaveAttribute(
                "src",
                slides[1].imgUrl
            )
        });

        it('should call onSlideIndexChange when prev button is clicked', async () => {
            renderWithSlideIndex()

            const prevButton = screen.getByTestId("prev-button");
            const user = userEvent.setup();
            await user.click(prevButton)

            expect(onSlideIndexChange).toHaveBeenCalledWith(0);
        });

        it('should call onSlideIndexChange when next button is clicked', async () => {
            renderWithSlideIndex()

            const nextButton = screen.getByTestId("next-button");
            const user = userEvent.setup();
            await user.click(nextButton);

            expect(onSlideIndexChange).toHaveBeenCalledWith(0)
        });
    });

    describe('with auto advance', () => {
        it('should automatically advance the slide', () => {
            const autoAdvanceInterval = 5_000;
            render(
                <Carousel
                    slides={slides}
                    autoAdvanceInterval={autoAdvanceInterval}
                />
            );

            const image = screen.getByRole("img");
            expect(image).toHaveAttribute(
                "src",
                slides[0].imgUrl
            );

            act(() => {
                vi.advanceTimersByTime(autoAdvanceInterval);
            });

            expect(image).toHaveAttribute(
                "src",
                slides[1].imgUrl
            )
        });

        it('should not reset the auto-advance timer on re-render', () => {
            const autoAdvancedInterval = 5_000;
            const {rerender} = render(
                <Carousel
                    slides={slides}
                    autoAdvanceInterval={autoAdvancedInterval}
                />
            );
            const img = screen.getByRole("img");
            expect(img).toHaveAttribute(
                "src",
                slides[0].imgUrl
            )

            act(() => {
                vi.advanceTimersByTime(autoAdvancedInterval - 1);
            })

            expect(img).toHaveAttribute(
                "src",
                slides[0].imgUrl
            );

            rerender(
                <Carousel
                    slides={slides}
                    autoAdvanceInterval={autoAdvancedInterval}
                />
            )

            act(() => {
                vi.advanceTimersByTime(1);
            })

            expect(img).toHaveAttribute(
                "src",
                slides[1].imgUrl
            )
        });
    });
});

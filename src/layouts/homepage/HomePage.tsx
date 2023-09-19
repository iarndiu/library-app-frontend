import { Carousel } from "./components/Carousel";
import { ExploreTopBooks } from "./components/ExploreTopBooks";
import { Hero } from "./components/Hero";
import { LibraryServices } from "./components/LibraryServices";

export const Homepage = () => {
    return (
        <>
            <ExploreTopBooks />
            <Carousel />
            <Hero />
            <LibraryServices />
        </>
    );
}
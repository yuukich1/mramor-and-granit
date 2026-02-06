import { About } from "@/components/about/about";
import { CallbackSection } from "@/components/about/callback/callbackSection";
import { UsServices } from "@/components/about/usServices";
import { Examples } from "@/components/examples/examples";
import { Hero } from "@/components/main/hero";
import { ReviewsAndMap } from "@/components/map/map";
import { ProductsSection } from "@/components/products/productSection";


export default function Home() {
    return (
        <>
            <Hero />
            <ProductsSection />
            <UsServices />
            <Examples />
            <About />
            <CallbackSection />
            <ReviewsAndMap />
        </>
    );
}

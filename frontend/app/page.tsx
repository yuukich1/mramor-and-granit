import { About } from "@/components/about/about";
import { CallbackSection } from "@/components/about/callback/callbackSection";
import { UsServices } from "@/components/about/usServices";
import { Examples } from "@/components/examples/examples";
import { Hero } from "@/components/main/hero";
import { ReviewsAndMap } from "@/components/map/map";
import { ProductsSection } from "@/components/products/productSection";

 const TelegramIcon = () => (
    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.223-.548.223l.188-2.85 5.18-4.68c.223-.198-.054-.308-.346-.11l-6.4 4.03-2.76-.918c-.6-.187-.612-.6.125-.89l10.782-4.156c.5-.18.943.12.78.89z"/>
    </svg>
  );

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

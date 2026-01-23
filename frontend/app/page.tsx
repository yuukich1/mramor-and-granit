import { About } from "@/components/about/about";
import { UsServices } from "@/components/about/usServices";
import { Hero } from "@/components/main/hero";
import { ReviewsAndMap } from "@/components/map/map";

export default function Home() {
  return (
    <>
      <Hero />
      <UsServices />
      <About />
      <ReviewsAndMap />

    </>
  );
}

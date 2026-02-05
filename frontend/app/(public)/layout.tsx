import { Header } from "@/components/header/navbar";
import { Footer } from "@/components/footer/footer";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
        {children}
      <Footer />
    </>
  );
}
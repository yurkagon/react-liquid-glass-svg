import { Examples } from '@/sections/Examples';
import { Footer } from '@/sections/Footer';
import { Header } from '@/sections/Header';
import { Hero } from '@/sections/Hero';
import { Sandbox } from '@/sections/Sandbox';

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Examples />
        <Sandbox />
      </main>
      <Footer />
    </>
  );
}

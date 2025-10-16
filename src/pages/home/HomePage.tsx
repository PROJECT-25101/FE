import Banner from "./components/Banner";
import BookingSection from "./components/BookingSection";
import IntroduceSection from "./components/IntroduceSection";
import QuantitySection from "./components/QuantitySection";
import RoadSection from "./components/RoadSection";
import ServicesSection from "./components/ServicesSection";

const HomePage = () => {
  return (
    <>
      <section>
        <Banner />
      </section>
      <section id="booking">
        <BookingSection />
      </section>
      <section>
        <IntroduceSection />
      </section>
      <section>
        <RoadSection />
      </section>
      <section>
        <QuantitySection />
      </section>
      <section>
        <ServicesSection />
      </section>
    </>
  );
};

export default HomePage;

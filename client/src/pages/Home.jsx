import Banner from "../components/Banner";
import Cta from "../components/CTA";
import ContactSection from "../components/ContactSection";
import ValueSection from "../components/ValueSection";
import SliderContainer from "../components/SliderContainer";

const Home = () => {
  return (
    <>
      <Banner />
      <SliderContainer />
      <ValueSection />
      <ContactSection />
      <Cta />
    </>
  );
};

export default Home;

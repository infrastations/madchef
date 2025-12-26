import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BrandStory from "@/components/BrandStory";
import MenuSection from "@/components/MenuSection";
import OutletsSection from "@/components/OutletsSection";
import ReviewsSection from "@/components/ReviewsSection";
import EventsSection from "@/components/EventsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Madchef - Best Gourmet Burgers in Dhaka | Once You Go MAD, You Never Go BACK!</title>
        <meta
          name="description"
          content="Experience the MAD combination of secret sauces & recipes at Madchef - Dhaka's premier gourmet burger destination since 2014. 9 locations, 100% halal, made fresh to order."
        />
        <meta
          name="keywords"
          content="Madchef, burgers Dhaka, gourmet burgers, halal burgers, best burgers Bangladesh, Madchef menu, burger restaurant Dhaka"
        />
        <meta property="og:title" content="Madchef - Best Gourmet Burgers in Dhaka" />
        <meta
          property="og:description"
          content="Once you go MAD, you never go BACK! Experience the best gourmet burgers in Dhaka since 2014."
        />
        <meta property="og:type" content="restaurant" />
        <link rel="canonical" href="https://madchef.com.bd" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <Hero />
          <BrandStory />
          <MenuSection />
          <OutletsSection />
          <ReviewsSection />
          <EventsSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;

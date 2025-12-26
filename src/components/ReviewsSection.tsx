import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";
import { reviews } from "@/data/reviewsData";
import { useState } from "react";

const ReviewsSection = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const reviewsPerPage = 6;
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // Auto-rotate reviews every 6 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPage((prev) => (prev + 1) % totalPages);
    }, 6000);
    return () => clearInterval(interval);
  }, [totalPages]);

  const displayedReviews = reviews.slice(
    currentPage * reviewsPerPage,
    (currentPage + 1) * reviewsPerPage
  );

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <section id="reviews" className="py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-dark" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-secondary font-semibold uppercase tracking-widest text-sm">
            Customer Love
          </span>
          <h2 className="font-bebas text-5xl md:text-7xl mt-4 mb-6">
            <span className="fire-text">MAD</span>{" "}
            <span className="text-foreground">Reviews</span>
          </h2>
          <p className="text-foreground/60 max-w-xl mx-auto">
            See what our customers are saying about their MAD experience
          </p>
        </motion.div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {displayedReviews.map((review, index) => (
            <motion.div
              key={`${review.id}-${currentPage}`}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 * index }}
              className="glass-dark p-6 rounded-2xl hover-fire group relative"
            >
              {/* Quote Icon */}
              <Quote className="absolute top-4 right-4 text-primary/20 group-hover:text-primary/40 transition-colors" size={32} />

              {/* Header */}
              <div className="flex items-center gap-4 mb-4">
                {/* Avatar */}
                <div
                  className={`w-12 h-12 rounded-full bg-gradient-to-br ${review.avatar_color} flex items-center justify-center text-foreground font-bold text-lg`}
                >
                  {review.reviewer_name.charAt(0)}
                </div>
                <div className="flex-1">
                  <h4 className="text-foreground font-semibold">{review.reviewer_name}</h4>
                  <p className="text-foreground/50 text-sm">{review.branch_name}</p>
                </div>
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={i < review.rating ? "text-secondary fill-secondary" : "text-muted"}
                  />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-foreground/70 text-sm leading-relaxed mb-4">
                "{review.review_text}"
              </p>

              {/* Date */}
              <p className="text-foreground/40 text-xs">{formatDate(review.date)}</p>
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="flex justify-center items-center gap-4"
        >
          <button
            onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
            disabled={currentPage === 0}
            className="p-3 glass-dark rounded-full disabled:opacity-30 hover:bg-primary/20 transition-colors"
          >
            <ChevronLeft size={20} className="text-foreground" />
          </button>

          <div className="flex gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i)}
                className={`w-3 h-3 rounded-full transition-all ${
                  i === currentPage
                    ? "bg-primary w-8"
                    : "bg-foreground/30 hover:bg-foreground/50"
                }`}
              />
            ))}
          </div>

          <button
            onClick={() => setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1))}
            disabled={currentPage === totalPages - 1}
            className="p-3 glass-dark rounded-full disabled:opacity-30 hover:bg-primary/20 transition-colors"
          >
            <ChevronRight size={20} className="text-foreground" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default ReviewsSection;

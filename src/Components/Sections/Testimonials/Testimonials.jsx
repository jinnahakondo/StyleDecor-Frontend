import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import SectionTitle from "../../SectionTitle";

const Testimonials = () => {

    const testimonials = [
        {
            id: 1,
            rating: 4.5,
            review:
                "আমাদের বাসার ইভেন্ট ডেকোরেশন StyleDecor টিম যেভাবে হ্যান্ডেল করেছে, তা সত্যিই অসাধারণ। সময়মতো কাজ শেষ করেছে এবং ডিজাইন একদম আমাদের পছন্দ অনুযায়ী ছিল। অতিথিরাও অনেক প্রশংসা করেছে।",
            name: "Md. Asaduzzaman",
            role: "Home Event Client",
            company: "Dhaka",
            image: "https://i.ibb.co/5Y3mZtq/user1.png",
        },
        {
            id: 2,
            rating: 5,
            review:
                "আমাদের ওয়েডিং ডেকোরেশন নিয়ে অনেক চিন্তায় ছিলাম, কিন্তু StyleDecor পুরো দায়িত্ব নিয়ে কাজ করেছে। কালার কম্বিনেশন থেকে শুরু করে লাইটিং—সবকিছু পারফেক্ট ছিল।",
            name: "Nusrat Jahan",
            role: "Wedding Client",
            company: "Chattogram",
            image: "https://i.ibb.co/ZV0K4jP/user2.png",
        },
        {
            id: 3,
            rating: 4,
            review:
                "অফিস সেমিনারের জন্য ডেকোরেশন দরকার ছিল খুব অল্প সময়ের মধ্যে। StyleDecor টিম খুব প্রফেশনালভাবে সব ম্যানেজ করেছে।",
            name: "Tanvir Ahmed",
            role: "Office Manager",
            company: "Tech Solution Ltd.",
            image: "https://i.ibb.co/7QmZ1JH/user3.png",
        },
        {
            id: 4,
            rating: 4.5,
            review:
                "মিটিং ও কর্পোরেট ইভেন্টের জন্য আমরা নিয়মিত StyleDecor এর সার্ভিস নেই। তাদের কাজের মান ও সাপোর্ট সত্যিই প্রশংসার যোগ্য।",
            name: "Sharmin Akter",
            role: "Corporate Client",
            company: "Business Network",
            image: "https://i.ibb.co/Xb1fK8P/user4.png",
        },

        // ➕ New testimonials
        {
            id: 5,
            rating: 5,
            review:
                "আমাদের এনগেজমেন্ট ইভেন্টের ডেকোরেশন এক কথায় অসাধারণ ছিল। স্টেজ ডিজাইন আর ফুলের কাজ দেখে সবাই অবাক হয়ে গিয়েছিল।",
            name: "Rafiul Islam",
            role: "Engagement Client",
            company: "Narayanganj",
            image: "https://i.ibb.co/QMZ9dS1/user5.png",
        },
        {
            id: 6,
            rating: 4.5,
            review:
                "কর্পোরেট প্রেজেন্টেশন ও মিটিং সেটআপের জন্য StyleDecor খুব সুন্দর ও ক্লিন ডিজাইন দিয়েছে। আমাদের ক্লায়েন্টরা খুব সন্তুষ্ট ছিল।",
            name: "Sadia Rahman",
            role: "Business Executive",
            company: "Smart Solutions",
            image: "https://i.ibb.co/Y7pZQ7N/user6.png",
        },
        {
            id: 7,
            rating: 4,
            review:
                "অফিস পার্টির জন্য বাজেটের মধ্যে সুন্দর ডেকোরেশন পেয়েছি। টিমের ব্যবহার খুব ভালো এবং কাজও সময়মতো শেষ করেছে।",
            name: "Imran Hossain",
            role: "Office Event Client",
            company: "Creative Agency",
            image: "https://i.ibb.co/1G9JZ0H/user7.png",
        },
        {
            id: 8,
            rating: 5,
            review:
                "আমাদের রিসেপশন প্রোগ্রামের ডেকোরেশন একদম স্বপ্নের মতো ছিল। StyleDecor টিম পুরো ইভেন্টটা খুব সুন্দরভাবে সাজিয়েছে।",
            name: "Farhana Akter",
            role: "Reception Client",
            company: "Gazipur",
            image: "https://i.ibb.co/8sN0cRr/user8.png",
        },
    ];

    const renderStars = (rating) => {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

        return (
            <>
                {[...Array(fullStars)].map((_, i) => (
                    <FaStar key={`full-${i}`} className="text-yellow-400" />
                ))}

                {hasHalfStar && (
                    <FaStarHalfAlt className="text-yellow-400" />
                )}

                {[...Array(emptyStars)].map((_, i) => (
                    <FaRegStar key={`empty-${i}`} className="text-gray-300" />
                ))}
            </>
        );
    };

    return (
        <section className="py-20">
            <SectionTitle>What our customer says</SectionTitle>
            <Swiper
                modules={[Autoplay]}
                spaceBetween={24}
                autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                }}
                loop
                breakpoints={{
                    0: { slidesPerView: 1 },
                    640: { slidesPerView: 2 },
                    768: { slidesPerView: 3 },
                    1024: { slidesPerView: 4 },
                }}
            >
                {testimonials.map((t) => (
                    <SwiperSlide key={t.id}>
                        <div className="h-full min-h-[270px] rounded-2xl bg-base-200 p-6 shadow-md flex flex-col">

                            {/* Quote */}
                            <div className="text-4xl font-bold text-primary/20 mb-2">“</div>

                            {/* Rating */}
                            <div className="flex items-center gap-1 mb-3">
                                {renderStars(t.rating)}
                            </div>

                            {/* Review */}
                            <p className="text-sm text-gray-600 dark:text-gray-300 flex-1">
                                {t.review.length > 120
                                    ? `${t.review.slice(0, 120)}...`
                                    : t.review}
                            </p>

                            {/* User */}
                            <div className="flex items-center gap-3 mt-5">
                                <img
                                    src={t.image}
                                    alt={t.name}
                                    className="h-11 w-11 rounded-full object-cover"
                                />
                                <div>
                                    <h4 className="font-semibold text-sm">{t.name}</h4>
                                    <p className="text-xs text-gray-500">{t.role}</p>
                                    <p className="text-xs text-gray-400">{t.company}</p>
                                </div>
                            </div>

                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
};

export default Testimonials;

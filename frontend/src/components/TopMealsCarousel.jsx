import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const carouselItems = [
    { id: 1, img: "https://plus.unsplash.com/premium_photo-1669742928007-71b99d6ab1dd?w=500", title: 'Chicken Wings' },
    { id: 2, img: "https://images.unsplash.com/photo-1622001618569-eae18fee3a1a?w=500", title: 'Fish Fillet' },
    { id: 3, img: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=500", title: 'Burger' },
    { id: 4, img: "https://images.unsplash.com/photo-1565976469782-7c92daebc42e?w=500", title: 'Peas with Salad' },
    { id: 5, img: "https://images.unsplash.com/photo-1605888969139-42cca4308aa2?w=500", title: 'Delicious Noodles' },
    { id: 6, img: "https://images.unsplash.com/photo-1588315029754-2dd089d39a1a?w=500", title: 'Hot Pizza' },
];

const TopMealsCarousel = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            { breakpoint: 1624, settings: { slidesToShow: 4 } },
            { breakpoint: 1124, settings: { slidesToShow: 3 } },
            { breakpoint: 600, settings: { slidesToShow: 2 } },
            { breakpoint: 480, settings: { slidesToShow: 1 } }
        ]
    };

    return (
        <Slider {...settings} className=' w-full'>
            {
                carouselItems.map(item => (
                    <TopMealItem key={item.id} item={item} />
                ))
            }
        </Slider>
    );
};

const TopMealItem = ({ item }) => {
    return (
        <div className='flex flex-col items-center justify-center'>
            <div className='w-[10rem] h-[10rem] lg:h-[14rem] lg:w-[14rem] rounded-full overflow-hidden'>
                <img className='w-full h-full object-cover' src={item.img} alt={item.title} />
            </div>
            <span className=' py-4 font-semibold text-md text-center'>{item.title}</span>
        </div>
    );
};

export default TopMealsCarousel;

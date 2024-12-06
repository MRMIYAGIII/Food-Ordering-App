import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import PizzaImg from '../assests/transparent-pizza.png';
import NoodlesImg from '../assests/noodles.png';
import RoastChickenImg from '../assests/chicken.png';

const carouselItems = [
    { id: 1, img: PizzaImg, title: 'Hot Pizza', description: 'Fresh out of the oven, hot pizza boasts a crispy crust, melty cheese, and delicious toppings—satisfying every craving with every bite.' },
    { id: 2, img: NoodlesImg, title: 'Delicious Noodles', description: 'Delicious noodles, perfectly cooked and tossed in savory sauce, offer a satisfying blend of flavors in every bite.' },
    { id: 3, img: RoastChickenImg, title: 'Roast Chicken', description: 'Crispy, juicy, and perfectly seasoned—roast chicken is the ultimate comfort food.' },
];

const HeaderCarousel = () => {
    return (
        <Carousel
            showThumbs={false}
            infiniteLoop
            useKeyboardArrows
            autoPlay={true}
            showArrows={false}
            showStatus={false}
            showIndicators={false}
            interval={2000}
            className=' w-full h-[90vh] lg:px-[160px]'
        >
            {
                carouselItems.map(item => (
                    <div key={item.id} className="w-full h-[90vh] flex flex-col lg:flex-row justify-center items-center p-5 lg:p-0 lg:gap-5 bg-gray-100">
                        <div className="text-center lg:text-left mb-10 lg:mb-0">
                            <h3 className="text-2xl lg:text-4xl text-gray-700 mb-2 text-[#27AE60]">Special Dish</h3>
                            <h2 className="text-6xl lg:text-7xl text-red-600 font-bold mb-4">{item.title}</h2>
                            <p className="text-gray-600 lg:text-lg">{item.description}</p>
                        </div>
                        <div className=" md:w-[500px] lg:w-[800px] w-[90%]">
                            <img className="w-full h-full" src={item.img} alt={item.title} />
                        </div>
                    </div>
                ))
            }
        </Carousel>
    );
};

export default HeaderCarousel;

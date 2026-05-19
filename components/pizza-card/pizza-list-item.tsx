import { PizzaType } from "@/lib/pizzas";
import Image from "next/image";
import Link from "next/link";
import PizzaTags from "@/components/pizza-card/pizza-tags";
import AddToCartButton from "@/components/pizza-card/add-to-cart-button";

const PizzaListitem = ({ pizza }: { pizza: PizzaType }) => {
    return (
        <article className='grid grid-cols-[200px_1fr] md:grid-cols-[200px_1fr] border-2 border-gray-100 rounded-md'>
            <Image
                src={pizza.image_url}
                alt={pizza.name}
                width={200}
                height={200}
                className="rounded-md w-full h-full object-cover"
                loading='eager'
            />
            <div className="p-2 flex flex-col">
                <div>
                    <Link href={`/menu/${pizza.id}`}><h2 className='font-bold hover:text-blue-500'>{pizza.name}</h2></Link>
                    <p className='text-base font-bold my-1'>{pizza.weight_g} g</p>
                    <PizzaTags tags={pizza.tags} />
                </div>
                <p className='text-sm text-gray-500 my-3 flex-1 line-clamp-2'>{pizza.description}</p>
                <div className="flex justify-between items-center mt-auto">
                    <p className='text-xl font-bold'>{pizza.price_uah} грн</p>
                    <AddToCartButton pizza={pizza} />
                </div>
            </div>
        </article>
    );
};

export default PizzaListitem;
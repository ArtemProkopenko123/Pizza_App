import { getPizzaById } from "@/lib/pizzas";
import { notFound } from "next/navigation";
import Image from "next/image";
import BackButton from "@/components/shared/back-button";
import PizzaTags from "@/components/pizza-card/pizza-tags";
import PizzaActions from "./components/pizza-actions";

export default async function PizzaPage({ params }: { params: { id: string } }) {
    const { id } = await params;
    const pizza = await getPizzaById(parseInt(id));

    if (!pizza) {
        return notFound();
    }
    return (<>
        <BackButton href="/" />
        <div className="grid grid-cols-1 sm:grid-cols-[300px_1fr] gap-4 ">
            <Image src={pizza.image_url} alt={pizza.name} width={300} height={300} className="mx-auto sm:w-full sm:h-full object-cover" loading='eager' />
            <div className="flex flex-col gap-3">
                <h1 className="text-2xl font-bold">{pizza.name}</h1>
                <p className="text-2xl text-gray-500">{pizza.weight_g} г</p>
                <PizzaTags tags={pizza.tags} />
                <p>{pizza.description}</p>
                <PizzaActions pizza={pizza} />
            </div>
        </div>
    </>)
}

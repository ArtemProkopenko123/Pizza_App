import { PizzaSize } from "@/utils/constants";
import usePizzaWeight from "@/utils/hooks/use-pizza-weight";

type Props = {
    weight: number;
    size: PizzaSize;
}
const PizzaWeight = ({ weight, size }: Props) => {
    const calculatedWeight = usePizzaWeight(weight, size);
    return (
        <p className="text-2xl text-gray-500">{calculatedWeight} g</p>
    )
}

export default PizzaWeight;
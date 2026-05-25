import { PizzaSize } from "@/utils/constants";

type Props = {
    inline?: boolean;
    currentSize: PizzaSize;
    setSize: (size: number) => void;
}
const SizeSelect = ({ inline = false, currentSize, setSize }: Props) => {
    return (
        <fieldset>
            <legend className="font-bold">Select size:</legend>
            <div className={inline ? "flex gap-2 " : ""}>
                <SizeOption size={PizzaSize.SMALL} currentSize={currentSize} setSize={setSize} />
                <SizeOption size={PizzaSize.MEDIUM} currentSize={currentSize} setSize={setSize} />
                <SizeOption size={PizzaSize.LARGE} currentSize={currentSize} setSize={setSize} />
            </div>
        </fieldset>

    )
}

export default SizeSelect;

type SizeOptionProps = {
    size: PizzaSize;
    currentSize: PizzaSize;
    setSize: (size: number) => void;
}

const SizeOption = ({ size, currentSize, setSize }: SizeOptionProps) => {
    return (
        <div>
            <input onChange={() => setSize(size)} className="cursor-pointer" type="radio" name="size" value={size} id={`size${size}`} checked={currentSize === size} />
            <label htmlFor={`size${size}`} className="ml-2 cursor-pointer">{size} cm</label>
        </div>
    )
}

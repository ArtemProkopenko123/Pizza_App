import Link from "next/link";

type Props = {
    href?: string;
}
const BackButton = ({ href = "/" }: Props) => (
    <Link href={href} className="text-gray-500 hover:text-black mb-4 inline-block">← Назад</Link>
)

export default BackButton;
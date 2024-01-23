export function PositiveOrNegative({ value }: {
    value: number;
}): JSX.Element {
    const stringValue = value > 0 ? `+${value}` : `${value}`

    return (
        <span className="flex items-center justify-center bg-black rounded-full text-white w-6 md:w-7 py-[0.5px] text-xs md:text-sm">
            {stringValue}
        </span>
    )
}
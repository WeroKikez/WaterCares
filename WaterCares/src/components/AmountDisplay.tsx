type AmountDisplayProps = {
    label?: string;
    amount: number;
}

const AmountDisplay = ({ label, amount } : AmountDisplayProps) => {
  return (
    <p className="text-3xl text-blue-600 font-bold">
        {label && `${label}: `}
        <span className="font-black text-black">{`${amount} L.`}</span>
    </p>
  )
}

export default AmountDisplay;
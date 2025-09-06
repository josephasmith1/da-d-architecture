type StatItemProps = {
  value: string;
  label: string;
};

function StatItem({ value, label }: StatItemProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <span className="text-4xl md:text-5xl text-primary">{value}</span>
      <span className="text-gray-500 text-lg">{label}</span>
    </div>
  );
}

export default StatItem;


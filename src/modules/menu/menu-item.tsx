export default function MenuItem({
  name,
  description,
  price,
}: {
  name: string;
  description: string;
  price: string;
}) {
  return (
    <div className="py-4">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h4 className="text-lg font-semibold text-white">{name}</h4>
          <p className="text-sm text-gray-400">{description}</p>
        </div>
        <span className="text-lg font-semibold text-red-500">{price}</span>
      </div>
    </div>
  );
}

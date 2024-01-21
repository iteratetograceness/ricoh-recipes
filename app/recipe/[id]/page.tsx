export default function RecipePage({
    params: { id },
  }: {
    params: { id: string };
  }) {
    return <div>{id}</div>;
  }
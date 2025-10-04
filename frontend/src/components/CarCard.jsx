export default function CarCard({ car }) {
  return (
    <div style={{
      border: "1px solid #ccc",
      padding: "1rem",
      borderRadius: "8px",
      marginBottom: "1rem",
      width: "200px"
    }}>
      <h2>{car.name}</h2>
      <p>Year: {car.year}</p>
      <p>Price: ${car.price}</p>
    </div>
  );
}
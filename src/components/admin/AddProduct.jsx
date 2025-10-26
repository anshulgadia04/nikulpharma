import { useState } from "react";

export default function AddProduct() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("Add product:", { name, price: Number(price) });
    alert("Product submitted (mock).");
    setName("");
    setPrice("");
  };

  return (
    <div style={{ padding: 24 }}>
      <h3>Add Product</h3>
      <form onSubmit={onSubmit}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          style={{ display: "block", margin: "8px 0" }}
        />
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          style={{ display: "block", margin: "8px 0" }}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

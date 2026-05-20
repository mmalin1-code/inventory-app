


import React, { useState } from "react";

export default function EquipmentInventoryApp() {
  const defaultCategories = [
    "Uncategorized",
    "Equipment",
    "Electronics",
    "Safety",
    "Other"
  ];

  const [darkMode, setDarkMode] = useState(true);

  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [serialNumber, setSerialNumber] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Uncategorized");
  const [quantity, setQuantity] = useState(1);
  const [filter, setFilter] = useState("All");

  const [categories, setCategories] = useState(defaultCategories);
  const [newCategory, setNewCategory] = useState("");

  const [kits, setKits] = useState([]);
  const [kitName, setKitName] = useState("");
  const [kitItems, setKitItems] = useState([]);

  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editCategory, setEditCategory] = useState("Uncategorized");
  const [editQuantity, setEditQuantity] = useState(1);
  const [editSerial, setEditSerial] = useState("");

  const pageClass = darkMode
    ? "min-h-screen w-full bg-gray-950 text-white p-6"
    : "min-h-screen w-full bg-white text-black p-6";

  const inputClass = darkMode
    ? "w-full bg-gray-800 text-white border border-gray-700 p-2 rounded"
    : "w-full bg-white text-black border border-gray-300 p-2 rounded";

  // ---------------- ITEMS ----------------

  function addItem() {
    if (!name.trim()) return;

    setItems([
      {
        id: Date.now(),
        name,
        category: selectedCategory,
        quantity: Number(quantity),
        serialNumber
      },
      ...items
    ]);

    setName("");
    setSerialNumber("");
    setQuantity(1);
  }

  function deleteItem(id) {
    setItems(items.filter((i) => i.id !== id));
    setKitItems(kitItems.filter((i) => i !== id));
  }

  function startEdit(item) {
    setEditId(item.id);
    setEditName(item.name);
    setEditCategory(item.category);
    setEditQuantity(item.quantity);
    setEditSerial(item.serialNumber || "");
  }

  function saveEdit() {
    setItems(
      items.map((item) =>
        item.id === editId
          ? {
              ...item,
              name: editName,
              category: editCategory,
              quantity: Number(editQuantity),
              serialNumber: editSerial
            }
          : item
      )
    );
    setEditId(null);
  }

  function cancelEdit() {
    setEditId(null);
  }

  // ---------------- CATEGORIES ----------------

  function addCategory() {
    if (!newCategory.trim()) return;
    if (categories.includes(newCategory)) return;

    setCategories([...categories, newCategory]);
    setNewCategory("");
  }

  function deleteCategory(cat) {
    if (cat === "Uncategorized") return;

    setCategories(categories.filter((c) => c !== cat));

    setItems(
      items.map((item) =>
        item.category === cat
          ? { ...item, category: "Uncategorized" }
          : item
      )
    );
  }

  // ---------------- KITS ----------------

  function toggleKitItem(id) {
    if (kitItems.includes(id)) {
      setKitItems(kitItems.filter((i) => i !== id));
    } else {
      setKitItems([...kitItems, id]);
    }
  }

  function createKit() {
    if (!kitName.trim() || kitItems.length === 0) return;

    setKits([
      {
        id: Date.now(),
        name: kitName,
        items: kitItems
      },
      ...kits
    ]);

    setKitName("");
    setKitItems([]);
  }

  // ---------------- FILTER ----------------

  const filteredItems =
    filter === "All"
      ? items
      : items.filter((i) => i.category === filter);

  return (
    <div className={pageClass}>
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Equipment Inventory</h1>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-3 py-1 border border-gray-500 rounded"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      {/* ADD ITEM */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-2 mb-6">
        <input
          className={inputClass}
          placeholder="Item name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className={inputClass}
          placeholder="Serial number"
          value={serialNumber}
          onChange={(e) => setSerialNumber(e.target.value)}
        />

        <select
          className={inputClass}
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        <input
          className={inputClass}
          type="number"
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />

        <button
          onClick={addItem}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded p-2"
        >
          Add Item
        </button>
      </div>

      {/* ADD CATEGORY */}
      <div className="flex gap-2 mb-4">
        <input
          className={inputClass}
          placeholder="New category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />

        <button
          onClick={addCategory}
          className="bg-green-600 text-white px-3 rounded"
        >
          Add
        </button>
      </div>

      {/* MANAGE CATEGORIES (RESTORED) */}
      <div className="mb-6">
        <h2 className="font-bold mb-2">Manage Categories</h2>

        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <div
              key={c}
              className="border border-gray-600 px-2 py-1 rounded flex gap-2 items-center"
            >
              <span>{c}</span>

              {c !== "Uncategorized" && (
                <button
                  onClick={() => deleteCategory(c)}
                  className="text-red-400"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* FILTER */}
      <div className="mb-6">
        <select
          className={inputClass}
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option>All</option>
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* ITEMS */}
      <div className="space-y-2 mb-10">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="border border-gray-700 p-3 rounded flex justify-between"
          >
            {editId === item.id ? (
              <div className="flex gap-2 w-full">
                <input
                  className={inputClass}
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                />
                <input
                  className={inputClass}
                  value={editSerial}
                  onChange={(e) => setEditSerial(e.target.value)}
                />
                <input
                  className={inputClass}
                  value={editCategory}
                  onChange={(e) => setEditCategory(e.target.value)}
                />
                <input
                  className={inputClass}
                  type="number"
                  value={editQuantity}
                  onChange={(e) => setEditQuantity(e.target.value)}
                />

                <button onClick={saveEdit} className="text-green-400">
                  Save
                </button>
                <button onClick={cancelEdit} className="text-gray-400">
                  Cancel
                </button>
              </div>
            ) : (
              <>
                <div>
                  <p className="font-bold">{item.name}</p>
                  <p className="text-sm opacity-70">
                    {item.category} • Qty {item.quantity}
                  </p>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => startEdit(item)}
                    className="text-blue-400"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="text-red-400"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* KITS */}
      <div className="border-t pt-4">
        <h2 className="text-xl font-bold mb-2">Kits</h2>

        <div className="flex gap-2 mb-2">
          <input
            className={inputClass}
            placeholder="Kit name"
            value={kitName}
            onChange={(e) => setKitName(e.target.value)}
          />

          <button
            onClick={createKit}
            className="bg-purple-600 text-white px-3 rounded"
          >
            Create Kit
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {items.map((item) => (
            <label
              key={item.id}
              className="border border-gray-600 px-2 py-1 rounded flex gap-2"
            >
              <input
                type="checkbox"
                checked={kitItems.includes(item.id)}
                onChange={() => toggleKitItem(item.id)}
              />
              {item.name}
            </label>
          ))}
        </div>

        <div className="space-y-2">
          {kits.map((kit) => (
            <div
              key={kit.id}
              className="border border-gray-700 p-2 rounded"
            >
              <p className="font-bold">{kit.name}</p>
              <p className="text-sm opacity-70">
                Items: {kit.items.length}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

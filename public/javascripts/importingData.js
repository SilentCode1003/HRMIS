const data = {
	title: "My List",
	items: [
		{ name: "Item 1", price: 10 },
		{ name: "Item 2", price: 20 },
		{ name: "Item 3", price: 30 },
	]
};

document.getElementById("title").textContent = data.title;

const listElement = document.getElementById("list");
data.items.forEach(item => {
	const li = document.createElement("li");
	li.textContent = `${item.name}: $${item.price}`;
	listElement.appendChild(li);
});
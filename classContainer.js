const fs = require('fs');

class Container {
	constructor(file) {
		this.file = file;
	}

	async getAll() {
		try {
			const file = await fs.promises.readFile(this.file, 'utf-8');
			let fileToObject = JSON.parse(file);
			return fileToObject;
		} catch (error) {
			const newProductsContainer = [];
			await fs.promises.writeFile(this.file, JSON.stringify(newProductsContainer, null, 2));
			return newProductsContainer;
		}

	};

	async save(newProduct) {
		const elements = await this.getAll();
		let newId;
		if (elements.length === 0) {
			newId = 0;
		} else {
			newId = elements[elements.length - 1].id + 1;
		}
		newProduct.id = newId
		elements.push(newProduct);
		const elementsJson = JSON.stringify(elements, null, 2)
		await fs.promises.writeFile(this.file, elementsJson)
		return newId;

	};

	async getById(searchId) {
		try {
			const elements = await this.getAll();
			const elementFind = elements.find((element) => element.id == searchId);
			return elementFind;
		} catch (error) {
			console.log(error)
		}


	};

	async deleteById(deleteId) {
		try {
			const elements = await this.getAll();
			const newArray = elements.filter((element) => element.id != deleteId);
			await fs.promises.writeFile(this.file, JSON.stringify(newArray, null, 2));

		} catch (error) {
			console.log(error)
		}
	};

	async deleteAll() {
		try {
			await fs.promises.writeFile(this.file, JSON.stringify(([]), null, 2));
		} catch (error) {
			console.log(error)
		}

	};
}

let product1 = {
	title: 'Lavarropas Carga Frontal Sense Inverter Whirlpool',
	price: 88999,
	thumbnail: 'https://images.fravega.com/f300/c44ea16d04e83ee0f93e286acb3e9d6a.jpg.webp'
};

let product2 = {
	title: 'Smart TV 50 pulgadas 4K UHD Philips 50PUD7406/77',
	price: 75999,
	thumbnail: 'https://images.fravega.com/f300/0ed80650a543b5031931b25427afb045.jpg.webp'
};

let product3 = {
	title: 'Microondas Digital Eco 20 Lts BGH B120DN20',
	price: 25999,
	thumbnail: 'https://images.fravega.com/f300/a82e68ba03dca3b907461fcb1405ef96.jpg.webp'
};

module.exports = Container;
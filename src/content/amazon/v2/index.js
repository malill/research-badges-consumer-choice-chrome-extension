const { AmazonEvent } = require("./model/AmazonEvent");
const { ProductNavigatorData } = require("./model/ProductNavigatorData");

console.log("Product Navigator Amazon [v2]")



let productNavigatorData = new ProductNavigatorData();
productNavigatorData.pushEvent(new AmazonEvent(type = "visit"))
console.log(productNavigatorData);
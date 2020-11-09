const FlexSearch = require("flexsearch");

const productIndex = new FlexSearch({
  doc: {
    id: "id",
    field: ["modelname", "price", "category0",  "category1"]
  },
  tokenize: 'forward'
});


productIndex.add([
  {
    id: 0,
    modelname: 'PUERTA RF30 0900X2000MM',
    price: 1000,
    category0: 'PUERTAS',
    category1: 'RF30',
    updatedAt: null
  },
  {
    id: 1,
    modelname: 'PUERTA RF60 0900X2000MM',
    price: 1200,
    category0: 'PUERTAS',
    category1: 'RF60',
    updatedAt: null
  },
  {
    id: 2,
    modelname: 'PUERTA RF90 0900X2000MM',
    price: 1200,
    category0: 'PUERTAS',
    category1: 'RF90',
    updatedAt: null
  }
]);

const categoryList = ['RF90'];


const createKeepProductsThatHaveOneOfTheseCategoriesFilter = function(categoryList){

  return function(product){

    const {id, modelname, price, updatedAt, ...productCategories} = product;

    let includesOneOfCategoryList = false;

    for(let i = 0; i < categoryList.length; i++){
      includesOneOfCategoryList = Object.values(productCategories).includes(categoryList[i]);
    }

    return includesOneOfCategoryList;
  };
}

console.log(productIndex.search('PUERTA', {
  where: createKeepProductsThatHaveOneOfTheseCategoriesFilter(categoryList)
}));




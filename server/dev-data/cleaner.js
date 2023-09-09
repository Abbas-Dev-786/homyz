const fs = require("fs");

const cities = ["liverpool", "london", "manchester"];

const cleanInitialData = () => {
  cities.forEach(function (city) {
    const data = [];

    for (let i = 1; i < 6; i++) {
      const fileData = JSON.parse(
        fs.readFileSync(`./${city}-${i}.json`, "utf-8")
      );

      data.push(...fileData.listing);
    }

    fs.writeFileSync(`${city}.json`, JSON.stringify(data), "utf-8");
  });
};

/*
description
latitude
longitude
price
post_town => city
displayable_address => address
country
num_bedrooms
bullets => facilities
num_bathrooms
agent_phone => phoneNumber
original_image => images
*/

const finalData = function () {
  const data = [];

  cities.forEach(function (city) {
    const oldData = JSON.parse(fs.readFileSync(`./${city}.json`, "utf-8"));
    const { apartment_names: titles } = JSON.parse(
      fs.readFileSync("./titles.json", "utf-8")
    );

    let count = 0;

    const newData = oldData.map((data, i) => {
      const obj = {
        title: titles[i + count],
        description: data.description,
        location: {
          coordinates: [data.latitude, data.longitude],
          type: "Point",
        },
        country: data.country,
        city: data.post_town,
        address: data.displayable_address,
        price: data.price,
        images: data.original_image,
        phoneNumber: data.agent_phone,
        facilities: data.bullets,
        noOfBathrooms: data.num_bathrooms,
        noOfBedrooms: data.num_bedrooms,
      };
      return obj;
    });

    data.push(newData);

    count += 200;
  });

  fs.writeFileSync("data.json", JSON.stringify(data.flat()), "utf-8");
};

const addIDAndSanitizeDesc = function () {
  const idsData = fs.readFileSync("./property_ids.txt", "utf-8").split("\n");
  const oldData = JSON.parse(fs.readFileSync(`./data.json`, "utf-8"));

  const newData = oldData.map((data, i) => {
    return {
      ...data,
      id: idsData[i],
      description: data.description.replace(/(&lt;([^>]+)>)/gi, ""),
    };
  });

  fs.writeFileSync("data-v2.json", JSON.stringify(newData), "utf-8");
};

addIDAndSanitizeDesc();

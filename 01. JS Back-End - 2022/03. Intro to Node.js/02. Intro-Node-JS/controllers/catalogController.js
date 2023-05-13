const { IncomingForm } = require("formidable");
const { html, data } = require("../util");

function catalogPage(req, res) {
  res.write(
    html(
      `
      <h1>Catalog</h1>
      <p>List of items</p>
      <ul>
      ${data
        .map((i) => `<li data-id = ${i.id}> ${i.name} - ${i.color} </li>`)
        .join("\n")}
      </ul>
      `,
      "Catalog"
    )
  );

  res.end();
}

function createPage(req, res) {
  res.write(
    html(
      `
            <h1>Create Item</h1>
            <form method="POST" action="/create">
            <label for="">Name: <input type="text" name="name"></label>
            <label for="">Color: <select name="color">
                    <option value="red">Red</option>
                    <option value="green">Green</option>
                    <option value="blue">Blue</option>
        
                </select>
            </label>
            <input type="submit" value='Create'>
        </form>
        `,
      "Create new item"
    )
  );
  res.end();
}

function createItem(req, res) {
  // Handle POST request
  console.log("create request");

  const form = new IncomingForm();
  form.parse(req, (err, fields) => {
    if (fields.name == "") {
     
    }
    // console.log(' fields ',fields);
    // fields  { name: 'test', color: 'red' }

    const item = {
      /*Random id generator*/
      id: "asd" + ("0000" + ((Math.random() * 9999) | 0)).slice(-4),
      name: fields.name,
      color: fields.color,
    };

    data.push(item);

    res.writeHead(301, [
      'Location',
      '/catalog'
    ]);
    res.end();
  });
}

module.exports = {
  catalogPage,
  createPage,
  createItem,
};

const extractOrderData = data => {
  return data.map(
    ({ id, name, total_price, line_items: original_line_items }) => {
      let line_items = original_line_items.map(
        ({ id, image, name, price, variant_id }) => {
          /**
           * This right here that I am about to do is disgusting.
           * I would much prefer to create an array of applicable variations
           * and counts of that variation against this order.
           *
           * But I cannot think how to do that right now.
           * I hate using hard coded values in code.
           *
           * My intention would be to have the product line have a nested array of variation objects such as
           * [{
           *   qty, name
           * }]
           * then loop through each of those printing out the qty
           */

          const filteredName = name.includes('Huel Powder')
            ? 'Huel Powder'
            : name;

          const description = getVariants(original_line_items, filteredName);

          return {
            id,
            image,
            name: filteredName,
            price,
            variant_id,
            description
          };
        }
      );

      return {
        id,
        name,
        total_price,
        line_items
      };
    }
  );
};

const getVariants = (line_items, filterText) =>
  line_items
    .map(({ name, quantity }) => `${quantity}X ${name}`)
    .filter(item => item.includes(filterText)) //This is disgusting.
    .join(' ');

export { extractOrderData };

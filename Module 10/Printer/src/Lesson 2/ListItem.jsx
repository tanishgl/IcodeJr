// eslint-disable-next-line react/prop-types
const ListItem = (props) => {
  const itemName = props.itemName;
  return <li>{itemName.length > 10 ? itemName.toUpperCase() : itemName}</li>;
};

export default ListItem;

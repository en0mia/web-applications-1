import { NavItem, NavLink } from "react-bootstrap";

function Filters(props) {
  const { items, selected, onSelect } = props;
  const filterArray = Object.entries(items);

  return (
    <ul className="nav nav-pills flex-column gap-2 mb-auto">
      {filterArray.map(([filterName, { label }]) => {
        return (
          <NavItem key={filterName}>
            <NavLink
              href={"#" + filterName}
              onClick={() => onSelect(filterName)}
              className={selected === filterName ? "" : "link-dark"}
              active={selected === filterName}
            >
              {label}
            </NavLink>
          </NavItem>
        );
      })}
    </ul>
  );
}

export default Filters;

import { useContext } from "react";
import { FiltersContext } from "../contexts/filters";

export default function CollapsibleData({ id, children, className = '' }) {
  const { filterStore: { columns } } = useContext(FiltersContext);

  if (!columns[id].visible) {
    return <td style={{minWidth: '0px'}} className={className}></td>
  }

  return (
    <td className={className}>
      {children}
    </td>
  )
}

import React from "react";

interface Props<T> {
  items: T[];
  groupSize?: number;
}

interface UseGroupUp<T> {
  itemGroups: T[][];
}

export default <T>({ items, groupSize = 3 }: Props<T>): UseGroupUp<T> =>
  React.useMemo(() => {
    const itemGroups: T[][] = [];
    for (let i = 0; i < items.length; i += groupSize) {
      itemGroups.push(items.slice(i, i + 3));
    }
    return { itemGroups };
  }, [items, groupSize]);
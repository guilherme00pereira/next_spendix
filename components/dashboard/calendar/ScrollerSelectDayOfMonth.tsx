import { ScrollMenu, VisibilityContext, getItemsPos, slidingWindow } from "react-horizontal-scrolling-menu";
import { LeftArrow, RightArrow } from "./buttons/Arrows";
import { DragManager } from "@/lib/drag-manager";
import { useRef, useState } from "react";
import { Card } from "./buttons/catd";
import "react-horizontal-scrolling-menu/dist/styles.css";

type scrollVisibilityApiType = React.ContextType<typeof VisibilityContext>;

const elemPrefix = "test";
const getId = (index: number) => `${elemPrefix}${index}`;

const getItems = () =>
  Array(20)
    .fill(0)
    .map((_, ind) => ({ id: getId(ind) }));

const ScrollerSelectDayOfMonth = () => {
  const [items] = useState(getItems);

  const dragState = useRef(new DragManager());

  const handleDrag =
    ({ scrollContainer }: scrollVisibilityApiType) =>
    (ev: React.MouseEvent) =>
      dragState.current.dragMove(ev, (posDiff: number) => {
        if (scrollContainer.current) {
          scrollContainer.current.scrollLeft += posDiff;
        }
      });

  const [selected, setSelected] = useState<string>("");
  const handleItemClick =
    (itemId: string) =>
    ({ getItemById, scrollToItem }: scrollVisibilityApiType) => {
      if (dragState.current.dragging) {
        return false;
      }
      setSelected(selected !== itemId ? itemId : "");
      scrollToItem(getItemById(itemId), "smooth", "center", "nearest");
    };

  return (
    <div className="example">
      <div onMouseLeave={dragState.current.dragStop}>
        <ScrollMenu
          LeftArrow={LeftArrow}
          RightArrow={RightArrow}
          onWheel={onWheel}
          onMouseDown={() => dragState.current.dragStart}
          onMouseUp={({ getItemById, scrollToItem, items }: scrollVisibilityApiType) =>
            () => {
              dragState.current.dragStop();
              const { center } = getItemsPos(items.toItems());
              scrollToItem(getItemById(center), "smooth", "center");
            }}
          onMouseMove={handleDrag}
        >
          {items.map(({ id }) => (
            <Card title={id} itemId={id} key={id} onClick={handleItemClick(id)} selected={id === selected} />
          ))}
        </ScrollMenu>
      </div>
    </div>
  );
};

export default ScrollerSelectDayOfMonth;

function onWheel({ getItemById, items, scrollToItem }: scrollVisibilityApiType, ev: React.WheelEvent): void {
  const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;

  if (isThouchpad) {
    ev.stopPropagation();
    return;
  }

  const allItems = items.toItems();
  const visibleItems = allItems.map((el) => el[0]);

  if (ev.deltaY < 0) {
    // NOTE: for center items
    const nextGroupItems = slidingWindow(allItems, visibleItems).next();
    const { center } = getItemsPos(nextGroupItems);
    scrollToItem(getItemById(center), "smooth", "center");
  } else if (ev.deltaY > 0) {
    const prevGroupItems = slidingWindow(allItems, visibleItems).prev();
    const { center } = getItemsPos(prevGroupItems);
    scrollToItem(getItemById(center), "smooth", "center");
  }
}


import { useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import TopBar from './TopBar';
import Widget from './Widget';
import '/node_modules/react-grid-layout/css/styles.css';
import '/node_modules/react-resizable/css/styles.css';
import { getStorageItem, setStorageItem } from 'src/utils/browserStorage';
import { DashboardComponentVM, LayoutSchemaVM } from 'src/models/dashboard.model';
const ResponsiveGridLayout = WidthProvider(Responsive);

//TODO: add item and remove items from dashboard

interface DashboardProps {
  canEdit?: boolean //whether the user can move / remove /add the components around 
  initialLayouts: ReactGridLayout.Layouts
  componentList: DashboardComponentVM
  heading: string
  page: string
  autoSave?: boolean
}

/**
 * Dashboard component for displaying content with customizable layouts.
 *
 * @param initialLayouts - The initial layout configuration.
 * @param canEdit - Indicates whether the layout can be edited. Default is true.
 * @param componentList - The list of components to be rendered in the dashboard.
 * @param heading - The heading of the dashboard.
 * @param page - The page identifier for local storage.
 * @param autoSave - Indicates whether the layout should be automatically saved to local storage. Default is false.
 */
export default function Content({ initialLayouts, canEdit = true, componentList, heading, page, autoSave = false }: DashboardProps) {
  const [items, setItems] = useState<any>(Object.keys(componentList));

  /**
   * Removes an item from the dashboard.
   *
   * @param itemId - The ID of the item to be removed.
   */
  const onRemoveItem = (itemId: any) => {
    setItems(items.filter((i: any) => i !== itemId));
  };

  /**
   * Adds an item to the dashboard.
   *
   * @param itemId - The ID of the item to be added.
   */
  const onAddItem = (itemId: any) => {
    setItems([...items, itemId]);
  };

  const layoutKeys: LayoutSchemaVM[] = Object.keys(initialLayouts) as LayoutSchemaVM[];

  /**
   * Modifies the initial layouts by setting the 'static' property to true for each item.
   *
   * @param initialLayouts - The initial layout configuration.
   * @param layoutKeys - The keys of the layouts to be modified.
   * @returns The modified layouts.
   */
  const modifyLayouts = (initialLayouts: ReactGridLayout.Layouts, layoutKeys: LayoutSchemaVM[]): Record<LayoutSchemaVM, any[]> => {
    const modifiedLayouts: Record<LayoutSchemaVM, any[]> = layoutKeys.reduce(
      (acc, layoutKey) => {
        acc[layoutKey] = initialLayouts[layoutKey].map((item: any) => ({ ...item, static: true }));
        return acc;
      },
      {} as Record<LayoutSchemaVM, any[]>
    );

    return modifiedLayouts;
  }

  /**
   * Gets the initial layout configuration based on the 'canEdit' prop.
   *
   * @returns The initial layout configuration.
   */
  const getInitLayout = () => {
    if (canEdit) {
      return initialLayouts
    } else {
      return modifyLayouts(initialLayouts, layoutKeys)
    }
  }

  /**
   * Retrieves a value from local storage.
   *
   * @param key - The key of the value to retrieve.
   * @returns The retrieved value.
   */
  const getFromLS = (key: any) => {
    let ls: Record<any, any> = {};
    try {
      ls = getStorageItem(page) || {};
    } catch (e) {
      // no item in local storage
    }
    return ls[key];
  }

  /**
   * Saves a value to local storage.
   *
   * @param key - The key of the value to save.
   * @param value - The value to save.
   */
  const saveToLS = (key: any, value: any) => {
    setStorageItem(page, JSON.stringify({
      [key]: value,
    }))
  }

  const [layouts, setLayouts] = useState(
    getFromLS('layouts') || getInitLayout(),
  );

  /**
   * Handles the layout change event.
   *
   * @param _ - The current layout.
   * @param allLayouts - The updated layout configuration.
   */
  const onLayoutChange = (_: any, allLayouts: any) => {
    setLayouts(allLayouts);
    if (autoSave) {
      saveToLS('layouts', allLayouts);
    }
  };

  /**
   * Saves the current layout to local storage.
   */
  const onLayoutSave = () => {
    saveToLS('layouts', layouts);
  };

  return (
    <>
      <TopBar
        onLayoutSave={onLayoutSave}
        items={items}
        onRemoveItem={onRemoveItem}
        onAddItem={onAddItem}
        originalItems={Object.keys(componentList)}
        heading={heading}
        canEdit={canEdit}
        autoSave={autoSave}
      />
      <ResponsiveGridLayout
        isDraggable={canEdit}
        isResizable={canEdit}
        className="layout"
        layouts={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 24, md: 24, sm: 24, xs: 24, xxs: 24 }}
        rowHeight={10}
        onLayoutChange={onLayoutChange}
      >
        {items.map((key: any) => (
          <div
            key={key}
            className="widget"
          // data-grid={{ w: key.w, h: key.h, x: key.x, y: key.y }}
          >
            <Widget
              id={key}
              onRemoveItem={onRemoveItem}
              component={componentList[key].component}
              showBorder={componentList[key].showBorder}
            />
          </div>
        ))}
      </ResponsiveGridLayout>
    </>
  );
}
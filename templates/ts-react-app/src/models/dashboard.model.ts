import { ReactNode } from 'react';
import { z } from 'zod';

const LayoutSchema = z.enum(['lg', 'md', 'sm', 'xs', 'xxs'])

/**
 * Represents a view model for a dashboard component.
 * The view model is a dictionary where each key represents a component name,
 * and the corresponding value is an object containing the component itself and an optional flag to show a border around it.
 */
export type DashboardComponentVM = {
    [key: string]: { component: ReactNode, showBorder?: boolean }
}

export type LayoutSchemaVM = z.TypeOf<typeof LayoutSchema>;

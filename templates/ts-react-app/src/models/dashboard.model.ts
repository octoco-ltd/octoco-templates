import { ReactNode } from 'react';
import { z } from 'zod';

const LayoutSchema = z.enum(['lg', 'md', 'sm', 'xs', 'xxs'])

export type DashboardComponentVM = {
    [key: string]: { component: ReactNode, showBorder?: boolean }
}

export type LayoutSchemaVM = z.TypeOf<typeof LayoutSchema>;

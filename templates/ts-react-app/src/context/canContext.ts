import { createContext } from 'react';
import { createContextualCan } from '@casl/react';
import { AbilityTuple, MongoAbility, MongoQuery } from '@casl/ability';

/**
 * The context for managing user abilities.
 */
/**
 * Represents the CanContext.
 *
 * @see [CanProvider]{@link CanProvider}
 * @see [CanConsumer]{@link CanConsumer}
 */
/**
 * Context for managing user abilities.
 * @remarks
 * This context provides the ability to define and check user abilities using a MongoDB-based approach.
 *
 * @typeparam AbilityTuple - The type representing the abilities of the user.
 * @typeparam MongoQuery - The type representing the MongoDB query used for checking abilities.
 */
export const AbilityContext = createContext<MongoAbility<AbilityTuple, MongoQuery>>({} as MongoAbility<AbilityTuple, MongoQuery>);
export const Can = createContextualCan(AbilityContext.Consumer); 
import { createContext } from 'react';
import { createContextualCan } from '@casl/react';
import { AbilityTuple, MongoAbility, MongoQuery } from '@casl/ability';

export const AbilityContext = createContext<MongoAbility<AbilityTuple, MongoQuery>>({} as MongoAbility<AbilityTuple, MongoQuery>);
export const Can = createContextualCan(AbilityContext.Consumer); 
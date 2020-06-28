import { createStore } from 'redux';
import { Reducers } from '../reducers';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistedConfig = {
    key: 'root',
    storage
}

const persistedReducer = persistReducer(persistedConfig, Reducers);

const Store = createStore(persistedReducer);
const persistor = persistStore(Store);

export { Store, persistor };
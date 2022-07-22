import { v4 as uuidv4} from "uuid";
import { UPDATES } from "../utils/constants";
// Lodash es una libreria con funciones de javascript muy utiles
import { size, remove} from "lodash";

export function saveUpdateApi(update) {
    const updates = getUpdatesApi();

    if(size(updates) === 0) {
        const updateTemp = [
            {
                id: uuidv4(),
                update,
                createdAt: new Date()
            }
        ];
        localStorage.setItem(UPDATES, JSON.stringify(updateTemp));
    } else {
        updates.push({
            id: uuidv4(),
            update,
            createdAt: new Date(),
        });
        localStorage.setItem(UPDATES, JSON.stringify(updates))
    }
}

export function getUpdatesApi () {
    const updates = localStorage.getItem(UPDATES);
    if (updates) {
        return JSON.parse(updates);
    }
    return [];
}

export function deleteUpdateApi(idUpdate) {
    const updates = getUpdatesApi();

    // Borra el update cuyo id coincide con el recibido en la funcion
    remove(updates, function(update) {
        return update.id === idUpdate;
    });

    localStorage.setItem(UPDATES, JSON.stringify(updates));
}
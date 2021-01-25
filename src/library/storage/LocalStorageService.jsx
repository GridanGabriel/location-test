import React from 'react';

class LocalStorageService extends React.Component {
    static setLocalStorage(address, data) {
        return localStorage.setItem(address, data);
    };

    static getLocalStorage(address) {
        if (localStorage.getItem(address))
            return  JSON.parse(localStorage.getItem(address));
        else return [];
    };

    static addLocationElement(address, itemsList, itemToAdd) {
        console.log(itemsList, itemToAdd)
        localStorage.removeItem(address);
        let tempList = itemsList;
        tempList.push(itemToAdd);
        localStorage.setItem(address, JSON.stringify(itemsList));
        return tempList;
    }

    static addCategoryElement(address, itemsList, itemToAdd) {
        localStorage.removeItem(address);
        let tempList = itemsList;
        tempList.push({ category: itemToAdd });
        localStorage.setItem(address, JSON.stringify(itemsList));
        return tempList;
    }

    static editElement(address, itemsList, itemToEdit) {
        localStorage.removeItem(address);
        let tempItems = itemsList;
        tempItems[itemToEdit.index] = itemToEdit.item;
        localStorage.setItem(address, JSON.stringify(tempItems));
        return tempItems;
    }

    static removeElement(address, itemsList, itemToRemove) {
        localStorage.removeItem(address);
        itemsList.splice(itemToRemove.index, 1);
        localStorage.setItem(address, JSON.stringify(itemsList));
        return itemsList;
    };

    static removeAllLocalStorage() {
        return localStorage.clear();
    };

    static removeLocalStorageAddress(address) {
        return localStorage.removeItem(address);
    };
}

export default LocalStorageService
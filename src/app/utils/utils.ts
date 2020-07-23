export default class Utils {

    /**
     * Finds the min and max value of the array in the property provided.
     * E.g.`{minValue: 0, maxValue: 1}`
     * @param array Array of objects to search
     * @param property Property of the item that will be compared
     * @returns Returns object with min and max value found in the array.
     */
    static findMinAndMaxValue(array:object[], property: string) {
        let object = {minValue: array[0][property], maxValue: array[0][property]};
        for (const item of array) {
            if(item[property]> object.maxValue){
              object.maxValue = item[property];
            }
            if(item[property] < object.minValue) {
              object.minValue = item[property];
            }
        }
         return object;
    }
}
const compareTwoObjects = (obj1, obj2) => {
  const object1KeysSorted = Object.keys(obj1).sort();
  const object2KeysSorted = Object.keys(obj2).sort();

  const areObjectsEqual = object1KeysSorted.every((key, index) => {
    const objValue1 = obj1[key];
    const objValue2 = obj2[object2KeysSorted[index]];
    return objValue1 === objValue2;
  });

  return areObjectsEqual;
};

export default compareTwoObjects;

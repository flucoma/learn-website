const fmod = (a,b) => { 
    return Number((a - (Math.floor(a / b) * b)).toPrecision(8));
};

export const wrap = (i, min, max) => {
    let retVal;
    let range = max - min; 

    if (i < max && i >= min) {
        return i;
    }

    if (max == min) {
        return min;
    }

    if (i < min) {
        retVal = i;
        while (retVal < min)
            retVal += range;
    }
    else
        retVal = fmod(i - min, range) + min;

    return retVal;
}

export const scale = (inputY, yRange, xRange) => {
    const [xMin, xMax] = xRange;
    const [yMin, yMax] = yRange;
  
    const percent = (inputY - yMin) / (yMax - yMin);
    const outputX = percent * (xMax - xMin) + xMin;
  
    return outputX;
  };
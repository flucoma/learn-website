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

export const clip = (x, min, max) => {
    return Math.min(Math.max(x, min), max);
}

export const max_scale = (x, imin, imax, omin, omax, exp) => {
    // duped from https://docs.cycling74.com/max8/refpages/scale
    return ((x-imin)/(imax-imin) == 0) ? omin : (((x-imin)/(imax-imin)) > 0) ? (omin + (omax-omin) * Math.pow(((x-imin)/(imax-imin)), exp)) : (omin + (omax-omin) * -Math.pow(((-x+imin)/(imax-imin)), exp))
}


export const pairwise = (arr, func) => {
    for(var i=0; i < arr.length - 1; i++){
        func(arr[i], arr[i + 1], i)
    }
}

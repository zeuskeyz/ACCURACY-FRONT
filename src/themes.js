export const light = attr => `${attr}-dark`;

export const dark = attr => `${attr}-light`;

export const myTheme = (myState,attr) => myState ? attr.forEach( item =>  `${item}-light` ) : attr.forEach( item => `${item}-dark` );




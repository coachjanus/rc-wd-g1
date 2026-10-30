// Декларації для стилів
// declare module '*.module.css';

declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.module.scss';

declare module '*.scss' {
  const content: Record<string, string>;
  export default content;
}


declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}
// Декларації для зображень
declare module '*.png' {
  const value: string;
  export default value;
}
declare module '*.jpg' {
  const value: string;
  export default value;
}
declare module '*.jpeg' {
  const value: string;
  export default value;
}
declare module '*.svg' {
  const value: string;
  export default value;
}
declare module '*.gif' {
  const value: string;
  export default value;
}


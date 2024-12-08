declare module '*.css' {
    const classes: { [key: string]: string };
    export default classes;
  }
  
  declare module '*.scss' {
    const classes: { [key: string]: string };
    export default classes;
  }
  
  declare module '*.module.css' {
    const classes: { [key: string]: string };
    export default classes;
  }
  
  declare module '*.module.scss' {
    const classes: { [key: string]: string };
    export default classes;
  }
  declare module '*.svg' {
    import * as React from 'react';
    const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string }>;
    export { ReactComponent };
    const src: string;
    export default src;
  }
  declare module '*.png' {
    import * as React from 'react';
    const ReactComponent: React.FunctionComponent<React.ImgHTMLAttributes<HTMLImageElement>>;
    export { ReactComponent };
    const src: string;
    export default src;
  }
  
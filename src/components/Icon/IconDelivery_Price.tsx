import { FC } from 'react';

interface IconDeliveryProps {
    className?: string;
    fill?: boolean;
    duotone?: boolean;
}

const IconDelivery: FC<IconDeliveryProps> = ({ className, fill = false, duotone = true }) => {
    return (
       
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M12.0013 13.3C11.8713 13.3 11.7413 13.27 11.6213 13.2L2.79132 8.09002C2.43132 7.88002 2.3113 7.41999 2.5213 7.05999C2.7313 6.69999 3.1813 6.57997 3.5513 6.78997L12.0013 11.68L20.4013 6.82C20.7613 6.61 21.2213 6.74002 21.4313 7.09002C21.6413 7.45002 21.5113 7.90999 21.1613 8.11999L12.3913 13.2C12.2613 13.26 12.1313 13.3 12.0013 13.3Z" fill="currentColor"/>
        <path d="M12 22.36C11.59 22.36 11.25 22.02 11.25 21.61V12.54C11.25 12.13 11.59 11.79 12 11.79C12.41 11.79 12.75 12.13 12.75 12.54V21.61C12.75 22.02 12.41 22.36 12 22.36Z" fill="currentColor"/>
        <path d="M12.0006 22.75C11.1206 22.75 10.2506 22.56 9.56061 22.18L4.22061 19.21C2.77061 18.41 1.64062 16.48 1.64062 14.82V9.16998C1.64062 7.50998 2.77061 5.59002 4.22061 4.78002L9.56061 1.82C10.9306 1.06 13.0706 1.06 14.4406 1.82L19.7806 4.78997C21.2306 5.58997 22.3606 7.51999 22.3606 9.17999V14.83C22.3606 16.49 21.2306 18.41 19.7806 19.22L14.4406 22.18C13.7506 22.56 12.8806 22.75 12.0006 22.75ZM12.0006 2.74999C11.3706 2.74999 10.7506 2.88 10.2906 3.13L4.95062 6.09997C3.99062 6.63997 3.14062 8.06999 3.14062 9.17999V14.83C3.14062 15.93 3.99062 17.37 4.95062 17.91L10.2906 20.88C11.2006 21.39 12.8006 21.39 13.7106 20.88L19.0506 17.91C20.0106 17.37 20.8606 15.94 20.8606 14.83V9.17999C20.8606 8.07999 20.0106 6.63997 19.0506 6.09997L13.7106 3.13C13.2506 2.88 12.6306 2.74999 12.0006 2.74999Z" fill="currentColor"/>
        <path d="M17.0012 13.99C16.5912 13.99 16.2512 13.65 16.2512 13.24V10.0201L7.13116 4.76007C6.77116 4.55007 6.65114 4.09005 6.86114 3.74005C7.07114 3.38005 7.52116 3.26003 7.88116 3.47003L17.3712 8.95007C17.6012 9.08007 17.7512 9.33003 17.7512 9.60003V13.2601C17.7512 13.6501 17.4112 13.99 17.0012 13.99Z" fill="currentColor"/>
        </svg>
        
    );
};

export default IconDelivery;
